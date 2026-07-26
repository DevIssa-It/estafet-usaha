"use client";

import { User, Calendar, FileText } from "@phosphor-icons/react";
import { ClientInvitation } from "./InvitationCard";

interface InvitationClientProfileCardProps {
  invitation: ClientInvitation;
}

export function InvitationClientProfileCard({ invitation }: InvitationClientProfileCardProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, backgroundColor: "#f8fafc", padding: 16, borderRadius: 12, border: "1px solid #e2e8f0", marginBottom: 16 }}>
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
          {invitation.description}
        </div>
      </div>
    </div>
  );
}
