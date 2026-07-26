import { MilestoneCategory, MilestoneStatus, CATEGORY_LABELS, CATEGORY_COLORS, STATUS_LABELS } from "@/types";

const ALL_STATUSES: MilestoneStatus[] = ["pending", "in_progress", "completed"];

interface MilestoneFiltersProps {
  milestones: { category: string }[];
  activeCategory: MilestoneCategory | "all";
  activeStatus: MilestoneStatus | "all";
  onCategoryChange: (cat: MilestoneCategory | "all") => void;
  onStatusChange: (status: MilestoneStatus | "all") => void;
}

export function MilestoneFilters({
  milestones,
  activeCategory,
  activeStatus,
  onCategoryChange,
  onStatusChange,
}: MilestoneFiltersProps) {
  const categories = Object.entries(CATEGORY_LABELS) as [MilestoneCategory, string][];

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
      <div style={{ display: "flex", gap: 6, flex: 1, flexWrap: "wrap" }}>
        <FilterPill
          label={`Semua (${milestones.length})`}
          active={activeCategory === "all"}
          activeColor="var(--color-primary)"
          onClick={() => onCategoryChange("all")}
        />
        {categories.map(([cat, label]) => {
          const count = milestones.filter((m) => m.category === cat).length;
          return (
            <FilterPill
              key={cat}
              label={`${label} (${count})`}
              active={activeCategory === cat}
              activeColor={CATEGORY_COLORS[cat]}
              onClick={() => onCategoryChange(cat)}
            />
          );
        })}
      </div>

      <select
        value={activeStatus}
        onChange={(e) => onStatusChange(e.target.value as MilestoneStatus | "all")}
        style={{
          padding: "7px 12px", borderRadius: "var(--rounded-full)",
          border: "1px solid var(--color-hairline-dark)",
          background: "transparent", color: "var(--color-stone)",
          fontSize: 13, fontWeight: 600, cursor: "pointer",
        }}
      >
        <option value="all">Semua Status</option>
        {ALL_STATUSES.map((s) => (
          <option key={s} value={s}>{STATUS_LABELS[s]}</option>
        ))}
      </select>
    </div>
  );
}

function FilterPill({
  label, active, activeColor, onClick,
}: {
  label: string;
  active: boolean;
  activeColor: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 14px", borderRadius: "var(--rounded-full)",
        border: `1px solid ${active ? activeColor : "var(--color-hairline-dark)"}`,
        background: active ? activeColor + "20" : "transparent",
        color: active ? activeColor : "var(--color-stone)",
        fontSize: 13, fontWeight: 600, cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}
