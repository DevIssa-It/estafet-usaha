"use client";

import { ShieldCheck, Certificate } from "@phosphor-icons/react";

interface NotaryVerificationSpecsProps {
  skNumber: string;
  iniNumber: string;
}

export function NotaryVerificationSpecs({ skNumber, iniNumber }: NotaryVerificationSpecsProps) {
  return (
    <div style={{
      backgroundColor: "var(--color-surface-soft)",
      border: "1px solid var(--color-hairline-strong)",
      borderRadius: 12,
      padding: "16px 20px",
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
    }}>
      <div>
        <div style={{ fontSize: 11, color: "var(--color-stone)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
          Nomor SK Kemenkumham
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-ink)", display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <ShieldCheck size={16} color="#059669" weight="fill" />
          {skNumber}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, color: "var(--color-stone)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
          Nomor Anggota INI
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-ink)", display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <Certificate size={16} color="var(--color-primary)" weight="fill" />
          {iniNumber}
        </div>
      </div>
    </div>
  );
}
