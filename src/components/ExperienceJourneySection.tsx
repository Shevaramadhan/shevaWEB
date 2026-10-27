"use client";

import type { CSSProperties } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface ExperienceEntry {
  year: string;
  isCurrent?: boolean;
  title: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
}

const EXPERIENCE_ITEMS_EN: ExperienceEntry[] = [
  {
    year: "2026 - Present",
    isCurrent: true,
    title: "Web & Backend Developer",
    company: "Independent & Academic Software Engineering Projects",
    type: "Web & Backend",
    period: "2026 - Present",
    location: "Padang, West Sumatra · Hybrid",
    description:
      "Architecting and developing full-stack web applications and RESTful backend services using Next.js, Node.js, Express, and relational/NoSQL databases — focusing on API reliability, authentication flows, and scalable data models.",
    tags: ["Next.js", "Node.js", "Express.js", "REST API", "PostgreSQL / MongoDB"],
  },
  {
    year: "2025 - 2026",
    isCurrent: false,
    title: "Enterprise Architecture & System Analyst",
    company: "Department of Information Systems — Universitas Andalas",
    type: "Enterprise Systems",
    period: "Aug 2025 - Present",
    location: "Padang, West Sumatra · On-site",
    description:
      "Designing enterprise architecture blueprints, business process workflows (BPMN & UML), and integrated database schemas to align organizational operations with structured enterprise information systems.",
    tags: ["Enterprise Architecture", "System Analysis", "BPMN / UML", "ERD Modeling"],
  },
  {
    year: "2024 - 2025",
    isCurrent: false,
    title: "Backend & Database Programming",
    company: "Faculty of Information Technology (FTI UNAND)",
    type: "Academic Foundation",
    period: "Aug 2024 - Jul 2025",
    location: "Padang, West Sumatra · On-site",
    description:
      "Built foundational backend services, structured SQL queries, algorithms, and object-oriented applications supporting transactional integrity and structured reporting.",
    tags: ["C / C++", "JavaScript", "SQL", "Data Structures", "Backend Logic"],
  },
];

const EXPERIENCE_ITEMS_ID: ExperienceEntry[] = [
  {
    year: "2026 - Sekarang",
    isCurrent: true,
    title: "Web & Backend Developer",
    company: "Proyek Rekayasa Perangkat Lunak Akademik & Mandiri",
    type: "Web & Backend",
    period: "2026 - Sekarang",
    location: "Padang, Sumatera Barat · Hibrida",
    description:
      "Merancang dan mengembangkan aplikasi web full-stack serta layanan backend RESTful menggunakan Next.js, Node.js, Express, dan database relasional/NoSQL — berfokus pada keandalan API, alur autentikasi, dan pemodelan data yang skalabel.",
    tags: ["Next.js", "Node.js", "Express.js", "REST API", "PostgreSQL / MongoDB"],
  },
  {
    year: "2025 - 2026",
    isCurrent: false,
    title: "Enterprise Architecture & System Analyst",
    company: "Departemen Sistem Informasi — Universitas Andalas",
    type: "Sistem Enterprise",
    period: "Agu 2025 - Sekarang",
    location: "Padang, Sumatera Barat · Di lokasi",
    description:
      "Merancang cetak biru arsitektur enterprise, pemodelan proses bisnis (BPMN & UML), serta skema basis data terintegrasi untuk menyelaraskan operasional organisasi dengan sistem informasi enterprise.",
    tags: ["Enterprise Architecture", "Analisis Sistem", "BPMN / UML", "Pemodelan ERD"],
  },
  {
    year: "2024 - 2025",
    isCurrent: false,
    title: "Pemrograman Backend & Basis Data",
    company: "Fakultas Teknologi Informasi (FTI UNAND)",
    type: "Fondasi Akademik",
    period: "Agu 2024 - Jul 2025",
    location: "Padang, Sumatera Barat · Di lokasi",
    description:
      "Membangun fondasi layanan backend, kueri SQL terstruktur, algoritma, dan pemrograman berorientasi objek yang mendukung integritas transaksi dan pelaporan data.",
    tags: ["C / C++", "JavaScript", "SQL", "Struktur Data", "Logika Backend"],
  },
];

