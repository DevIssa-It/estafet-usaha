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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, textAlign: "center" }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "var(--color-primary-bright)", marginBottom: 4 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: "var(--color-stone)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
