"use client";

import { useState } from "react";
import { UserPlus, UserCheck } from "@phosphor-icons/react";

interface TeamMembersProps {
  members: { id: string; full_name: string; role: string }[];
}

const ROLE_BADGES: Record<string, { label: string; color: string }> = {
  pendiri: { label: "Pendiri / Owner", color: "#4f46e5" },
  penerus: { label: "Penerus Utama", color: "#0284c7" },
  calon_penerus: { label: "Calon Penerus", color: "#6366f1" },
  notaris: { label: "Notaris Partner", color: "#4338ca" },
  advisor: { label: "External Advisor", color: "#7c3aed" },
};

export function TeamMembers({ members }: TeamMembersProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 className="heading-sm" style={{ color: "#0f172a", fontSize: 16, fontWeight: 700 }}>
          Dewan & Tim Suksesi Bisnis ({members.length})
        </h3>
        <button
          onClick={() => setShowInviteModal(true)}
          style={{
            background: "none", border: "none", color: "#4f46e5",
            cursor: "pointer", fontSize: 13, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 4,
          }}
        >
          <UserPlus size={16} weight="bold" /> Undang Anggota
        </button>
      </div>

      {/* Grid of Team Members filling the width */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
        {members.map((m) => {
          const badge = ROLE_BADGES[m.role] || ROLE_BADGES.penerus;
          return (
            <div
              key={m.id}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                padding: "12px 14px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 9999,
                  backgroundColor: badge.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 700, color: "white", flexShrink: 0,
                  boxShadow: `0 2px 8px ${badge.color}30`,
                }}>
                  {m.full_name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div className="body-sm" style={{ color: "#0f172a", fontWeight: 600, fontSize: 13 }}>
                    {m.full_name}
                  </div>
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                    {badge.label}
                  </div>
                </div>
              </div>

              <span style={{
                fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999,
                backgroundColor: "#e0e7ff", color: "#4338ca", border: "1px solid #c7d2fe",
                flexShrink: 0,
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
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
        }}>
          <div style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            width: "100%", maxWidth: 420, padding: 28, textAlign: "center",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.15)",
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <UserCheck size={28} color="#4f46e5" weight="duotone" />
            </div>
            <h3 className="heading-sm" style={{ color: "#0f172a", marginBottom: 8, fontSize: 18, fontWeight: 700 }}>
              Undang Anggota Keluarga & Notaris
            </h3>
            <p className="body-sm" style={{ color: "#475569", marginBottom: 24, fontSize: 14, lineHeight: 1.5 }}>
              Bagikan kode undangan bisnis Anda di samping kepada generasi penerus atau partner legal untuk bergabung ke ruang kerja bisnis.
            </p>
            <button onClick={() => setShowInviteModal(false)} className="btn btn-cobalt" style={{ width: "100%", height: 44, fontWeight: 600 }}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
