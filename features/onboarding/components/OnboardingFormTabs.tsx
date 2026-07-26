import { Buildings, UsersThree } from "@phosphor-icons/react";

interface OnboardingFormTabsProps {
  tab: "create" | "join";
  onTabChange: (tab: "create" | "join") => void;
}

export function OnboardingFormTabs({ tab, onTabChange }: OnboardingFormTabsProps) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4,
      backgroundColor: "#f1f5f9",
      border: "1px solid #e2e8f0",
      borderRadius: 12, padding: 4,
      marginBottom: 28,
    }}>
      {[
        { key: "create", label: "Buat Bisnis", icon: Buildings },
        { key: "join", label: "Gabung Bisnis", icon: UsersThree },
      ].map(({ key, label, icon: Icon }) => {
        const isActive = tab === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onTabChange(key as any)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "10px 16px", borderRadius: 8,
              border: isActive ? "1px solid #e2e8f0" : "1px solid transparent",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: isActive ? 600 : 500,
              transition: "all 0.2s ease-in-out",
              backgroundColor: isActive ? "#ffffff" : "transparent",
              color: isActive ? "#4f46e5" : "#64748b",
              boxShadow: isActive ? "0 1px 3px rgba(15, 23, 42, 0.08)" : "none",
            }}
          >
            <Icon size={16} weight={isActive ? "fill" : "regular"} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

