# ESTAFET USAHA - PROJECT CODING & DESIGN STANDARDS

## 1. Bebas Emoji Raw & Wajib Gunakan Ikon SVG (`@phosphor-icons/react`)
- Dilarang keras menggunakan character emoji mentah (seperti 🛡️, ⭐, ⚖️, 📍, dll.) di dalam kode UI `.tsx`.
- Semua elemen dekoratif, indikator, dan tombol wajib menggunakan komponen SVG dari `@phosphor-icons/react` (misal `<ShieldCheck />`, `<Star />`, `<Scales />`, `<MapPin />`, `<Check />`, `<Copy />`).

## 2. Arsitektur Mikro Komponen (Micro-Components Architecture)
- Setiap fitur UI wajib dipecah menjadi **mikro komponen independen & modular dengan ukuran ringkas (< 60–80 baris per file)**.
- Dilarang membuat satu file raksasa berisi ratusan baris.
- Strukturkan sub-komponen ke dalam folder yang rapi (misal: `components/modal/`, `components/view/`, `components/common/`).

## 3. Sistem Desain Warna & Design Tokens (`globals.css`)
- Seluruh styling warna wajib mengacu pada variabel CSS design tokens di `globals.css`:
  - **Brand Colors**: `var(--color-primary)` (`#4f46e5`), `var(--color-primary-bright)` (`#6366f1`), `var(--color-primary-deep)` (`#4338ca`), `var(--color-on-primary)` (`#ffffff`).
  - **Canvas & Surfaces**: `var(--color-canvas-dark)` (`#f8fafc`), `var(--color-surface-soft)` (`#f1f5f9`), `var(--color-surface-card)` (`#ffffff`).
  - **Text Colors**: `var(--color-ink)` (`#0f172a`), `var(--color-charcoal)` (`#334155`), `var(--color-mute)` (`#475569`), `var(--color-stone)` (`#64748b`).
  - **Borders & Hairlines**: `var(--color-hairline-dark)` (`#e2e8f0`), `var(--color-hairline-strong)` (`#cbd5e1`).
- **Tab & Segmented Control**: Dilarang menggunakan *white-on-white*. Kontainer tab wajib menggunakan background abu-abu terang (`#f1f5f9` / `var(--color-surface-soft)` dengan border `#e2e8f0`), dan tab aktif berupa kartu putih `#ffffff` dengan bayangan halus (`boxShadow: 0 1px 3px rgba(15, 23, 42, 0.08)`) dan teks brand `#4f46e5`.

## 4. Kepatuhan Role & Tipe Data (`types/index.ts` & Database Schema)
- Tipe data `UserRole` harus selalu sinkron dengan skema Supabase (`profiles` & `business_members`): `"pendiri" | "penerus" | "calon_penerus" | "notaris" | "advisor"`.
- Pilihan registrasi (Auth Form) berfokus pada 3 peran utama manusia:
  1. **Pendiri** (*Owner*)
  2. **Penerus** (*Successor*)
  3. **Notaris Partner** (*Legal Practitioner*)
- Konsultasi suksesi & jawaban pintar dijalankan oleh **AI Advisor** (`/advisor`).

## 5. Verifikasi Wajib Build Production
- Setiap perubahan kode harus diverifikasi melalui `npm run build` dan dipastikan 100% bebas dari error TypeScript / type-check sebelum tugas selesai.
