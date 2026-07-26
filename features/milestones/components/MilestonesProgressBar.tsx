interface MilestonesProgressBarProps {
  completed: number;
  total: number;
  pct: number;
}

export function MilestonesProgressBar({ completed, total, pct }: MilestonesProgressBarProps) {
  return (
    <div style={{
      backgroundColor: "var(--color-surface-elevated)",
      border: "1px solid var(--color-hairline-dark)",
      borderRadius: "var(--rounded-lg)", padding: 24, marginBottom: 28,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <span className="heading-md" style={{ color: "var(--color-on-dark)" }}>{completed}</span>
          <span className="body-md" style={{ color: "var(--color-stone)" }}> / {total} milestone selesai</span>
        </div>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--color-primary-bright)" }}>
          {pct}%
        </span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
