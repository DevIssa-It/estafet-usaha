"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
    badge: "Dashboard Utama",
  },
  {
    icon: Calculator,
    title: "Financial Simulator & Valuasi Bisnis",
    desc: "Simulasi nilai pasar wajar bisnis berbasis EBITDA Multiplier industri serta kalkulator estimasi pajak pengalihan saham & Akta Notaris.",
    badge: "Literasi Finansial",
  },
  {
    icon: Brain,
    title: "AI Suksesi Advisor (Gemini AI)",
    desc: "Konsultan AI interaktif 24/7 khusus hukum & tata kelola UMKM Indonesia dengan Multi-Model Fallback Engine untuk zero-downtime.",
    badge: "AI Powered",
  },
  {
    icon: FileText,
    title: "Family Charter Generator",
    desc: "Generator otomatis Piagam Kesepakatan Tata Kelola & Remunerasi Keluarga yang siap dicetak dan ditandatangani oleh Pendiri & Penerus.",
    badge: "Tata Kelola Hukum",
  },
  {
    icon: LockKey,
    title: "Bilik Dokumen (Document Vault)",
    desc: "Penyimpanan terpusat untuk Akta Pendirian, SIUP, NPWP, NIB, dan Sertifikat Merek yang dilindungi penuh oleh Supabase Row Level Security.",
    badge: "Keamanan RLS",
  },
  {
    icon: GraduationCap,
    title: "Suksesi Learning Hub",
    desc: "Modul pembelajaran interaktif seputar pendelegasian operasional, kepatuhan hukum, dan harmonisasi komunikasi intergenerasi.",
    badge: "Edukasi UMKM",
  },
];

export function FeaturesSection() {
  return (
    <section id="fitur" className="section-dark" style={{ padding: "88px 0", backgroundColor: "#f8fafc" }}>
      <div className="container-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: 56 }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "#4f46e5" }}>
            6 MODUL FITUR TERINTEGRASI
          </span>
          <h2 className="heading-xl" style={{ marginTop: 8, color: "#0f172a" }}>
            Semua yang Anda Butuhkan untuk Transisi Suksesi
          </h2>
          <p className="body-md text-mute" style={{ maxWidth: 580, margin: "12px auto 0", color: "#475569" }}>
            Dirancang khusus untuk realitas bisnis keluarga UMKM Indonesia dengan pendekatan terstruktur 4 pilar dan asistensi AI.
          </p>
        </motion.div>

        {/* 6 Feature Modules Grid — Framer Motion Staggered Reveal */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 56 }}>
          {features.map((f, index) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)" }}
                className="card-dark"
                style={{
                  display: "flex", flexDirection: "column", gap: 16, padding: 28,
                  borderRadius: 16, border: "1px solid #e2e8f0", backgroundColor: "#ffffff",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)", transition: "border-color 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    backgroundColor: "rgba(79, 70, 229, 0.1)", display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <Icon size={26} color="#4f46e5" weight="duotone" />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, backgroundColor: "#e0e7ff", color: "#4338ca", border: "1px solid #c7d2fe" }}>
                    {f.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a" }}>{f.title}</h3>
                <p className="body-sm text-mute" style={{ color: "#475569", lineHeight: 1.6, fontSize: 14 }}>{f.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight Banner: Literasi Finansial — Framer Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: "#e0e7ff",
            border: "1px solid #c7d2fe",
            borderRadius: 20,
            padding: "36px 40px",
            display: "flex",
            alignItems: "center",
            justify: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#4338ca", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>
              <CheckCircle size={16} color="#4f46e5" weight="fill" /> Fokus Utama Tema Hackathon: Literasi Finansial
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>
              Pahami Valuasi Bisnis & Beban Pajak Transisi Awal
            </h3>
            <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.6 }}>
              Dengan Financial Simulator Estafet Usaha, Pendiri & Penerus dapat menghitung estimasi nilai pasar bisnis wajar dan biaya balik nama notaris secara transparan tanpa kejutan finansial.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/auth?mode=register"
              className="btn btn-cobalt"
              style={{ padding: "12px 24px", fontSize: 14, fontWeight: 600, gap: 8, height: 44 }}
            >
              Coba Financial Simulator <ArrowRight size={16} weight="bold" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
