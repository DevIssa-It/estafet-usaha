"use client";

import { ShieldCheck, Star, MapPin, Briefcase, ArrowRight } from "@phosphor-icons/react";
import { Notary } from "../data/notariesData";

interface NotaryCardProps {
  notary: Notary;
  onSelect: (notary: Notary) => void;
}

export function NotaryCard({ notary, onSelect }: NotaryCardProps) {
  return (
    <div style={{
      backgroundColor: "var(--color-surface-card)",
      border: "1px solid var(--color-hairline-dark)",
      borderRadius: 16,
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 16,
      boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
      transition: "all 0.2s ease-in-out",
    }}>
      <div>
        {/* Header Badges */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          {notary.isVerified ? (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              fontSize: 11, fontWeight: 700, color: "#047857",
              backgroundColor: "#d1fae5", padding: "3px 10px", borderRadius: 9999,
              border: "1px solid #a7f3d0",
            }}>
              <ShieldCheck size={14} weight="fill" /> SK AHU Kemenkumham Valid
            </span>
          ) : <span />}

          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 700, color: "#d97706" }}>
            <Star size={16} weight="fill" /> {notary.rating} <span style={{ fontSize: 11, fontWeight: 400, color: "var(--color-stone)" }}>({notary.reviewCount})</span>
          </div>
        </div>

        {/* Notary Name & Location */}
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 9999,
            backgroundColor: "var(--color-primary)", color: "white",
            fontSize: 18, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 10px rgba(79, 70, 229, 0.2)",
            flexShrink: 0,
          }}>
            {notary.name.charAt(0)}
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-ink)", margin: "0 0 2px 0" }}>
              {notary.name}
            </h3>
            <div style={{ fontSize: 12, color: "var(--color-stone)", display: "flex", alignItems: "center", gap: 4 }}>
              <MapPin size={14} color="var(--color-stone)" /> {notary.city} · {notary.experienceYears} Thn Pengalaman
            </div>
          </div>
        </div>

        {/* Specialization Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {notary.specializations.slice(0, 3).map((spec, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 500,
              backgroundColor: "var(--color-surface-soft)", color: "var(--color-charcoal)",
              padding: "3px 8px", borderRadius: 6,
              border: "1px solid var(--color-hairline-dark)",
            }}>
              {spec}
            </span>
          ))}
        </div>

        {/* Summary stats */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 12, color: "var(--color-mute)",
          paddingTop: 10, borderTop: "1px dashed var(--color-hairline-dark)",
        }}>
          <div>
            <strong>{notary.completedDeeds}+</strong> Akta Suksesi Selesai
          </div>
          <div>
            <Briefcase size={14} style={{ display: "inline", marginRight: 4 }} />
            Terdaftar INI
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onSelect(notary)}
        style={{
          width: "100%",
          padding: "10px 16px",
          backgroundColor: "var(--color-canvas-dark)",
          border: "1px solid var(--color-hairline-strong)",
          borderRadius: 10,
          color: "var(--color-primary)",
          fontSize: 13, fontWeight: 600,
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          transition: "all 0.15s ease-in-out",
        }}
      >
        Lihat Profil & Kredibilitas <ArrowRight size={15} weight="bold" />
      </button>
    </div>
  );
}
