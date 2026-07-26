"use client";

import { Check } from "@phosphor-icons/react";
import { ClientInvitation } from "./InvitationCard";
import { InvitationDetailHeader } from "./InvitationDetailHeader";
import { InvitationClientProfileCard } from "./InvitationClientProfileCard";
import { InvitationLegalChecklistCard } from "./InvitationLegalChecklistCard";

interface InvitationDetailModalProps {
  invitation: ClientInvitation | null;
  onClose: () => void;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export function InvitationDetailModal({ invitation, onClose, onAccept, onReject }: InvitationDetailModalProps) {
  if (!invitation) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div style={{
        backgroundColor: "#ffffff", border: "1px solid #cbd5e1",
        borderRadius: 16, width: "100%", maxWidth: 520, padding: 28,
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
        maxHeight: "90vh", overflowY: "auto",
      }}>
        <InvitationDetailHeader onClose={onClose} />
        <InvitationClientProfileCard invitation={invitation} />
        <InvitationLegalChecklistCard />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
          <button
            type="button"
            onClick={() => { onReject(invitation.id); onClose(); }}
            style={{
              padding: "10px 16px", borderRadius: 8, border: "1px solid #fecaca",
              backgroundColor: "#fef2f2", color: "#dc2626", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            Tolak Permintaan
          </button>

          <button
            type="button"
            onClick={() => { onAccept(invitation.id); onClose(); }}
            style={{
              padding: "10px 20px", borderRadius: 8, border: "none",
              backgroundColor: "#059669", color: "#ffffff", fontSize: 13, fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <Check size={16} weight="bold" /> Terima Klien & Gabungkan
          </button>
        </div>
      </div>
    </div>
  );
}
