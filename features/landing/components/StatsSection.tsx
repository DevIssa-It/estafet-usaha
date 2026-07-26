"use client";

const stats = [
  { value: "70%", label: "Bisnis Keluarga Gagal di Gen 2", note: "Tanpa perencanaan suksesi" },
  { value: "12", label: "Milestone Terstruktur", note: "Cover 4 Dimensi Utama" },
  { value: "24/7", label: "AI Advisor Personal", note: "Pendampingan Real-time" },
  { value: "100%", label: "Privasi & Terenkripsi", note: "Row Level Security Supabase" },
];

export function StatsSection() {
  return (
    <section style={{ borderTop: "1px solid var(--color-hairline-dark)", borderBottom: "1px solid var(--color-hairline-dark)", padding: "48px 0", backgroundColor: "var(--color-surface-card)" }}>
      <div className="container-content">
        <div className="grid-responsive grid-4">
          {stats.map((s, index) => (
            <div key={index} className="text-center">
              <div className="display-lg" style={{ color: "var(--color-primary-bright)", marginBottom: 4 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-on-dark)", marginBottom: 2 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 12, color: "var(--color-stone)" }}>
                {s.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
