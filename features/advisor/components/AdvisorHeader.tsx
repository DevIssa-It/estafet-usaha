import { Brain, Sparkle } from "@phosphor-icons/react";
import { UserRole } from "@/types";

interface AdvisorHeaderProps {
  businessName: string;
  role: UserRole;
}

export function AdvisorHeader({ businessName, role }: AdvisorHeaderProps) {
  return (
    <div style={{
      padding: "20px 32px",
      borderBottom: "1px solid var(--color-hairline-dark)",
      backgroundColor: "var(--color-surface-deep)",
      display: "flex", alignItems: "center", gap: 14, flexShrink: 0,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: "var(--rounded-md)",
        background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-bright) 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Brain size={22} color="white" weight="fill" />
      </div>
      <div>
        <h1 className="heading-sm" style={{ color: "var(--color-on-dark)" }}>AI Advisor Suksesi</h1>
        <p className="caption" style={{ color: "var(--color-stone)" }}>
          Konsultan AI untuk {businessName} · Powered by Gemini 2.0 Flash
        </p>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <span className="badge-feature" style={{ fontSize: 11 }}>
          <Sparkle size={11} style={{ marginRight: 4 }} weight="fill" />
          {role === "pendiri" ? "Mode Pendiri" : role === "notaris" ? "Mode Notaris Partner" : role === "advisor" ? "Mode Advisor" : "Mode Penerus"}
        </span>
      </div>
    </div>
  );
}
