"use client";

import { useState, useRef } from "react";
import { Mail, ArrowRight, Check, Copy } from "lucide-react";
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
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 5;
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
          className="grid grid-cols-1 items-center gap-[clamp(24px,4vw,56px)] lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.78fr)]"
        >
          {/* Left Column: Clean Editorial Intro & CTAs */}
          <div className="flex flex-col gap-5">
            <p className="text-lg font-medium tracking-tight text-slate-300 sm:text-xl">
              {isId ? "Halo, saya" : "Hey, I’m"}{" "}
              <span className="font-semibold text-white">Sheva Ramdhan</span>
            </p>

            <h1 className="text-4xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-[3.85rem]">
              {isId ? (
                <>
                  <span className="block">Web &amp; Backend</span>
                  <span className="block text-[#93c5fd]">Developer</span>
                  <span className="block">&amp; Sistem Enterprise</span>
                </>
              ) : (
                <>
                  <span className="block">Web &amp; Backend</span>
                  <span className="block text-[#93c5fd]">Developer</span>
                  <span className="block">&amp; Enterprise Systems</span>
                </>
              )}
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-slate-300/80 sm:text-[1.08rem]">
              {isId ? (
                <>
                  Mahasiswa semester 5 Sistem Informasi di{" "}
                  <span className="font-medium text-white">
                    Universitas Andalas
                  </span>
                  . Fokus mengerjakan pengembangan aplikasi web, layanan backend,
                  dan perancangan arsitektur sistem informasi.
                </>
              ) : (
                <>
                  Fifth-semester Information Systems student at{" "}
                  <span className="font-medium text-white">
                    Universitas Andalas
                  </span>
                  , focusing on full-stack web applications, backend services,
                  and enterprise system architecture.
                </>
              )}
            </p>

            {/* CTA Buttons */}
            <div className="mt-2 flex flex-wrap items-center gap-3.5">
              {!showEmail ? (
                <button
                  type="button"
                  onClick={() => setShowEmail(true)}
                  className="inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-500"
                >
                  <Mail className="h-4 w-4" />
                  <span>{isId ? "Hubungi Saya" : "Contact"}</span>
                </button>
              ) : (
                <div className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 bg-[#081226] px-3.5 text-sm text-slate-100">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <a
                    href={`mailto:${email}`}
                    className="font-mono text-xs text-slate-100 underline-offset-4 hover:underline sm:text-sm"
                  >
                    {email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="ml-1 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              )}

              <a
                href="#work"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-6 text-sm font-medium text-slate-200 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
              >
                <span>{isId ? "Lihat Perjalanan" : "View My Journey"}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Pure Portrait Frame (No Cluttered Badges or Overlays) */}
          <div className="flex items-center justify-center">
            <div
              ref={cardRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: "transform 200ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className="group relative aspect-square w-full max-w-[400px] rounded-[28px] border border-white/12 bg-[#071126] p-2 shadow-[0_24px_70px_-15px_rgba(15,35,80,0.65)]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-[#050c1d]">
                <img
                  src="/assets/profile/sheva.png"
                  alt="Sheva Ramdhan"
                  className="h-full w-full scale-[1.15] object-cover object-[50%_42%] transition-transform duration-500 ease-out group-hover:scale-[1.19]"
                />
                {/* Soft subtle edge vignette only */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_48%,rgba(4,9,23,0.45)_100%)]"
                />
              </div>
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
