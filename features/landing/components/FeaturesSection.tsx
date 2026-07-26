"use client";

import { ChartLineUp, Brain, UsersThree, ShieldCheck } from "@phosphor-icons/react";

const features = [
  {
    icon: ChartLineUp,
    title: "Milestone Tracker Suksesi",
    desc: "4 dimensi suksesi: Legal, Finansial, Operasional & Relasional. Pantau progres dengan visual yang jelas.",
    color: "#494fdf",
  },
  {
    icon: Brain,
    title: "AI Suksesi Advisor",
    desc: "Konsultan AI berbasis Gemini 2.0 Flash yang siap menjawab pertanyaan spesifik suksesi bisnis 24/7.",
    color: "#6366f1",
  },
  {
    icon: UsersThree,
    title: "Kolaborasi Pendiri & Penerus",
    desc: "Hubungkan akun Pendiri dan Penerus dalam satu ruang kerja bisnis untuk transparansi penuh.",
    color: "#0d9488",
  },
  {
    icon: ShieldCheck,
    title: "Legal & Governance Ready",
    desc: "Panduan penyusunan Akta Hibah, Perjanjian Keluarga (Family Charter), dan dokumentasi legal UMKM.",
    color: "#d97706",
  },
];

export function FeaturesSection() {
  return (
    <section id="fitur" className="section-dark" style={{ padding: "88px 0" }}>
      <div className="container-content">
        <div className="text-center" style={{ marginBottom: 56 }}>
          <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "var(--color-primary-bright)" }}>
            FITUR UNGGULAN
          </span>
          <h2 className="heading-xl" style={{ marginTop: 8, color: "var(--color-on-dark)" }}>
            Semua yang Anda Butuhkan untuk Transisi Suksesi
          </h2>
          <p className="body-md text-mute" style={{ maxWidth: 540, margin: "12px auto 0", color: "var(--color-stone)" }}>
            Dirancang khusus untuk realitas bisnis keluarga UMKM Indonesia dengan pendekatan terstruktur dan ramah pengguna.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {features.map((f, index) => {
            const Icon = f.icon;
            return (
              <div key={index} className="card-dark" style={{ display: "flex", flexDirection: "column", gap: 16, padding: 28, borderRadius: "var(--rounded-lg)" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "var(--rounded-md)",
                  backgroundColor: `${f.color}20`, display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <Icon size={24} color={f.color} weight="duotone" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--color-on-dark)" }}>{f.title}</h3>
                <p className="body-sm text-mute" style={{ color: "var(--color-stone)", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
