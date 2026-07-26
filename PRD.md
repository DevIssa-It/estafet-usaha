# PRD.md — Estafet Usaha

## Product Requirements Document

**Versi:** 1.0.0  
**Tanggal:** 26 Juli 2025  
**Dibuat untuk:** IndonesiaNEXT Hackathon Individu ke-10  
**Tema:** Literasi Finansial  
**Role:** Hacker  

---

## 1. Ringkasan Produk

**Estafet Usaha** adalah platform digital yang membantu keluarga pengusaha UMKM Indonesia merencanakan, mengelola, dan mengeksekusi proses suksesi bisnis antargenerasi. Platform ini menggabungkan milestone tracker empat dimensi, AI advisor berbasis Gemini 2.0 Flash, dan sistem manajemen bisnis keluarga dalam satu aplikasi terintegrasi.

---

## 2. Rumusan Masalah

### Konteks
Indonesia memiliki lebih dari 4,5 juta usaha keluarga yang menyumbang sekitar 85% dari total UMKM nasional. Namun, studi dari BRIN dan jurnal akademik menunjukkan bahwa:

- **70% bisnis keluarga gagal bertahan di generasi kedua**
- **85% tidak memiliki rencana suksesi tertulis**
- **Rata-rata waktu ideal proses suksesi adalah 12 tahun**, namun jarang direncanakan sejak dini

### Dimensi Masalah
Kegagalan suksesi bisnis keluarga bersifat multidimensi:

| Dimensi | Masalah |
|---|---|
| **Legal** | Ketidakjelasan struktur kepemilikan, tidak ada dokumen suksesi resmi |
| **Finansial** | Tidak ada valuasi bisnis, tidak memahami implikasi pajak warisan |
| **Operasional** | Transfer pengetahuan yang tidak terstruktur, SOP tidak terdokumentasi |
| **Relasional** | Konflik ekspektasi antara generasi, kurangnya komunikasi terbuka |

### Target User
- **Pendiri:** Pemilik bisnis keluarga generasi pertama (40–65 tahun) yang mulai memikirkan suksesi
- **Penerus:** Anggota keluarga generasi kedua (25–40 tahun) yang akan mengambil alih bisnis

---

## 3. Solusi

### Value Proposition
> *"Platform satu pintu untuk merencanakan suksesi bisnis keluarga secara terstruktur, dengan panduan AI personal dan tracker progres visual."*

### Fitur Utama (MVP)

#### 3.1 Milestone Tracker — 4 Dimensi Suksesi
12 milestone default yang mencakup:
- **Legal (3 milestone):** Inventarisasi dokumen, konsultasi notaris, pembaruan struktur kepemilikan
- **Finansial (3 milestone):** Valuasi bisnis, perencanaan pajak, audit keuangan
- **Operasional (3 milestone):** Dokumentasi SOP, pemetaan stakeholder, program pelatihan
- **Relasional (3 milestone):** Diskusi keluarga, perkenalan stakeholder, Family Charter

#### 3.2 AI Advisor — Gemini 2.0 Flash
- Chatbot konsultan suksesi bisnis berbasis LLM
- Context-aware: respons berbeda untuk role Pendiri vs Penerus
- Riwayat percakapan tersimpan di database per bisnis
- Suggested prompts berdasarkan role

#### 3.3 Multi-Role Dashboard
- **Pendiri:** Pantau semua milestone, generate kode undangan, lihat tim suksesi
- **Penerus:** Update status milestone, akses AI advisor, pantau progres keseluruhan
- Invite system: Penerus bergabung via kode 6 karakter unik

---

## 4. Arsitektur Teknis

### Stack
| Layer | Teknologi | Alasan Pemilihan |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSR/SSG, API routes, optimal untuk SEO |
| Styling | Tailwind CSS v4 + shadcn/ui | Component-based, Revolut design system |
| Database | Supabase (PostgreSQL) | Built-in auth, RLS, realtime ready |
| AI | Google Gemini 2.0 Flash | Free tier generous, quality terbaik, Bahasa Indonesia |
| Deploy | Vercel | Zero-config deploy, public URL instan |
| Auth | Supabase Auth | JWT + cookie-based, middleware protection |

