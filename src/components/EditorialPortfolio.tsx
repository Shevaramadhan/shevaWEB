"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Play,
  Pause,
  X,
  Menu,
  Mail,
  MapPin,
  Search,
  Plus,
  Minus,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SkillsSection } from "./SkillsSection";

const MotionContext = createContext(true);
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  year: string;
  role: string;
  type: "fullstack" | "backend" | "enterprise" | "database";
  architecture: string;
  stack: string[];
  descriptionId: string;
  descriptionEn: string;
  highlightsId: string[];
  highlightsEn: string[];
  repoUrl?: string;
}

const ARCHIVE_PROJECTS: PortfolioProject[] = [
  {
    id: "unand-enterprise-portal",
    title: "UNAND ENTERPRISE PORTAL",
    category: "Full-Stack Web",
    year: "2026",
    role: "Backend & Web Developer",
    type: "fullstack",
    architecture: "NEXT.JS APP ROUTER → REST API → POSTGRESQL",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    descriptionId:
      "Platform web terstruktur untuk mengelola alur kerja akademik, kontrol akses berbasis peran (RBAC), serta pelaporan data relasional secara terpusat.",
    descriptionEn:
      "Structured web platform built to manage academic workflows, role-based access control (RBAC), and centralized relational data reporting.",
    highlightsId: [
      "Autentikasi & otorisasi multi-peran (RBAC)",
      "Skema database relasional ternormalisasi",
      "Dashboard pelaporan operasional real-time",
    ],
    highlightsEn: [
      "Multi-role authentication & RBAC authorization",
      "Normalized relational database schema",
      "Real-time operational reporting dashboard",
    ],
    repoUrl: "https://github.com/Shevaramadhan",
  },
  {
    id: "restful-service-arch",
    title: "MODULAR REST API ENGINE",
    category: "Backend API",
    year: "2026",
    role: "Backend Engineer",
    type: "backend",
    architecture: "CLIENT → JWT AUTH & VALIDATOR → EXPRESS / MONGODB",
    stack: ["Node.js", "Express.js", "MongoDB", "JWT Auth"],
    descriptionId:
      "Arsitektur layanan backend modular dengan autentikasi token JWT, validasi payload berlapis, rate-limiting, dan pengindeksan kueri database.",
    descriptionEn:
      "Modular backend service architecture featuring JWT token authentication, layered payload validation, rate-limiting, and database indexing.",
    highlightsId: [
      "Struktur Controller–Service–Repository",
      "Middleware validasi skema & penanganan error terpusat",
      "Optimasi indeks koleksi untuk respons latensi rendah",
    ],
    highlightsEn: [
      "Clean Controller–Service–Repository pattern",
      "Schema validation & centralized error-handling middleware",
      "Collection index optimization for low-latency responses",
    ],
    repoUrl: "https://github.com/Shevaramadhan",
  },
  {
    id: "enterprise-inventory-system",
    title: "ENTERPRISE INVENTORY & ERP",
    category: "Enterprise Arch",
    year: "2025",
    role: "System Analyst & Developer",
    type: "enterprise",
    architecture: "BPMN / UML BLUEPRINT → NORMALIZED SQL → WEB ERP",
    stack: ["Enterprise Arch", "BPMN / UML", "SQL", "TypeScript"],
    descriptionId:
      "Studi kasus Sistem Informasi yang memadukan pemodelan proses bisnis BPMN & UML, perancangan ERD relasional, serta implementasi modul inventaris.",
    descriptionEn:
      "Information Systems case study combining BPMN & UML business process modeling, relational ERD design, and inventory module implementation.",
    highlightsId: [
      "Pemetaan proses bisnis As-Is & To-Be dengan BPMN 2.0",
      "Perancangan Use Case, Activity, & Sequence Diagram",
      "Sinkronisasi stok otomatis & histori audit transaksi",
    ],
    highlightsEn: [
      "As-Is & To-Be business process mapping with BPMN 2.0",
      "Use Case, Activity, & Sequence Diagram specifications",
      "Automated stock synchronization & transaction audit trail",
    ],
    repoUrl: "https://github.com/Shevaramadhan",
  },
  {
    id: "campus-workflow-hub",
    title: "CAMPUS WORKFLOW & REGISTRY",
    category: "Full-Stack Web",
    year: "2025",
    role: "Full-Stack Developer",
    type: "fullstack",
    architecture: "REACT CLIENT → VERIFICATION API → RELATIONAL DB",
    stack: ["React", "Next.js", "Node.js", "SQL"],
    descriptionId:
      "Sistem registrasi kegiatan lintas fakultas dan verifikasi kehadiran peserta dengan antrean konkurensi aman.",
    descriptionEn:
      "Cross-faculty event registration and participant attendance verification system with concurrency-safe quota checks.",
    highlightsId: [
      "Validasi kuota peserta secara atomik",
      "Verifikasi kehadiran cepat berbasis tiket",
      "Ekspor laporan peserta terstruktur",
    ],
    highlightsEn: [
      "Atomic participant quota validation",
      "Fast ticket-based attendance verification",
      "Structured participant report exports",
    ],
    repoUrl: "https://github.com/Shevaramadhan",
  },
  {
    id: "golang-microservice-core",
    title: "GO CONCURRENT WORKER API",
    category: "Backend API",
    year: "2026",
    role: "Backend Developer",
    type: "backend",
    architecture: "HTTP ROUTER → GOROUTINE WORKER POOL → POSTGRESQL",
    stack: ["Golang", "PostgreSQL", "Docker", "REST API"],
    descriptionId:
      "Eksperimen layanan backend menggunakan Go (Golang) dan Docker untuk pemrosesan antrean tugas secara konkuren dan koneksi database efisien.",
    descriptionEn:
      "Backend service experiment built with Go (Golang) and Docker for concurrent task queue processing and pooled database connections.",
    highlightsId: [
      "Worker pool konkurensi menggunakan Goroutines & Channels",
      "Containerization layanan dengan Docker",
      "Connection pooling PostgreSQL",
    ],
    highlightsEn: [
      "Concurrent worker pool via Goroutines & Channels",
      "Service containerization with Docker",
      "PostgreSQL connection pooling",
    ],
    repoUrl: "https://github.com/Shevaramadhan",
  },
  {
    id: "relational-analytics-schema",
    title: "ACADEMIC DATA WAREHOUSE",
    category: "Database",
    year: "2025",
    role: "Database Designer",
    type: "database",
    architecture: "OLTP SOURCES → NORMALIZED 3NF SCHEMA → SQL VIEWS",
    stack: ["SQL", "PostgreSQL", "ERD", "Data Modeling"],
    descriptionId:
      "Perancangan skema basis data relasional 3NF dan kueri analitik agregasi untuk pelaporan akademik dan evaluasi kinerja.",
    descriptionEn:
      "3NF relational database schema design and analytical aggregation queries for academic reporting and performance evaluation.",
    highlightsId: [
      "Normalisasi tabel hingga 3NF untuk integritas data",
      "Stored procedures & SQL views untuk laporan cepat",
      "Indeks komposit pada kolom pencarian utama",
    ],
    highlightsEn: [
      "3NF table normalization for strict data integrity",
      "Stored procedures & SQL views for fast reporting",
      "Composite indexing on primary lookup columns",
    ],
    repoUrl: "https://github.com/Shevaramadhan",
  },
];

