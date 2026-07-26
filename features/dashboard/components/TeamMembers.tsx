"use client";

import { useState } from "react";
import { UserPlus, UserCheck, ShieldCheck } from "@phosphor-icons/react";

interface TeamMembersProps {
  members: { id: string; full_name: string; role: string }[];
}

const ROLE_BADGES: Record<string, { label: string; color: string }> = {
  pendiri: { label: "Pendiri / Owner", color: "var(--color-primary-bright)" },
  penerus: { label: "Penerus Utama", color: "var(--color-accent-teal)" },
  calon_penerus: { label: "Calon Penerus", color: "var(--color-accent-warning)" },
  notaris: { label: "Notaris Partner", color: "#a855f7" },
  advisor: { label: "External Advisor", color: "#ec4899" },
};

export function TeamMembers({ members }: TeamMembersProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="card-dark">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 className="heading-sm" style={{ color: "var(--color-on-dark)" }}>
          Dewan & Tim Suksesi Keluarga ({members.length})
        </h3>
        <button
          onClick={() => setShowInviteModal(true)}
          style={{
            background: "none", border: "none", color: "var(--color-primary-bright)",
            cursor: "pointer", fontSize: 12, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 4,
          }}
        >
          <UserPlus size={14} /> Undang Anggota
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {members.map((m) => {
          const badge = ROLE_BADGES[m.role] || ROLE_BADGES.penerus;
          return (
            <div key={m.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "var(--rounded-full)",
                  backgroundColor: badge.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0,
                }}>
                  {m.full_name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div className="body-sm" style={{ color: "var(--color-on-dark)", fontWeight: 500 }}>
                    {m.full_name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--color-stone)" }}>
                    {badge.label}
                  </div>
                </div>
              </div>

              <span style={{
                fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: "var(--rounded-full)",
                backgroundColor: badge.color + "20", color: badge.color, border: `1px solid ${badge.color}`,
              }}>
                Aktif
              </span>
            </div>
          );
        })}
      </div>

      {showInviteModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          backgroundColor: "rgba(0,0,0,0.75)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
        }}>
          <div style={{
            backgroundColor: "var(--color-surface-elevated)",
            border: "1px solid var(--color-hairline-dark)",
            borderRadius: "var(--rounded-lg)",
            width: "100%", maxWidth: 400, padding: 24, textAlign: "center",
          }}>
            <UserCheck size={40} color="var(--color-primary-bright)" style={{ marginBottom: 12 }} />
            <h3 className="heading-sm" style={{ color: "var(--color-on-dark)", marginBottom: 8 }}>
              Undang Anggota / Notaris
            </h3>
            <p className="body-sm" style={{ color: "var(--color-on-dark-mute)", marginBottom: 20 }}>
              Bagikan kode undangan unik bisnis Anda agar anggota keluarga atau notaris dapat bergabung ke platform.
            </p>
            <button onClick={() => setShowInviteModal(false)} className="btn btn-cobalt" style={{ width: "100%" }}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
