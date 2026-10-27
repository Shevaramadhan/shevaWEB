"use client";

import { useState, type CSSProperties } from "react";
import OrbitImages from "./OrbitImages";
import LogoLoop, { type LogoLoopItem } from "./LogoLoop";
import { useLanguage } from "@/context/LanguageContext";
import {
  CENTER_ORB_EMBLEM,
  ORBIT_INNER_ICONS,
  ORBIT_MIDDLE_ICONS,
  ORBIT_OUTER_ICONS,
  SKILL_BADGES_ROW_1,
  SKILL_BADGES_ROW_2,
  SKILL_MARQUEE_ROW_1,
  SKILL_MARQUEE_ROW_2,
  type SkillMarqueeItem,
} from "@/data/skillsAssets";

function buildLogoLoopItems(items: SkillMarqueeItem[]): LogoLoopItem[] {
  return items.map((item) => ({
    title: item.title,
    ariaLabel: item.title,
    node: (
      <div className="group/pill inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-[#071024]/90 px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-sky-400/50 hover:bg-[#0b1938] hover:shadow-[0_0_24px_rgba(37,99,235,0.35)]">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0e1b38] p-1">
          <img
            src={item.src}
            alt={item.alt}
            width={20}
            height={20}
            style={{
              width: "20px",
              height: "20px",
              objectFit: "contain",
              display: "block",
            }}
          />
        </span>
        <span className="text-sm font-semibold tracking-tight text-slate-100 group-hover/pill:text-white">
          {item.title}
        </span>
        {item.category && (
          <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-sky-300/90">
            {item.category}
          </span>
        )}
      </div>
    ),
  }));
}

const LOOP_ITEMS_ROW_1 = buildLogoLoopItems(SKILL_MARQUEE_ROW_1);
const LOOP_ITEMS_ROW_2 = buildLogoLoopItems(SKILL_MARQUEE_ROW_2);

const BADGE_CIRCLE_STYLE: CSSProperties = {
  width: "52px",
  height: "52px",
  minWidth: "52px",
  minHeight: "52px",
  borderRadius: "9999px",
  backgroundColor: "#0e172a",
  border: "1px solid rgba(59, 130, 246, 0.2)",
  boxShadow:
    "0 8px 24px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.06)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
  transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
};

