import { Users } from "@phosphor-icons/react";
import { Business } from "@/types";

interface InviteBannerProps {
  inviteCode?: string;
  business?: Business;
  role?: string;
}

export function InviteBanner({ inviteCode, business, role }: InviteBannerProps) {
  const code = inviteCode || business?.invite_code || "ESTAFET";

  return (
    <div style={{
      backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: 16,
      padding: "20px 24px",
      display: "flex", alignItems: "center",
      justify: "space-between",
      gap: 16, flexWrap: "wrap",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Users size={20} color="#4f46e5" weight="duotone" />
        </div>
        <div>
          <div className="body-sm" style={{ color: "#0f172a", fontWeight: 600, fontSize: 14 }}>
            Undang Anggota Tim
          </div>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Bagikan kode ini kepada keluarga
          </div>
        </div>
      </div>
      <span style={{
        fontFamily: "var(--font-display)",
        fontSize: 20, fontWeight: 800,
        color: "#4f46e5",
        backgroundColor: "#f8fafc",
        padding: "6px 14px",
        borderRadius: 8,
        border: "1px dashed #c7d2fe",
        letterSpacing: 4,
      }}>
        {code}
      </span>
    </div>
  );
}
