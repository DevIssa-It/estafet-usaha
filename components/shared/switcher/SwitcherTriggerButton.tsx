"use client";

import { Buildings, CaretDown, Scales } from "@phosphor-icons/react";

interface SwitcherTriggerButtonProps {
  businessName: string;
  isNotary: boolean;
  isOpen: boolean;
  onClick: () => void;
}

export function SwitcherTriggerButton({ businessName, isNotary, onClick }: SwitcherTriggerButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "6px 12px",
        backgroundColor: "#f1f5f9",
        border: "1px solid #cbd5e1",
        borderRadius: 10,
        cursor: "pointer",
        fontSize: 13, fontWeight: 600, color: "#0f172a",
        transition: "all 0.15s ease-in-out",
      }}
    >
      {isNotary ? <Scales size={16} color="#4f46e5" weight="fill" /> : <Buildings size={16} color="#4f46e5" weight="fill" />}
      <span>Klien: <strong>{businessName}</strong></span>
      <CaretDown size={14} color="#64748b" />
    </button>
  );
}
