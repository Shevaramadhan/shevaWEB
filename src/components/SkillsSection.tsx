"use client";

import { useState, type CSSProperties } from "react";
import OrbitImages from "./OrbitImages";
import LogoLoop, { type LogoLoopItem } from "./LogoLoop";
import ElectricLogo from "./ElectricLogo";
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
      <div className="inline-flex items-center gap-3 border border-[#1f2c44] bg-[#0b101b] px-4 py-2.5 transition-colors duration-200 hover:border-[#3b82f6] hover:bg-[#10192b]">
        <span className="flex h-6 w-6 items-center justify-center">
          <img
            src={item.src}
            alt={item.alt}
            width={18}
            height={18}
            style={{
              width: "18px",
              height: "18px",
              objectFit: "contain",
              display: "block",
            }}
          />
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-[#f2efeb]">
          {item.title}
        </span>
        {item.category && (
          <span className="border-l border-[#24324d] pl-2.5 text-[9px] font-semibold uppercase tracking-widest text-[#3b82f6]">
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
  width: "50px",
  height: "50px",
  minWidth: "50px",
  minHeight: "50px",
  borderRadius: "9999px",
  backgroundColor: "#0c1220",
  border: "1px solid #223252",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.65)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
  transition: "transform 0.25s ease, border-color 0.25s ease",
};

export function SkillsSection() {
  const { lang } = useLanguage();
  const isId = lang === "id";
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="section-wrap relative overflow-hidden">
      {/* Editorial Section Heading matching prompt.md */}
      <div className="section-heading">
        <div>
          <span className="eyebrow">02 / TECHNICAL ECOSYSTEM</span>
          <h2>
            {isId ? "KEAHLIAN & TEKNOLOGI" : "SKILLS & TECH STACK"}
            <span className="accent">.</span>
          </h2>
        </div>
        <span className="eyebrow muted">
          {isId
            ? "WEB · BACKEND · ENTERPRISE SYSTEMS"
            : "WEB · BACKEND · ENTERPRISE SYSTEMS"}
        </span>
      </div>

      {/* Main Skills Stage */}
      <div className="relative mt-10 flex w-full flex-col items-center">
        {/* TOP ROW 1: 7 Circular Tech Badges */}
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
                width={item.width ?? 24}
                height={item.height ?? 24}
                style={{
                  width: `${item.width ?? 24}px`,
                  height: `${item.height ?? 24}px`,
                  objectFit: "contain",
                  display: "block",
                  pointerEvents: "none",
                }}
              />
            </button>
          ))}
        </div>

        {/* TOP ROW 2: 6 Circular Tech Badges */}
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
                width={item.width ?? 24}
                height={item.height ?? 24}
                style={{
                  width: `${item.width ?? 24}px`,
                  height: `${item.height ?? 24}px`,
                  objectFit: "contain",
                  display: "block",
                  pointerEvents: "none",
                }}
              />
            </button>
          ))}
        </div>

        {/* Hover Label */}
        <div style={{ height: "22px", marginTop: "8px", textAlign: "center" }}>
          {hoveredSkill && (
            <span className="eyebrow accent">{hoveredSkill}</span>
          )}
        </div>

        {/* CONVERGING CURVED BLUE LIGHT BEAMS */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "460px",
            height: "200px",
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

        {/* BOTTOM 3-RING ELLIPTICAL ORBIT STAGE (<OrbitImages /> + <ElectricLogo /> SR) */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1280px",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "480px",
              height: "260px",
              borderRadius: "9999px",
              background:
                "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.42) 0%, rgba(29, 78, 216, 0.18) 45%, rgba(7, 9, 14, 0) 75%)",
              filter: "blur(32px)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* RING 3 (Inner) */}
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

          {/* RING 2 (Middle) */}
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

          {/* RING 1 (Outer + Center Sphere with ElectricLogo SR) */}
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

                  <div
                    title={CENTER_ORB_EMBLEM.alt}
                    style={{
                      width: "164px",
                      height: "164px",
                      borderRadius: "9999px",
                      background:
                        "radial-gradient(circle at 50% 35%, #2563eb 0%, #1d4ed8 42%, #0f2152 100%)",
                      boxShadow:
                        "0 0 75px 15px rgba(37, 99, 235, 0.58), inset 0 2px 20px rgba(147, 197, 253, 0.45)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    <ElectricLogo
                      src={CENTER_ORB_EMBLEM.src}
                      color="#ffffff"
                      glowColor="#38bdf8"
                      scale={0.62}
                      intensity={1.25}
                      glow={1.15}
                      thickness={1.55}
                      strands={4}
                      bend={0.55}
                      crackle={1.35}
                      arcs={1.25}
                      flicker={0.45}
                      fill={0.32}
                      speed={2.1}
                      interactive={true}
                      cursorIntensity={1.6}
                      cursorRadius={110}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "9999px",
                      }}
                    />
                  </div>
                </div>
              }
            />
          </div>
        </div>

        {/* EDITORIAL <LogoLoop /> MARQUEE STRIP */}
        <div className="mt-10 w-full border-t border-[#1c2536] pt-7">
          <div className="mb-4 flex w-full items-center justify-between">
            <span className="eyebrow muted">
              {isId
                ? "CORE DEVELOPMENT STACK · DRAG OR HOVER"
                : "CORE DEVELOPMENT STACK · DRAG OR HOVER"}
            </span>
            <span className="eyebrow accent">13+ TECHNOLOGIES</span>
          </div>

          <div className="space-y-3">
            <LogoLoop
              logos={LOOP_ITEMS_ROW_1}
              speed={46}
              direction="left"
              logoHeight={40}
              gap={14}
              pauseOnHover={true}
              hoverSpeed={10}
              fadeOut={true}
              fadeOutWidth={0.1}
              magnify={0.14}
              scrollBoost={0.3}
              draggable={true}
              ariaLabel="Primary Backend and Web Tech Stack"
            />

            <LogoLoop
              logos={LOOP_ITEMS_ROW_2}
              speed={40}
              direction="right"
              logoHeight={40}
              gap={14}
              pauseOnHover={true}
              hoverSpeed={10}
              fadeOut={true}
              fadeOutWidth={0.1}
              magnify={0.14}
              scrollBoost={0.3}
              draggable={true}
              ariaLabel="Frontend, Systems, and Tooling Stack"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
