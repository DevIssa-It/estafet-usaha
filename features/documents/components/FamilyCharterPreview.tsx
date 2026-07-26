"use client";

import { useState } from "react";
import { Copy, Check } from "@phosphor-icons/react";
import { Profile, Business } from "@/types";

interface FamilyCharterPreviewProps {
  profile: Profile;
  business: Business;
  successorSalary: string;
  retainedProfitPercent: string;
  founderVetoRights: string;
  conflictResolution: string;
  effectiveDate: string;
}

export function FamilyCharterPreview({
  profile,
  business,
  successorSalary,
  retainedProfitPercent,
  founderVetoRights,
  conflictResolution,
  effectiveDate,
}: FamilyCharterPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyDoc = () => {
    const text = `PIAGAM KESEPAKATAN TATA KELOLA KELUARGA & SUKSESI
(FAMILY CHARTER - ${business.name.toUpperCase()})

Pada hari ini, tanggal ${new Date(effectiveDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}, kami yang bertanda tangan di bawah ini sepakat untuk menyusun dan mengikatkan diri dalam Piagam Suksesi Bisnis Keluarga ${business.name} (${business.industry}).

PASAL 1: PERAN DAN TANGGUNG JAWAB
1. Pendiri (${profile.full_name}) bertindak sebagai Pembina & Pengawas Utama, berhak atas konsultasi strategis.
2. Generasi Penerus bertindak sebagai Pelaksana Operasional Utama dengan hak pengelolaan harian.

PASAL 2: HAK FINANSIAL & REMUNERASI
1. Pelaksana Operasional Penerus berhak menerima gaji pokok sebesar Rp ${successorSalary} per bulan.
2. Sebesar ${retainedProfitPercent}% dari laba bersih tahunan wajib ditahan sebagai cadangan ekspansi bisnis.
3. Sisa laba bersih dibagikan secara adil sebagai dividen keluarga sesuai porsi kepemilikan saham.

PASAL 3: TATA KELOLA & PENGAMBILAN KEPUTUSAN
1. Hak Veto Pendiri pada keputusan investasi di atas Rp 100 Juta: ${founderVetoRights === "ya" ? "BERLAKU" : "TIDAK BERLAKU"}.
2. Penyelesaian konflik keluarga atau perselisihan tata kelola dilakukan melalui ${conflictResolution}.

Pihak Pendiri: (${profile.full_name})
Pihak Penerus: (___________________)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }} className="no-print">
        <button
          onClick={handleCopyDoc}
          className="btn btn-outline-dark"
          style={{ padding: "6px 14px", fontSize: 12, gap: 6 }}
        >
          {copied ? <Check size={14} weight="bold" color="var(--color-accent-teal)" /> : <Copy size={14} />}
          <span>{copied ? "Teks Dokumen Tersalin!" : "Salin Teks Dokumen"}</span>
        </button>
      </div>

      <div style={{
        backgroundColor: "#ffffff",
        color: "#0f172a",
        padding: 48,
        borderRadius: "var(--rounded-lg)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: 14,
        lineHeight: 1.8,
        userSelect: "text",
        WebkitUserSelect: "text",
      }} className="printable-document">
        {/* Header Document */}
        <div style={{ textAlign: "center", borderBottom: "2px solid #0f172a", paddingBottom: 16, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>
            PIAGAM KESEPAKATAN TATA KELOLA KELUARGA & SUKSESI
          </h2>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#475569", margin: "4px 0 0" }}>
            (FAMILY CHARTER - {(business?.name || "Bisnis").toUpperCase()})
          </h3>
        </div>

        {/* Document Content */}
        <p style={{ textIndent: 36, marginBottom: 16 }}>
          Pada hari ini, tanggal <strong>{new Date(effectiveDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</strong>, kami yang bertanda tangan di bawah ini sepakat untuk menyusun dan mengikatkan diri dalam Piagam Suksesi Bisnis Keluarga <strong>{business?.name || "Bisnis"}</strong> ({business?.industry || "Retail"}).
        </p>

        <h4 style={{ fontSize: 15, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>PASAL 1: PERAN DAN TANGGUNG JAWAB</h4>
        <p style={{ marginBottom: 12 }}>
          1. <strong>Pendiri ({profile.full_name})</strong> bertindak sebagai Pembina & Pengawas Utama, berhak atas konsultasi strategis.<br />
          2. <strong>Generasi Penerus</strong> bertindak sebagai Pelaksana Operasional Utama dengan hak pengelolaan harian.
        </p>

        <h4 style={{ fontSize: 15, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>PASAL 2: HAK FINANSIAL & REMUNERASI</h4>
        <p style={{ marginBottom: 12 }}>
          1. Pelaksana Operasional Penerus berhak menerima gaji pokok sebesar <strong>Rp {successorSalary}</strong> per bulan.<br />
          2. Sebesar <strong>{retainedProfitPercent}%</strong> dari laba bersih tahunan wajib ditahan sebagai cadangan ekspansi bisnis.<br />
          3. Sisa laba bersih dibagikan secara adil sebagai dividen keluarga sesuai porsi kepemilikan saham.
        </p>

        <h4 style={{ fontSize: 15, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>PASAL 3: TATA KELOLA & PENGAMBILAN KEPUTUSAN</h4>
        <p style={{ marginBottom: 12 }}>
          1. Hak Veto Pendiri pada keputusan investasi di atas Rp 100 Juta: <strong>{founderVetoRights === "ya" ? "BERLAKU" : "TIDAK BERLAKU"}</strong>.<br />
          2. Penyelesaian konflik keluarga atau perselisihan tata kelola dilakukan melalui <strong>{conflictResolution}</strong>.
        </p>

        {/* Signatures Block */}
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1fr 1fr", textAlign: "center", gap: 32 }}>
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>Pihak Pendiri,</p>
            <div style={{ height: 72 }} />
            <p style={{ margin: 0, textDecoration: "underline", fontWeight: 700 }}>({profile.full_name})</p>
            <span style={{ fontSize: 12, color: "#64748b" }}>Pendiri / Pengawas</span>
          </div>

          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>Pihak Penerus,</p>
            <div style={{ height: 72 }} />
            <p style={{ margin: 0, textDecoration: "underline", fontWeight: 700 }}>(___________________)</p>
            <span style={{ fontSize: 12, color: "#64748b" }}>Generasi Penerus</span>
          </div>
        </div>
      </div>
    </div>
  );
}
