"use client";

import { useEffect, useRef } from "react";
import { TerminalRain } from "./TerminalRain";

export function ShaderFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let pointerX = width * 0.65;
    let pointerY = height * 0.35;
    let targetX = pointerX;
    let targetY = pointerY;
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const render = () => {
      time += prefersReducedMotion ? 0 : 0.008;
      pointerX += (targetX - pointerX) * 0.05;
      pointerY += (targetY - pointerY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Primary Cobalt Flow Orb
      const orb1X = width * 0.7 + Math.sin(time * 1.1) * 90;
      const orb1Y = height * 0.28 + Math.cos(time * 0.9) * 60;
      const grad1 = ctx.createRadialGradient(
        orb1X,
        orb1Y,
        20,
        orb1X,
        orb1Y,
        Math.max(width, height) * 0.45
      );
      grad1.addColorStop(0, "rgba(37, 99, 235, 0.26)");
      grad1.addColorStop(0.5, "rgba(29, 78, 216, 0.10)");
      grad1.addColorStop(1, "rgba(3, 7, 18, 0)");

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Secondary Sky-Blue Flow Orb
      const orb2X = width * 0.25 + Math.cos(time * 0.8) * 110;
      const orb2Y = height * 0.65 + Math.sin(time * 1.2) * 75;
      const grad2 = ctx.createRadialGradient(
        orb2X,
        orb2Y,
        10,
        orb2X,
        orb2Y,
        Math.max(width, height) * 0.4
      );
      grad2.addColorStop(0, "rgba(56, 189, 248, 0.16)");
      grad2.addColorStop(0.55, "rgba(37, 99, 235, 0.06)");
      grad2.addColorStop(1, "rgba(3, 7, 18, 0)");

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Interactive Pointer Glow
      const pointerGrad = ctx.createRadialGradient(
        pointerX,
        pointerY,
        0,
        pointerX,
        pointerY,
        360
      );
      pointerGrad.addColorStop(0, "rgba(59, 130, 246, 0.13)");
      pointerGrad.addColorStop(0.5, "rgba(37, 99, 235, 0.04)");
      pointerGrad.addColorStop(1, "rgba(3, 7, 18, 0)");

      ctx.fillStyle = pointerGrad;
      ctx.fillRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <canvas ref={canvasRef} className="h-full w-full opacity-85" />
      {/* Subtle Layered <TerminalRain /> Background (Opsi B: Cobalt/Sky-Blue) */}
      <div className="absolute inset-0 opacity-[0.18]">
        <TerminalRain
          color="#3b82f6"
          headColor="#e0f2fe"
          speed={0.75}
          density={0.65}
          fontSize={13}
          layers={3}
        />
      </div>
      {/* Subtle architectural grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #60a5fa 1px, transparent 1px), linear-gradient(to bottom, #60a5fa 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Top radial vignette */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-950/25 via-transparent to-transparent" />
    </div>
  );
}

