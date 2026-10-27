"use client";

import { useEffect, useMemo, useState } from "react";
import GooeyNav, { type GooeyNavItem } from "./GooeyNav";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const { lang, setLang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: (GooeyNavItem & { id: string })[] = useMemo(
    () =>
      lang === "id"
        ? [
            { id: "about", label: "Tentang", href: "#about" },
            { id: "work", label: "Karier", href: "#work" },
            { id: "projects", label: "Proyek", href: "#projects" },
            { id: "skills", label: "Keahlian", href: "#skills" },
            { id: "edu", label: "Pendidikan", href: "#edu" },
          ]
        : [
            { id: "about", label: "About", href: "#about" },
            { id: "work", label: "Work", href: "#work" },
            { id: "projects", label: "Projects", href: "#projects" },
            { id: "skills", label: "Skills", href: "#skills" },
            { id: "edu", label: "Edu", href: "#edu" },
          ],
    [lang]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      // Strict top-to-bottom sequential order matching Navbar tabs:
      // 0: About (#about) -> 1: Work (#work) -> 2: Projects (#projects) -> 3: Skills (#skills) -> 4: Edu (#edu)
      const sectionOrder = [
        { index: 0, el: document.getElementById("about") },
        { index: 1, el: document.getElementById("work") },
        { index: 2, el: document.getElementById("projects") },
        { index: 3, el: document.getElementById("skills") },
        { index: 4, el: document.getElementById("edu") },
      ];

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionOrder.length - 1; i >= 0; i--) {
        const item = sectionOrder[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveIndex(item.index);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[18px] z-50 flex justify-center px-4">
      <nav
        aria-label="Primary navigation"
        style={{
          padding: "7px 7px 7px 16px",
          gap: "6px",
          maxWidth: "calc(100vw - 32px)",
        }}
        className={`pointer-events-auto inline-flex items-center rounded-full border-[1.5px] backdrop-blur-[16px] transition-all duration-300 ${
          scrolled
            ? "border-blue-400/25 bg-[#070d1c]/80 shadow-[0_18px_50px_rgba(0,0,0,0.65)]"
            : "border-white/14 bg-[#070d1c]/75 shadow-[0_18px_50px_rgba(0,0,0,0.5)]"
        }`}
      >
        {/* Brand (Clean Typography SR. without icon logo) */}
        <a
          href="#about"
          aria-label="Back to top"
          onClick={() => {
            setActiveIndex(0);
            setMobileMenuOpen(false);
          }}
          className="group inline-flex min-h-[42px] items-center text-[1.1rem] font-extrabold tracking-[0.02em] text-white transition-colors hover:text-blue-400"
        >
          <span>S</span>
          <span
            className="text-transparent transition-all duration-200 group-hover:text-sky-400"
            style={{
              WebkitTextStroke: "1.5px #38bdf8",
            }}
          >
            R
          </span>
          <span className="ml-0.5 text-blue-500 transition-colors group-hover:text-sky-400">
            .
          </span>
        </a>

        {/* Desktop Nav Links with left border (nav-links: border-left 1.5px, margin-left 4px, padding-left 8px, gap 2px) */}
        <span className="ml-1 hidden items-center border-l-[1.5px] border-white/14 pl-2 md:inline-flex">
          <GooeyNav
            key={lang}
            items={navItems}
            activeIndex={activeIndex}
            onChange={(index) => setActiveIndex(index)}
            theme="dark"
            frame={false}
            size="sm"
            color="#2563eb"
            activeTextColor="#ffffff"
            colors={["#2563eb", "#38bdf8", "#60a5fa", "#1d4ed8"]}
            particleCount={15}
            animationTime={600}
            timeVariance={300}
            spread={52}
            gooeyness={0.55}
            wobble={0.55}
          />
        </span>

        {/* Language Toggle (lang-toggle: border 1.5px, padding 3px, font-size 0.74rem, button min-w 36px min-h 36px) */}
        <div
          role="group"
          aria-label="Language"
          style={{ padding: "3px" }}
          className="ml-1.5 inline-flex items-center rounded-full border-[1.5px] border-white/14 font-mono text-[0.74rem]"
        >
          <button
            type="button"
            lang="id"
            aria-pressed={lang === "id"}
            onClick={() => setLang("id")}
            className={`min-h-[36px] min-w-[36px] cursor-pointer rounded-full px-2 font-bold tracking-[0.06em] transition-all duration-200 ${
              lang === "id"
                ? "bg-blue-600 text-white shadow-[0_0_14px_rgba(37,99,235,0.65)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ID
          </button>
          <button
            type="button"
            lang="en"
            aria-pressed={lang === "en"}
            onClick={() => setLang("en")}
            className={`min-h-[36px] min-w-[36px] cursor-pointer rounded-full px-2 font-bold tracking-[0.06em] transition-all duration-200 ${
              lang === "en"
                ? "bg-blue-600 text-white shadow-[0_0_14px_rgba(37,99,235,0.65)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            EN
          </button>
        </div>

        {/* CTA Button (nav-cta: min-height 42px, padding 0 16px, font-size 0.84rem, font-weight 700, gap 6px) */}
        <a
          href="#contact"
          className="ml-1.5 hidden min-h-[42px] items-center gap-1.5 rounded-full bg-white px-4 text-[0.84rem] font-bold text-[#030712] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:text-white hover:shadow-[0_0_24px_rgba(37,99,235,0.65)] sm:inline-flex"
        >
          <span>{lang === "id" ? "Mari Terhubung" : "Let’s Connect"}</span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="h-[15px] w-[15px] fill-none stroke-current stroke-[2.2]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17 17 7M8 7h9v9"
            />
          </svg>
        </a>

        {/* Mobile Menu Button (nav-menu-btn: 42x42px circle) */}
        <button
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="ml-1 inline-grid h-[42px] w-[42px] cursor-pointer place-items-center rounded-full border-[1.5px] border-white/14 text-white transition-colors hover:border-blue-400/50 md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="h-5 w-5 fill-none stroke-current stroke-2"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="pointer-events-auto absolute inset-x-4 top-[calc(100%+10px)] grid gap-1 rounded-[24px] border-[1.5px] border-white/14 bg-[#070d1c]/95 p-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.65)] backdrop-blur-xl md:hidden"
        >
          {navItems.map((item, idx) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => {
                setActiveIndex(idx);
                setMobileMenuOpen(false);
              }}
              className={`inline-flex min-h-[46px] items-center rounded-2xl px-4 text-sm font-bold transition-colors ${
                activeIndex === idx
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-1 inline-flex min-h-[46px] items-center justify-between rounded-2xl bg-white px-4 text-sm font-bold text-[#030712]"
          >
            <span>{lang === "id" ? "Mari Terhubung" : "Let’s Connect"}</span>
            <span>↗</span>
          </a>
        </div>
      )}
    </header>
  );
}
