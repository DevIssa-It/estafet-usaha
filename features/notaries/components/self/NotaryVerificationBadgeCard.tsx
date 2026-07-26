"use client";

import { ShieldCheck } from "@phosphor-icons/react";

export function NotaryVerificationBadgeCard() {
  return (
    <div style={{
      backgroundColor: "var(--color-surface-card)",
      border: "1px solid #a7f3d0",
      borderRadius: 16,
      padding: "20px 24px",
      marginBottom: 28,
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
      background: "linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          backgroundColor: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ShieldCheck size={26} color="#047857" weight="fill" />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#065f46" }}>
            Status Kredibilitas: SK Kemenkumham Terverifikasi Valid
          </div>
          <div style={{ fontSize: 13, color: "#047857", marginTop: 2 }}>
            Profil Anda aktif & tampil di Katalog Publik Notaris Partner Estafet Usaha.
          </div>
        </div>
      </div>

      <span style={{
        fontSize: 12, fontWeight: 700, color: "#047857",
        backgroundColor: "#ffffff", padding: "6px 14px", borderRadius: 8,
        border: "1px solid #6ee7b7",
      }}>
        SK AHU Active
      </span>
    </div>
  );
}
