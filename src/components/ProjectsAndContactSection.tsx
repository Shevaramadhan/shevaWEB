"use client";

import {
  Sparkles,
  Compass,
  ChartLine,
  Layers,
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const FEATURED_PROJECTS_EN = [
  {
    id: "si-academic",
    name: "UNAND Enterprise Information Portal",
    role: "Backend & Web Developer · 2026",
    headline:
      "Enterprise academic workflow & data management portal built for reliability.",
    description:
      "Engineered a structured web platform for managing academic workflows, role-based access control, and relational data reporting.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    icon: Compass,
    gradient: "from-blue-600/35 via-sky-500/15 to-indigo-900/40",
  },
  {
    id: "enterprise-api-service",
    name: "RESTful API & Service Architecture",
    role: "Backend Engineer · 2026",
    headline:
      "Modular backend service with authentication, validation, and database indexing.",
    description:
      "Designed and implemented clean REST API endpoints with Express, Node.js, and structured database schemas for high-consistency operations.",
    tags: ["Node.js", "Express.js", "MongoDB", "REST API"],
    icon: Sparkles,
    gradient: "from-sky-500/35 via-blue-600/20 to-slate-900/50",
  },
  {
    id: "inventory-analytics",
    name: "Enterprise Inventory & Reporting System",
    role: "System Analyst & Full-Stack Developer · 2025",
    headline:
      "End-to-end enterprise architecture & operational analytics dashboard.",
    description:
      "Information Systems project combining BPMN/UML enterprise modeling, normalized SQL schemas, and automated operational reporting.",
    tags: ["Enterprise Arch", "SQL", "TypeScript", "REST API"],
    icon: ChartLine,
    gradient: "from-indigo-600/35 via-blue-500/15 to-slate-900/50",
  },
  {
    id: "campus-event-hub",
    name: "Campus Workflow & Registration System",
    role: "Web Developer · 2025",
    headline:
      "Streamlining multi-faculty event registration and automated verification.",
    description:
      "Built the web application and backend verification endpoints to handle concurrent student registrations and attendance tracking.",
    tags: ["React", "Next.js", "Node.js", "SQL"],
    icon: Layers,
    gradient: "from-blue-500/35 via-cyan-500/15 to-indigo-950/50",
  },
];

const FEATURED_PROJECTS_ID = [
  {
    id: "si-academic",
    name: "Portal Informasi Enterprise UNAND",
    role: "Backend & Web Developer · 2026",
    headline:
      "Portal alur kerja akademik & manajemen data enterprise yang andal.",
    description:
      "Membangun platform web terstruktur untuk mengelola alur akademik, kontrol akses berbasis peran (RBAC), dan pelaporan data relasional.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    icon: Compass,
    gradient: "from-blue-600/35 via-sky-500/15 to-indigo-900/40",
  },
  {
    id: "enterprise-api-service",
    name: "Arsitektur Layanan & RESTful API",
    role: "Backend Engineer · 2026",
    headline:
      "Layanan backend modular dengan autentikasi, validasi, dan pengindeksan database.",
    description:
      "Merancang dan mengimplementasikan endpoint REST API menggunakan Express, Node.js, dan skema database terstruktur untuk konsistensi tinggi.",
    tags: ["Node.js", "Express.js", "MongoDB", "REST API"],
    icon: Sparkles,
    gradient: "from-sky-500/35 via-blue-600/20 to-slate-900/50",
  },
  {
    id: "inventory-analytics",
    name: "Sistem Inventaris & Pelaporan Enterprise",
    role: "System Analyst & Full-Stack Developer · 2025",
    headline:
      "Arsitektur enterprise terpadu & dashboard analitik operasional.",
    description:
      "Proyek Sistem Informasi yang memadukan pemodelan proses bisnis BPMN/UML, skema SQL ternormalisasi, dan pelaporan operasional otomatis.",
    tags: ["Enterprise Arch", "SQL", "TypeScript", "REST API"],
    icon: ChartLine,
    gradient: "from-indigo-600/35 via-blue-500/15 to-slate-900/50",
  },
  {
    id: "campus-event-hub",
    name: "Sistem Registrasi & Alur Kerja Kampus",
    role: "Web Developer · 2025",
    headline:
      "Menyederhanakan registrasi kegiatan lintas fakultas dan verifikasi otomatis.",
    description:
      "Membangun aplikasi web dan endpoint verifikasi backend untuk menangani pendaftaran mahasiswa secara paralel dan pencatatan kehadiran.",
    tags: ["React", "Next.js", "Node.js", "SQL"],
    icon: Layers,
    gradient: "from-blue-500/35 via-cyan-500/15 to-indigo-950/50",
  },
];

export function ProjectsSection() {
  const { lang } = useLanguage();
  const isId = lang === "id";
  const projects = isId ? FEATURED_PROJECTS_ID : FEATURED_PROJECTS_EN;

  return (
    <section id="projects" className="relative w-full py-24 sm:py-32">
      <div
        className="site-container mx-auto"
        style={{ width: "min(1200px, 88%)", marginInline: "auto" }}
      >
        {/* 02 · Featured Projects Heading */}
        <div className="mb-14">
          <p className="inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            <span className="inline-flex h-6 w-8 items-center justify-center rounded-md border border-blue-400/30 bg-blue-500/10 text-[11px] font-bold text-blue-300">
              02
            </span>
            <span>{isId ? "Proyek Pilihan" : "Featured Projects"}</span>
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold uppercase leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[3.35rem]">
            {isId ? (
              <>
                Karya pilihan yang dibangun dengan{" "}
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  struktur &amp; keandalan.
                </span>
              </>
            ) : (
              <>
                Selected work shaped with{" "}
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  clarity &amp; structure.
                </span>
              </>
            )}
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300/75 sm:text-[1.02rem]">
            {isId
              ? "Dari studi kasus Sistem Informasi hingga aplikasi web dan layanan backend yang saya rancang dan bangun."
              : "From Information Systems case studies to web applications and backend services I’ve designed and built."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <article
                key={project.id}
                className="group flex flex-col justify-between gap-5 rounded-[2rem] border border-white/10 bg-[#060f24]/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.4)] sm:p-5"
              >
                <div>
                  {/* Card Header */}
                  <header className="flex items-center justify-between px-1 pt-1 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-500/10 text-sky-300">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {project.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-400/50">
                        0{idx + 1}
                      </span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-blue-400/40 group-hover:text-sky-300">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </header>

                  {/* Mockup Preview Surface */}
                  <div
                    className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${project.gradient} p-5`}
                  >
                    <div className="flex h-full w-full flex-col justify-between rounded-xl border border-white/10 bg-[#040a18]/85 p-4 backdrop-blur-md transition-transform duration-500 group-hover:scale-[1.02]">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-blue-400" />
                          <span className="h-2 w-2 rounded-full bg-sky-300" />
                          <span className="h-2 w-2 rounded-full bg-indigo-400" />
                        </div>
                        <span className="font-mono text-[10px] text-blue-300/80">
                          sheva.dev/{project.id}
                        </span>
                      </div>
                      <div className="my-auto space-y-2 py-2">
                        <div className="h-2.5 w-2/3 rounded-full bg-gradient-to-r from-blue-400/50 to-sky-400/20" />
                        <div className="h-2 w-1/2 rounded-full bg-white/10" />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-blue-400/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="mt-4 flex flex-col gap-2 px-1">
                    <h3 className="text-lg font-semibold leading-snug text-white sm:text-xl">
                      {project.headline}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-300/75">
                      {project.description}
                    </p>
                  </div>
                </div>

                <p className="px-1 pt-1 font-mono text-xs font-medium text-blue-300/70">
                  {project.role}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const { lang } = useLanguage();
  const isId = lang === "id";

  return (
    <section
      id="contact"
      className="site-container mx-auto my-12 pb-20"
      style={{ width: "min(1200px, 88%)", marginInline: "auto" }}
    >
      <div className="mb-8">
        <p className="inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
          <span className="inline-flex h-6 w-8 items-center justify-center rounded-md border border-blue-400/30 bg-blue-500/10 text-[11px] font-bold text-blue-300">
            05
          </span>
          <span>{isId ? "Kontak" : "Contact"}</span>
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[2.2rem] border border-blue-400/30 bg-gradient-to-br from-[#081533] via-[#060e22] to-[#040917] p-2 shadow-[0_0_90px_-20px_rgba(37,99,235,0.5)]">
        <div className="relative grid gap-8 rounded-[1.8rem] border border-white/10 bg-[#050c1d]/80 p-7 backdrop-blur-xl sm:p-10 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1 text-xs font-medium text-sky-300">
              <MapPin className="h-3.5 w-3.5" />
              <span>Padang, Indonesia · Universitas Andalas</span>
            </span>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              {isId ? "Mari bangun sesuatu yang nyata." : "Let’s build something real."}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-slate-300/80">
              {isId
                ? "Saya selalu terbuka untuk berdiskusi mengenai peluang magang rekayasa perangkat lunak, proyek pengembangan web & backend, maupun kolaborasi sistem enterprise. Jangan ragu untuk menghubungi saya!"
                : "I’m always open to discussing software engineering internships, backend & web development projects, or enterprise system collaborations. Feel free to reach out!"}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href="mailto:sheva.ramdhan@student.unand.ac.id"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(37,99,235,0.6)] transition hover:bg-blue-500"
              >
                <Mail className="h-4 w-4" />
                <span>sheva.ramdhan@student.unand.ac.id</span>
              </a>
            </div>
          </div>

          {/* Right Social Box */}
          <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-white/10 bg-[#040917]/90 p-7 text-center">
            <div className="flex items-center gap-3">
              <a
                aria-label="Email Sheva"
                href="mailto:sheva.ramdhan@student.unand.ac.id"
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-blue-400/50 hover:bg-blue-600/20 hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                aria-label="GitHub Profile"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-blue-400/50 hover:bg-blue-600/20 hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                </svg>
              </a>
              <a
                aria-label="LinkedIn Profile"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-blue-400/50 hover:bg-blue-600/20 hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                </svg>
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                2026 © Sheva Ramdhan
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {isId
                  ? "Sistem Informasi · Universitas Andalas · Dibangun dengan Next.js"
                  : "Information Systems · Universitas Andalas · Built with Next.js"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
