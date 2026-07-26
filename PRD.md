# 📄 PRD.md — Product Requirements Document

## 🇮🇩 Estafet Usaha — Platform Suksesi Bisnis Keluarga UMKM Indonesia

- **Kompetisi:** Hackathon Individu ke-10 IndonesiaNEXT (Durasi 24 Jam)
- **Tema Terpilih:** **Literasi Finansial** (*Financial Literacy, Business Valuation & Family Business Governance*)
- **Role Candidate:** **Hacker** (Full-Stack MVP Developer)
- **Target Audience:** Pendiri UMKM Generasi 1 (40–65 Tahun) & Generasi Penerus (22–40 Tahun)

---

## 1. Ringkasan Eksekutif & Value Proposition

**Estafet Usaha** adalah platform digital *All-in-One* terstruktur pertama di Indonesia yang dirancang untuk meningkatkan **Literasi Finansial & Legalitas Suksesi Bisnis Keluarga UMKM**. 

Platform ini membantu keluarga pengusaha merencanakan, menghitung valuasi bisnis, mengelola pajak pengalihan saham, menyusun kesepakatan *Family Charter*, serta berkonsultasi 24/7 dengan **AI Advisor (Google Gemini)** dalam 4 pilar utama: **Legal**, **Finansial**, **Operasional**, dan **Relasional**.

---

## 2. Rumusan Masalah & Pemahaman Konteks (20% Bobot Penilaian)

### 📊 Fakta & Problematika UMKM Keluarga Indonesia:
1. **Penyumbang Ekonomi Utama**: Lebih dari 4,5 juta unit usaha (80%+ total UMKM Indonesia) merupakan bisnis berbasis keluarga.
2. **Krisis Antargenerasi**:
   - **70% bisnis keluarga bangkrut/gagal** di Generasi Kedua.
   - **85% tidak memiliki perencanaan suksesi** atau dokumen hukum yang sah.
   - Mitos klasik *"Generasi 1 Membangun, Generasi 2 Menikmati, Generasi 3 Menghancurkan"*.

### 🔍 Akar Masalah Multidimensi:

| Dimensi Masalah | Deskripsi Problematika UMKM |
|---|---|
| 🧮 **Literasi Finansial** | Pendiri & Penerus tidak tahu cara melakukan valuasi bisnis secara tepat dan tidak memperhitungkan beban pajak hibah/pengalihan saham. |
| 📜 **Legalitas Hukum** | Penyerahan kepemilikan bisnis dilakukan lisan tanpa Akta Hibah Notaris & pencatatan Kemenkumham. |
| 🔄 **Operasional & Transfer Knowledge** | Pengetahuan bisnis, SOP, dan relasi vendor hanya tersimpan di kepala Pendiri. |
| 🤝 **Relasional & Komunikasi** | Hambatan emosional dan ketiadaan Perjanjian Tata Kelola Keluarga (*Family Charter*). |

---

## 3. Spesifikasi Fitur MVP (20% Kualitas & Kegunaan Output)

### 3.1 Financial Simulator & Valuasi Bisnis (`/simulator`)
- **Estimasi Nilai Pasar (Valuasi)**: Kalkulasi nilai pasar bisnis menggunakan *EBITDA Multiplier* spesifik industri (Perdagangan, Manufaktur, Jasa, Kuliner).
- **Kalkulator Pajak & Biaya Transisi**: Menghitung estimasi Bea Balik Nama/Notaris dan Pajak Pengalihan Saham/Hibah.
- **Proyeksi Pembagian Dividen**: Skema alokasi dividen ditahan untuk ekspansi vs dividen keluarga.

### 3.2 AI Suksesi Advisor (`/advisor`)
- **Powered by Google Gemini AI**: Konsultan AI interaktif 24/7 khusus hukum & tata kelola bisnis keluarga Indonesia.
- **Multi-Model Auto-Fallback Engine**: Sistem cerdas yang secara otomatis beralih antar-model (`gemini-2.5-flash`, `gemini-3.1-flash-lite`) untuk menjamin zero-downtime.
- **1-Click Copy & Markdown Clean**: Rendering pesan bersih tanpa karakter raw asterisk dan tombol 1-click salin.

