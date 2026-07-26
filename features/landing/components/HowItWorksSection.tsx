"use client";

import { motion } from "framer-motion";
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: 56 }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "var(--color-primary-bright)" }}>
            CARA KERJA
          </span>
          <h2 className="heading-xl" style={{ marginTop: 8, color: "var(--color-on-dark)" }}>
            4 Langkah Mudah Memulai Suksesi
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)" }}
                style={{
                  backgroundColor: "var(--color-surface-elevated)",
                  padding: 24, borderRadius: "var(--rounded-lg)",
                  border: "1px solid var(--color-hairline-dark)",
                  position: "relative", display: "flex", flexDirection: "column", gap: 12,
                  transition: "box-shadow 0.2s",
                }}
              >
                <span style={{
                  fontSize: 28, fontWeight: 800, color: "var(--color-primary-bright)", opacity: 0.6,
                  fontFamily: "var(--font-display)"
                }}>
                  {s.step}
                </span>
                <Icon size={32} color="var(--color-primary-bright)" weight="duotone" />
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--color-on-dark)" }}>{s.title}</h3>
                <p className="body-sm text-mute" style={{ color: "var(--color-stone)" }}>{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
