import { Buildings, UsersThree } from "@phosphor-icons/react";

interface OnboardingFormTabsProps {
  tab: "create" | "join";
  onTabChange: (tab: "create" | "join") => void;
}

export function OnboardingFormTabs({ tab, onTabChange }: OnboardingFormTabsProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: "var(--color-surface-elevated)", borderRadius: "var(--rounded-md)", padding: 4, marginBottom: 28 }}>
      {[
        { key: "create", label: "Buat Bisnis", icon: Buildings },
        { key: "join", label: "Gabung Bisnis", icon: UsersThree },
      ].map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onTabChange(key as any)}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "11px 16px", borderRadius: "calc(var(--rounded-md) - 2px)",
            border: "none", cursor: "pointer",
            fontSize: 14, fontWeight: 600,
            transition: "all 0.2s",
            backgroundColor: tab === key ? "var(--color-canvas-dark)" : "transparent",
            color: tab === key ? "var(--color-on-dark)" : "var(--color-stone)",
          }}
        >
          <Icon size={16} weight={tab === key ? "fill" : "regular"} />
          {label}
        </button>
      ))}
    </div>
  );
}
