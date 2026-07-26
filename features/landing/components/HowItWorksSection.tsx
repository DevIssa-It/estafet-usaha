"use client";

import { UserPlus, Compass, ChatCircleText, TrendUp } from "@phosphor-icons/react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Daftar & Pilih Peran",
    desc: "Buat akun sebagai Pendiri atau Penerus, lalu daftarkan profil bisnis keluarga Anda.",
  },
  {
    icon: Compass,
    step: "02",
    title: "Ikuti 12 Milestone",
    desc: "Selesaikan tahapan suksesi terstruktur dari dimensi Legal, Finansial, Operasional hingga Relational.",
  },
  {
    icon: ChatCircleText,
    step: "03",
    title: "Konsultasi dengan AI",
    desc: "Manfaatkan AI Suksesi Advisor untuk mendapatkan rekomendasi dan solusi atas hambatan suksesi.",
  },
  {
    icon: TrendUp,
    step: "04",
    title: "Pantau Kesiapan Suksesi",
    desc: "Lihat indikator kesiapan suksesi bisnis meningkat hingga siap dilakukan pengalihan kepemimpinan.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="cara-kerja" style={{ padding: "88px 0", backgroundColor: "var(--color-surface-soft)" }}>
      <div className="container-content">
        <div className="text-center" style={{ marginBottom: 56 }}>
          <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "var(--color-primary-bright)" }}>
            CARA KERJA
          </span>
          <h2 className="heading-xl" style={{ marginTop: 8, color: "var(--color-on-dark)" }}>
            4 Langkah Mudah Memulai Suksesi
          </h2>
        </div>

        <div className="grid-responsive grid-4">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div key={index} style={{
                backgroundColor: "var(--color-surface-elevated)",
                padding: 24, borderRadius: "var(--rounded-lg)",
                border: "1px solid var(--color-hairline-dark)",
                position: "relative", display: "flex", flexDirection: "column", gap: 12
              }}>
                <span style={{
                  fontSize: 28, fontWeight: 800, color: "var(--color-primary-bright)", opacity: 0.6,
                  fontFamily: "var(--font-display)"
                }}>
                  {s.step}
                </span>
                <Icon size={32} color="var(--color-primary-bright)" weight="duotone" />
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--color-on-dark)" }}>{s.title}</h3>
                <p className="body-sm text-mute" style={{ color: "var(--color-stone)" }}>{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
