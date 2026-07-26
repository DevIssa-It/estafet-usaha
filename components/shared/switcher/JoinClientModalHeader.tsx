"use client";

import { ShieldCheck, X } from "@phosphor-icons/react";

interface JoinClientModalHeaderProps {
  onClose: () => void;
}

export function JoinClientModalHeader({ onClose }: JoinClientModalHeaderProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
        <ShieldCheck size={22} color="#4f46e5" weight="fill" /> Tambah Klien Bisnis Baru
      </div>
      <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
        <X size={20} />
      </button>
    </div>
  );
}
