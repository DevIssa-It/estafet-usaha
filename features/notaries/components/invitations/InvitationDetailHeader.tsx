"use client";

import { Buildings, X } from "@phosphor-icons/react";

interface InvitationDetailHeaderProps {
  onClose: () => void;
}

export function InvitationDetailHeader({ onClose }: InvitationDetailHeaderProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
        <Buildings size={22} color="#4f46e5" weight="fill" /> Pertimbangan Hukum & Detail Klien
      </div>
      <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
        <X size={20} />
      </button>
    </div>
  );
}
