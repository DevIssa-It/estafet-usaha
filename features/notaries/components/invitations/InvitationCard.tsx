"use client";

import { Buildings, Check, X, Eye } from "@phosphor-icons/react";

export interface ClientInvitation {
  id: string;
  businessName: string;
  industry: string;
  ownerName: string;
  foundedYear: number;
  description: string;
  invitedAt: string;
}

interface InvitationCardProps {
  invitation: ClientInvitation;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onViewDetail: (inv: ClientInvitation) => void;
}

export function InvitationCard({ invitation, onAccept, onReject, onViewDetail }: InvitationCardProps) {
  return (
    <div style={{
      backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 14,
      padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 16, flexWrap: "wrap", boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10, backgroundColor: "#e0e7ff",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Buildings size={24} color="#4f46e5" weight="fill" />
        </div>

        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
            {invitation.businessName}
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
            Pendiri: <strong>{invitation.ownerName}</strong> · Industri: {invitation.industry} · Berdiri {invitation.foundedYear}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          type="button"
          onClick={() => onViewDetail(invitation)}
          style={{
            padding: "8px 14px", borderRadius: 8, border: "1px solid #cbd5e1",
            backgroundColor: "#f8fafc", color: "#334155", fontSize: 12, fontWeight: 600,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          }}
        >
          <Eye size={14} /> Tinjau Klien
        </button>

        <button
          type="button"
          onClick={() => onAccept(invitation.id)}
          style={{
            padding: "8px 14px", borderRadius: 8, border: "none",
            backgroundColor: "#059669", color: "#ffffff", fontSize: 12, fontWeight: 600,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          }}
        >
          <Check size={14} weight="bold" /> Terima Klien
        </button>

        <button
          type="button"
          onClick={() => onReject(invitation.id)}
          style={{
            padding: "8px 12px", borderRadius: 8, border: "1px solid #fecaca",
            backgroundColor: "#fef2f2", color: "#dc2626", fontSize: 12, fontWeight: 600,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
          }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
