"use client";

import { EnvelopeSimple, ShieldCheck } from "@phosphor-icons/react";

interface NotaryPortalTabSwitcherProps {
  activeTab: "invitations" | "profile";
  onTabChange: (tab: "invitations" | "profile") => void;
}

export function NotaryPortalTabSwitcher({ activeTab, onTabChange }: NotaryPortalTabSwitcherProps) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4,
      backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0",
      borderRadius: 12, padding: 4, marginBottom: 24,
    }}>
      <button
        type="button"
        onClick={() => onTabChange("invitations")}
        style={{
          padding: "10px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
          border: activeTab === "invitations" ? "1px solid #e2e8f0" : "1px solid transparent",
          backgroundColor: activeTab === "invitations" ? "#ffffff" : "transparent",
          color: activeTab === "invitations" ? "#4f46e5" : "#64748b",
          boxShadow: activeTab === "invitations" ? "0 1px 3px rgba(15, 23, 42, 0.08)" : "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}
      >
        <EnvelopeSimple size={16} weight={activeTab === "invitations" ? "fill" : "regular"} />
        Undangan Klien Masuk
      </button>

      <button
        type="button"
        onClick={() => onTabChange("profile")}
        style={{
          padding: "10px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
          border: activeTab === "profile" ? "1px solid #e2e8f0" : "1px solid transparent",
          backgroundColor: activeTab === "profile" ? "#ffffff" : "transparent",
          color: activeTab === "profile" ? "#4f46e5" : "#64748b",
          boxShadow: activeTab === "profile" ? "0 1px 3px rgba(15, 23, 42, 0.08)" : "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}
      >
        <ShieldCheck size={16} weight={activeTab === "profile" ? "fill" : "regular"} />
        Profil & Verifikasi SK AHU
      </button>
    </div>
  );
}