export function ExperienceJourneySection() {
  const { lang } = useLanguage();
  const isId = lang === "id";
  const items = isId ? EXPERIENCE_ITEMS_ID : EXPERIENCE_ITEMS_EN;

  return (
    <section
      id="work"
      aria-labelledby="experience-title"
      className="relative w-full py-24 sm:py-32"
    >
      <div
        className="site-container mx-auto"
        style={{ width: "min(1200px, 88%)", marginInline: "auto" }}
      >
        {/* Section Heading (01 · Experience & Journey) */}
        <div className="mb-14">
          <p className="inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            <span className="inline-flex h-6 w-8 items-center justify-center rounded-md border border-blue-400/30 bg-blue-500/10 text-[11px] font-bold text-blue-300">
              01
            </span>
            <span>
              {isId ? "Pengalaman & Perjalanan" : "Experience & Journey"}
            </span>
          </p>

          <h2
            id="experience-title"
            className="mt-4 max-w-3xl text-3xl font-extrabold uppercase leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[3.35rem]"
          >
            {isId ? (
              <>
                Membangun sistem web &amp;{" "}
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  enterprise yang skalabel.
                </span>
              </>
            ) : (
              <>
                Building scalable web &amp;{" "}
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  enterprise systems.
                </span>
              </>
            )}
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300/75 sm:text-[1.02rem]">
            {isId
              ? "Perjalanan melalui rekayasa perangkat lunak, pengembangan backend, dan arsitektur enterprise — membangun solusi digital yang terstruktur dan andal melalui studi kasus akademik maupun nyata."
              : "A journey through software engineering, backend development, and enterprise architecture — building structured, reliable digital solutions across academic and real-world case studies."}
          </p>
        </div>

        {/* Timeline Container (.timeline with vertical gradient axis on the left) */}
        <div
          className="relative grid gap-6 pl-8 sm:pl-10"
          style={{ position: "relative" }}
        >
          {/* Background Track Line */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "18px",
              bottom: "18px",
              left: "8px",
              width: "2px",
              borderRadius: "2px",
              backgroundColor: "rgba(148, 163, 184, 0.16)",
            }}
          />
          {/* Glowing Blue-to-Indigo Vertical Axis (.timeline-axis) */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "18px",
              bottom: "18px",
              left: "8px",
              width: "2px",
              borderRadius: "2px",
              background:
                "linear-gradient(180deg, #38bdf8 0%, #2563eb 52%, #6366f1 100%)",
              boxShadow: "0 0 14px rgba(56, 189, 248, 0.55)",
            }}
          />

          {items.map((item, idx) => (
            <article
              key={item.title}
              className="exp-timeline-card group relative grid grid-cols-1 gap-4 rounded-[24px] border border-white/10 bg-[#081226]/85 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-[0_26px_62px_rgba(0,0,0,0.65),0_0_0_1px_rgba(56,189,248,0.22)] sm:p-8 md:grid-cols-[165px_minmax(0,1fr)] md:gap-8"
            >
              {/* Glowing Timeline Node Dot on the Left Axis (.timeline-node) */}
              <span
                aria-hidden="true"
                className="transition-all duration-300 group-hover:scale-125"
                style={
                  {
                    position: "absolute",
                    top: "38px",
                    left: "-31px",
                    width: "13px",
                    height: "13px",
                    borderRadius: "9999px",
                    backgroundColor: idx === 0 ? "#38bdf8" : "#2563eb",
                    boxShadow:
                      idx === 0
                        ? "0 0 0 4px #030712, 0 0 18px rgba(56, 189, 248, 0.9)"
                        : "0 0 0 4px #030712, 0 0 14px rgba(37, 99, 235, 0.75)",
                  } as CSSProperties
                }
              />

              {/* Left Column inside Card: Year & Current Badge (.exp-when) */}
              <div className="flex flex-row items-center justify-between gap-2.5 pt-0.5 md:flex-col md:items-start md:justify-start">
                <span className="text-lg font-bold leading-tight tracking-tight text-white sm:text-[1.18rem]">
                  {item.year}
                </span>

                {item.isCurrent && (
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/45 bg-sky-400/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-sky-300">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 animate-pulse rounded-full bg-sky-400 shadow-[0_0_0_3px_rgba(56,189,248,0.25)]"
                    />
                    <span>{isId ? "Saat Ini" : "Current"}</span>
                  </span>
                )}
              </div>

              {/* Right Column inside Card: Role, Company, Meta & Description (.timeline-body) */}
              <div className="flex flex-col">
                <h3 className="text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-1 text-base font-semibold text-slate-200/90">
                  {item.company}
                </p>

                {/* Monospace Metadata Row (.exp-meta) */}
                <p className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs text-slate-400">
                  <span className="font-semibold text-sky-400">{item.type}</span>
                  <span aria-hidden="true" className="opacity-50">
                    ·
                  </span>
                  <time>{item.period}</time>
                  <span aria-hidden="true" className="opacity-50">
                    ·
                  </span>
                  <span>{item.location}</span>
                </p>

                {/* Description (.exp-desc) */}
                <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-300/80 sm:text-[1rem]">
                  {item.description}
                </p>

                {/* Tech / Domain Pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EducationSection() {
  const { lang } = useLanguage();
  const isId = lang === "id";

  return (
    <section
      id="edu"
      aria-labelledby="education-title"
      className="relative w-full py-20 sm:py-28"
    >
      <div
        className="site-container mx-auto"
        style={{ width: "min(1200px, 88%)", marginInline: "auto" }}
      >
        <div className="mb-10">
          <p className="inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            <span className="inline-flex h-6 w-8 items-center justify-center rounded-md border border-blue-400/30 bg-blue-500/10 text-[11px] font-bold text-blue-300">
              04
            </span>
            <span>{isId ? "Pendidikan" : "Education"}</span>
          </p>
          <h2
            id="education-title"
            className="mt-3 text-3xl font-extrabold uppercase leading-[1.06] tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {isId ? (
              <>
                Fondasi akademik,{" "}
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  fokus sistem praktis.
                </span>
              </>
            ) : (
              <>
                Academic foundation,{" "}
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  practical system focus.
                </span>
              </>
            )}
          </h2>
        </div>

        {/* Education Panel Card */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-[26px] border border-blue-400/25 bg-gradient-to-r from-[#081530]/90 via-[#071126]/90 to-[#0a1938]/90 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-sky-400">
              {isId
                ? "Studi Sarjana (S1) · Universitas Andalas"
                : "Undergraduate Study · Universitas Andalas"}
            </p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {isId ? "Sistem Informasi" : "Information Systems"}
            </h3>
            <p className="mt-2 text-sm text-slate-300/80 sm:text-base">
              {isId
                ? "Fokus: Pengembangan Web, Rekayasa Backend & Arsitektur Enterprise"
                : "Focus: Web Development, Backend Engineering & Enterprise Architecture"}
            </p>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-center">
            <span
              aria-label="Semester 5"
              className="rounded-2xl border border-blue-400/35 bg-blue-600/20 px-6 py-3 text-center font-mono text-2xl font-black uppercase leading-none tracking-wider text-sky-300 shadow-[0_0_30px_rgba(37,99,235,0.35)] sm:text-3xl"
            >
              Sem
              <br />
              05
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
