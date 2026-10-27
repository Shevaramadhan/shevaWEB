"use client";

import { useState, useRef } from "react";
import {
  Mail,
  ArrowRight,
  Check,
  Copy,
  Sparkles,
  GraduationCap,
  Server,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import FadeContent from "./FadeContent";

export function HeroSection() {
  const { lang } = useLanguage();
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50,
  });

  const email = "sheva.ramdhan@student.unand.ac.id";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 7;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 7;
    setTilt({ rotateX, rotateY, glowX: pctX, glowY: pctY });
  };

  const handlePointerLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  };

  const isId = lang === "id";

  return (
    <section
      id="about"
      style={{
        paddingTop: "clamp(120px, 16vh, 170px)",
        paddingBottom: "clamp(40px, 7vh, 80px)",
      }}
      className="relative flex min-h-[100dvh] w-full flex-col justify-center"
    >
      <div
        className="site-container mx-auto"
        style={{ width: "min(1200px, 88%)", marginInline: "auto" }}
      >
        <FadeContent
          blur={true}
          duration={900}
          threshold={0.1}
          stagger={0.12}
          className="grid grid-cols-1 items-center gap-[clamp(20px,4vw,56px)] lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.78fr)]"
        >
          {/* Left Column: Intro & CTAs */}
          <div className="flex flex-col gap-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              <span>
                {isId
                  ? "Universitas Andalas · Sistem Informasi (Sem 5)"
                  : "Universitas Andalas · Information Systems (Sem 5)"}
              </span>
            </div>

            <p className="text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
              {isId ? "Halo" : "Hey"}{" "}
              <span aria-hidden="true" className="inline-block animate-bounce">
                👋
              </span>
              , {isId ? "saya" : "I’m"}{" "}
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text font-semibold text-transparent">
                Sheva Ramdhan
              </span>
            </p>

            <h1 className="text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[3.85rem]">
              {isId ? (
                <>
                  <span className="block">Pengembang Web</span>
                  <span className="block">
                    &amp; Backend serta{" "}
                    <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                      Sistem
                    </span>
                  </span>
                  <span className="block">Enterprise</span>
                </>
              ) : (
                <>
                  <span className="block">Web &amp; Backend</span>
                  <span className="block">
                    Developer &amp;{" "}
                    <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                      Enterprise
                    </span>
                  </span>
                  <span className="block">System Enthusiast</span>
                </>
              )}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-300/80 sm:text-lg lg:text-[1.12rem]">
              {isId ? (
                <>
                  Mahasiswa semester 5 Sistem Informasi di{" "}
                  <span className="font-medium text-slate-100">
                    Universitas Andalas
                  </span>{" "}
                  yang berfokus pada pengembangan web full-stack, rekayasa
                  backend, dan arsitektur enterprise untuk membangun sistem
                  digital yang terstruktur dan andal.
                </>
              ) : (
                <>
                  Fifth-semester Information Systems student at{" "}
                  <span className="font-medium text-slate-100">
                    Universitas Andalas
                  </span>
                  , focused on full-stack web development, backend engineering,
                  and enterprise architecture to build reliable, structured
                  digital systems.
                </>
              )}
            </p>

            {/* CTA Buttons */}
            <div className="mt-2 flex flex-wrap items-center gap-3.5">
              {!showEmail ? (
                <button
                  type="button"
                  onClick={() => setShowEmail(true)}
                  className="group relative inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(56,189,248,0.65)]"
                >
                  <Mail className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span>{isId ? "Hubungi Saya" : "Contact"}</span>
                </button>
              ) : (
                <div className="inline-flex h-12 items-center gap-2 rounded-xl border border-blue-400/35 bg-blue-950/70 px-3.5 text-sm text-blue-100 shadow-[0_0_25px_rgba(37,99,235,0.35)] backdrop-blur-md">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="font-mono text-xs sm:text-sm">{email}</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="ml-1 inline-flex items-center gap-1 rounded-lg bg-blue-600/80 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-blue-500"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-300" />
                        <span>{isId ? "Tersalin" : "Copied"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>{isId ? "Salin" : "Copy"}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <a
                href="#work"
                className="group inline-flex h-12 items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-6 text-sm font-semibold text-slate-100 backdrop-blur-md transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white"
              >
                <span>{isId ? "Lihat Perjalanan" : "View My Journey"}</span>
                <ArrowRight className="h-4 w-4 text-blue-400 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Quick Highlights */}
            <div className="mt-4 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">
                  Semester
                </p>
                <p className="mt-0.5 text-lg font-bold text-white sm:text-xl">
                  {isId ? "Sem 5" : "5th Sem"}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">
                  {isId ? "Program Studi" : "Major"}
                </p>
                <p className="mt-0.5 text-lg font-bold text-blue-400 sm:text-xl">
                  {isId ? "Sistem Informasi" : "Info Systems"}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">
                  {isId ? "Fokus" : "Focus"}
                </p>
                <p className="mt-0.5 text-lg font-bold text-sky-300 sm:text-xl">
                  Web &amp; Backend
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: PortraitMorph Card with Blue-Flow Glow */}
          <div className="flex items-center justify-center">
            <div
              ref={cardRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className="group relative aspect-square w-full max-w-[420px] rounded-[2rem] border border-blue-400/25 bg-[#071126]/80 p-2.5 shadow-[0_0_80px_-15px_rgba(37,99,235,0.55)] backdrop-blur-xl"
            >
              {/* Blue-flow ambient glow behind portrait */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-blue-600/35 via-sky-500/20 to-indigo-600/30 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />

              {/* Inner Portrait Frame */}
              <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.6rem] border border-white/10 bg-gradient-to-b from-[#0b1938] via-[#071024] to-[#040917] p-6">
                {/* Pointer-following spotlight inside portrait */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(320px circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(56, 189, 248, 0.24), rgba(37, 99, 235, 0.08) 45%, transparent 80%)`,
                  }}
                />

                {/* Top Card Header */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/25 bg-blue-950/70 px-3 py-1 text-xs font-medium text-blue-200 backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                    <span>SHEVA.DEV</span>
                  </span>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                    {isId ? "Terbuka untuk Magang" : "Open to Internship"}
                  </span>
                </div>

                {/* Center Stylized Portrait / Avatar Visual */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4">
                  <div className="relative flex h-44 w-44 items-center justify-center">
                    <div className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-blue-400/30" />
                    <div className="absolute -inset-3 animate-[pulse_4s_ease-in-out_infinite] rounded-full border border-sky-400/15" />
                    <div className="relative flex h-36 w-36 flex-col items-center justify-center overflow-hidden rounded-full border-2 border-blue-400/50 bg-gradient-to-br from-blue-600/40 via-indigo-900/60 to-slate-950 shadow-[0_0_45px_rgba(37,99,235,0.6)] transition-transform duration-500 group-hover:scale-105">
                      <span className="bg-gradient-to-b from-white via-blue-100 to-blue-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
                        SR
                      </span>
                      <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-blue-300/90">
                        Sheva Ramdhan
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Floating Info Pill inside Portrait Card */}
                <div className="relative z-10 flex items-center justify-between rounded-2xl border border-white/10 bg-[#050c1d]/85 px-4 py-3 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/25 text-blue-400">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        Universitas Andalas
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {isId
                          ? "Backend & Arsitektur Enterprise"
                          : "Backend & Enterprise Arch"}
                      </p>
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-sky-300">
                    <Server className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
