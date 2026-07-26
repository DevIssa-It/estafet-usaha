"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "4,5 juta", label: "UMKM keluarga di Indonesia" },
  { value: "70%", label: "Gagal bertahan di generasi ke-2" },
  { value: "85%", label: "Tidak punya rencana suksesi tertulis" },
  { value: "12 tahun", label: "Rata-rata waktu ideal proses suksesi" },
];

export function StatsSection() {
  return (
    <section style={{ padding: "60px 0", borderTop: "1px solid var(--color-hairline-dark)", borderBottom: "1px solid var(--color-hairline-dark)", backgroundColor: "var(--color-surface-card)" }}>
      <div className="container-content">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, textAlign: "center" }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: 38, fontWeight: 700, color: "var(--color-primary-bright)", marginBottom: 6 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 14, color: "var(--color-stone)", lineHeight: 1.4 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