const CATEGORIES = [
  "Semua",
  "Full-Stack Web",
  "Backend API",
  "Enterprise Arch",
  "Database",
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const enabled = useContext(MotionContext);
  return (
    <motion.div
      className={className}
      initial={enabled ? { opacity: 0, y: 32 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ duration: enabled ? 0.75 : 0, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Magnetic({
  children,
  className = "",
  href,
  target,
  rel,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
}) {
  const enabled = useContext(MotionContext);
  const x = useSpring(0, { stiffness: 220, damping: 20 });
  const y = useSpring(0, { stiffness: 220, damping: 20 });

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (!enabled || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.12);
        y.set((e.clientY - r.top - r.height / 2) * 0.2);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}

function Header({
  enabled,
  onToggleMotion,
}: {
  enabled: boolean;
  onToggleMotion: () => void;
}) {
  const { lang, setLang } = useLanguage();
  const isId = lang === "id";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-15% 0px -65% 0px" }
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navItems: [string, string][] = isId
    ? [
        ["portfolio", "Karya"],
        ["skills", "Skills"],
        ["about", "Tentang"],
        ["experience", "Perjalanan"],
        ["contact", "Kontak"],
      ]
    : [
        ["portfolio", "Work"],
        ["skills", "Skills"],
        ["about", "About"],
        ["experience", "Journey"],
        ["contact", "Contact"],
      ];

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Sheva Ramdhan, beranda">
        SHEVA<span>®</span>
      </a>

      <nav className="desktop-nav" aria-label="Navigasi utama">
        {navItems.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? "active" : ""}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <button
          type="button"
          className="lang-toggle"
          onClick={() => setLang(isId ? "en" : "id")}
          aria-label="Toggle language"
        >
          <span className={isId ? "text-[#f2efeb]" : ""}>ID</span>
          <span>/</span>
          <span className={!isId ? "text-[#f2efeb]" : ""}>EN</span>
        </button>

        <button
          type="button"
          className="motion-toggle"
          onClick={onToggleMotion}
          aria-label={enabled ? "Jeda animasi" : "Aktifkan animasi"}
          aria-pressed={!enabled}
        >
          {enabled ? <Pause size={13} /> : <Play size={13} />}
          <span>Motion {enabled ? "on" : "off"}</span>
        </button>

        <a className="header-contact" href="#contact">
          Let’s talk <ArrowUpRight size={16} />
        </a>

        <button
          type="button"
          className="menu-toggle icon-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Navigasi mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {([["home", isId ? "Beranda" : "Home"], ...navItems] as [
              string,
              string,
            ][]).map(([id, label], i) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                <span>0{i + 1}</span>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({
  onSelectProject,
}: {
  onSelectProject: (p: PortfolioProject) => void;
}) {
  const { lang } = useLanguage();
  const isId = lang === "id";
  const ref = useRef<HTMLElement | null>(null);
  const enabled = useContext(MotionContext);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -55]);

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero-top">
        <span>
          WEB &amp; BACKEND DEVELOPER
          <br />
          <span className="muted">ENTERPRISE INFORMATION SYSTEMS</span>
        </span>
        <span className="availability">
          <i />
          {isId
            ? "OPEN FOR INTERNSHIP & COLLABORATION"
            : "OPEN FOR INTERNSHIP & COLLABORATION"}
        </span>
      </div>

      {/* Oversized Anton PORTFOLIO lettering behind portrait */}
      <motion.div
        className="hero-title display"
        aria-hidden="true"
        style={enabled ? { y: titleY } : {}}
        initial={enabled ? { clipPath: "inset(0 0 100% 0)" } : false}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        PORTFOLIO
      </motion.div>

      {/* Center Portrait */}
      <motion.div
        className="hero-portrait"
        style={enabled ? { y: portraitY, scale: portraitScale } : {}}
        initial={enabled ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <div className="hero-portrait-frame">
          <img
            src="/assets/profile/sheva.png"
            alt="Sheva Ramdhan mengenakan jas hitam"
            width={1024}
            height={1280}
            fetchPriority="high"
          />
        </div>
      </motion.div>

      {/* Left Intro */}
      <motion.div
        className="hero-intro"
        style={enabled ? { y: copyY } : {}}
        initial={enabled ? { opacity: 0, x: -35 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
      >
        <p className="handwriting">{isId ? "Halo, saya" : "Hello, I’m"}</p>
        <h1 className="display">
          SHEVA<span>.</span>
        </h1>
        <p className="hero-role">
          WEB, BACKEND &amp;
          <br />
          ENTERPRISE SYSTEMS
        </p>
        <p className="hero-description">
          {isId ? (
            <>
              Merancang arsitektur. Membangun sistem.
              <br />
              Mahasiswa Sistem Informasi Universitas Andalas yang fokus pada
              aplikasi web full-stack, layanan backend, dan sistem enterprise.
            </>
          ) : (
            <>
              Designing architecture. Engineering systems.
              <br />
              Information Systems student at Universitas Andalas focused on
              full-stack web apps, backend APIs, and enterprise systems.
            </>
          )}
        </p>
        <Magnetic href="#portfolio" className="primary-link">
          {isId ? "Lihat karya saya" : "Explore my work"} <ArrowDown size={17} />
        </Magnetic>
        <span className="hero-location">
          <MapPin size={12} /> PADANG · UNIVERSITAS ANDALAS
        </span>
      </motion.div>

      {/* Right Manifesto & Stats */}
      <motion.div
        className="hero-side"
        initial={enabled ? { opacity: 0, x: 30 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.55, ease: EASE }}
      >
        <div className="hero-manifesto">
          <span className="crosshair" aria-hidden="true">
            ✳
          </span>
          <p>
            Every system.
            <br />
            Built with structure.
          </p>
        </div>

        <div className="hero-stats">
          <div>
            <span className="display">
              05<span>th</span>
            </span>
            <p>
              SEMESTER S1
              <br />
              SISTEM INFORMASI
            </p>
          </div>
          <div>
            <span className="display">
              06<span>+</span>
            </span>
            <p>
              {isId ? (
                <>
                  PROYEK WEB &amp;
                  <br />
                  ARSITEKTUR SISTEM
                </>
              ) : (
                <>
                  WEB &amp; SYSTEM
                  <br />
                  CASE STUDIES
                </>
              )}
            </p>
          </div>
          <div>
            <span className="display">
              13<span>+</span>
            </span>
            <p>
              TECH STACK &amp;
              <br />
              BACKEND TOOLS
            </p>
          </div>
          <a href="#contact">
            <ArrowUpRight size={15} />
            <span>{isId ? "HUBUNGI SAYA" : "GET IN TOUCH"}</span>
          </a>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="hero-bottom">
        <button
          type="button"
          className="reel-button"
          onClick={() => onSelectProject(ARCHIVE_PROJECTS[0])}
        >
          <span className="play-circle">
            <Play size={12} fill="currentColor" />
          </span>
          INSPECT ARCHITECTURE
          <span className="muted">WEB / API / SQL</span>
        </button>
        <span className="hero-scroll">
          SCROLL TO DISCOVER <ArrowDown size={13} />
        </span>
        <span className="edition">SELECTED WORK / 2024–2026</span>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: PortfolioProject;
  index: number;
  onOpen: (p: PortfolioProject) => void;
}) {
  const enabled = useContext(MotionContext);

  return (
    <motion.article
      className="project-card"
      layout
      initial={enabled ? { opacity: 0, y: 32 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.08 }}
      transition={{
        duration: enabled ? 0.6 : 0,
        delay: (index % 3) * 0.06,
        ease: EASE,
      }}
      exit={{ opacity: 0, scale: 0.96 }}
    >
      <button
        type="button"
        className="project-open"
        onClick={() => onOpen(project)}
        aria-label={`Lihat ${project.title}`}
      >
        <div className="project-stage-preview">
          <div className="mt-4 flex items-center justify-between border-b border-white/10 pb-2.5">
            <span className="text-[9px] font-bold tracking-widest text-[#60a5fa]">
              SYSTEM BLUEPRINT // {project.year}
            </span>
            <span className="text-[9px] text-[#94a0b4]">{project.role}</span>
          </div>

          <div className="my-auto py-3">
            <p className="display text-2xl tracking-tight text-[#f2efeb] sm:text-3xl">
              {project.title}
            </p>
            <p className="mt-2 font-mono text-[10px] tracking-wider text-[#60a5fa]">
              {project.architecture}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border border-white/12 bg-black/40 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#cbd5e1]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <span className="project-type">{project.category}</span>
        <span className="project-hover">
          <ArrowUpRight size={20} />
        </span>
        <span className="project-frame" aria-hidden="true" />
      </button>

      <button
        type="button"
        className="project-caption"
        onClick={() => onOpen(project)}
      >
        <span className="project-number display">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>
          <h3>{project.title}</h3>
          <span className="project-category">
            {project.category} / {project.year}
          </span>
        </span>
        <ArrowUpRight size={20} />
      </button>
    </motion.article>
  );
}

function Portfolio({
  onSelectProject,
}: {
  onSelectProject: (p: PortfolioProject) => void;
}) {
  const { lang } = useLanguage();
  const isId = lang === "id";
  const [category, setCategory] = useState("Semua");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const results = ARCHIVE_PROJECTS.filter(
    (p) =>
      (category === "Semua" || p.category === category) &&
      `${p.title} ${p.category} ${p.role} ${p.stack.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  const displayedProjects =
    expanded || category !== "Semua" || query
      ? results
      : ARCHIVE_PROJECTS.slice(0, 3);

  return (
    <section id="portfolio" className="portfolio section-wrap">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">01 / SELECTED WORK</span>
          <h2>
            {isId ? "KARYA & ARSITEKTUR SISTEM" : "SYSTEMS THAT PERFORM"}
            <span className="accent">.</span>
          </h2>
        </div>
        <button
          type="button"
          className="text-link"
          onClick={() => {
            if (expanded) {
              setExpanded(false);
              setCategory("Semua");
              setQuery("");
            } else {
              setExpanded(true);
            }
          }}
        >
          {expanded
            ? isId
              ? "KARYA PILIHAN (3)"
              : "FEATURED (3)"
            : isId
              ? `SEMUA KARYA (${ARCHIVE_PROJECTS.length})`
              : `ALL PROJECTS (${ARCHIVE_PROJECTS.length})`}
          <ArrowRight size={20} />
        </button>
      </Reveal>

      <Reveal className="portfolio-toolbar">
        <div className="filters" role="group" aria-label="Kategori karya">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              className={category === c ? "selected" : ""}
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c);
                setExpanded(true);
              }}
            >
              {c}
              {c === category && (
                <motion.span className="filter-line" layoutId="filter-line" />
              )}
            </button>
          ))}
        </div>

        <label className="search-box">
          <Search size={14} />
          <span>{isId ? "Cari" : "Search"}</span>
          <input
            aria-label="Cari proyek"
            type="search"
            placeholder={isId ? "Judul atau stack…" : "Title or stack…"}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setExpanded(true);
            }}
          />
        </label>
      </Reveal>

      <motion.div className="project-grid" layout>
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              onOpen={onSelectProject}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function About() {
  const { lang } = useLanguage();
  const isId = lang === "id";
  const enabled = useContext(MotionContext);
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 75%"],
  });

  const processSteps = isId
    ? [
        [
          "01",
          "THE REQUIREMENT",
          "Memahami proses bisnis organisasi, kebutuhan pengguna, dan aturan sistem yang harus dipenuhi.",
        ],
        [
          "02",
          "SYSTEM MODELING",
          "Merancang alur BPMN, diagram UML, serta skema relasional database (ERD) yang terstruktur.",
        ],
        [
          "03",
          "BACKEND & API",
          "Membangun endpoint RESTful API, autentikasi, validasi data, dan logika transaksi yang aman.",
        ],
        [
          "04",
          "WEB INTEGRATION",
          "Menghubungkan antarmuka Next.js/React dengan layanan backend secara cepat dan responsif.",
        ],
        [
          "05",
          "TESTING & DEPLOY",
          "Pengujian integritas endpoint, containerization dengan Docker, dan deployment ke produksi.",
        ],
      ]
    : [
        [
          "01",
          "THE REQUIREMENT",
          "Analyzing organizational workflows, user requirements, and core domain rules.",
        ],
        [
          "02",
          "SYSTEM MODELING",
          "Designing BPMN business flows, UML diagrams, and normalized relational database schemas.",
        ],
        [
          "03",
          "BACKEND & API",
          "Engineering RESTful API endpoints, authentication, validation, and transactional logic.",
        ],
        [
          "04",
          "WEB INTEGRATION",
          "Connecting responsive Next.js/React frontends with backend services and state management.",
        ],
        [
          "05",
          "TESTING & DEPLOY",
          "Verifying API integrity, containerizing services with Docker, and deploying to production.",
        ],
      ];

  return (
    <section id="about" className="about section-wrap" ref={ref}>
      <Reveal className="about-lead">
        <div>
          <span className="eyebrow">03 / BEHIND THE SYSTEMS</span>
          <h2 className="display">
            {isId ? (
              <>
                BUKAN SEKADAR KODE.
                <br />
                TAPI CARA SISTEM <span className="accent">BEKERJA.</span>
              </>
            ) : (
              <>
                NOT JUST CODE.
                <br />
                HOW SYSTEMS <span className="accent">OPERATE.</span>
              </>
            )}
          </h2>
        </div>
        <p>
          {isId
            ? "Saya Sheva Ramdhan, mahasiswa S1 Sistem Informasi di Universitas Andalas. Saya bekerja di titik temu antara pengembangan web full-stack, rekayasa backend, dan arsitektur enterprise — mengubah proses bisnis menjadi sistem digital yang terstruktur."
            : "I’m Sheva Ramdhan, an Information Systems undergraduate at Universitas Andalas. I work at the intersection of full-stack web development, backend engineering, and enterprise architecture — turning complex workflows into structured digital systems."}
        </p>
      </Reveal>

      <div className="studio-grid">
        {/* Column 1: Education & Toolkit */}
        <Reveal className="education-panel">
          <h3 className="panel-heading">EDUCATION &amp; TOOLKIT</h3>
          <p className="eyebrow accent">
            {isId ? "PENDIDIKAN" : "EDUCATION"}
          </p>

          <div className="education-row">
            <strong>Universitas Andalas (UNAND)</strong>
            <span>SEMESTER 5</span>
            <p>
              {isId
                ? "S1 Sistem Informasi · Fakultas Teknologi Informasi (FTI). Fokus pada Rekayasa Perangkat Lunak & Sistem Enterprise."
                : "B.Sc. in Information Systems · Faculty of Information Technology. Focus on Software Engineering & Enterprise Systems."}
            </p>
          </div>

          <div className="education-row">
            <strong>SMAN 5 Tanjung Jabung Timur</strong>
            <span>ALUMNI</span>
            <p>
              {isId
                ? "Pendidikan menengah atas sebelum melanjutkan studi Sistem Informasi di Padang."
                : "High school graduate prior to pursuing Information Systems in Padang."}
            </p>
          </div>

          <div className="education-row">
            <strong>Core Focus Areas</strong>
            <span>TRACK</span>
            <p>
              Web Full-Stack · Backend REST API · Enterprise Architecture (BPMN
              / UML)
            </p>
          </div>

          <p className="eyebrow accent skills-heading">ENGINEERING TOOLKIT</p>
          <div className="skill-tags">
            {[
              "Next.js",
              "TypeScript",
              "Node.js",
              "Express.js",
              "Golang",
              "PostgreSQL",
              "MongoDB",
              "Docker",
              "BPMN & UML",
              "REST API",
            ].map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </Reveal>

        {/* Column 2: Process 01-05 */}
        <div className="process-panel">
          <Reveal>
            <h3 className="panel-heading">FROM REQUIREMENT TO DEPLOYMENT</h3>
          </Reveal>
          <div className="process-list">
            <div className="process-track">
              <motion.div style={{ scaleY: enabled ? scrollYProgress : 1 }} />
            </div>
            {processSteps.map(([num, title, text], i) => (
              <Reveal key={num} className="process-row" delay={i * 0.035}>
                <span className="process-num display">{num}</span>
                <span className="process-node" />
                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Column 3: Cobalt Blue Editorial Quote Panel */}
        <Reveal className="quote-panel">
          <span className="quote-mark display">“</span>
          <blockquote>
            {isId ? (
              <>
                Dari analisis
                <br />
                proses bisnis,
                <br />
                <em>
                  sampai arsitektur
                  <br />
                  web &amp; backend yang andal.
                </em>
              </>
            ) : (
              <>
                From business
                <br />
                process analysis,
                <br />
                <em>
                  to reliable web &amp;
                  <br />
                  backend architecture.
                </em>
              </>
            )}
          </blockquote>
          <span className="handwriting">Sheva Ramdhan</span>
          <div className="quote-bottom">
            LET’S BUILD
            <br />
            SYSTEMS THAT SCALE.
            <span className="quote-symbol" aria-hidden="true">
              ✳
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Journey() {
  const { lang } = useLanguage();
  const isId = lang === "id";
  const [open, setOpen] = useState<number | null>(0);

  const experiences = isId
    ? [
        {
          date: "2026 · SEKARANG",
          title: "Web & Backend Developer",
          place: "Proyek Mandiri & Akademik Sistem Informasi",
          text: "Merancang dan mengembangkan aplikasi web full-stack serta layanan RESTful API menggunakan Next.js, TypeScript, Node.js, Express, dan PostgreSQL/MongoDB — berfokus pada keandalan autentikasi, validasi skema, dan arsitektur modular.",
        },
        {
          date: "2025 – 2026",
          title: "Enterprise Architecture & System Analyst",
          place: "Departemen Sistem Informasi — Universitas Andalas",
          text: "Memetakan proses bisnis organisasi menggunakan BPMN 2.0 dan UML, menyusun cetak biru arsitektur enterprise, serta merancang skema basis data relasional terintegrasi.",
        },
        {
          date: "2024 – 2025",
          title: "Backend & Database Programming",
          place: "Fakultas Teknologi Informasi (FTI UNAND)",
          text: "Membangun fondasi algoritma, struktur data, pemrograman berorientasi objek (C/C++, JavaScript, Python), serta perancangan kueri SQL relasional.",
        },
      ]
    : [
        {
          date: "2026 · PRESENT",
          title: "Web & Backend Developer",
          place: "Independent & Academic Engineering Projects",
          text: "Architecting and developing full-stack web applications and RESTful API services using Next.js, TypeScript, Node.js, Express, and PostgreSQL/MongoDB — focusing on authentication flows, schema validation, and modular architecture.",
        },
        {
          date: "2025 – 2026",
          title: "Enterprise Architecture & System Analyst",
          place: "Department of Information Systems — Universitas Andalas",
          text: "Mapping organizational workflows using BPMN 2.0 and UML, designing enterprise architecture blueprints, and structuring normalized relational database schemas.",
        },
        {
          date: "2024 – 2025",
          title: "Backend & Database Programming",
          place: "Faculty of Information Technology (FTI UNAND)",
          text: "Built foundational algorithms, data structures, object-oriented applications (C/C++, JavaScript, Python), and relational SQL queries.",
        },
      ];

  const pillars = [
    {
      title: "Full-Stack Web Engineering",
      sub: "Next.js · React · TypeScript",
    },
    {
      title: "Backend & RESTful APIs",
      sub: "Node.js · Express · Golang",
    },
    {
      title: "Enterprise Architecture",
      sub: "BPMN 2.0 · UML · System Analysis",
    },
    {
      title: "Database & Infrastructure",
      sub: "PostgreSQL · MongoDB · Docker",
    },
  ];

  return (
    <section id="experience" className="journey section-wrap">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">04 / THE JOURNEY</span>
          <h2>
            {isId
              ? "PERJALANAN & FOKUS TEKNIS"
              : "EXPERIENCE & TECHNICAL TRACK"}
            <span className="accent">.</span>
          </h2>
        </div>
        <a className="text-link" href="#contact">
          {isId ? "DISKUSI KOLABORASI" : "DISCUSS COLLABORATION"}
          <ArrowUpRight size={17} />
        </a>
      </Reveal>

      <div className="journey-grid">
        <div className="experience-list">
          {experiences.map((job, i) => (
            <Reveal
              className={`experience-row ${open === i ? "is-open" : ""}`}
              key={job.title}
            >
              <button
                type="button"
                aria-expanded={open === i}
                aria-controls={`job-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="experience-date">{job.date}</span>
                <span>
                  <h3>{job.title}</h3>
                  <span className="experience-place">{job.place}</span>
                </span>
                {open === i ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`job-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <p>{job.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>

        <Reveal className="awards-panel">
          <p className="eyebrow">CORE COMPETENCIES</p>
          <h3 className="display">
            SOLID LOGIC.
            <br />
            <span className="accent">CLEAN SYSTEMS.</span>
          </h3>
          <div className="award-list">
            {pillars.map((item, i) => (
              <div key={item.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  {item.title}
                  <small>{item.sub}</small>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const { lang } = useLanguage();
  const isId = lang === "id";
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `[${data.get("type")}] Kolaborasi / Proyek — ${data.get("name")}`
    );
    const body = encodeURIComponent(
      `Halo Sheva,\n\nSaya ${data.get("name")}.\nKategori: ${data.get("type")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:sheva.ramdhan@student.unand.ac.id?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="contact section-wrap">
      <div className="contact-grid">
        <Reveal className="contact-intro">
          <span className="eyebrow">05 / YOUR NEXT PROJECT</span>
          <h2 className="display">
            LET’S WORK
            <br />
            TOGETHER<span className="accent">.</span>
          </h2>
          <p>
            {isId ? (
              <>
                Tertarik berdiskusi mengenai peluang magang software
                engineering, pengembangan web &amp; backend, atau kolaborasi
                sistem enterprise?
              </>
            ) : (
              <>
                Interested in discussing software engineering internships, web
                &amp; backend development, or enterprise system collaborations?
              </>
            )}
          </p>
          <Magnetic
            href="mailto:sheva.ramdhan@student.unand.ac.id"
            className="contact-cta"
          >
            <span className="round-arrow">
              <ArrowUpRight size={20} />
            </span>
            {isId ? "KIRIM EMAIL SEKARANG" : "START A CONVERSATION"}
          </Magnetic>
        </Reveal>

        <Reveal className="contact-links" delay={0.1}>
          <a href="mailto:sheva.ramdhan@student.unand.ac.id">
            <Mail />
            <span>
              <small>EMAIL</small>
              sheva.ramdhan@student.unand.ac.id
            </span>
            <ArrowUpRight size={16} />
          </a>

          <a
            href="https://github.com/Shevaramadhan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink />
            <span>
              <small>GITHUB</small>
              github.com/Shevaramadhan
            </span>
            <ArrowUpRight size={16} />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink />
            <span>
              <small>LINKEDIN</small>
              Sheva Ramdhan
            </span>
            <ArrowUpRight size={16} />
          </a>

          <div>
            <MapPin />
            <span>
              <small>BASED IN</small>
              Padang, Indonesia · Universitas Andalas
            </span>
          </div>
        </Reveal>

        <Reveal className="contact-reel" delay={0.2}>
          <a
            href="https://github.com/Shevaramadhan/shevaWEB"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka repositori GitHub Sheva Ramdhan"
          >
            <div className="reel-screen">
              <span className="reel-screen-top">
                SHEVA®<span>WEB · BACKEND · ENTERPRISE</span>
              </span>
              <span className="reel-screen-title display">
                BUILD IT
                <br />
                <span>TO SCALE.</span>
              </span>
              <span className="play-circle">
                <ArrowUpRight size={18} />
              </span>
            </div>
            <span className="reel-caption">
              INSPECT SOURCE CODE ON GITHUB.
            </span>
          </a>
        </Reveal>
      </div>

      <Reveal>
        <details className="project-brief">
          <summary>
            {isId
              ? "Kirim brief proyek atau tawaran magang"
              : "Send a project brief or internship inquiry"}{" "}
            <Plus size={19} />
          </summary>
          <form onSubmit={handleSubmit}>
            <label>
              {isId ? "Nama Anda / Perusahaan" : "Your Name / Company"}
              <input
                name="name"
                required
                placeholder={isId ? "Nama atau instansi" : "Name or company"}
                autoComplete="name"
                maxLength={100}
              />
            </label>
            <label>
              {isId ? "Jenis Kebutuhan" : "Inquiry Type"}
              <select name="type">
                <option>Software Engineering Internship</option>
                <option>Full-Stack Web Development</option>
                <option>Backend &amp; REST API Engineering</option>
                <option>Enterprise System &amp; Database Design</option>
                <option>Other Collaboration</option>
              </select>
            </label>
            <label className="brief-message">
              {isId ? "Pesan / Detail Proyek" : "Message / Project Details"}
              <textarea
                name="message"
                required
                rows={3}
                placeholder={
                  isId
                    ? "Ceritakan kebutuhan sistem, ruang lingkup, atau jadwalnya…"
                    : "Tell me about the system requirements, scope, or timeline…"
                }
                maxLength={3000}
              />
            </label>
            <button className="solid-button" type="submit">
              {isId ? "Buka Draft Email" : "Open Email Draft"}{" "}
              <ArrowUpRight size={18} />
            </button>
            <p className="eyebrow muted" role="status">
              {sent
                ? isId
                  ? "Draft email telah disiapkan di aplikasi email Anda."
                  : "Email draft prepared in your mail client."
                : isId
                  ? "Form ini akan menyiapkan pesan langsung ke email Sheva."
                  : "This form prepares a direct message to Sheva’s email."}
            </p>
          </form>
        </details>
      </Reveal>
    </section>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: PortfolioProject;
  onClose: () => void;
}) {
  const { lang } = useLanguage();
  const isId = lang === "id";
  const enabled = useContext(MotionContext);

  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const highlights = isId ? project.highlightsId : project.highlightsEn;

  return (
    <motion.div
      className="dialog-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        initial={enabled ? { y: 45, scale: 0.97 } : false}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <div className="dialog-heading">
          <span className="eyebrow">
            {project.category} / {project.year}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="icon-button"
            aria-label="Tutup detail proyek"
          >
            <X size={18} />
          </button>
        </div>

        <div className="border-b border-[#1c2536] bg-[#080c15] p-7 sm:p-10">
          <p className="eyebrow accent">SYSTEM ARCHITECTURE FLOW</p>
          <p className="display mt-3 text-3xl text-[#f2efeb] sm:text-5xl">
            {project.title}
          </p>
          <p className="mt-3 font-mono text-xs text-[#60a5fa] sm:text-sm">
            {project.architecture}
          </p>

          <div className="mt-6 grid gap-3 border-t border-[#1c2536] pt-5 sm:grid-cols-3">
            {highlights.map((h, i) => (
              <div
                key={h}
                className="border border-[#1c2536] bg-[#0c1220] p-3.5"
              >
                <span className="display text-lg text-[#3b82f6]">
                  0{i + 1}
                </span>
                <p className="mt-1 text-xs text-[#cbd5e1]">{h}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dialog-description">
          <div>
            <h2 id="dialog-title" className="display">
              {project.title}
            </h2>
            <span className="accent">{project.role}</span>
            <p>{isId ? project.descriptionId : project.descriptionEn}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="border border-[#243557] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#cbd5e1]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {project.repoUrl && (
            <a
              className="outline-button"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ExternalLink size={15} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function EditorialPortfolio() {
  const reduced = useReducedMotion();
  const [motionOn, setMotionOn] = useState(true);
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sheva-motion");
      if (saved === "off") setMotionOn(false);
    } catch {
      // ignore storage errors
    }
  }, []);

  const enabled = motionOn && !reduced;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  });

  const toggleMotion = () => {
    const next = !motionOn;
    setMotionOn(next);
    try {
      localStorage.setItem("sheva-motion", next ? "on" : "off");
    } catch {
      // ignore
    }
  };

  return (
    <MotionContext.Provider value={enabled}>
      <MotionConfig
        reducedMotion={enabled ? "user" : "always"}
        transition={{ ease: EASE }}
      >
        <a className="skip-link" href="#portfolio">
          Lewati ke karya
        </a>
        <motion.div
          className="reading-progress"
          style={{ scaleX: enabled ? progress : scrollYProgress }}
        />
        <Header enabled={enabled} onToggleMotion={toggleMotion} />
        <main>
          <Hero onSelectProject={setSelectedProject} />
          <Portfolio onSelectProject={setSelectedProject} />
          <SkillsSection />
          <About />
          <Journey />
          <Contact />
        </main>
        <footer className="footer">
          <a className="wordmark" href="#home">
            SHEVA<span>®</span>
          </a>
          <span>
            © {new Date().getFullYear()} SHEVA RAMDHAN · INFORMATION SYSTEMS,
            UNIVERSITAS ANDALAS.
          </span>
          <div>
            <a
              href="https://github.com/Shevaramadhan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Sheva Ramdhan"
            >
              <ExternalLink size={16} />
            </a>
            <a
              href="mailto:sheva.ramdhan@student.unand.ac.id"
              aria-label="Email Sheva Ramdhan"
            >
              <Mail size={16} />
            </a>
            <a href="#home" aria-label="Kembali ke atas">
              <ArrowUpRight size={18} />
            </a>
          </div>
        </footer>
        <AnimatePresence>
          {selectedProject && (
            <ProjectDialog
              key={selectedProject.id}
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </MotionConfig>
    </MotionContext.Provider>
  );
}

