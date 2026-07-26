import { ShieldCheck, Warning, CheckCircle, ArrowRight, Calculator } from "@phosphor-icons/react";
import Link from "next/link";
import { Milestone, CATEGORY_LABELS, CATEGORY_COLORS, MilestoneCategory } from "@/types";

interface ReadinessScoreCardProps {
  milestones: Milestone[];
}

export function ReadinessScoreCard({ milestones }: ReadinessScoreCardProps) {
  const total = milestones.length;
  const completed = milestones.filter((m) => m.status === "completed").length;
  const score = total > 0 ? Math.round((completed / total) * 100) : 0;

  let riskLevel: "Rendah" | "Sedang" | "Tinggi" = "Tinggi";
  let statusText = "Tahap Perencanaan Awal Suksesi Bisnis";

  if (score >= 80) {
    riskLevel = "Rendah";
    statusText = "Kesiapan Suksesi Sangat Tinggi";
  } else if (score >= 50) {
    riskLevel = "Sedang";
    statusText = "Dalam Transisi Suksesi Berjalan Baik";
  }

  const categories = Object.entries(CATEGORY_LABELS) as [MilestoneCategory, string][];

  return (
    <div style={{
      width: "100%",
      backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: 16,
      padding: "28px 32px",
      marginBottom: 32,
      boxShadow: "0 2px 10px rgba(15, 23, 42, 0.04)",
    }}>
      {/* Top Header Row — Title Left, Score + Button Right */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, marginBottom: 24, width: "100%" }}>
        {/* Left Side: Icon & Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            backgroundColor: "#e0e7ff",
            border: "1px solid #c7d2fe",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            {score >= 80 ? (
              <CheckCircle size={28} color="#4f46e5" weight="fill" />
            ) : score >= 50 ? (
              <ShieldCheck size={28} color="#4f46e5" weight="fill" />
            ) : (
              <Warning size={28} color="#4f46e5" weight="fill" />
            )}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <h2 className="heading-sm" style={{ color: "#0f172a", fontSize: 20, fontWeight: 700, margin: 0 }}>
                Indeks Kesiapan Suksesi (Succession Score)
              </h2>
              <span style={{
                fontSize: 12, fontWeight: 700, borderRadius: 9999, padding: "4px 14px",
                backgroundColor: "#e0e7ff", color: "#4338ca", border: "1px solid #c7d2fe",
              }}>
                Risiko {riskLevel}
              </span>
            </div>
            <p className="body-sm" style={{ color: "#475569", marginTop: 4, marginBottom: 0, fontSize: 14 }}>
              {statusText} · <strong>{score}%</strong> dari total 4 dimensi terisi
            </p>
          </div>
        </div>

        {/* Right Side: Score Matrix & Financial Calculator CTA Button */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: "10px 18px",
          flexShrink: 0,
        }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, color: "#4f46e5", lineHeight: 1 }}>
              {score}<span style={{ fontSize: 16, fontWeight: 600, color: "#64748b" }}>/100</span>
            </div>
            <div className="caption" style={{ color: "#64748b", marginTop: 2, fontSize: 11, fontWeight: 600 }}>Succession Index</div>
          </div>

          <Link
            href="/simulator"
            className="btn btn-cobalt"
            style={{
              padding: "10px 22px",
              fontSize: 14,
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              height: 44,
              borderRadius: 9999,
              backgroundColor: "#4f46e5",
              color: "#ffffff",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)",
              whiteSpace: "nowrap",
            }}
          >
            <Calculator size={18} weight="bold" />
            <span>Kalkulator Finansial</span>
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </div>

      {/* Breakdown Grid per Dimension — Spans Full 100% Width */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, width: "100%" }}>
        {categories.map(([cat, label]) => {
          const catMilestones = milestones.filter((m) => m.category === cat);
          const done = catMilestones.filter((m) => m.status === "completed").length;
          const catPct = catMilestones.length > 0 ? Math.round((done / catMilestones.length) * 100) : 0;
          const color = CATEGORY_COLORS[cat];

          return (
            <div key={cat} style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: "16px 18px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color }}>{catPct}%</span>
              </div>
              <div className="progress-bar" style={{ height: 8, backgroundColor: "#e2e8f0", borderRadius: 9999 }}>
                <div className="progress-fill" style={{ width: `${catPct}%`, backgroundColor: color, borderRadius: 9999 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
