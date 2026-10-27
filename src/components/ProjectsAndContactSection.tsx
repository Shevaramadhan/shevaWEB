"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import FadeContent from "./FadeContent";

interface ProjectEntry {
  id: string;
  name: string;
  role: string;
  architecture: string;
  headline: string;
  description: string;
  tags: string[];
}

const FEATURED_PROJECTS_EN: ProjectEntry[] = [
  {
    id: "si-academic",
    name: "UNAND Enterprise Information Portal",
    role: "Backend & Web Developer · 2026",
    architecture: "Next.js App Router → REST API → PostgreSQL",
    headline:
      "Academic workflow & role-based data management portal.",
    description:
      "Web platform built for managing academic workflows, role-based access control (RBAC), and structured relational data reporting.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    id: "enterprise-api-service",
    name: "RESTful API & Service Architecture",
    role: "Backend Engineer · 2026",
    architecture: "Client → JWT Auth & Validation → Express / MongoDB",
    headline:
      "Modular backend service with authentication, request validation, and indexing.",
    description:
      "Designed and implemented REST API endpoints with Express, Node.js, and structured database schemas for multi-role operations.",
    tags: ["Node.js", "Express.js", "MongoDB", "REST API"],
  },
  {
    id: "inventory-analytics",
    name: "Enterprise Inventory & Reporting System",
    role: "System Analyst & Full-Stack Developer · 2025",
    architecture: "BPMN / UML Blueprint → Normalized SQL → Web Dashboard",
    headline:
      "Enterprise architecture modeling & operational inventory dashboard.",
    description:
      "Information Systems project combining BPMN/UML process modeling, normalized SQL tables, and operational reporting.",
    tags: ["Enterprise Arch", "SQL", "TypeScript", "REST API"],
  },
  {
    id: "campus-event-hub",
    name: "Campus Workflow & Registration System",
    role: "Web Developer · 2025",
    architecture: "React Client → Verification Service → Relational DB",
    headline:
      "Multi-faculty event registration and attendance verification system.",
    description:
      "Web application and backend verification endpoints handling student registrations, quota checks, and attendance tracking.",
    tags: ["React", "Next.js", "Node.js", "SQL"],
  },
];

const FEATURED_PROJECTS_ID: ProjectEntry[] = [
  {
    id: "si-academic",
    name: "Portal Informasi Enterprise UNAND",
    role: "Backend & Web Developer · 2026",
    architecture: "Next.js App Router → REST API → PostgreSQL",
    headline:
      "Portal alur kerja akademik & manajemen akses data berbasis peran.",
    description:
      "Platform web untuk mengelola alur administrasi akademik, kontrol akses berbasis peran (RBAC), dan pelaporan data relasional.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    id: "enterprise-api-service",
    name: "Arsitektur Layanan & RESTful API",
    role: "Backend Engineer · 2026",
    architecture: "Client → JWT Auth & Validation → Express / MongoDB",
    headline:
      "Layanan backend modular dengan autentikasi, validasi request, dan indexing.",
    description:
      "Merancang dan mengimplementasikan endpoint REST API menggunakan Express, Node.js, dan skema database untuk kebutuhan multi-role.",
    tags: ["Node.js", "Express.js", "MongoDB", "REST API"],
  },
  {
    id: "inventory-analytics",
    name: "Sistem Inventaris & Pelaporan Enterprise",
    role: "System Analyst & Full-Stack Developer · 2025",
    architecture: "BPMN / UML Blueprint → Normalized SQL → Web Dashboard",
    headline:
      "Pemodelan arsitektur enterprise & dashboard operasional inventaris.",
    description:
      "Proyek Sistem Informasi yang memadukan pemodelan proses bisnis BPMN/UML, tabel SQL ternormalisasi, dan pelaporan operasional.",
    tags: ["Enterprise Arch", "SQL", "TypeScript", "REST API"],
  },
  {
    id: "campus-event-hub",
    name: "Sistem Registrasi & Alur Kerja Kampus",
    role: "Web Developer · 2025",
    architecture: "React Client → Verification Service → Relational DB",
    headline:
      "Sistem registrasi kegiatan lintas fakultas dan verifikasi kehadiran.",
    description:
      "Aplikasi web dan endpoint backend untuk menangani pendaftaran peserta, pengecekan kuota, dan pencatatan kehadiran.",
    tags: ["React", "Next.js", "Node.js", "SQL"],
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
        <FadeContent blur={true} duration={850} threshold={0.12} className="mb-14">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            02 / {isId ? "Proyek Pilihan" : "Selected Projects"}
          </p>

          <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {isId ? "Proyek & Studi Kasus" : "Projects & Case Studies"}
          </h2>
        </FadeContent>

        <FadeContent
          blur={true}
          duration={850}
          threshold={0.1}
          stagger={0.1}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {projects.map((project, idx) => (
            <article
              key={project.id}
              className="group flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-[#060f24]/80 p-6 transition-colors duration-200 hover:border-white/20 sm:p-7"
            >
              <div>
                <header className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-medium text-slate-400">
                      0{idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {project.name}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                </header>

                {/* Clean Technical Architecture Bar (Replaces Fake AI Skeleton Mockup) */}
                <div className="mt-4 rounded-xl border border-white/8 bg-[#040917]/90 px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                    {isId ? "Alur Arsitektur" : "Architecture Flow"}
                  </p>
                  <p className="mt-1 font-mono text-xs text-blue-300">
                    {project.architecture}
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
                    {project.headline}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300/80">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/8 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="font-mono text-xs text-slate-400">
                  {project.role}
                </p>
              </div>
            </article>
          ))}
        </FadeContent>
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
      <FadeContent blur={true} duration={850} threshold={0.12}>
        <div className="mb-8">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            05 / {isId ? "Kontak" : "Contact"}
          </p>
        </div>

        <div className="grid gap-8 rounded-2xl border border-white/10 bg-[#060f24]/85 p-7 sm:p-10 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-wider text-slate-400">
              Padang, Indonesia · Universitas Andalas
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {isId ? "Mari Terhubung" : "Get in Touch"}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-slate-300/80 sm:text-base">
              {isId
                ? "Terbuka untuk diskusi seputar magang software engineering, pengembangan web & backend, maupun kolaborasi sistem informasi."
                : "Open to discussing software engineering internships, web & backend development, or information systems collaborations."}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href="mailto:sheva.ramdhan@student.unand.ac.id"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                <Mail className="h-4 w-4" />
                <span>sheva.ramdhan@student.unand.ac.id</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-6 rounded-xl border border-white/10 bg-[#040917]/90 p-6 sm:items-center sm:text-center">
            <div className="flex items-center gap-3">
              <a
                aria-label="Email Sheva"
                href="mailto:sheva.ramdhan@student.unand.ac.id"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-white/25 hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                aria-label="GitHub Profile"
                href="https://github.com/Shevaramadhan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-white/25 hover:text-white"
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-white/25 hover:text-white"
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
                  ? "Sistem Informasi · Universitas Andalas"
                  : "Information Systems · Universitas Andalas"}
              </p>
            </div>
          </div>
        </div>
      </FadeContent>
    </section>
  );
}
