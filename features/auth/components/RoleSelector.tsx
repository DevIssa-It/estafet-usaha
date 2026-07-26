import type { UserRole } from "@/types";
import { Buildings, Handshake } from "@phosphor-icons/react";

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
}

const ROLES: { key: UserRole; icon: React.ElementType; label: string; sub: string }[] = [
  { key: "pendiri", icon: Buildings, label: "Pendiri", sub: "Pemilik bisnis saat ini" },
  { key: "penerus", icon: Handshake, label: "Penerus", sub: "Generasi penerus" },
];

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div>
      <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>
        Saya adalah
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {ROLES.map(({ key, icon: Icon, label, sub }) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            style={{
              padding: "14px 16px", borderRadius: "var(--rounded-md)",
              border: value === key ? "2px solid var(--color-primary)" : "2px solid var(--color-hairline-dark)",
              backgroundColor: value === key ? "rgba(73,79,223,0.1)" : "transparent",
              color: value === key ? "var(--color-primary-bright)" : "var(--color-stone)",
              cursor: "pointer", fontSize: 14, fontWeight: 600,
              transition: "all 0.15s", textAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon size={18} weight={value === key ? "fill" : "regular"} />
              <span>{label}</span>
            </div>
            <div style={{ fontSize: 11, fontWeight: 400, color: "var(--color-stone)" }}>
              {sub}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
