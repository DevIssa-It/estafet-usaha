"use client";

import { useState } from "react";
import { EnvelopeSimple, Check } from "@phosphor-icons/react";
import { InvitationCard, ClientInvitation } from "./InvitationCard";
import { InvitationDetailModal } from "./InvitationDetailModal";

interface IncomingInvitationsListProps {
  initialInvitations?: ClientInvitation[];
}

export function IncomingInvitationsList({ initialInvitations = [] }: IncomingInvitationsListProps) {
  const [invitations, setInvitations] = useState<ClientInvitation[]>(initialInvitations);
  const [selectedInv, setSelectedInv] = useState<ClientInvitation | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const handleAccept = (id: string) => {
    const inv = invitations.find(i => i.id === id);
    setInvitations(prev => prev.filter(i => i.id !== id));
    setToastMessage(`Berhasil menerima ${inv?.businessName || "Klien"}! Bisnis kini terhubung di Client Switcher.`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleReject = (id: string) => {
    setInvitations(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div style={{
      backgroundColor: "var(--color-surface-card)",
      border: "1px solid var(--color-hairline-dark)",
      borderRadius: 16,
      padding: 32,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <EnvelopeSimple size={22} color="var(--color-primary)" weight="fill" />
          <h2 className="heading-sm" style={{ color: "var(--color-ink)", margin: 0, fontSize: 18, fontWeight: 700 }}>
            Undangan Klien Masuk dari Katalog ({invitations.length})
          </h2>
        </div>
      </div>

      {toastMessage && (
        <div style={{
          padding: "12px 16px", borderRadius: 10, backgroundColor: "#d1fae5",
          border: "1px solid #a7f3d0", color: "#047857", fontSize: 13, fontWeight: 600,
          marginBottom: 18, display: "flex", alignItems: "center", gap: 8,
        }}>
          <Check size={18} weight="bold" /> {toastMessage}
        </div>
      )}

      {invitations.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-stone)", fontSize: 14 }}>
          Belum ada undangan Klien baru yang menunggu pertimbangan Anda.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {invitations.map((inv) => (
            <InvitationCard
              key={inv.id}
              invitation={inv}
              onAccept={handleAccept}
              onReject={handleReject}
              onViewDetail={setSelectedInv}
            />
          ))}
        </div>
      )}

      <InvitationDetailModal
        invitation={selectedInv}
        onClose={() => setSelectedInv(null)}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
}
