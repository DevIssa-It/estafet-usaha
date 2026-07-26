"use client";

import { useState } from "react";
import { FileText, Printer } from "@phosphor-icons/react";
import { Profile, Business } from "@/types";
import { DocumentFormWizard } from "./DocumentFormWizard";
import { FamilyCharterPreview } from "./FamilyCharterPreview";

interface DocumentGeneratorViewProps {
  profile: Profile;
  business: Business;
}

export function DocumentGeneratorView({ profile, business }: DocumentGeneratorViewProps) {
  const [successorSalary, setSuccessorSalary] = useState("15.000.000");
  const [retainedProfitPercent, setRetainedProfitPercent] = useState("30");
  const [founderVetoRights, setFounderVetoRights] = useState("ya");
  const [conflictResolution, setConflictResolution] = useState("Musyawarah Dewan Keluarga & AI Advisor");
  const [effectiveDate, setEffectiveDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: "36px 48px 64px", maxWidth: 1200, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div className="no-print" style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "var(--rounded-md)",
                background: "linear-gradient(135deg, var(--color-accent-teal) 0%, #00d4a0 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <FileText size={20} color="white" weight="fill" />
              </div>
              <h1 className="display-md" style={{ color: "var(--color-on-dark)" }}>
                Generator Dokumen Suksesi Keluarga
              </h1>
            </div>
            <p className="body-md" style={{ color: "var(--color-on-dark-mute)" }}>
              Atur klausul kesepakatan tata kelola keluarga dan otomatis buat dokumen resmi <strong>Family Charter</strong>.
            </p>
          </div>

          <button onClick={handlePrint} className="btn btn-primary" style={{ gap: 8 }}>
            <Printer size={18} weight="bold" />
            Cetak / Export PDF
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 32 }} className="doc-layout">
        <DocumentFormWizard
          successorSalary={successorSalary} setSuccessorSalary={setSuccessorSalary}
          retainedProfitPercent={retainedProfitPercent} setRetainedProfitPercent={setRetainedProfitPercent}
          founderVetoRights={founderVetoRights} setFounderVetoRights={setFounderVetoRights}
          conflictResolution={conflictResolution} setConflictResolution={setConflictResolution}
          effectiveDate={effectiveDate} setEffectiveDate={setEffectiveDate}
        />

        <FamilyCharterPreview
          profile={profile}
          business={business}
          successorSalary={successorSalary}
          retainedProfitPercent={retainedProfitPercent}
          founderVetoRights={founderVetoRights}
          conflictResolution={conflictResolution}
          effectiveDate={effectiveDate}
        />
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .doc-layout { display: block !important; }
          .printable-document { box-shadow: none !important; padding: 0 !important; width: 100% !important; }
          body { background: white !important; color: black !important; }
        }
      `}</style>
    </div>
  );
}
