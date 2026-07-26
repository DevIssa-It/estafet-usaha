"use client";

import { Check, Plus } from "@phosphor-icons/react";
import { Business } from "@/types";

interface SwitcherDropdownListProps {
  businessesList: Business[];
  currentBusinessId: string;
  isNotary: boolean;
  onSelect: () => void;
  onOpenModal: () => void;
}

export function SwitcherDropdownList({
  businessesList, currentBusinessId, isNotary, onSelect, onOpenModal,
}: SwitcherDropdownListProps) {
  return (
    <div style={{
      position: "absolute", top: "100%", left: 0, marginTop: 6,
      width: 280,
      backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: 12,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      zIndex: 99,
      padding: 8,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", padding: "6px 10px", letterSpacing: 0.5 }}>
        {isNotary ? "Daftar Bisnis Klien (" + businessesList.length + ")" : "Bisnis Anda"}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {businessesList.map((b) => {
          const isSelected = b.id === currentBusinessId;
          return (
            <button
              key={b.id}
              onClick={onSelect}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "8px 10px",
                borderRadius: 8,
                border: "none",
                backgroundColor: isSelected ? "#e0e7ff" : "transparent",
                color: isSelected ? "#4338ca" : "#0f172a",
                cursor: "pointer",
                textAlign: "left",
                fontSize: 13,
                fontWeight: isSelected ? 600 : 500,
              }}
            >
              <div>
                <div>{b.name}</div>
                <div style={{ fontSize: 11, color: isSelected ? "#4f46e5" : "#64748b" }}>{b.industry || "Bisnis Klien"}</div>
              </div>
              {isSelected && <Check size={16} color="#4f46e5" weight="bold" />}
            </button>
          );
        })}
      </div>

      {isNotary && (
        <div style={{ borderTop: "1px solid #e2e8f0", marginTop: 6, paddingTop: 6 }}>
          <button
            type="button"
            onClick={() => {
              onSelect();
              onOpenModal();
            }}
            style={{
              display: "flex", alignItems: "center", gap: 6, width: "100%",
              padding: "8px 10px", borderRadius: 8, border: "none",
              fontSize: 12, fontWeight: 600, color: "#4f46e5",
              cursor: "pointer", backgroundColor: "#f8fafc", textAlign: "left",
            }}
          >
            <Plus size={14} weight="bold" /> + Tambah Klien Baru via Kode
          </button>
        </div>
      )}
    </div>
  );
}
