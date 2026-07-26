"use client";

import { useState } from "react";
import { Profile, Business, MilestoneCategory } from "@/types";
import { CourseModuleCard, CourseModule } from "./CourseModuleCard";
import { ArticleReaderModal } from "./ArticleReaderModal";
import { LearningHubHeader } from "./LearningHubHeader";

const INITIAL_MODULES: CourseModule[] = [
  {
    id: "m1",
    title: "Panduan Hukum Suksesi Bisnis & Akta Hibah/Wariskah",
    category: "legal",
    summary: "Memahami aspek legalitas transfer kepemilikan bisnis di Indonesia, notaris, dan pembuatan akta.",
    duration: "5 Menit Baca",
    completed: true,
    content: `Proses suksesi bisnis keluarga di Indonesia wajib memperhatikan kepastian hukum agar tidak menimbulkan sengketa di masa mendatang.

    Beberapa dokumen hukum penting yang harus dipersiapkan:
    1. Akta Pendirian Perusahaan & Perubahan Terakhir.
    2. Sertifikat Merek & Hak Kekayaan Intelektual (HKI).
    3. Akta Penyerahan Saham / Hibah Saham via Notaris.
    4. Perjanjian Keluarga (Family Charter) yang disahkan secara notariil.

    Disarankan untuk mengonsultasikan pembaruan akta dengan Notaris minimal 6 bulan sebelum proses transisi resmi dilakukan.`,
  },
  {
    id: "m2",
    title: "Valuasi UMKM & Perencanaan Pajak Suksesi",
    category: "financial",
    summary: "Cara praktis menghitung nilai bisnis keluarga dan mengelola beban pajak pengalihan aset.",
    duration: "7 Menit Baca",
    completed: false,
    content: `Melakukan valuasi bisnis secara objektif membantu mencegah konflik antar ahli waris dan menentukan porsi saham secara adil.

    Metode Valuasi Umum untuk UMKM:
    - SDE (Seller's Discretionary Earnings): Mengalikan laba bersih + gaji pemilik dengan multiplier industri (biasanya 2.5x hingga 4x).
    - Net Asset Value: Menghitung total nilai pasar aset dikurangi seluruh kewajiban utang.

    Pajak yang perlu diperhatikan:
    - PPh atas pengalihan hak tanah/bangunan (2.5%).
    - Biaya BPHTB (5%).
    - Pajak dividen & insentif hibah keluarga.`,
  },
  {
    id: "m3",
    title: "Standarisasi SOP & Transfer Pengetahuan Operasional",
    category: "operational",
    summary: "Strategi mendokumentasikan seluruh proses bisnis agar tidak bergantung 100% pada Pendiri.",
    duration: "6 Menit Baca",
    completed: false,
    content: `Salah satu penyebab utama kegagalan suksesi adalah seluruh rahasia & relasi bisnis hanya tersimpan di kepala Pendiri (Single Point of Failure).

    Langkah Standarisasi Operasional:
    1. Buat pemetaan proses dari pembelian bahan baku hingga penjualan.
    2. Dokumentasikan SOPulis dalam bentuk standar checklist sederhana.
    3. Kenalkan Penerus secara bertahap kepada 5 supplier dan 5 pelanggan terbesar bisnis.
    4. Uji coba pendelegasian penuh selama 1 bulan tanpa campur tangan harian Pendiri.`,
  },
  {
    id: "m4",
    title: "Tata Kelola Keluarga (Family Governance & Charter)",
    category: "relational",
    summary: "Menyusun piagam kesepakatan keluarga untuk menjaga keharmonisan dan transparansi bisnis.",
    duration: "8 Menit Baca",
    completed: false,
    content: `Piagam Kesepakatan Keluarga (Family Charter) adalah dokumen yang mengatur hubungan antara kepentingan keluarga dan profesionalisme bisnis.

    Poin Wajib dalam Family Charter:
    - Syarat anggota keluarga yang boleh bekerja di bisnis (kualifikasi pendidikan & pengalaman).
    - Standar gaji dan remunerasi penerus yang adil sesuai tarif pasar.
    - Kebijakan alokasi laba ditahan vs dividen keluarga.
    - Mekanisme penyelesaian konflik keluarga secara musyawarah sebelum membawa ke jalur hukum.`,
  },
];

interface LearningHubViewProps {
  profile: Profile;
  business: Business;
}

export function LearningHubView({ profile, business }: LearningHubViewProps) {
  const [modules, setModules] = useState<CourseModule[]>(INITIAL_MODULES);
  const [selectedCat, setSelectedCat] = useState<MilestoneCategory | "all">("all");
  const [readingModule, setReadingModule] = useState<CourseModule | null>(null);

  const completedCount = modules.filter((m) => m.completed).length;
  const progressPct = Math.round((completedCount / modules.length) * 100);

  const filteredModules = selectedCat === "all" ? modules : modules.filter((m) => m.category === selectedCat);

  const handleComplete = (id: string) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, completed: true } : m)));
  };

  return (
    <div style={{ padding: "36px 48px 64px", maxWidth: 1200, width: "100%", margin: "0 auto" }}>
      <LearningHubHeader
        businessName={business.name}
        completedCount={completedCount}
        totalCount={modules.length}
        progressPct={progressPct}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
        {filteredModules.map((module) => (
          <CourseModuleCard
            key={module.id}
            module={module}
            onRead={(m) => setReadingModule(m)}
          />
        ))}
      </div>

      {readingModule && (
        <ArticleReaderModal
          module={readingModule}
          onClose={() => setReadingModule(null)}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}
