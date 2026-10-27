/**
 * Pusat Konfigurasi Asset Logo Skills, Tech Stack, & Orbit
 * ---------------------------------------------------------
 * Semua file gambar/logo fisik tersimpan di dalam folder:
 * - public/assets/skills/badges/  -> Logo lingkaran baris atas (berwarna)
 * - public/assets/skills/orbit/   -> Ikon-ikon yang mengorbit di 3 cincin elips
 * - public/assets/brand/          -> Emblem bola pusat (center-emblem.svg)
 * - public/assets/profile/        -> Foto profil & CV
 * - public/assets/projects/       -> Thumbnail proyek
 *
 * Untuk mengganti atau menambah logo baru:
 * 1. Masukkan file .svg / .png / .webp ke folder `public/assets/skills/badges/`
 * 2. Ubah atau tambahkan path-nya pada array di bawah ini.
 */

export interface SkillBadgeAsset {
  name: string;
  /** Path relatif terhadap folder `public/` (contoh: `/assets/skills/badges/nodejs.svg`) */
  src: string;
  width?: number;
  height?: number;
}

export interface OrbitIconAsset {
  alt: string;
  /** Path relatif terhadap folder `public/` (contoh: `/assets/skills/orbit/react-orbit.svg`) */
  src: string;
}

/**
 * BARIS 1: 7 Lingkaran Logo Tech Stack Atas
 * Tersedia juga logo tambahan siap pakai di `public/assets/skills/badges/`:
 * - `/assets/skills/badges/typescript.svg`
 * - `/assets/skills/badges/laravel.svg`
 * - `/assets/skills/badges/postgresql.svg`
 * - `/assets/skills/badges/docker.svg`
 * - `/assets/skills/badges/golang.svg`
 * - `/assets/skills/badges/python.svg`
 */
export const SKILL_BADGES_ROW_1: SkillBadgeAsset[] = [
  { name: "Figma", src: "/assets/skills/badges/figma.svg", width: 22, height: 22 },
  { name: "React", src: "/assets/skills/badges/react.svg", width: 26, height: 26 },
  { name: "C / C++", src: "/assets/skills/badges/cpp.svg", width: 26, height: 26 },
  { name: "Node.js", src: "/assets/skills/badges/nodejs.svg", width: 34, height: 24 },
  { name: "Redux", src: "/assets/skills/badges/redux.svg", width: 25, height: 25 },
  { name: "JavaScript", src: "/assets/skills/badges/javascript.svg", width: 24, height: 24 },
  { name: "CSS3", src: "/assets/skills/badges/css3.svg", width: 25, height: 25 },
];

/**
 * BARIS 2: 6 Lingkaran Logo Tech Stack Bawah
 */
export const SKILL_BADGES_ROW_2: SkillBadgeAsset[] = [
  { name: "Adobe XD", src: "/assets/skills/badges/xd.svg", width: 24, height: 24 },
  { name: "Next.js", src: "/assets/skills/badges/nextjs.svg", width: 36, height: 20 },
  { name: "Gatsby", src: "/assets/skills/badges/gatsby.svg", width: 24, height: 24 },
  { name: "Adobe Illustrator", src: "/assets/skills/badges/illustrator.svg", width: 24, height: 24 },
  { name: "Express.js", src: "/assets/skills/badges/express.svg", width: 38, height: 20 },
  { name: "MongoDB", src: "/assets/skills/badges/mongodb.svg", width: 40, height: 20 },
];

/**
 * CINCIN ORBIT 1 (Luar): 6 Ikon
 */
export const ORBIT_OUTER_ICONS: OrbitIconAsset[] = [
  { alt: "React", src: "/assets/skills/orbit/react-orbit.svg" },
  { alt: "Node.js", src: "/assets/skills/orbit/nodejs-orbit.svg" },
  { alt: "Figma", src: "/assets/skills/orbit/figma-orbit.svg" },
  { alt: "CSS3", src: "/assets/skills/orbit/css3-orbit.svg" },
  { alt: "LinkedIn", src: "/assets/skills/orbit/linkedin-orbit.svg" },
  { alt: "GitHub / Code", src: "/assets/skills/orbit/code-orbit.svg" },
];

