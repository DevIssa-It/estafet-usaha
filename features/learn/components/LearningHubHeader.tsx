import { GraduationCap, CheckCircle } from "@phosphor-icons/react";

interface LearningHubHeaderProps {
  businessName: string;
  completedCount: number;
  totalCount: number;
  progressPct: number;
}

export function LearningHubHeader({
  businessName,
  completedCount,
  totalCount,
  progressPct,
}: LearningHubHeaderProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "var(--rounded-md)",
            background: "linear-gradient(135deg, var(--color-accent-teal) 0%, #00d4a0 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <GraduationCap size={20} color="white" weight="fill" />
          </div>
          <h1 className="display-md" style={{ color: "var(--color-on-dark)" }}>
            Edukasi & Mentoring Suksesi
          </h1>
        </div>
        <p className="body-md" style={{ color: "var(--color-on-dark-mute)" }}>
          Modul pembelajaran praktis hukum, keuangan, dan tata kelola untuk keluarga {businessName}.
        </p>
      </div>

      <div style={{
        backgroundColor: "var(--color-surface-elevated)",
        border: "1px solid var(--color-hairline-dark)",
        borderRadius: "var(--rounded-lg)",
        padding: "12px 20px",
        textAlign: "right",
      }}>
        <div style={{ fontSize: 11, color: "var(--color-stone)", textTransform: "uppercase" }}>Progress Kurikulum</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "var(--color-accent-teal)", display: "flex", alignItems: "center", gap: 6 }}>
          <CheckCircle size={18} weight="fill" /> {completedCount} / {totalCount} Modul ({progressPct}%)
        </div>
      </div>
    </div>
  );
}
