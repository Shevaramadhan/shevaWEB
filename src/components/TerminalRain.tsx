"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export interface TerminalRainProps {
  /** Base trail glyph color (hex) */
  color?: string;
  /** Leading bright glyph color (hex) */
  headColor?: string;
  /** Speed multiplier (default: 1) */
  speed?: number;
  /** Stream density (0.2 to 1.5, default: 0.75) */
  density?: number;
  /** Base font size in px (default: 14) */
  fontSize?: number;
  /** Number of depth layers (1 to 3, default: 3) */
  layers?: number;
  /** Character set used for streams */
  charset?: string;
  className?: string;
  style?: CSSProperties;
}

interface StreamColumn {
  x: number;
  y: number;
  layer: number; // 0 = back, 1 = mid, 2 = front
  speed: number;
  length: number;
  fontSize: number;
  alphaScale: number;
  chars: string[];
  tick: number;
  mutateInterval: number;
}

const DEFAULT_CHARSET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>[]{}/\\|=+-*:;.~^$#@&";

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full.slice(0, 6), 16);
  if (Number.isNaN(num)) return [59, 130, 246];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function TerminalRain({
  color = "#3b82f6",
  headColor = "#e0f2fe",
  speed = 0.85,
  density = 0.72,
  fontSize = 13,
  layers = 3,
  charset = DEFAULT_CHARSET,
  className = "",
  style,
}: TerminalRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let lastTime = performance.now();
    let streams: StreamColumn[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const [rTrail, gTrail, bTrail] = hexToRgb(color);
    const [rHead, gHead, bHead] = hexToRgb(headColor);

    const randomChar = () =>
      charset[Math.floor(Math.random() * charset.length)] || "0";

    const createStream = (
      x: number,
      layer: number,
      randomY: boolean
    ): StreamColumn => {
      // Layer 0 (far), Layer 1 (mid), Layer 2 (near)
      const layerScales = [
        { size: 0.78, speed: 0.55, alpha: 0.35, len: [8, 15] },
        { size: 0.92, speed: 0.82, alpha: 0.62, len: [10, 20] },
        { size: 1.08, speed: 1.12, alpha: 0.95, len: [12, 24] },
      ];
      const spec = layerScales[Math.min(layer, 2)];
      const fSize = Math.max(9, Math.round(fontSize * spec.size));
      const [minLen, maxLen] = spec.len;
      const length =
        minLen + Math.floor(Math.random() * (maxLen - minLen + 1));
      const chars = Array.from({ length }, randomChar);

      return {
        x,
        y: randomY
          ? Math.random() * (height + length * fSize) - length * fSize
          : -Math.random() * height * 0.65,
        layer,
        speed:
          (42 + Math.random() * 34) *
          spec.speed *
          Math.max(0.1, speed),
        length,
        fontSize: fSize,
        alphaScale: spec.alpha,
        chars,
        tick: 0,
        mutateInterval: 0.08 + Math.random() * 0.14,
      };
    };

    const initStreams = () => {
      streams = [];
      const layerCount = Math.max(1, Math.min(3, layers));
      const colSpacing = Math.max(16, Math.round(fontSize * 1.65));
      const totalCols = Math.ceil(width / colSpacing);

      for (let l = 0; l < layerCount; l++) {
        const layerOffset = l * (colSpacing / layerCount);
        for (let c = 0; c < totalCols; c++) {
          if (Math.random() > density) continue;
          const x = c * colSpacing + layerOffset;
          streams.push(createStream(x, l, true));
        }
      }
    };

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStreams();
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const render = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      ctx.clearRect(0, 0, width, height);
      ctx.textBaseline = "top";

      for (let i = 0; i < streams.length; i++) {
        const col = streams[i];
        if (!reducedMotion) {
          col.y += col.speed * dt;
          col.tick += dt;
          if (col.tick >= col.mutateInterval) {
            col.tick = 0;
            const idx = Math.floor(Math.random() * col.chars.length);
            col.chars[idx] = randomChar();
            // Always mutate the leading character for authentic terminal feel
            col.chars[col.chars.length - 1] = randomChar();
          }
        }

        const totalSpan = col.length * col.fontSize;
        if (col.y - totalSpan > height + 40) {
          // Reset column to top
          col.y = -Math.random() * 240 - col.fontSize;
          col.length = col.chars.length;
        }

        ctx.font = `500 ${col.fontSize}px var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace`;

        for (let j = 0; j < col.length; j++) {
          const gy = col.y - (col.length - 1 - j) * col.fontSize;
          if (gy < -col.fontSize || gy > height + col.fontSize) continue;

          const isHead = j === col.length - 1;
          const isSecond = j === col.length - 2;
          const progress = (j + 1) / col.length; // 0 (tail) -> 1 (head)
          const fadeCurve = progress * progress;

          // Subtle boost near cursor
          let cursorBoost = 0;
          if (pointer.active) {
            const dist = Math.hypot(col.x - pointer.x, gy - pointer.y);
            if (dist < 180) {
              cursorBoost = (1 - dist / 180) * 0.35;
            }
          }

          if (isHead) {
            const alpha = Math.min(1, (0.88 + cursorBoost) * col.alphaScale);
            ctx.shadowColor = `rgba(${rTrail}, ${gTrail}, ${bTrail}, ${0.75 * col.alphaScale})`;
            ctx.shadowBlur = col.layer === 2 ? 10 : 5;
            ctx.fillStyle = `rgba(${rHead}, ${gHead}, ${bHead}, ${alpha.toFixed(3)})`;
          } else if (isSecond) {
            const alpha = Math.min(
              1,
              (0.68 + cursorBoost) * col.alphaScale
            );
            ctx.shadowBlur = 0;
            ctx.fillStyle = `rgba(${Math.round((rHead + rTrail) / 2)}, ${Math.round((gHead + gTrail) / 2)}, ${Math.round((bHead + bTrail) / 2)}, ${alpha.toFixed(3)})`;
          } else {
            const alpha = Math.min(
              1,
              (fadeCurve * 0.52 + cursorBoost * 0.5) * col.alphaScale
            );
            ctx.shadowBlur = 0;
            ctx.fillStyle = `rgba(${rTrail}, ${gTrail}, ${bTrail}, ${alpha.toFixed(3)})`;
          }

          ctx.fillText(col.chars[j], col.x, gy);
        }
        ctx.shadowBlur = 0;
      }

      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    rafId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
      window.cancelAnimationFrame(rafId);
    };
  }, [color, headColor, speed, density, fontSize, layers, charset]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-full w-full overflow-hidden ${className}`.trim()}
      style={style}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export default TerminalRain;
