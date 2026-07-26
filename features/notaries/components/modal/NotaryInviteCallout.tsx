"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

interface NotaryInviteCalloutProps {
  notaryName: string;
  inviteCode: string;
}

export function NotaryInviteCallout({ notaryName, inviteCode }: NotaryInviteCalloutProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      backgroundColor: "#e0e7ff",
      border: "1px solid #c7d2fe",
      borderRadius: 12,
      padding: 16,
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
    }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#3730a3" }}>
          Undang {notaryName.split(",")[0]} ke Bisnis Anda
        </div>
        <div style={{ fontSize: 12, color: "#4338ca", marginTop: 2 }}>
          Berikan Kode Undangan bisnis Anda agar Notaris dapat terhubung ke Dewan Suksesi.
        </div>
      </div>

      <button
        onClick={handleCopyCode}
        style={{
          backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)",
          border: "none", borderRadius: 8, padding: "8px 16px",
          fontSize: 13, fontWeight: 600, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6,
          flexShrink: 0,
        }}
      >
        {copied ? <Check size={16} weight="bold" /> : <Copy size={16} />}
        {copied ? "Kode Salin!" : `Salin Kode (${inviteCode})`}
      </button>
    </div>
  );
}
