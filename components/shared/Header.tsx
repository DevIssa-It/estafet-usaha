"use client";

import { usePathname } from "next/navigation";
import { Profile } from "@/types";
import { NotificationBell } from "./NotificationBell";
import { ClientBusinessSwitcher } from "./ClientBusinessSwitcher";

interface HeaderProps {
  profile: Profile | null;
  businessName?: string;
  business?: any;
}

const PATH_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard Suksesi",
  "/simulator": "Simulasi Finansial",
  "/milestones": "Milestone Suksesi",
  "/documents": "Dokumen Suksesi",
  "/vault": "Bilik Dokumen (Vault)",
  "/notaries": "Katalog Notaris",
  "/learn": "Edukasi Suksesi",
  "/advisor": "AI Advisor Suksesi",
  "/onboarding": "Onboarding Bisnis",
};

export function Header({ profile, businessName, business }: HeaderProps) {
  const pathname = usePathname();
  const pageTitle = PATH_TITLES[pathname] || "Dashboard";
  const userInitial = profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : "U";
  const isNotary = profile?.role === "notaris";

  return (
    <header style={{
      height: 64,
      backgroundColor: "var(--color-surface-card)",
      borderBottom: "1px solid var(--color-hairline-dark)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 36px",
      position: "sticky",
      top: 0,
      zIndex: 30,
      boxShadow: "0 1px 2px rgba(15,23,42,0.02)",
    }}>
      {/* Left: Breadcrumb & Title or Notary Client Switcher */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 13, color: "var(--color-stone)", fontWeight: 500 }}>
          {businessName || "Estafet Usaha"}
          <span style={{ margin: "0 8px", opacity: 0.5 }}>/</span>
          <span style={{ color: "var(--color-ink)", fontWeight: 600 }}>{pageTitle}</span>
        </div>

        {isNotary && businessName && (
          <ClientBusinessSwitcher
            currentBusiness={{ id: profile?.business_id || "b1", name: businessName, industry: "Perusahaan Klien", invite_code: "ESTAFET", description: "", founded_year: null, owner_id: "", created_at: "" }}
            isNotary={true}
          />
        )}
      </div>

      {/* Right: Notification Bell & User Pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <NotificationBell />

        {/* User Avatar Pill */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          backgroundColor: "var(--color-surface-soft)",
          border: "1px solid var(--color-hairline-dark)",
          borderRadius: "var(--rounded-full)",
          padding: "4px 12px 4px 4px",
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "var(--rounded-full)",
            backgroundColor: "var(--color-primary)",
            color: "white",
            fontSize: 13, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {userInitial}
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-ink)" }}>
            {profile?.full_name?.split(" ")[0] || "User"}
          </span>
        </div>
      </div>
    </header>
  );
}