### Arsitektur Aplikasi
```
app/
├── (app)/              # Route group — protected app shell
│   ├── layout.tsx      # Sidebar layout + auth check
│   ├── dashboard/      # Dashboard overview
│   ├── advisor/        # AI Chat
│   ├── milestones/     # Milestone tracker
│   └── onboarding/     # First-time setup
├── (auth)/             # Auth pages
├── api/advisor/chat/   # Gemini API route (server-side, no key exposure)
└── page.tsx            # Landing page
features/               # Feature-based modular architecture
├── dashboard/components/
├── advisor/components/
├── milestones/components/ + actions/
└── onboarding/actions/
```

### Keamanan
- API key Gemini tersimpan di environment variable server-side (`GEMINI_API_KEY`)
- Row Level Security (RLS) di Supabase: setiap user hanya bisa akses data bisnis mereka sendiri
- Middleware auth: semua rute `/dashboard`, `/advisor`, `/milestones` dilindungi

### Database Schema
```
profiles (id, full_name, role, business_id, created_at)
businesses (id, name, description, industry, founded_year, owner_id, invite_code, created_at)
business_members (id, business_id, user_id, role, joined_at)
milestones (id, business_id, title, description, category, status, due_date, completed_at, created_at)
chat_messages (id, business_id, user_id, role, content, created_at)
```

---

## 5. User Journey

### Journey Pendiri
```
Landing → Register (pilih "Pendiri") → Onboarding (isi data bisnis) →
Dashboard (lihat 12 milestone + kode undangan) → Milestone (kelola progres) →
Advisor (konsultasi AI strategi delegasi)
```

### Journey Penerus
```
Landing → Register (pilih "Penerus") → Onboarding (masukkan kode undangan) →
Dashboard (lihat progres suksesi) → Milestone (update status tugas) →
Advisor (konsultasi AI strategi pengambilalihan)
```

---

## 6. Keputusan Desain

### Mengapa Suksesi Bisnis?
- Data prevalensi tajam: 70% gagal di generasi kedua, 4,5 juta bisnis keluarga terancam
- Multiple independent dimensions: Legal + Finansial + Operasional + Relasional
- Industri konsultan suksesi sudah ada, membuktikan demand nyata
- LLM sangat natural sebagai "navigator" suksesi: user tahu mereka butuh bantuan, AI membantu mereka tahu *pertanyaan apa yang harus ditanyakan*

### Mengapa 2 Role vs 1?
- Mencerminkan realita: suksesi selalu melibatkan minimal 2 pihak dengan perspektif berbeda
- Memungkinkan demonstrasi RLS Supabase (nilai teknis untuk hackathon)
- AI advisor memberikan respons berbeda berdasarkan role (Pendiri: cara mendelegasikan vs Penerus: cara mengambil alih)

### Limitasi yang Diakui
1. **Tidak menggantikan notaris/akuntan:** Platform ini adalah navigator, bukan pengganti profesional legal/finansial
2. **Scope MVP:** Versi ini tidak mencakup upload dokumen, laporan PDF, atau notifikasi otomatis
3. **AI accuracy:** Gemini 2.0 Flash memberikan panduan umum; kondisi spesifik tiap bisnis perlu validasi profesional

---

## 7. Pipeline Teknis (Hackathon Requirement)

```
User Input (Frontend)
    → Next.js API Route /api/advisor/chat (server-side)
        → Supabase: verify auth + fetch profile/business context
        → Google Gemini 2.0 Flash API (key di env, tidak hardcode)
        → Supabase: save conversation to chat_messages table
    → Response ke client
```

**Semua API key:** Tersimpan di `.env.local` (tidak pernah di-commit ke Git)  
**Bukti pipeline:** Setiap percakapan AI tersimpan di tabel `chat_messages` dengan relasi ke `business_id` dan `user_id`

---

## 8. Metrik Keberhasilan MVP

| Metrik | Target |
|---|---|
| User dapat register dan login | ✅ |
| Pendiri dapat buat bisnis + generate invite code | ✅ |
| Penerus dapat join via invite code | ✅ |
| 12 milestone ter-generate otomatis | ✅ |
| Status milestone dapat diupdate | ✅ |
| AI Advisor merespons dengan context bisnis | ✅ |
| Riwayat chat tersimpan di database | ✅ |
| RLS: user hanya akses data bisnis sendiri | ✅ |
| Deploy publik via Vercel | 🔲 (pending deployment) |

---

*Dokumen ini dibuat sebagai bagian dari submission IndonesiaNEXT Hackathon Individu ke-10.*
