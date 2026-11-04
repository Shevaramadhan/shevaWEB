-- ============================================================================
-- SHEVA RAMDHAN PORTFOLIO CMS — SQL SCHEMA (PostgreSQL / Supabase)
-- ============================================================================

CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(64) PRIMARY KEY,
  num VARCHAR(10) NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  year VARCHAR(16) NOT NULL,
  role VARCHAR(150) NOT NULL,
  featured BOOLEAN DEFAULT true,
  summary_id TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  stack JSONB NOT NULL DEFAULT '[]'::jsonb,
  metrics JSONB NOT NULL DEFAULT '[]'::jsonb,
  github VARCHAR(500),
  live VARCHAR(500),
  image_url TEXT,
  architecture JSONB NOT NULL DEFAULT '{"client":"","api":"","core":"","data":""}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS achievements (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  event VARCHAR(255) NOT NULL,
  rank VARCHAR(120) NOT NULL,
  year VARCHAR(16) NOT NULL,
  category VARCHAR(80) NOT NULL, -- 'Prestasi & Lomba' | 'Sertifikasi' | 'Akademik'
  description TEXT NOT NULL,
  certificate_image TEXT,
  proof_url VARCHAR(500),
  featured BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  caption TEXT NOT NULL,
  category VARCHAR(80) NOT NULL, -- 'Kompetisi' | 'Proyek & Riset' | 'Kampus & Organisasi'
  date VARCHAR(64) NOT NULL,
  location VARCHAR(150) NOT NULL,
  image_url TEXT NOT NULL,
  aspect VARCHAR(32) DEFAULT 'landscape',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

