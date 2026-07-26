const steps = [
  { num: "01", title: "Daftar & Buat Profil Bisnis", desc: "Pendiri mendaftarkan bisnis keluarga dan mengundang Penerus untuk bergabung." },
  { num: "02", title: "Susun Rencana Suksesi", desc: "Sistem secara otomatis membuat 12 milestone suksesi berdasarkan 4 dimensi: Legal, Finansial, Operasional, Relasional." },
  { num: "03", title: "Pantau & Selesaikan Milestone", desc: "Tandai progres setiap tahapan. Keduanya bisa memantau perkembangan secara real-time." },
  { num: "04", title: "Konsultasi AI Kapan Saja", desc: "Tanya AI Advisor untuk panduan spesifik sesuai kondisi bisnis dan peran Anda." },
];

export function HowItWorksSection() {
  return (
    <section id="cara-kerja" style={{ padding: "100px 0", backgroundColor: "var(--color-surface-card)" }}>
      <div className="container-content">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 className="heading-lg" style={{ color: "var(--color-on-dark)", marginBottom: 12 }}>
            4 Langkah Mudah Memulai Suksesi
          </h2>
          <p className="body-md" style={{ color: "var(--color-stone)" }}>
            Proses terstruktur yang memandu Anda dari awal hingga penyerahan tongkat estafet.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {steps.map((s, i) => (
            <div key={i} className="card-dark" style={{ position: "relative" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, color: "var(--color-primary-bright)", opacity: 0.4, marginBottom: 12 }}>
                {s.num}
              </div>
              <h3 className="heading-sm" style={{ color: "var(--color-on-dark)", marginBottom: 8 }}>{s.title}</h3>
              <p className="body-sm" style={{ color: "var(--color-stone)", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
