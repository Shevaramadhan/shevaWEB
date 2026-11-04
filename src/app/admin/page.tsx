"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Upload,
  Download,
  RotateCcw,
  Lock,
  LogOut,
  CheckCircle2,
  Edit3,
  FolderGit2,
  Award,
  Image as ImageIcon,
} from "lucide-react";
import {
  CMS_AUTH_KEY,
  CMS_STORAGE_KEY,
  INITIAL_CMS_DATA,
  type AchievementItem,
  type GalleryItem,
  type PortfolioCMSData,
  type PortfolioProject,
} from "@/lib/portfolio-store";

async function compressImageFileToDataUrl(
  file: File,
  maxWidth = 1280,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Gagal membaca file gambar."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Format gambar tidak didukung."));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/webp", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function AdminCMSPage() {
  const [token, setToken] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<
    "projects" | "achievements" | "gallery"
  >("achievements");
  const [cmsData, setCmsData] = useState<PortfolioCMSData>(INITIAL_CMS_DATA);
  const [statusMsg, setStatusMsg] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Editing states
  const [editingProject, setEditingProject] =
    useState<PortfolioProject | null>(null);
  const [editingAchievement, setEditingAchievement] =
    useState<AchievementItem | null>(null);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(
    null
  );

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem(CMS_AUTH_KEY);
      if (savedToken) setToken(savedToken);
    } catch {
      // ignore
    }

    const loadInitial = async () => {
      let localData: PortfolioCMSData | null = null;
      try {
        const raw = localStorage.getItem(CMS_STORAGE_KEY);
        if (raw) {
          localData = JSON.parse(raw) as PortfolioCMSData;
          setCmsData(localData);
        }
      } catch {
        // ignore
      }

      try {
        const res = await fetch("/api/cms", { cache: "no-store" });
        if (res.ok) {
          const json = (await res.json()) as {
            ok: boolean;
            data?: PortfolioCMSData;
          };
          if (json.ok && json.data) {
            const serverTime = Date.parse(json.data.updatedAt || "");
            const localTime = localData
              ? Date.parse(localData.updatedAt || "")
              : 0;
            if (!localData || serverTime >= localTime) {
              setCmsData(json.data);
            }
          }
        }
      } catch {
        // fallback to current state
      }
    };

    loadInitial();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/cms/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const json = (await res.json()) as {
        ok: boolean;
        token?: string;
        error?: string;
      };
      if (!res.ok || !json.ok || !json.token) {
        setAuthError(json.error || "Password tidak valid.");
        return;
      }
      setToken(json.token);
      localStorage.setItem(CMS_AUTH_KEY, json.token);
      setPasswordInput("");
    } catch {
      setAuthError("Gagal menghubungi server autentikasi.");
    }
  };

  const handleLogout = () => {
    setToken("");
    try {
      localStorage.removeItem(CMS_AUTH_KEY);
    } catch {
      // ignore
    }
  };

  const persistAll = async (nextData: PortfolioCMSData, notice: string) => {
    setIsSaving(true);
    const stamped: PortfolioCMSData = {
      ...nextData,
      updatedAt: new Date().toISOString(),
    };
    setCmsData(stamped);

    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(stamped));
      window.dispatchEvent(new Event("sheva-cms-updated"));
    } catch {
      // ignore storage quota errors
    }

    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(stamped),
      });
      const json = (await res.json()) as {
        ok: boolean;
        persistedToDisk?: boolean;
      };
      if (json.ok) {
        setStatusMsg(
          json.persistedToDisk
            ? `${notice} (Tersimpan ke Server JSON & Browser)`
            : `${notice} (Tersimpan & Aktif di Browser — Gunakan Export JSON untuk commit permanen)`
        );
      } else {
        setStatusMsg(`${notice} (Tersimpan di Browser)`);
      }
    } catch {
      setStatusMsg(`${notice} (Tersimpan di Browser)`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(cmsData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-cms.json";
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg(
      "File portfolio-cms.json berhasil diunduh (simpan di folder data/portfolio-cms.json)."
    );
  };

  const handleResetDefault = async () => {
    if (
      !window.confirm(
        "Reset seluruh data Proyek, Prestasi, dan Galeri ke bawaan awal?"
      )
    ) {
      return;
    }
    try {
      localStorage.removeItem(CMS_STORAGE_KEY);
    } catch {
      // ignore
    }
    await persistAll(INITIAL_CMS_DATA, "Data berhasil di-reset ke default");
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#07090e] text-[#f2efeb] flex flex-col justify-between p-6 sm:p-12">
        <div className="flex items-center justify-between border-b border-[#1c2536] pb-5">
          <a href="/" className="wordmark">
            SHEVA<span>®</span>
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#94a0b4] hover:text-white"
          >
            <ArrowLeft size={14} /> Kembali ke Portofolio
          </a>
        </div>

        <div className="mx-auto my-auto w-full max-w-md border border-[#243557] bg-[#0b101b] p-8 sm:p-10">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#3b82f6]">
            <Lock size={13} /> EDITORIAL CMS // ADMIN ACCESS
          </div>
          <h1 className="display mt-3 text-4xl tracking-tight text-[#f2efeb]">
            PANEL ADMIN<span className="accent">.</span>
          </h1>
          <p className="mt-2 text-xs text-[#94a0b4]">
            Kelola daftar Proyek, Prestasi/Lomba, Sertifikasi, dan Galeri
            Dokumentasi secara dinamis.
          </p>

          <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#94a0b4]">
              Password Admin
              <input
                type="password"
                required
                placeholder="Masukkan password admin (default: sheva2026)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="border border-[#243557] bg-[#07090e] px-3.5 py-3 text-xs text-[#f2efeb] outline-none focus:border-[#3b82f6]"
              />
            </label>

            {authError && (
              <p className="border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {authError}
              </p>
            )}

            <button type="submit" className="solid-button w-full">
              MASUK KE PANEL ADMIN
            </button>
          </form>

          <p className="mt-5 border-t border-[#1c2536] pt-4 text-[10px] leading-relaxed text-[#94a0b4]">
            Tip: Password default adalah{" "}
            <code className="text-[#60a5fa]">sheva2026</code> (dapat diubah
            melalui environment variable{" "}
            <code className="text-[#60a5fa]">ADMIN_PASSWORD</code> di Vercel).
          </p>
        </div>

        <div className="border-t border-[#1c2536] pt-4 text-[10px] uppercase tracking-widest text-[#94a0b4]">
          SHEVA RAMDHAN · DYNAMIC PORTFOLIO ENGINE
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f2efeb]">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-[#1c2536] bg-[#07090e]/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a href="/" className="wordmark">
              SHEVA<span>®</span>
            </a>
            <span className="border border-[#243557] bg-[#0d1526] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#60a5fa]">
              CMS ADMIN PANEL
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/"
              className="outline-button"
              style={{ minHeight: "38px", padding: "8px 14px" }}
            >
              <ArrowLeft size={14} /> Lihat Website
            </a>
            <button
              type="button"
              onClick={handleExportJson}
              className="outline-button"
              style={{ minHeight: "38px", padding: "8px 14px" }}
            >
              <Download size={14} /> Export JSON
            </button>
            <button
              type="button"
              onClick={handleResetDefault}
              className="outline-button"
              style={{ minHeight: "38px", padding: "8px 14px" }}
            >
              <RotateCcw size={14} /> Reset Default
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="border border-[#2c1f26] bg-[#170e13] px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-red-300 hover:border-red-500"
            >
              <span className="inline-flex items-center gap-1.5">
                <LogOut size={13} /> Keluar
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 py-10">
        {statusMsg && (
          <div className="mb-6 flex items-center justify-between border border-[#2563eb] bg-[#101f3c] px-4 py-3 text-xs text-[#dbeafe]">
            <span className="inline-flex items-center gap-2 font-semibold">
              <CheckCircle2 size={15} className="text-[#60a5fa]" />
              {statusMsg}
            </span>
            <button
              type="button"
              onClick={() => setStatusMsg("")}
              className="text-[10px] uppercase tracking-wider text-[#93c5fd] hover:text-white"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8 flex flex-wrap gap-3 border-b border-[#1c2536] pb-5">
          <button
            type="button"
            onClick={() => setActiveTab("achievements")}
            className={`inline-flex items-center gap-2.5 border px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === "achievements"
                ? "border-[#3b82f6] bg-[#2563eb] text-white"
                : "border-[#1c2536] bg-[#0b101b] text-[#94a0b4] hover:border-[#3b82f6] hover:text-white"
            }`}
          >
            <Award size={15} /> 01 / Prestasi, Lomba &amp; Sertifikasi (
            {cmsData.achievements.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className={`inline-flex items-center gap-2.5 border px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === "gallery"
                ? "border-[#3b82f6] bg-[#2563eb] text-white"
                : "border-[#1c2536] bg-[#0b101b] text-[#94a0b4] hover:border-[#3b82f6] hover:text-white"
            }`}
          >
            <ImageIcon size={15} /> 02 / Galeri Dokumentasi (
            {cmsData.gallery.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("projects")}
            className={`inline-flex items-center gap-2.5 border px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === "projects"
                ? "border-[#3b82f6] bg-[#2563eb] text-white"
                : "border-[#1c2536] bg-[#0b101b] text-[#94a0b4] hover:border-[#3b82f6] hover:text-white"
            }`}
          >
            <FolderGit2 size={15} /> 03 / Proyek &amp; Eksperimen (
            {cmsData.projects.length})
          </button>
        </div>

        {/* =================================================================
            TAB 1: ACHIEVEMENTS (PRESTASI, LOMBA & SERTIFIKASI)
            ================================================================= */}
        {activeTab === "achievements" && (
          <div className="grid gap-8 lg:grid-cols-[1fr_440px]">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="eyebrow accent">
                    RECOGNITION &amp; AWARDS
                  </span>
                  <h2 className="display mt-1 text-3xl">
                    DAFTAR PRESTASI, LOMBA &amp; SERTIFIKASI
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingAchievement({
                      id: `ach-${Date.now()}`,
                      title: "",
                      event: "",
                      rank: "JUARA 1 / WINNER",
                      year: "2026",
                      category: "Prestasi & Lomba",
                      descriptionId: "",
                      descriptionEn: "",
                      certificateImage: "",
                      proofUrl: "",
                    })
                  }
                  className="solid-button"
                  style={{ minHeight: "40px", padding: "10px 16px" }}
                >
                  <Plus size={15} /> Tambah Prestasi / Lomba
                </button>
              </div>

              <div className="flex flex-col border-t border-[#1c2536]">
                {cmsData.achievements.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1c2536] bg-[#090d16] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="display text-2xl text-[#3b82f6]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="border border-[#243557] bg-[#101c35] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#93c5fd]">
                            {item.category}
                          </span>
                          <span className="border border-[#3b82f6]/40 bg-[#2563eb]/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            {item.rank}
                          </span>
                          <span className="text-xs font-bold text-[#60a5fa]">
                            {item.year}
                          </span>
                        </div>
                        <h3 className="mt-1.5 text-base font-bold text-[#f2efeb]">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#94a0b4]">{item.event}</p>
                        <p className="mt-1 max-w-xl text-xs text-[#cbd5e1]">
                          {item.descriptionId}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingAchievement({ ...item })}
                        className="outline-button"
                        style={{ minHeight: "36px", padding: "6px 12px" }}
                      >
                        <Edit3 size={13} /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const next = {
                            ...cmsData,
                            achievements: cmsData.achievements.filter(
                              (a) => a.id !== item.id
                            ),
                          };
                          persistAll(next, "Prestasi dihapus");
                        }}
                        className="border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300 hover:border-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editor Panel for Achievement */}
            <div className="border border-[#243557] bg-[#0b101b] p-6 h-fit sticky top-24">
              <span className="eyebrow accent">
                {editingAchievement ? "FORM EDITOR PRESTASI" : "PILIH ATAU TAMBAH"}
              </span>
              <h3 className="display mt-1 text-2xl">
                {editingAchievement
                  ? "EDIT / TAMBAH PRESTASI & LOMBA"
                  : "KELOLA PENCAPAIAN"}
              </h3>

              {!editingAchievement ? (
                <p className="mt-3 text-xs text-[#94a0b4]">
                  Klik tombol <strong>Tambah Prestasi / Lomba</strong> atau klik{" "}
                  <strong>Edit</strong> pada salah satu baris di samping untuk
                  memperbarui data maupun mengunggah foto sertifikat/piagam.
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const exists = cmsData.achievements.some(
                      (a) => a.id === editingAchievement.id
                    );
                    const nextList = exists
                      ? cmsData.achievements.map((a) =>
                          a.id === editingAchievement.id
                            ? editingAchievement
                            : a
                        )
                      : [editingAchievement, ...cmsData.achievements];
                    persistAll(
                      { ...cmsData, achievements: nextList },
                      "Data prestasi & sertifikasi berhasil disimpan"
                    );
                    setEditingAchievement(null);
                  }}
                  className="mt-4 flex flex-col gap-3.5 text-xs"
                >
                  <label className="flex flex-col gap-1 text-[#94a0b4]">
                    Judul Prestasi / Nama Lomba / Sertifikasi *
                    <input
                      required
                      value={editingAchievement.title}
                      onChange={(e) =>
                        setEditingAchievement({
                          ...editingAchievement,
                          title: e.target.value,
                        })
                      }
                      placeholder="Contoh: Juara 1 Lomba Web Development Nasional"
                      className="border border-[#243557] bg-[#07090e] px-3 py-2.5 text-[#f2efeb]"
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-[#94a0b4]">
                    Penyelenggara / Ajang / Instansi *
                    <input
                      required
                      value={editingAchievement.event}
                      onChange={(e) =>
                        setEditingAchievement({
                          ...editingAchievement,
                          event: e.target.value,
                        })
                      }
                      placeholder="Contoh: Gemastik / Universitas Andalas"
                      className="border border-[#243557] bg-[#07090e] px-3 py-2.5 text-[#f2efeb]"
                    />
                  </label>

                  <div className="grid grid-cols-3 gap-2.5">
                    <label className="flex flex-col gap-1 text-[#94a0b4]">
                      Kategori
                      <select
                        value={editingAchievement.category}
                        onChange={(e) =>
                          setEditingAchievement({
                            ...editingAchievement,
                            category: e.target
                              .value as AchievementItem["category"],
                          })
                        }
                        className="border border-[#243557] bg-[#07090e] px-2.5 py-2.5 text-[#f2efeb]"
                      >
                        <option value="Prestasi & Lomba">
                          Prestasi &amp; Lomba
                        </option>
                        <option value="Sertifikasi">Sertifikasi</option>
                        <option value="Akademik">Akademik</option>
                      </select>
                    </label>

                    <label className="flex flex-col gap-1 text-[#94a0b4]">
                      Peringkat / Badge
                      <input
                        required
                        value={editingAchievement.rank}
                        onChange={(e) =>
                          setEditingAchievement({
                            ...editingAchievement,
                            rank: e.target.value,
                          })
                        }
                        placeholder="JUARA 1 / FINALIST"
                        className="border border-[#243557] bg-[#07090e] px-3 py-2.5 text-[#f2efeb]"
                      />
                    </label>

                    <label className="flex flex-col gap-1 text-[#94a0b4]">
                      Tahun
                      <input
                        required
                        value={editingAchievement.year}
                        onChange={(e) =>
                          setEditingAchievement({
                            ...editingAchievement,
                            year: e.target.value,
                          })
                        }
                        placeholder="2026"
                        className="border border-[#243557] bg-[#07090e] px-3 py-2.5 text-[#f2efeb]"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-1 text-[#94a0b4]">
                    Deskripsi Singkat (Bahasa Indonesia) *
                    <textarea
                      required
                      rows={3}
                      value={editingAchievement.descriptionId}
                      onChange={(e) =>
                        setEditingAchievement({
                          ...editingAchievement,
                          descriptionId: e.target.value,
                          descriptionEn:
                            editingAchievement.descriptionEn || e.target.value,
                        })
                      }
                      className="border border-[#243557] bg-[#07090e] px-3 py-2 text-[#f2efeb]"
                    />
                  </label>

                  <div className="flex flex-col gap-2 border border-[#1e2d4a] bg-[#07090e] p-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#60a5fa]">
                      Foto Sertifikat / Dokumentasi Lomba (Opsional)
                    </span>
                    <input
                      type="text"
                      value={editingAchievement.certificateImage || ""}
                      onChange={(e) =>
                        setEditingAchievement({
                          ...editingAchievement,
                          certificateImage: e.target.value,
                        })
                      }
                      placeholder="Paste URL gambar atau upload file di bawah…"
                      className="border border-[#243557] bg-[#0b101b] px-3 py-2 text-[#f2efeb]"
                    />
                    <label className="inline-flex cursor-pointer items-center justify-center gap-2 border border-[#3b82f6] bg-[#101f3c] px-3 py-2 text-[11px] font-semibold text-white hover:bg-[#2563eb]">
                      <Upload size={14} /> Pilih File Foto dari Perangkat
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const dataUrl = await compressImageFileToDataUrl(
                            file
                          );
                          setEditingAchievement({
                            ...editingAchievement,
                            certificateImage: dataUrl,
                          });
                        }}
                      />
                    </label>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="solid-button flex-1"
                    >
                      <Save size={15} /> Simpan Prestasi
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingAchievement(null)}
                      className="outline-button"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 2: GALLERY (GALERI DOKUMENTASI & KEGIATAN)
            ================================================================= */}
        {activeTab === "gallery" && (
          <div className="grid gap-8 lg:grid-cols-[1fr_440px]">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="eyebrow accent">VISUAL ARCHIVE</span>
                  <h2 className="display mt-1 text-3xl">
                    GALERI DOKUMENTASI LOMBA &amp; KEGIATAN
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingGallery({
                      id: `gal-${Date.now()}`,
                      title: "",
                      captionId: "",
                      captionEn: "",
                      category: "Kompetisi",
                      date: "2026",
                      location: "Padang",
                      imageUrl: "",
                    })
                  }
                  className="solid-button"
                  style={{ minHeight: "40px", padding: "10px 16px" }}
                >
                  <Plus size={15} /> Upload Foto Galeri Baru
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {cmsData.gallery.map((item) => (
                  <div
                    key={item.id}
                    className="border border-[#1c2536] bg-[#090d16] flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-video w-full bg-[#060911] border-b border-[#1c2536] overflow-hidden flex items-center justify-center">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <span className="text-xs text-[#94a0b4]">
                            Belum ada gambar
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#60a5fa]">
                          <span>{item.category}</span>
                          <span>
                            {item.location} · {item.date}
                          </span>
                        </div>
                        <h3 className="mt-1 text-sm font-bold uppercase text-[#f2efeb]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs text-[#94a0b4]">
                          {item.captionId}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-[#1c2536] p-3">
                      <button
                        type="button"
                        onClick={() => setEditingGallery({ ...item })}
                        className="outline-button"
                        style={{ minHeight: "34px", padding: "6px 12px" }}
                      >
                        <Edit3 size={13} /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const next = {
                            ...cmsData,
                            gallery: cmsData.gallery.filter(
                              (g) => g.id !== item.id
                            ),
                          };
                          persistAll(next, "Foto galeri dihapus");
                        }}
                        className="border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:border-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editor Panel for Gallery */}
            <div className="border border-[#243557] bg-[#0b101b] p-6 h-fit sticky top-24">
              <span className="eyebrow accent">FORM GALERI DOKUMENTASI</span>
              <h3 className="display mt-1 text-2xl">
                {editingGallery ? "UPLOAD / EDIT FOTO GALERI" : "PILIH FOTO"}
              </h3>

              {!editingGallery ? (
                <p className="mt-3 text-xs text-[#94a0b4]">
                  Klik <strong>Upload Foto Galeri Baru</strong> untuk
                  menambahkan dokumentasi menang lomba, kegiatan kampus, atau
                  screenshot arsitektur proyek.
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const exists = cmsData.gallery.some(
                      (g) => g.id === editingGallery.id
                    );
                    const nextList = exists
                      ? cmsData.gallery.map((g) =>
                          g.id === editingGallery.id ? editingGallery : g
                        )
                      : [editingGallery, ...cmsData.gallery];
                    persistAll(
                      { ...cmsData, gallery: nextList },
                      "Foto galeri berhasil disimpan"
                    );
                    setEditingGallery(null);
                  }}
                  className="mt-4 flex flex-col gap-3.5 text-xs"
                >
                  <label className="flex flex-col gap-1 text-[#94a0b4]">
                    Judul Dokumentasi / Momen *
                    <input
                      required
                      value={editingGallery.title}
                      onChange={(e) =>
                        setEditingGallery({
                          ...editingGallery,
                          title: e.target.value,
                        })
                      }
                      placeholder="Contoh: Final Presentasi Lomba Sistem Informasi"
                      className="border border-[#243557] bg-[#07090e] px-3 py-2.5 text-[#f2efeb]"
                    />
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    <label className="flex flex-col gap-1 text-[#94a0b4]">
                      Kategori
                      <select
                        value={editingGallery.category}
                        onChange={(e) =>
                          setEditingGallery({
                            ...editingGallery,
                            category: e.target.value as GalleryItem["category"],
                          })
                        }
                        className="border border-[#243557] bg-[#07090e] px-2 py-2.5 text-[#f2efeb]"
                      >
                        <option value="Kompetisi">Kompetisi</option>
                        <option value="Proyek & Riset">Proyek &amp; Riset</option>
                        <option value="Kampus & Organisasi">
                          Kampus &amp; Organisasi
                        </option>
                      </select>
                    </label>

                    <label className="flex flex-col gap-1 text-[#94a0b4]">
                      Lokasi
                      <input
                        required
                        value={editingGallery.location}
                        onChange={(e) =>
                          setEditingGallery({
                            ...editingGallery,
                            location: e.target.value,
                          })
                        }
                        placeholder="Padang / UNAND"
                        className="border border-[#243557] bg-[#07090e] px-2.5 py-2.5 text-[#f2efeb]"
                      />
                    </label>

                    <label className="flex flex-col gap-1 text-[#94a0b4]">
                      Tahun / Tanggal
                      <input
                        required
                        value={editingGallery.date}
                        onChange={(e) =>
                          setEditingGallery({
                            ...editingGallery,
                            date: e.target.value,
                          })
                        }
                        placeholder="2026"
                        className="border border-[#243557] bg-[#07090e] px-2.5 py-2.5 text-[#f2efeb]"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-1 text-[#94a0b4]">
                    Keterangan / Caption *
                    <textarea
                      required
                      rows={3}
                      value={editingGallery.captionId}
                      onChange={(e) =>
                        setEditingGallery({
                          ...editingGallery,
                          captionId: e.target.value,
                          captionEn: editingGallery.captionEn || e.target.value,
                        })
                      }
                      className="border border-[#243557] bg-[#07090e] px-3 py-2 text-[#f2efeb]"
                    />
                  </label>

                  <div className="flex flex-col gap-2 border border-[#1e2d4a] bg-[#07090e] p-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#60a5fa]">
                      File Gambar / Foto Dokumentasi *
                    </span>
                    <input
                      required
                      type="text"
                      value={editingGallery.imageUrl}
                      onChange={(e) =>
                        setEditingGallery({
                          ...editingGallery,
                          imageUrl: e.target.value,
                        })
                      }
                      placeholder="URL gambar atau pilih file di bawah…"
                      className="border border-[#243557] bg-[#0b101b] px-3 py-2 text-[#f2efeb]"
                    />
                    <label className="inline-flex cursor-pointer items-center justify-center gap-2 border border-[#3b82f6] bg-[#101f3c] px-3 py-2 text-[11px] font-semibold text-white hover:bg-[#2563eb]">
                      <Upload size={14} /> Upload Foto dari Laptop / HP
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const dataUrl = await compressImageFileToDataUrl(
                            file
                          );
                          setEditingGallery({
                            ...editingGallery,
                            imageUrl: dataUrl,
                          });
                        }}
                      />
                    </label>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="solid-button flex-1"
                    >
                      <Save size={15} /> Simpan ke Galeri
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingGallery(null)}
                      className="outline-button"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 3: PROJECTS & EXPERIMENTS (01 / SELECTED WORK)
            ================================================================= */}
        {activeTab === "projects" && (
          <div className="grid gap-8 lg:grid-cols-[1fr_440px]">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="eyebrow accent">01 / SELECTED WORK</span>
                  <h2 className="display mt-1 text-3xl">
                    DAFTAR PROYEK &amp; EKSPERIMEN SISTEM
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingProject({
                      id: `proj-${Date.now()}`,
                      title: "",
                      category: "Full-Stack Web",
                      year: "2026",
                      role: "Full-Stack & Backend Developer",
                      type: "fullstack",
                      architecture: "NEXT.JS → REST API → SQL DATABASE",
                      stack: ["Next.js", "TypeScript", "SQL"],
                      descriptionId: "",
                      descriptionEn: "",
                      highlightsId: ["Fitur utama 1", "Fitur utama 2"],
                      highlightsEn: ["Key feature 1", "Key feature 2"],
                      repoUrl: "https://github.com/Shevaramadhan",
                    })
                  }
                  className="solid-button"
                  style={{ minHeight: "40px", padding: "10px 16px" }}
                >
                  <Plus size={15} /> Tambah Proyek Baru
                </button>
              </div>

              <div className="flex flex-col border-t border-[#1c2536]">
                {cmsData.projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1c2536] bg-[#090d16] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="display text-2xl text-[#3b82f6]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#60a5fa]">
                          {proj.category} · {proj.year} · {proj.role}
                        </span>
                        <h3 className="mt-1 text-base font-bold text-[#f2efeb]">
                          {proj.title}
                        </h3>
                        <p className="font-mono text-[10px] text-[#93c5fd]">
                          {proj.architecture}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingProject({ ...proj })}
                        className="outline-button"
                        style={{ minHeight: "36px", padding: "6px 12px" }}
                      >
                        <Edit3 size={13} /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const next = {
                            ...cmsData,
                            projects: cmsData.projects.filter(
                              (p) => p.id !== proj.id
                            ),
                          };
                          persistAll(next, "Proyek dihapus");
                        }}
                        className="border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300 hover:border-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editor Panel for Project */}
            <div className="border border-[#243557] bg-[#0b101b] p-6 h-fit sticky top-24">
              <span className="eyebrow accent">FORM EDITOR PROYEK</span>
              <h3 className="display mt-1 text-2xl">
                {editingProject ? "TAMBAH / EDIT PROYEK" : "PILIH PROYEK"}
              </h3>

              {!editingProject ? (
                <p className="mt-3 text-xs text-[#94a0b4]">
                  Klik <strong>Tambah Proyek Baru</strong> atau klik{" "}
                  <strong>Edit</strong> pada proyek di samping untuk mengubah
                  judul, arsitektur, tech stack, maupun link GitHub.
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const exists = cmsData.projects.some(
                      (p) => p.id === editingProject.id
                    );
                    const nextList = exists
                      ? cmsData.projects.map((p) =>
                          p.id === editingProject.id ? editingProject : p
                        )
                      : [editingProject, ...cmsData.projects];
                    persistAll(
                      { ...cmsData, projects: nextList },
                      "Data proyek berhasil disimpan"
                    );
                    setEditingProject(null);
                  }}
                  className="mt-4 flex flex-col gap-3.5 text-xs"
                >
                  <label className="flex flex-col gap-1 text-[#94a0b4]">
                    Judul Proyek *
                    <input
                      required
                      value={editingProject.title}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          title: e.target.value.toUpperCase(),
                        })
                      }
                      className="border border-[#243557] bg-[#07090e] px-3 py-2.5 text-[#f2efeb]"
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-2.5">
                    <label className="flex flex-col gap-1 text-[#94a0b4]">
                      Kategori
                      <select
                        value={editingProject.category}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            category: e.target.value,
                          })
                        }
                        className="border border-[#243557] bg-[#07090e] px-2.5 py-2.5 text-[#f2efeb]"
                      >
                        <option value="Full-Stack Web">Full-Stack Web</option>
                        <option value="Backend API">Backend API</option>
                        <option value="Enterprise Arch">Enterprise Arch</option>
                        <option value="Database">Database</option>
                      </select>
                    </label>

                    <label className="flex flex-col gap-1 text-[#94a0b4]">
                      Tahun
                      <input
                        required
                        value={editingProject.year}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            year: e.target.value,
                          })
                        }
                        className="border border-[#243557] bg-[#07090e] px-3 py-2.5 text-[#f2efeb]"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-1 text-[#94a0b4]">
                    Peran (Role) *
                    <input
                      required
                      value={editingProject.role}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          role: e.target.value,
                        })
                      }
                      className="border border-[#243557] bg-[#07090e] px-3 py-2.5 text-[#f2efeb]"
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-[#94a0b4]">
                    Alur Arsitektur Sistem *
                    <input
                      required
                      value={editingProject.architecture}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          architecture: e.target.value,
                        })
                      }
                      placeholder="NEXT.JS → REST API → POSTGRESQL"
                      className="border border-[#243557] bg-[#07090e] px-3 py-2.5 font-mono text-[#f2efeb]"
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-[#94a0b4]">
                    Tech Stack (pisahkan dengan koma) *
                    <input
                      required
                      value={editingProject.stack.join(", ")}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          stack: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="Next.js, TypeScript, Golang, MySQL"
                      className="border border-[#243557] bg-[#07090e] px-3 py-2.5 text-[#f2efeb]"
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-[#94a0b4]">
                    Deskripsi Proyek (ID) *
                    <textarea
                      required
                      rows={3}
                      value={editingProject.descriptionId}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          descriptionId: e.target.value,
                          descriptionEn:
                            editingProject.descriptionEn || e.target.value,
                        })
                      }
                      className="border border-[#243557] bg-[#07090e] px-3 py-2 text-[#f2efeb]"
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-[#94a0b4]">
                    Link GitHub Repository
                    <input
                      value={editingProject.repoUrl || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          repoUrl: e.target.value,
                        })
                      }
                      className="border border-[#243557] bg-[#07090e] px-3 py-2.5 text-[#f2efeb]"
                    />
                  </label>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="solid-button flex-1"
                    >
                      <Save size={15} /> Simpan Proyek
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="outline-button"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

