import { Trophy, CheckCircle } from "@phosphor-icons/react";
import { Milestone, CATEGORY_LABELS, CATEGORY_COLORS } from "@/types";

interface UpcomingMilestonesProps {
  milestones: Milestone[];
}

export function UpcomingMilestones({ milestones }: UpcomingMilestonesProps) {
  const upNext = milestones
    .filter((m) => m.status !== "completed")
    .slice(0, 3);

  if (upNext.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <Trophy
          size={32} color="var(--color-accent-teal)"
          weight="duotone"
          style={{ margin: "0 auto 8px", display: "block" }}
        />
        <p className="body-sm" style={{ color: "var(--color-on-dark-mute)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <CheckCircle size={16} color="var(--color-accent-teal)" weight="fill" />
          <span>Semua milestone selesai!</span>
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {upNext.map((m) => (
        <div
          key={m.id}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 0",
            borderBottom: "1px solid var(--color-hairline-dark)",
          }}
        >
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            backgroundColor: CATEGORY_COLORS[m.category],
            flexShrink: 0,
          }} />
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div
              className="body-sm"
              style={{
                color: "var(--color-on-dark)", fontWeight: 500,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}
            >
              {m.title}
            </div>
            <div style={{ fontSize: 11, color: "var(--color-stone)", marginTop: 2 }}>
              {CATEGORY_LABELS[m.category]}
            </div>
          </div>
          <span
            className={m.status === "in_progress" ? "badge-warning" : "badge-tag"}
            style={{ fontSize: 11, flexShrink: 0 }}
          >
            {m.status === "in_progress" ? "Proses" : "Belum"}
          </span>
        </div>
      ))}
    </div>
  );
}
