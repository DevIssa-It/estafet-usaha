import { FolderSimple } from "@phosphor-icons/react";
import { CATEGORY_LABELS, CATEGORY_COLORS, MilestoneCategory } from "@/types";

interface VaultCategoryCardProps {
  category: MilestoneCategory;
  count: number;
  active: boolean;
  onClick: () => void;
}

export function VaultCategoryCard({ category, count, active, onClick }: VaultCategoryCardProps) {
  const color = CATEGORY_COLORS[category];
  const label = CATEGORY_LABELS[category];

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: active ? color + "15" : "var(--color-surface-elevated)",
        border: `1px solid ${active ? color : "var(--color-hairline-dark)"}`,
        borderRadius: "var(--rounded-md)",
        padding: "16px",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.15s",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: "var(--rounded-md)",
        backgroundColor: color + "20",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <FolderSimple size={20} color={color} weight="fill" />
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-on-dark)" }}>{label}</div>
        <div style={{ fontSize: 11, color: "var(--color-stone)", marginTop: 2 }}>{count} Dokumen Tersimpan</div>
      </div>
    </button>
  );
}
