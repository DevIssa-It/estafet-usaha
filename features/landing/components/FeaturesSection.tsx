"use client";

import Link from "next/link";
import {
  ChartLineUp,
  Brain,
  Calculator,
  FileText,
  LockKey,
  GraduationCap,
  ArrowRight,
  CheckCircle,
} from "@phosphor-icons/react";

const features = [
  {
    icon: ChartLineUp,
    title: "Readiness Score & 12 Milestones",
    desc: "Perhitungan skor kesiapan suksesi real-time (0-100%) berdasarkan pemenuhan 12 milestone di pilar Legal, Finansial, Operasional & Relasional.",
    color: "#4f46e5",
    badge: "Dashboard Utama",
  },
  {
    icon: Calculator,
    title: "Financial Simulator & Valuasi Bisnis",
    desc: "Simulasi nilai pasar wajar bisnis berbasis EBITDA Multiplier industri serta kalkulator estimasi pajak pengalihan saham & Akta Notaris.",
    color: "#059669",
    badge: "Literasi Finansial",
  },
  {
    icon: Brain,
    title: "AI Suksesi Advisor (Gemini AI)",
    desc: "Konsultan AI interaktif 24/7 khusus hukum & tata kelola UMKM Indonesia dengan Multi-Model Fallback Engine untuk zero-downtime.",
    color: "#6366f1",
    badge: "AI Powered",
  },
  {
    icon: FileText,
    title: "Family Charter Generator",
    desc: "Generator otomatis Piagam Kesepakatan Tata Kelola & Remunerasi Keluarga yang siap dicetak dan ditandatangani oleh Pendiri & Penerus.",
    color: "#d97706",
    badge: "Tata Kelola Hukum",
  },
  {
    icon: LockKey,
    title: "Bilik Dokumen (Document Vault)",
    desc: "Penyimpanan terpusat untuk Akta Pendirian, SIUP, NPWP, NIB, dan Sertifikat Merek yang dilindungi penuh oleh Supabase Row Level Security.",
    color: "#0284c7",
    badge: "Keamanan RLS",
  },
  {
    icon: GraduationCap,
    title: "Suksesi Learning Hub",
    desc: "Modul pembelajaran interaktif seputar pendelegasian operasional, kepatuhan hukum, dan harmonisasi komunikasi intergenerasi.",
    color: "#7c3aed",
    badge: "Edukasi UMKM",
  },
];

export function FeaturesSection() {
  return (
    <section id="fitur" className="section-dark" style={{ padding: "88px 0" }}>
      <div className="container-content">
        <div className="text-center" style={{ marginBottom: 56 }}>
          <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "var(--color-primary-bright)" }}>
            6 MODUL FITUR TERINTEGRASI
          </span>
          <h2 className="heading-xl" style={{ marginTop: 8, color: "var(--color-on-dark)" }}>
            Semua yang Anda Butuhkan untuk Transisi Suksesi
          </h2>
          <p className="body-md text-mute" style={{ maxWidth: 580, margin: "12px auto 0", color: "var(--color-stone)" }}>
            Dirancang khusus untuk realitas bisnis keluarga UMKM Indonesia dengan pendekatan terstruktur 4 pilar dan asistensi AI.
          </p>
        </div>

        {/* 6 Feature Modules Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 56 }}>
          {features.map((f, index) => {
            const Icon = f.icon;
            return (
              <div key={index} className="card-dark" style={{ display: "flex", flexDirection: "column", gap: 16, padding: 28, borderRadius: "var(--rounded-lg)", border: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "var(--rounded-md)",
                    backgroundColor: `${f.color}15`, display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <Icon size={26} color={f.color} weight="duotone" />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, backgroundColor: `${f.color}10`, color: f.color, border: `1px solid ${f.color}30` }}>
                    {f.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a" }}>{f.title}</h3>
                <p className="body-sm text-mute" style={{ color: "#475569", lineHeight: 1.6, fontSize: 14 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner: Literasi Finansial & Valuation */}
        <div style={{
          backgroundColor: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: 20,
          padding: "36px 40px",
          display: "flex",
          alignItems: "center",
          justify: "space-between",
          flexWrap: "wrap",
          gap: 24,
        }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#166534", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>
              <CheckCircle size={16} color="#166534" weight="fill" /> Fokus Utama Tema Hackathon: Literasi Finansial
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>
              Pahami Valuasi Bisnis & Beban Pajak Transisi Awal
            </h3>
            <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.6 }}>
              Dengan Financial Simulator Estafet Usaha, Pendiri & Penerus dapat menghitung estimasi nilai pasar bisnis wajar dan biaya balik nama notaris secara transparan tanpa kejutan finansial.
            </p>
          </div>

          <Link
            href="/auth?mode=register"
            className="btn btn-cobalt"
            style={{ padding: "12px 24px", fontSize: 14, fontWeight: 600, gap: 8, height: 44 }}
          >
            Coba Financial Simulator <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
