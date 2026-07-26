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
    title: "AI Advisor Gemini 2.0",
    desc: "Konsultan AI yang memahami konteks bisnis Anda dan memberikan panduan suksesi personal.",
    color: "#00a87e",
  },
  {
    icon: UsersThree,
    title: "Dashboard Keluarga",
    desc: "Pendiri dan Penerus bekerja dalam satu platform terintegrasi dengan akses sesuai peran masing-masing.",
    color: "#ec7e00",
  },
  {
    icon: ShieldCheck,
    title: "Panduan Legal Terstruktur",
    desc: "Checklist dokumen legal, template surat, dan panduan proses notaris untuk memastikan suksesi sah secara hukum.",
    color: "#e61e49",
  },
];

export function FeaturesSection() {
  return (
    <section id="fitur" style={{ padding: "100px 0" }}>
      <div className="container-content">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 className="heading-lg" style={{ color: "var(--color-on-dark)", marginBottom: 12 }}>
            Solusi Lengkap untuk Suksesi Bisnis Keluarga
          </h2>
          <p className="body-md" style={{ color: "var(--color-stone)", maxWidth: 540, margin: "0 auto" }}>
            Dirancang khusus untuk membantu UMKM Indonesia menghadapi tantangan pengalihan kepemimpinan.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="card-dark" style={{ display: "flex", gap: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "var(--rounded-md)",
                  backgroundColor: f.color + "18", border: `1px solid ${f.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon size={24} color={f.color} weight="fill" />
                </div>
                <div>
                  <h3 className="heading-sm" style={{ color: "var(--color-on-dark)", marginBottom: 8 }}>{f.title}</h3>
                  <p className="body-sm" style={{ color: "var(--color-stone)", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
