"use client";

import { useLanguage } from "@/context/LanguageContext";
import FadeContent from "./FadeContent";

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
    location: "Padang, West Sumatra",
    description:
      "Developing full-stack web applications and REST APIs with Next.js, Node.js, Express, and relational/NoSQL databases — focusing on authentication, request validation, and clean data modeling.",
    tags: ["Next.js", "Node.js", "Express.js", "REST API", "PostgreSQL / MongoDB"],
  },
  {
    year: "2025 - 2026",
    isCurrent: false,
    title: "Enterprise Architecture & System Analyst",
    company: "Department of Information Systems — Universitas Andalas",
    type: "Enterprise Systems",
    period: "Aug 2025 - Present",
    location: "Padang, West Sumatra",
    description:
      "Mapping business processes (BPMN & UML), designing enterprise architecture blueprints, and structuring normalized relational schemas for organizational information systems.",
    tags: ["Enterprise Architecture", "System Analysis", "BPMN / UML", "ERD Modeling"],
  },
  {
    year: "2024 - 2025",
    isCurrent: false,
    title: "Backend & Database Programming",
    company: "Faculty of Information Technology (FTI UNAND)",
    type: "Academic Foundation",
    period: "Aug 2024 - Jul 2025",
    location: "Padang, West Sumatra",
    description:
      "Built core backend logic, SQL queries, data structures, and object-oriented coursework applications with an emphasis on transactional consistency.",
    tags: ["C / C++", "JavaScript", "SQL", "Data Structures"],
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
    location: "Padang, Sumatera Barat",
    description:
      "Mengembangkan aplikasi web full-stack dan REST API menggunakan Next.js, Node.js, Express, serta database relasional/NoSQL — mencakup autentikasi, validasi request, dan struktur skema data.",
    tags: ["Next.js", "Node.js", "Express.js", "REST API", "PostgreSQL / MongoDB"],
  },
  {
    year: "2025 - 2026",
    isCurrent: false,
    title: "Enterprise Architecture & System Analyst",
    company: "Departemen Sistem Informasi — Universitas Andalas",
    type: "Sistem Enterprise",
    period: "Agu 2025 - Sekarang",
    location: "Padang, Sumatera Barat",
    description:
      "Memetakan alur proses bisnis (BPMN & UML), merancang arsitektur enterprise, serta menyusun skema database relasional terintegrasi untuk kebutuhan sistem informasi organisasi.",
    tags: ["Enterprise Architecture", "Analisis Sistem", "BPMN / UML", "Pemodelan ERD"],
  },
  {
    year: "2024 - 2025",
    isCurrent: false,
    title: "Pemrograman Backend & Basis Data",
    company: "Fakultas Teknologi Informasi (FTI UNAND)",
    type: "Fondasi Akademik",
    period: "Agu 2024 - Jul 2025",
    location: "Padang, Sumatera Barat",
    description:
      "Mengerjakan logika pemrograman backend, kueri SQL, struktur data, dan aplikasi berbasis objek pada perkuliahan inti Sistem Informasi.",
    tags: ["C / C++", "JavaScript", "SQL", "Struktur Data"],
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
        <FadeContent blur={true} duration={850} threshold={0.12} className="mb-14">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            01 / {isId ? "Pengalaman & Perjalanan" : "Experience & Journey"}
          </p>

          <h2
            id="experience-title"
            className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            {isId ? "Pengalaman & Fokus Teknis" : "Experience & Technical Track"}
          </h2>
        </FadeContent>

        {/* Clean Vertical Timeline */}
        <div
          className="relative grid gap-6 pl-8 sm:pl-10"
          style={{ position: "relative" }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "18px",
              bottom: "18px",
              left: "8px",
              width: "1px",
              backgroundColor: "rgba(148, 163, 184, 0.22)",
            }}
          />

          {items.map((item) => (
            <article key={item.title} className="relative">
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-29px",
                  top: "26px",
                  width: "11px",
                  height: "11px",
                  borderRadius: "9999px",
                  background: item.isCurrent ? "#3b82f6" : "#334155",
                  border: "2px solid #040917",
                }}
              />

              <div className="rounded-2xl border border-white/10 bg-[#060f24]/80 p-6 transition-colors duration-200 hover:border-white/20 sm:p-7">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-medium text-blue-300">
                    {item.year}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {item.type} · {item.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-300">
                  {item.company}
                </p>

                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300/80 sm:text-[0.96rem]">
                  {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-300"
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
      <FadeContent
        blur={true}
        duration={850}
        threshold={0.12}
        className="site-container mx-auto"
        style={{ width: "min(1200px, 88%)", marginInline: "auto" }}
      >
        <div className="mb-10">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            04 / {isId ? "Pendidikan" : "Education"}
          </p>
          <h2
            id="education-title"
            className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Universitas Andalas
          </h2>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-[#060f24]/80 p-7 sm:flex-row sm:items-center sm:p-9">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
              {isId
                ? "Sarjana (S1) · Fakultas Teknologi Informasi"
                : "Bachelor of Information Systems · Faculty of Information Technology"}
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {isId ? "Sistem Informasi" : "Information Systems"}
            </h3>
            <p className="mt-2 text-sm text-slate-300/80 sm:text-base">
              {isId
                ? "Fokus: Pengembangan Web, Rekayasa Backend & Arsitektur Enterprise"
                : "Focus: Web Development, Backend Engineering & Enterprise Architecture"}
            </p>
          </div>

          <div className="flex items-center gap-4 self-start sm:self-center">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-left sm:text-right">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-400">
                {isId ? "Status" : "Current"}
              </p>
              <p className="mt-0.5 font-mono text-lg font-bold text-white">
                Semester 5
              </p>
            </div>
          </div>
        </div>
      </FadeContent>
    </section>
  );
}
