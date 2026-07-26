import { MilestoneCategory, CATEGORY_LABELS, CATEGORY_COLORS } from "@/types";

interface CategoryBreakdownProps {
  milestones: { category: string; status: string }[];
}

export function CategoryBreakdown({ milestones }: CategoryBreakdownProps) {
  const categories = Object.entries(CATEGORY_LABELS) as [MilestoneCategory, string][];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {categories.map(([cat, label]) => {
        const all = milestones.filter((m) => m.category === cat);
        const done = all.filter((m) => m.status === "completed").length;
        const pct = all.length > 0 ? Math.round((done / all.length) * 100) : 0;
        const color = CATEGORY_COLORS[cat];

        return (
          <div key={cat}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span className="body-sm" style={{ color: "var(--color-on-dark-mute)" }}>
                {label}
              </span>
              <span className="body-sm" style={{ color: "var(--color-stone)" }}>
                {done}/{all.length}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${pct}%`, background: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
