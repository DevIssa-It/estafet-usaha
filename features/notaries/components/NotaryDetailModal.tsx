"use client";

import { Notary } from "../data/notariesData";
import { NotaryModalHeader } from "./modal/NotaryModalHeader";
import { NotaryVerificationSpecs } from "./modal/NotaryVerificationSpecs";
import { NotaryContactCard } from "./modal/NotaryContactCard";
import { NotaryReviewsList } from "./modal/NotaryReviewsList";
import { NotaryInviteCallout } from "./modal/NotaryInviteCallout";

interface NotaryDetailModalProps {
  notary: Notary | null;
  inviteCode?: string;
  onClose: () => void;
}

export function NotaryDetailModal({ notary, inviteCode = "ESTAFET", onClose }: NotaryDetailModalProps) {
  if (!notary) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      backdropFilter: "blur(4px)",
      zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }}>
      <div style={{
        backgroundColor: "var(--color-surface-card)",
        borderRadius: 20,
        width: "100%", maxWidth: 680,
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        border: "1px solid var(--color-hairline-dark)",
      }}>
        <NotaryModalHeader notary={notary} onClose={onClose} />

        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
          <NotaryVerificationSpecs skNumber={notary.skNumber} iniNumber={notary.iniNumber} />

          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--color-ink)", marginBottom: 6 }}>
              Profil & Pengalaman
            </h4>
            <p style={{ fontSize: 13, color: "var(--color-charcoal)", lineHeight: 1.6, margin: 0 }}>
              {notary.bio}
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--color-ink)", marginBottom: 8 }}>
              Keahlian & Spesialisasi
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {notary.specializations.map((s, i) => (
                <span key={i} style={{
                  fontSize: 12, fontWeight: 600,
                  backgroundColor: "#e0e7ff", color: "#4338ca",
                  padding: "4px 10px", borderRadius: 8,
                  border: "1px solid #c7d2fe",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <NotaryContactCard address={notary.address} phone={notary.phone} email={notary.email} />
          <NotaryReviewsList reviews={notary.reviews} rating={notary.rating} />
          <NotaryInviteCallout notaryName={notary.name} inviteCode={inviteCode} />
        </div>
      </div>
    </div>
  );
}
