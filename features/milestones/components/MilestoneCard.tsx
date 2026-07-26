import {
  CheckCircle, Clock, Check, Play,
} from "@phosphor-icons/react";
import {
  Milestone, MilestoneStatus, MilestoneCategory,
  CATEGORY_LABELS, CATEGORY_COLORS, STATUS_LABELS,
} from "@/types";
import {
  Scales, CurrencyDollar, Gear, Heart,
} from "@phosphor-icons/react";

const CATEGORY_ICONS: Record<MilestoneCategory, React.ElementType> = {
  legal: Scales,
  financial: CurrencyDollar,
  operational: Gear,
  relational: Heart,
};

interface MilestoneCardProps {
  milestone: Milestone;
  canEdit: boolean;
  onStatusChange: (id: string, status: MilestoneStatus) => void;
}

export function MilestoneCard({ milestone, canEdit, onStatusChange }: MilestoneCardProps) {
  const color = CATEGORY_COLORS[milestone.category];
  const Icon = CATEGORY_ICONS[milestone.category];
  const isCompleted = milestone.status === "completed";
  const isInProgress = milestone.status === "in_progress";
  const isPending = milestone.status === "pending";

  return (
    <div style={{
      backgroundColor: "var(--color-surface-elevated)",
      border: `1px solid ${isCompleted ? "rgba(0,168,126,0.3)" : isInProgress ? "rgba(236,126,0,0.3)" : "var(--color-hairline-dark)"}`,
      borderRadius: "var(--rounded-lg)",
      padding: "20px 24px",
      transition: "all 0.2s",
      display: "flex",
      flexDirection: "column",
      gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        {/* Main Content */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            {/* Category tag */}
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, fontWeight: 600,
              padding: "4px 10px", borderRadius: "var(--rounded-full)",
              backgroundColor: color + "18", color: color,
            }}>
              <Icon size={14} weight="fill" />
              {CATEGORY_LABELS[milestone.category]}
            </span>

            {/* Current status tag */}
            <span style={{
              fontSize: 12, fontWeight: 600,
              padding: "4px 10px", borderRadius: "var(--rounded-full)",
              backgroundColor: isCompleted ? "rgba(0,168,126,0.15)"
                : isInProgress ? "rgba(236,126,0,0.15)"
                : "rgba(160,160,160,0.12)",
              color: isCompleted ? "var(--color-accent-teal)"
                : isInProgress ? "var(--color-accent-warning)"
                : "var(--color-stone)",
            }}>
              {STATUS_LABELS[milestone.status]}
            </span>
          </div>

          <h3 className="heading-sm" style={{
            color: isCompleted ? "var(--color-stone)" : "var(--color-on-dark)",
            textDecoration: isCompleted ? "line-through" : "none",
            marginBottom: 8,
          }}>
            {milestone.title}
          </h3>

          <p className="body-md" style={{ color: "var(--color-on-dark-mute)", lineHeight: 1.6 }}>
            {milestone.description}
          </p>

          {milestone.completed_at && (
            <div style={{ fontSize: 12, color: "var(--color-accent-teal)", marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
              <CheckCircle size={14} weight="fill" />
              Diselesaikan pada {new Date(milestone.completed_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </div>
          )}
        </div>
      </div>

      {/* Explicit, high-contrast status action buttons for older users */}
      {canEdit && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: "1px solid var(--color-hairline-dark)", paddingTop: 14, marginTop: 4,
          flexWrap: "wrap", gap: 10,
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-stone)" }}>
            Ubah Status Milestone:
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {/* Option 1: Belum Mulai */}
            <button
              type="button"
              onClick={() => onStatusChange(milestone.id, "pending")}
              style={{
                padding: "8px 14px", borderRadius: "var(--rounded-md)",
                border: isPending ? "2px solid var(--color-stone)" : "1px solid var(--color-hairline-dark)",
                backgroundColor: isPending ? "rgba(255,255,255,0.08)" : "transparent",
                color: isPending ? "var(--color-on-dark)" : "var(--color-stone)",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 6, transition: "all 0.15s",
              }}
            >
              <Clock size={15} />
              Belum Mulai
            </button>

            {/* Option 2: Sedang Berjalan */}
            <button
              type="button"
              onClick={() => onStatusChange(milestone.id, "in_progress")}
              style={{
                padding: "8px 14px", borderRadius: "var(--rounded-md)",
                border: isInProgress ? "2px solid var(--color-accent-warning)" : "1px solid var(--color-hairline-dark)",
                backgroundColor: isInProgress ? "rgba(236,126,0,0.18)" : "transparent",
                color: isInProgress ? "var(--color-accent-warning)" : "var(--color-stone)",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 6, transition: "all 0.15s",
              }}
            >
              <Play size={15} weight={isInProgress ? "fill" : "regular"} />
              Sedang Berjalan
            </button>

            {/* Option 3: Selesai */}
            <button
              type="button"
              onClick={() => onStatusChange(milestone.id, "completed")}
              style={{
                padding: "8px 14px", borderRadius: "var(--rounded-md)",
                border: isCompleted ? "2px solid var(--color-accent-teal)" : "1px solid var(--color-hairline-dark)",
                backgroundColor: isCompleted ? "rgba(0,168,126,0.18)" : "transparent",
                color: isCompleted ? "var(--color-accent-teal)" : "var(--color-stone)",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 6, transition: "all 0.15s",
              }}
            >
              <Check size={15} weight="bold" />
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
