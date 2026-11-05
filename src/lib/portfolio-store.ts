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
  liveUrl?: string;
  imageUrl?: string;
  images?: string[];
}

export function getProjectImages(project: PortfolioProject): string[] {
  const list: string[] = [];
  if (Array.isArray(project.images)) {
    for (const img of project.images) {
      if (typeof img === "string" && img.trim() && !list.includes(img.trim())) {
        list.push(img.trim());
      }
    }
  }
  if (
    typeof project.imageUrl === "string" &&
    project.imageUrl.trim() &&
    !list.includes(project.imageUrl.trim())
  ) {
    list.unshift(project.imageUrl.trim());
  }
  return list;
}

export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  rank: string;
  year: string;
  category: "Prestasi & Lomba" | "Sertifikasi" | "Akademik";
  descriptionId: string;
  descriptionEn: string;
  certificateImage?: string;
  proofUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  captionId: string;
  captionEn: string;
  category: "Kompetisi" | "Proyek & Riset" | "Kampus & Organisasi";
  date: string;
  location: string;
  imageUrl: string;
}

export interface PortfolioCMSData {
  projects: PortfolioProject[];
  achievements: AchievementItem[];
  gallery: GalleryItem[];
  updatedAt: string;
}

export const DEFAULT_PROJECTS: PortfolioProject[] = [
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
    id: "golang-mysql-service",
    title: "GO & MYSQL REST API ENGINE",
    category: "Backend API",
    year: "2026",
    role: "Backend Developer",
    type: "backend",
    architecture: "GOLANG ROUTER → GOROUTINE WORKER → MYSQL 8.0",
    stack: ["Golang", "MySQL", "Docker", "REST API"],
    descriptionId:
      "Layanan RESTful API performa tinggi menggunakan Go (Golang) dan MySQL dengan arsitektur Clean Repository, connection pooling, dan autentikasi token JWT.",
    descriptionEn:
      "High-performance RESTful API built with Go (Golang) and MySQL featuring Clean Repository architecture, connection pooling, and JWT authentication.",
    highlightsId: [
      "Worker pool konkurensi menggunakan Goroutines & Channels",
      "Integrasi database relasional MySQL dengan connection pooling",
      "Containerization layanan penuh dengan Docker",
    ],
    highlightsEn: [
      "Concurrent worker pool via Goroutines & Channels",
      "Relational MySQL integration with connection pooling",
      "Full service containerization with Docker",
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
    id: "restful-service-arch",
    title: "MODULAR EXPRESS & MONGODB API",
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
    id: "relational-analytics-schema",
    title: "ACADEMIC DATA WAREHOUSE",
    category: "Database",
    year: "2025",
    role: "Database Designer",
    type: "database",
    architecture: "OLTP SOURCES → NORMALIZED 3NF SCHEMA → SQL VIEWS",
    stack: ["SQL", "PostgreSQL", "MySQL", "Data Modeling"],
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

export const DEFAULT_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "ach-is-case-study",
    title: "Best System Architecture & Enterprise Modeling Project",
    event: "Departemen Sistem Informasi — Universitas Andalas",
    rank: "BEST PROJECT",
    year: "2025",
    category: "Akademik",
    descriptionId:
      "Perancangan cetak biru proses bisnis BPMN 2.0, spesifikasi UML lengkap, serta skema relasional 3NF untuk studi kasus sistem inventaris & operasional.",
    descriptionEn:
      "End-to-end BPMN 2.0 business process blueprint, complete UML specification, and 3NF relational schema for enterprise inventory operations.",
  },
  {
    id: "ach-backend-engineering",
    title: "Backend & RESTful API Engineering Certification",
    event: "Full-Stack & Cloud Backend Track",
    rank: "CERTIFIED",
    year: "2025",
    category: "Sertifikasi",
    descriptionId:
      "Kompetensi perancangan layanan REST API modular, autentikasi JWT, manajemen database SQL/NoSQL, serta deployment ter-containerisasi.",
    descriptionEn:
      "Competency in modular REST API design, JWT authentication, SQL/NoSQL database management, and containerized deployment.",
  },
  {
    id: "ach-web-competition",
    title: "Finalis Pengembangan Aplikasi Web & Sistem Informasi",
    event: "Kompetisi Teknologi Informasi & Inovasi Digital",
    rank: "FINALIST",
    year: "2025",
    category: "Prestasi & Lomba",
    descriptionId:
      "Merancang dan mempresentasikan solusi web full-stack berbasis Next.js & database relasional untuk digitalisasi alur layanan organisasi.",
    descriptionEn:
      "Designed and pitched a full-stack web solution built on Next.js and relational databases for organizational workflow digitization.",
  },
  {
    id: "ach-database-sql",
    title: "Relational Database Design & Advanced SQL",
    event: "Information Systems Core Track — FTI UNAND",
    rank: "DISTINCTION",
    year: "2024",
    category: "Akademik",
    descriptionId:
      "Implementasi normalisasi skema database (1NF–3NF), optimasi kueri agregasi, serta pemodelan Entity-Relationship Diagram (ERD).",
    descriptionEn:
      "Implementation of database schema normalization (1NF–3NF), aggregation query optimization, and Entity-Relationship Diagram (ERD) modeling.",
  },
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gal-01",
    title: "ACADEMIC & FORMAL PORTRAIT — FTI UNAND",
    captionId:
      "Dokumentasi akademik mahasiswa S1 Sistem Informasi, Fakultas Teknologi Informasi, Universitas Andalas.",
    captionEn:
      "Academic documentation as an Information Systems undergraduate at the Faculty of Information Technology, Universitas Andalas.",
    category: "Kampus & Organisasi",
    date: "2025",
    location: "Padang, Sumatera Barat",
    imageUrl: "/assets/profile/sheva.png",
  },
  {
    id: "gal-02",
    title: "FULL-STACK & BACKEND SYSTEM BLUEPRINT",
    captionId:
      "Eksplorasi arsitektur layanan web modern, integrasi RESTful API, dan pemodelan database relasional.",
    captionEn:
      "Exploration of modern web service architecture, RESTful API integration, and relational database modeling.",
    category: "Proyek & Riset",
    date: "2026",
    location: "System Architecture Lab",
    imageUrl: "/assets/brand/center-emblem.svg",
  },
];

export const INITIAL_CMS_DATA: PortfolioCMSData = {
  projects: DEFAULT_PROJECTS,
  achievements: DEFAULT_ACHIEVEMENTS,
  gallery: DEFAULT_GALLERY,
  updatedAt: "2026-11-05T00:00:00.000Z",
};

export const CMS_STORAGE_KEY = "sheva_portfolio_cms_v1";
export const CMS_AUTH_KEY = "sheva_portfolio_admin_token";

