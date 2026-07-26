import type { UserRole } from "@/types";
import { Buildings, Handshake, Scales } from "@phosphor-icons/react";

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
}

const ROLES: { key: UserRole; icon: React.ElementType; label: string; sub: string }[] = [
  { key: "pendiri", icon: Buildings, label: "Pendiri", sub: "Pemilik bisnis" },
  { key: "penerus", icon: Handshake, label: "Penerus", sub: "Generasi penerus" },
  { key: "notaris", icon: Scales, label: "Notaris Partner", sub: "Konsultan legal" },
];

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div>
      <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>
        Saya mendaftar sebagai
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {ROLES.map(({ key, icon: Icon, label, sub }) => {
          const isSelected = value === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              style={{
                padding: "12px 10px",
                borderRadius: "var(--rounded-md)",
                border: isSelected ? "2px solid var(--color-primary)" : "1px solid var(--color-hairline-dark)",
                backgroundColor: isSelected ? "rgba(79, 70, 229, 0.06)" : "#ffffff",
                color: isSelected ? "var(--color-primary-deep)" : "var(--color-ink)",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.15s ease-in-out",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                boxShadow: isSelected ? "0 2px 6px rgba(79, 70, 229, 0.12)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Icon size={18} weight={isSelected ? "fill" : "regular"} color={isSelected ? "#4f46e5" : "#64748b"} />
                <span>{label}</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 400, color: "var(--color-stone)" }}>
                {sub}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}


