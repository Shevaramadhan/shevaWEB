# Direktori Asset Portofolio Sheva (`public/assets/`)

Seluruh aset visual (logo skill/tech stack, ikon orbit, foto profil, dan thumbnail proyek) disimpan di dalam folder ini agar mudah diganti atau ditambah kapan saja tanpa harus mengubah kode komponen utama.

## Struktur Folder

```text
public/assets/
├── brand/
│   └── center-emblem.svg              # Logo/emblem utama di tengah bola bercahaya
├── profile/
│   └── sheva-portrait-placeholder.svg # Tempat meletakkan foto diri (.png/.webp) & file CV (.pdf)
├── projects/
│   └── project-placeholder.svg        # Tempat meletakkan screenshot/thumbnail proyek (rasio 16:10)
└── skills/
    ├── badges/                        # Logo lingkaran di baris atas bagian Skills (19 file contoh)
    │   ├── figma.svg
    │   ├── react.svg
    │   ├── cpp.svg
    │   ├── nodejs.svg
    │   ├── redux.svg
    │   ├── javascript.svg
    │   ├── css3.svg
    │   ├── xd.svg
    │   ├── nextjs.svg
    │   ├── gatsby.svg
    │   ├── illustrator.svg
    │   ├── express.svg
    │   ├── mongodb.svg
    │   ├── typescript.svg             # (Contoh tambahan siap pakai)
    │   ├── laravel.svg                # (Contoh tambahan siap pakai)
    │   ├── postgresql.svg             # (Contoh tambahan siap pakai)
    │   ├── docker.svg                 # (Contoh tambahan siap pakai)
    │   ├── golang.svg                 # (Contoh tambahan siap pakai)
    │   └── python.svg                 # (Contoh tambahan siap pakai)
    └── orbit/                         # Ikon monokrom biru yang berputar di 3 cincin elips Orbit
        ├── react-orbit.svg
        ├── nodejs-orbit.svg
        ├── figma-orbit.svg
        ├── css3-orbit.svg
        ├── linkedin-orbit.svg
        ├── code-orbit.svg
        ├── js-orbit.svg
        ├── xd-orbit.svg
        ├── gatsby-orbit.svg
        ├── ai-orbit.svg
        ├── swift-orbit.svg
        ├── tag-orbit.svg
        ├── ts-orbit.svg
        ├── nextjs-orbit.svg
        └── database-orbit.svg
```

## Cara Mengganti / Menambah Logo Skill
1. Taruh file logo baru Anda (`.svg`, `.png`, atau `.webp`) ke dalam folder `public/assets/skills/badges/` atau `public/assets/skills/orbit/`.
2. Buka file konfigurasi [`src/data/skillsAssets.ts`](../../src/data/skillsAssets.ts).
3. Ubah atau tambahkan baris objek pada `SKILL_BADGES_ROW_1`, `SKILL_BADGES_ROW_2`, atau `ORBIT_*_ICONS`:
   ```ts
   { name: "Laravel", src: "/assets/skills/badges/laravel.svg", width: 26, height: 26 },
   ```