/**
 * CINCIN ORBIT 2 (Tengah): 5 Ikon
 */
export const ORBIT_MIDDLE_ICONS: OrbitIconAsset[] = [
  { alt: "JavaScript", src: "/assets/skills/orbit/js-orbit.svg" },
  { alt: "Adobe XD", src: "/assets/skills/orbit/xd-orbit.svg" },
  { alt: "Gatsby / Google", src: "/assets/skills/orbit/gatsby-orbit.svg" },
  { alt: "Illustrator", src: "/assets/skills/orbit/ai-orbit.svg" },
  { alt: "Swift", src: "/assets/skills/orbit/swift-orbit.svg" },
];

/**
 * CINCIN ORBIT 3 (Dalam): 4 Ikon
 */
export const ORBIT_INNER_ICONS: OrbitIconAsset[] = [
  { alt: "Code Tag", src: "/assets/skills/orbit/tag-orbit.svg" },
  { alt: "TypeScript", src: "/assets/skills/orbit/ts-orbit.svg" },
  { alt: "Next.js", src: "/assets/skills/orbit/nextjs-orbit.svg" },
  { alt: "Database", src: "/assets/skills/orbit/database-orbit.svg" },
];

/**
 * Emblem di tengah bola bercahaya biru
 */
export const CENTER_ORB_EMBLEM = {
  alt: "Sheva Ramdhan SR Emblem",
  src: "/assets/brand/center-emblem.svg?v=sr",
};

/**
 * Daftar Logo untuk <LogoLoop /> Marquee di bawah Orbit Skills
 * Menggunakan file .svg dari `public/assets/skills/badges/`
 */
export interface SkillMarqueeItem {
  title: string;
  alt: string;
  src: string;
  category?: string;
}

export const SKILL_MARQUEE_ROW_1: SkillMarqueeItem[] = [
  { title: "Next.js", alt: "Next.js", src: "/assets/skills/badges/nextjs.svg", category: "Full-Stack" },
  { title: "TypeScript", alt: "TypeScript", src: "/assets/skills/badges/typescript.svg", category: "Language" },
  { title: "Node.js", alt: "Node.js", src: "/assets/skills/badges/nodejs.svg", category: "Backend" },
  { title: "Express.js", alt: "Express.js", src: "/assets/skills/badges/express.svg", category: "Backend" },
  { title: "Laravel", alt: "Laravel", src: "/assets/skills/badges/laravel.svg", category: "Enterprise" },
  { title: "PostgreSQL", alt: "PostgreSQL", src: "/assets/skills/badges/postgresql.svg", category: "Database" },
  { title: "MongoDB", alt: "MongoDB", src: "/assets/skills/badges/mongodb.svg", category: "Database" },
  { title: "Docker", alt: "Docker", src: "/assets/skills/badges/docker.svg", category: "DevOps" },
  { title: "Golang", alt: "Golang", src: "/assets/skills/badges/golang.svg", category: "Backend" },
];

export const SKILL_MARQUEE_ROW_2: SkillMarqueeItem[] = [
  { title: "React", alt: "React", src: "/assets/skills/badges/react.svg", category: "Frontend" },
  { title: "JavaScript", alt: "JavaScript", src: "/assets/skills/badges/javascript.svg", category: "Language" },
  { title: "Python", alt: "Python", src: "/assets/skills/badges/python.svg", category: "Automation" },
  { title: "Redux", alt: "Redux", src: "/assets/skills/badges/redux.svg", category: "State" },
  { title: "C / C++", alt: "C / C++", src: "/assets/skills/badges/cpp.svg", category: "Systems" },
  { title: "CSS3", alt: "CSS3", src: "/assets/skills/badges/css3.svg", category: "Styling" },
  { title: "Gatsby", alt: "Gatsby", src: "/assets/skills/badges/gatsby.svg", category: "Web" },
  { title: "Figma", alt: "Figma", src: "/assets/skills/badges/figma.svg", category: "System Design" },
];


