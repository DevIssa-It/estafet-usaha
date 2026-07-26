"use client";

import { ShieldCheck, UsersThree } from "@phosphor-icons/react";

interface NotaryTabSwitcherProps {
  activeTab: "notary_profile" | "join";
  onTabChange: (tab: "notary_profile" | "join") => void;
}

export function NotaryTabSwitcher({ activeTab, onTabChange }: NotaryTabSwitcherProps) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4,
      backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0",
      borderRadius: 12, padding: 4, marginBottom: 24,
    }}>
      <button
        type="button"
        onClick={() => onTabChange("notary_profile")}
        style={{
          padding: "10px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
          border: activeTab === "notary_profile" ? "1px solid #e2e8f0" : "1px solid transparent",
          backgroundColor: activeTab === "notary_profile" ? "#ffffff" : "transparent",
          color: activeTab === "notary_profile" ? "#4f46e5" : "#64748b",
          boxShadow: activeTab === "notary_profile" ? "0 1px 3px rgba(15, 23, 42, 0.08)" : "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}
      >
        <ShieldCheck size={16} weight={activeTab === "notary_profile" ? "fill" : "regular"} />
        Daftar Katalog Publik
      </button>

      <button
        type="button"
        onClick={() => onTabChange("join")}
        style={{
          padding: "10px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
          border: activeTab === "join" ? "1px solid #e2e8f0" : "1px solid transparent",
          backgroundColor: activeTab === "join" ? "#ffffff" : "transparent",
          color: activeTab === "join" ? "#4f46e5" : "#64748b",
          boxShadow: activeTab === "join" ? "0 1px 3px rgba(15, 23, 42, 0.08)" : "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}
      >
        <UsersThree size={16} weight={activeTab === "join" ? "fill" : "regular"} />
        Masukkan Kode dari Owner
      </button>
    </div>
  );
}