### 3.3 Readiness Score Radar & Milestone Tracker (`/dashboard` & `/milestones`)
- **Readiness Score Metrics (0–100%)**: Perhitungan tingkat kesiapan suksesi secara real-time.
- **12 Milestone Terstruktur**: Pemetaaan 12 langkah suksesi lintas 4 pilar (Legal, Finansial, Operasional, Relasional).

### 3.4 Automated Family Charter Generator (`/documents`)
- **Generator Piagam Keluarga**: Penyusunan Piagam Kesepakatan Tata Kelola & Remunerasi Keluarga siap cetak & tanda tangan secara otomatis.
- **Custom Rule Parameters**: Hak veto pendiri, alokasi dividen, dan gaji penerus.

### 3.5 Bilik Dokumen / Document Vault (`/vault`)
- **Vault Terenkripsi**: Tempat penyimpanan terpusat untuk Akta Pendirian, SIUP, NPWP, NIB, dan Sertifikat Merek dengan perlindungan Supabase RLS.

### 3.6 Learning Hub (`/learn`)
- **Modul Edukasi Suksesi**: Materi pembelajaran interaktif tentang pendelegasian operasional, komunikasi keluarga, dan kepatuhan hukum.

---

## 4. Arsitektur Teknis & Kompetensi Role Hacker (30% Bobot Penilaian)

### 💻 Stack Teknologi:
- **Framework**: Next.js 16.2 (React 19, App Router)
- **Styling**: Tailwind CSS v4 + Revolut Light Design System
- **Database & Auth**: Supabase PostgreSQL dengan Row Level Security (RLS)
- **AI Integration**: Google Generative AI SDK (`@google/generative-ai`)
- **Security**: Environment Variables Server-Side (`.env.local`), Tanpa Hardcode API Key

### 🗄️ Supabase Database Schema:
```sql
-- Profiles Table
profiles (id UUID PRIMARY KEY, full_name TEXT, role TEXT, business_id UUID, created_at TIMESTAMPTZ)

-- Businesses Table
businesses (id UUID PRIMARY KEY, name TEXT, description TEXT, industry TEXT, founded_year INT, owner_id UUID, invite_code TEXT, created_at TIMESTAMPTZ)

-- Business Members Table
business_members (id UUID PRIMARY KEY, business_id UUID, user_id UUID, role TEXT, joined_at TIMESTAMPTZ)

-- Milestones Table
milestones (id UUID PRIMARY KEY, business_id UUID, title TEXT, description TEXT, category TEXT, status TEXT, due_date DATE, completed_at TIMESTAMPTZ)

-- Vault Documents Table
vault_documents (id UUID PRIMARY KEY, business_id UUID, uploaded_by UUID, title TEXT, category TEXT, file_url TEXT, file_name TEXT, file_size INT)

-- Chat Messages Table
chat_messages (id UUID PRIMARY KEY, business_id UUID, user_id UUID, role TEXT, content TEXT, created_at TIMESTAMPTZ)
```

---

## 5. Orisinalitas & Logika Keputusan Desain (15% Bobot Penilaian)

1. **Keunikan Pendekatan 4 Pilar**: Solusi pertama yang mengintegrasikan Literasi Finansial, Legalitas Notaris, SOP Operasional, dan Harmonisisasi Relasi Keluarga dalam 1 aplikasi.
2. **Revolut Light Aesthetic**: Mengadopsi standar desain visual fintech dunia (Light Canvas `#f8fafc`, Obsidian Dark Sidebar `#0d1117`, Cobalt Accent `#4f46e5`, High-contrast Typography) yang disukai pengguna modern.
3. **Micro-Component Architecture**: Kode terstruktur secara modular dalam folder `features/`, memudahkan pemeliharaan, skala, dan kolaborasi tim.

---

## 6. Riwayat Commit & Pipeline Penuh (Persyaratan Hacker)

- ✅ **Commit GitHub Terstruktur**: Riwayat 9+ commit per fitur (*Feature-by-Feature Commits*) tanpa commit tunggal raksasa.
- ✅ **Tanpa Hardcode Credentials**: Seluruh kunci API (`GEMINI_API_KEY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) tersimpan di `.env.local`.
- ✅ **Koneksi Database & LLM Penuh**: Pipa data dari User Interface $\rightarrow$ Server API Route $\rightarrow$ Supabase Database $\rightarrow$ Google Gemini LLM API.

---

*PRD ini disusun secara resmi untuk memenuhi persyaratan penyerahan karya Hackathon Individu ke-10 IndonesiaNEXT.*
