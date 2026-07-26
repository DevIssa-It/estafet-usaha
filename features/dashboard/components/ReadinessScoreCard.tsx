import { ShieldCheck, Warning, CheckCircle, ArrowRight } from "@phosphor-icons/react";
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
  let statusText = "Tahap Perencanaan Awal Suksesi";
  const badgeColor = "#4f46e5";
  const bgGradient = "#ffffff";
  const borderColor = "#e2e8f0";

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
      backgroundColor: bgGradient,
      border: `1px solid ${borderColor}`,
      borderRadius: 16,
      padding: 28,
      marginBottom: 32,
      boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            backgroundColor: "#e0e7ff",
            border: "1px solid #c7d2fe",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            {score >= 80 ? (
              <CheckCircle size={24} color="#4f46e5" weight="fill" />
            ) : score >= 50 ? (
              <ShieldCheck size={24} color="#4f46e5" weight="fill" />
            ) : (
              <Warning size={24} color="#4f46e5" weight="fill" />
            )}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2 className="heading-sm" style={{ color: "#0f172a", fontSize: 18, fontWeight: 700 }}>
                Indeks Kesiapan Suksesi (Succession Score)
              </h2>
              <span style={{
                fontSize: 11, fontWeight: 700, borderRadius: 999, padding: "3px 12px",
                backgroundColor: "#e0e7ff", color: "#4338ca", border: "1px solid #c7d2fe",
              }}>
                Risiko {riskLevel}
              </span>
            </div>
            <p className="body-sm" style={{ color: "#475569", marginTop: 4, fontSize: 14 }}>
              {statusText} · {score}% dari total 4 dimensi terisi
            </p>
          </div>
        </div>

        <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 16 }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, color: "#4f46e5", lineHeight: 1 }}>
              {score}<span style={{ fontSize: 18, fontWeight: 600, color: "#64748b" }}>/100</span>
            </div>
            <div className="caption" style={{ color: "#64748b", marginTop: 4, fontSize: 12 }}>Score Matrix</div>
          </div>
          <Link href="/simulator" className="btn btn-cobalt" style={{ padding: "10px 20px", fontSize: 14, gap: 6, fontWeight: 600, height: 42 }}>
            Kalkulator Finansial <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </div>

      {/* Breakdown Grid per Dimension */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
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
              padding: "14px 16px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color }}>{catPct}%</span>
              </div>
              <div className="progress-bar" style={{ height: 6, backgroundColor: "#e2e8f0", borderRadius: 99 }}>
                <div className="progress-fill" style={{ width: `${catPct}%`, backgroundColor: color, borderRadius: 99 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
