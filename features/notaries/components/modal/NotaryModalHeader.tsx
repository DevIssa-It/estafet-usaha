"use client";

import { X, ShieldCheck } from "@phosphor-icons/react";
import { Notary } from "../../data/notariesData";

interface NotaryModalHeaderProps {
  notary: Notary;
  onClose: () => void;
}

export function NotaryModalHeader({ notary, onClose }: NotaryModalHeaderProps) {
  return (
    <div style={{
      padding: "24px 28px",
      borderBottom: "1px solid var(--color-hairline-dark)",
      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      backgroundColor: "var(--color-canvas-dark)",
      borderTopLeftRadius: 20, borderTopRightRadius: 20,
    }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 9999,
          backgroundColor: "var(--color-primary)", color: "white",
          fontSize: 22, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
          flexShrink: 0,
        }}>
          {notary.name.charAt(0)}
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--color-ink)", margin: 0 }}>
              {notary.name}
            </h2>
            {notary.isVerified && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                fontSize: 11, fontWeight: 700, color: "#047857",
                backgroundColor: "#d1fae5", padding: "2px 8px", borderRadius: 9999,
              }}>
                <ShieldCheck size={13} weight="fill" /> Terverifikasi Kemenkumham
              </span>
            )}
          </div>
          <p style={{ fontSize: 13, color: "var(--color-stone)", margin: "4px 0 0 0" }}>
            {notary.title} · {notary.city}
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: "var(--color-stone)", padding: 4, borderRadius: 6,
        }}
      >
        <X size={20} />
      </button>
    </div>
  );
}
