"use client";

import { Scales, ShieldCheck } from "@phosphor-icons/react";

interface NotaryStatusBannerProps {
  businessName?: string;
}

export function NotaryStatusBanner({ businessName = "Bisnis Klien" }: NotaryStatusBannerProps) {
  return (
    <div style={{
      backgroundColor: "#ffffff",
      border: "1px solid #c7d2fe",
      borderRadius: 16,
      padding: "20px 24px",
      display: "flex", alignItems: "center",
      justifyContent: "space-between",
      gap: 16, flexWrap: "wrap",
      background: "linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          backgroundColor: "#e0e7ff",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Scales size={22} color="#4f46e5" weight="fill" />
        </div>
        <div>
          <div className="body-sm" style={{ color: "#0f172a", fontWeight: 700, fontSize: 14 }}>
            Portal Notaris Partner Legal
          </div>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Terhubung sebagai Notaris Resmi untuk <strong>{businessName}</strong>
          </div>
        </div>
      </div>

      <span style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        fontSize: 12, fontWeight: 700,
        backgroundColor: "#d1fae5", color: "#047857",
        padding: "6px 14px", borderRadius: 9999,
        border: "1px solid #a7f3d0",
      }}>
        <ShieldCheck size={16} weight="fill" /> Legal Inspector Active
      </span>
    </div>
  );
}
