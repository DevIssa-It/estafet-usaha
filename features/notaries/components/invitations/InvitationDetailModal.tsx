"use client";

import { X, Check, Buildings, User, Calendar, FileText } from "@phosphor-icons/react";
import { ClientInvitation } from "./InvitationCard";

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
        borderRadius: 16, width: "100%", maxWidth: 500, padding: 28,
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
            <Buildings size={22} color="#4f46e5" weight="fill" /> Tinjauan Profil Klien Usaha
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, backgroundColor: "#f8fafc", padding: 16, borderRadius: 12, border: "1px solid #e2e8f0", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>{invitation.businessName}</div>
            <div style={{ fontSize: 12, color: "#4f46e5", fontWeight: 600 }}>{invitation.industry}</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 13, color: "#334155" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <User size={16} color="#64748b" /> Pendiri: <strong>{invitation.ownerName}</strong>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Calendar size={16} color="#64748b" /> Berdiri: <strong>{invitation.foundedYear}</strong>
            </span>
          </div>

          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
              <FileText size={14} /> Deskripsi Usaha:
            </div>
            <div style={{ fontSize: 13, color: "#0f172a", lineHeight: 1.5 }}>
              {invitation.description || "Bisnis keluarga bergerak di bidang " + invitation.industry + " sedang mempersiapkan pendokumentasian legalitas suksesi."}
            </div>
          </div>
        </div>

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
