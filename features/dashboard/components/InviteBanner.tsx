import { Users } from "@phosphor-icons/react";
import { Business } from "@/types";

interface InviteBannerProps {
  business: Business;
}

export function InviteBanner({ business }: InviteBannerProps) {
  return (
    <div style={{
      marginTop: 24,
      backgroundColor: "var(--color-surface-elevated)",
      border: "1px solid var(--color-hairline-dark)",
      borderRadius: "var(--rounded-lg)",
      padding: "20px 24px",
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      gap: 16, flexWrap: "wrap",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Users size={20} color="var(--color-stone)" />
        <div>
          <div className="body-sm" style={{ color: "var(--color-on-dark)", fontWeight: 500 }}>
            Undang Penerus ke platform
          </div>
          <div style={{ fontSize: 12, color: "var(--color-stone)" }}>
            Bagikan kode ini kepada anggota keluarga
          </div>
        </div>
      </div>
      <span style={{
        fontFamily: "var(--font-display)",
        fontSize: 22, fontWeight: 700,
        color: "var(--color-primary-bright)",
        letterSpacing: 6,
      }}>
        {business.invite_code}
      </span>
    </div>
  );
}
