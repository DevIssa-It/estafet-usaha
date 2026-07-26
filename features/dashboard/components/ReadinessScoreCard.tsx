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
  let statusText = "Perlu Perhatian Khusus";
  let badgeColor = "var(--color-accent-danger)";
  let bgGradient = "linear-gradient(135deg, rgba(230,30,73,0.1) 0%, rgba(230,30,73,0.02) 100%)";
  let borderColor = "rgba(230,30,73,0.25)";

  if (score >= 80) {
    riskLevel = "Rendah";
    statusText = "Kesiapan Tinggi";
    badgeColor = "var(--color-accent-teal)";
    bgGradient = "linear-gradient(135deg, rgba(0,168,126,0.1) 0%, rgba(0,168,126,0.02) 100%)";
    borderColor = "rgba(0,168,126,0.25)";
  } else if (score >= 50) {
    riskLevel = "Sedang";
    statusText = "Dalam Transisi Baik";
    badgeColor = "var(--color-accent-warning)";
    bgGradient = "linear-gradient(135deg, rgba(236,126,0,0.1) 0%, rgba(236,126,0,0.02) 100%)";
    borderColor = "rgba(236,126,0,0.25)";
  }

  const categories = Object.entries(CATEGORY_LABELS) as [MilestoneCategory, string][];

  return (
    <div style={{
      background: bgGradient,
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--rounded-lg)",
      padding: 24,
      marginBottom: 32,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "var(--rounded-md)",
            backgroundColor: badgeColor + "20",
            border: `1px solid ${badgeColor}`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            {score >= 80 ? (
              <CheckCircle size={22} color={badgeColor} weight="fill" />
            ) : score >= 50 ? (
              <ShieldCheck size={22} color={badgeColor} weight="fill" />
            ) : (
              <Warning size={22} color={badgeColor} weight="fill" />
            )}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2 className="heading-sm" style={{ color: "var(--color-on-dark)" }}>
                Indeks Kesiapan Suksesi (Succession Score)
              </h2>
              <span style={{
                fontSize: 11, fontWeight: 700, borderRadius: "var(--rounded-full)", padding: "2px 10px",
                backgroundColor: badgeColor + "20", color: badgeColor, border: `1px solid ${badgeColor}`,
              }}>
                Risiko {riskLevel}
              </span>
            </div>
            <p className="body-sm" style={{ color: "var(--color-on-dark-mute)", marginTop: 2 }}>
              {statusText} · {score}% dari total 4 dimensi terisi
            </p>
          </div>
        </div>

        <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 16 }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, color: badgeColor, lineHeight: 1 }}>
              {score}<span style={{ fontSize: 18, fontWeight: 600 }}>/100</span>
            </div>
            <div className="caption" style={{ color: "var(--color-stone)", marginTop: 4 }}>Score Matrix</div>
          </div>
          <Link href="/simulator" className="btn btn-cobalt" style={{ padding: "8px 16px", fontSize: 13, gap: 6 }}>
            Kalkulator Finansial <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Breakdown Grid per Dimension */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {categories.map(([cat, label]) => {
          const catMilestones = milestones.filter((m) => m.category === cat);
          const done = catMilestones.filter((m) => m.status === "completed").length;
          const catPct = catMilestones.length > 0 ? Math.round((done / catMilestones.length) * 100) : 0;
          const color = CATEGORY_COLORS[cat];

          return (
            <div key={cat} style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              border: "1px solid var(--color-hairline-dark)",
              borderRadius: "var(--rounded-md)",
              padding: "12px 14px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-on-dark)" }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color }}>{catPct}%</span>
              </div>
              <div className="progress-bar" style={{ height: 4 }}>
                <div className="progress-fill" style={{ width: `${catPct}%`, backgroundColor: color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