export function SkillsSection() {
  const { lang } = useLanguage();
  const isId = lang === "id";
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden py-24 sm:py-32"
    >
      <div
        className="site-container mx-auto flex flex-col items-center"
        style={{ width: "min(1200px, 88%)", marginInline: "auto" }}
      >
        {/* 03 · Skills Section Kicker & Heading */}
        <div className="mb-12 w-full text-center">
          <p className="mb-3 inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            <span className="inline-flex h-6 w-8 items-center justify-center rounded-md border border-blue-400/30 bg-blue-500/10 text-[11px] font-bold text-blue-300">
              03
            </span>
            <span>{isId ? "Keahlian & Teknologi" : "Skills & Tech Stack"}</span>
          </p>
          <p className="text-base font-medium tracking-tight text-slate-200 sm:text-xl">
            {isId ? (
              <>
                Saat ini saya tertarik bergabung dengan tim{" "}
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text font-bold text-transparent">
                  lintas fungsi
                </span>
              </>
            ) : (
              <>
                I’m currently looking to join a{" "}
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text font-bold text-transparent">
                  cross-functional
                </span>{" "}
                team
              </>
            )}
          </p>
          <p className="mt-1.5 text-xs text-slate-400 sm:text-sm">
            {isId
              ? "yang mengutamakan pengembangan aplikasi web andal, layanan backend skalabel, & arsitektur enterprise"
              : "that values building reliable web applications, scalable backend services, & enterprise architecture"}
          </p>
        </div>

        {/* Main Figma Skills Stage */}
        <div className="relative flex w-full flex-col items-center">
          {/* TOP ROW 1: 7 Circular Tech Badges (loaded from /public/assets/skills/badges/) */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              position: "relative",
              zIndex: 20,
            }}
          >
            {SKILL_BADGES_ROW_1.map((item) => (
              <button
                key={item.name}
                type="button"
                aria-label={item.name}
                onMouseEnter={() => setHoveredSkill(item.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={BADGE_CIRCLE_STYLE}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  width={item.width ?? 26}
                  height={item.height ?? 26}
                  style={{
                    width: `${item.width ?? 26}px`,
                    height: `${item.height ?? 26}px`,
                    objectFit: "contain",
                    display: "block",
                    pointerEvents: "none",
                  }}
                />
              </button>
            ))}
          </div>

          {/* TOP ROW 2: 6 Circular Tech Badges (loaded from /public/assets/skills/badges/) */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              marginTop: "16px",
              position: "relative",
              zIndex: 20,
            }}
          >
            {SKILL_BADGES_ROW_2.map((item) => (
              <button
                key={item.name}
                type="button"
                aria-label={item.name}
                onMouseEnter={() => setHoveredSkill(item.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={BADGE_CIRCLE_STYLE}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  width={item.width ?? 26}
                  height={item.height ?? 26}
                  style={{
                    width: `${item.width ?? 26}px`,
                    height: `${item.height ?? 26}px`,
                    objectFit: "contain",
                    display: "block",
                    pointerEvents: "none",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Optional Tooltip Label */}
          <div style={{ height: "20px", marginTop: "6px", textAlign: "center" }}>
            {hoveredSkill && (
              <span className="inline-block rounded-full border border-blue-400/30 bg-blue-500/15 px-3 py-0.5 text-[11px] font-medium text-sky-300">
                {hoveredSkill}
              </span>
            )}
          </div>

          {/* CONVERGING CURVED BLUE LIGHT BEAMS (Figma Funnel Connector SVG) */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "460px",
              height: "210px",
              marginTop: "-10px",
              marginBottom: "-55px",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 460 210"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="skillBeam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.55" />
                  <stop offset="65%" stopColor="#2563eb" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.06" />
                </linearGradient>
              </defs>

              {/* 6 Symmetrical Funnel Bezier Curves from the 6 Row-2 Badges */}
              <path
                d="M 55 0 C 125 80, 198 140, 218 208"
                stroke="url(#skillBeam)"
                strokeWidth="1.2"
              />
              <path
                d="M 125 0 C 168 80, 210 145, 223 208"
                stroke="url(#skillBeam)"
                strokeWidth="1.2"
              />
              <path
                d="M 195 0 C 210 80, 222 145, 228 208"
                stroke="url(#skillBeam)"
                strokeWidth="1.2"
              />
              <path
                d="M 265 0 C 250 80, 238 145, 232 208"
                stroke="url(#skillBeam)"
                strokeWidth="1.2"
              />
              <path
                d="M 335 0 C 292 80, 250 145, 237 208"
                stroke="url(#skillBeam)"
                strokeWidth="1.2"
              />
              <path
                d="M 405 0 C 335 80, 262 140, 242 208"
                stroke="url(#skillBeam)"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          {/* BOTTOM 3-RING ELLIPTICAL ORBIT STAGE (<OrbitImages /> x 3 Layers) */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1200px",
              height: "320px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Deep Radial Cobalt Glow Behind the Center Sphere */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                width: "480px",
                height: "260px",
                borderRadius: "9999px",
                background:
                  "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.48) 0%, rgba(29, 78, 216, 0.22) 45%, rgba(3, 7, 18, 0) 75%)",
                filter: "blur(32px)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* RING 3 (Inner Elliptical Orbit) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                zIndex: 15,
              }}
            >
              <OrbitImages
                images={ORBIT_INNER_ICONS}
                shape="ellipse"
                baseWidth={1440}
                radiusX={455}
                radiusY={96}
                rotation={-2}
                duration={28}
                itemSize={26}
                width="100%"
                height={330}
                showPath={true}
                pathColor="rgba(59, 130, 246, 0.34)"
                pathWidth={1.3}
                depth={0.5}
                draggable={false}
              />
            </div>

            {/* RING 2 (Middle Elliptical Orbit) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                zIndex: 20,
              }}
            >
              <OrbitImages
                images={ORBIT_MIDDLE_ICONS}
                shape="ellipse"
                baseWidth={1440}
                radiusX={565}
                radiusY={120}
                rotation={1.5}
                duration={34}
                direction="reverse"
                itemSize={28}
                width="100%"
                height={330}
                showPath={true}
                pathColor="rgba(59, 130, 246, 0.42)"
                pathWidth={1.4}
                depth={0.55}
                draggable={false}
              />
            </div>

            {/* RING 1 (Outer Interactive Elliptical Orbit + Center Glowing Sphere) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "330px",
                zIndex: 25,
              }}
            >
              <OrbitImages
                images={ORBIT_OUTER_ICONS}
                shape="ellipse"
                baseWidth={1440}
                radiusX={675}
                radiusY={144}
                rotation={0}
                duration={42}
                itemSize={32}
                width="100%"
                height={330}
                showPath={true}
                pathColor="rgba(59, 130, 246, 0.52)"
                pathWidth={1.6}
                depth={0.55}
                hoverScale={1.2}
                draggable={true}
                clickToFront={true}
                centerContent={
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Curved Cradle Lines Under the Sphere (from Figma) */}
                    <svg
                      aria-hidden="true"
                      width="260"
                      height="210"
                      viewBox="0 0 260 210"
                      style={{
                        position: "absolute",
                        pointerEvents: "none",
                      }}
                    >
                      <path
                        d="M 22 90 Q 130 205 238 90"
                        fill="none"
                        stroke="rgba(59, 130, 246, 0.42)"
                        strokeWidth="1.3"
                      />
                      <path
                        d="M 38 110 Q 130 195 222 110"
                        fill="none"
                        stroke="rgba(96, 165, 250, 0.32)"
                        strokeWidth="1.2"
                      />
                    </svg>

                    {/* Central Glowing Blue Sphere with White Neon Emblem */}
                    <div
                      style={{
                        width: "156px",
                        height: "156px",
                        borderRadius: "9999px",
                        background:
                          "radial-gradient(circle at 50% 35%, #2563eb 0%, #1d4ed8 42%, #0f2152 100%)",
                        boxShadow:
                          "0 0 75px 15px rgba(37, 99, 235, 0.58), inset 0 2px 20px rgba(147, 197, 253, 0.45)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <img
                        src={CENTER_ORB_EMBLEM.src}
                        alt={CENTER_ORB_EMBLEM.alt}
                        width={84}
                        height={70}
                        style={{
                          width: "84px",
                          height: "70px",
                          objectFit: "contain",
                          filter:
                            "drop-shadow(0 0 12px rgba(255, 255, 255, 0.9))",
                        }}
                      />
                    </div>
                  </div>
                }
              />
            </div>
          </div>

          {/* REACT BITS <LogoLoop /> MARQUEE RIGHT BELOW SKILLS & TECH ORBIT */}
          <div className="mt-12 w-full space-y-4">
            <div className="mb-3 flex w-full items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                {isId
                  ? "Ekosistem Pengembangan · Geser atau arahkan kursor"
                  : "Development Ecosystem · Drag or hover to inspect"}
              </span>
              <span className="font-mono text-[11px] text-sky-400/80">
                {isId ? "Web · Backend · Enterprise" : "Web · Backend · Enterprise"}
              </span>
            </div>

            {/* Row 1: Drifting Left with Cursor Magnification & Scroll Boost */}
            <LogoLoop
              logos={LOOP_ITEMS_ROW_1}
              speed={48}
              direction="left"
              logoHeight={42}
              gap={14}
              pauseOnHover={true}
              hoverSpeed={10}
              fadeOut={true}
              fadeOutWidth={0.1}
              magnify={0.18}
              scrollBoost={0.35}
              draggable={true}
              ariaLabel="Primary Backend and Web Tech Stack"
            />

            {/* Row 2: Drifting Right with Cursor Magnification & Scroll Boost */}
            <LogoLoop
              logos={LOOP_ITEMS_ROW_2}
              speed={42}
              direction="right"
              logoHeight={42}
              gap={14}
              pauseOnHover={true}
              hoverSpeed={10}
              fadeOut={true}
              fadeOutWidth={0.1}
              magnify={0.18}
              scrollBoost={0.35}
              draggable={true}
              ariaLabel="Frontend, Systems, and Tooling Stack"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
