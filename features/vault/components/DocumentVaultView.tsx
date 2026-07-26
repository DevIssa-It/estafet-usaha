"use client";

import { useState } from "react";
import { FolderSimple, UploadSimple } from "@phosphor-icons/react";
import { Profile, Business, MilestoneCategory } from "@/types";
import { VaultCategoryCard } from "./VaultCategoryCard";
import { FileUploadModal } from "./FileUploadModal";
import { VaultDocumentList, VaultDoc } from "./VaultDocumentList";

const INITIAL_DOCS: VaultDoc[] = [
  {
    id: "v1",
    title: "Akta Pendirian Perusahaan & Perubahan 2022",
    category: "legal",
    fileName: "Akta_Pendirian_Batik_Santoso.pdf",
    fileSize: 2450000,
    uploadedAt: "2025-07-20",
  },
  {
    id: "v2",
    title: "Audit Keuangan & Laporan Valuasi Independent",
    category: "financial",
    fileName: "Audit_Keuangan_2024.pdf",
    fileSize: 4100000,
    uploadedAt: "2025-07-22",
  },
  {
    id: "v3",
    title: "SOP Operasional Retail & Produksi Batik",
    category: "operational",
    fileName: "SOP_Produksi_v2.pdf",
    fileSize: 1800000,
    uploadedAt: "2025-07-23",
  },
];

interface DocumentVaultViewProps {
  profile: Profile;
  business: Business;
}

export function DocumentVaultView({ profile, business }: DocumentVaultViewProps) {
  const [selectedCat, setSelectedCat] = useState<MilestoneCategory | "all">("all");
  const [docs, setDocs] = useState<VaultDoc[]>(INITIAL_DOCS);
  const [showUpload, setShowUpload] = useState(false);

  const categories: MilestoneCategory[] = ["legal", "financial", "operational", "relational"];

  const filteredDocs = selectedCat === "all" ? docs : docs.filter((d) => d.category === selectedCat);

  const handleUpload = (newDoc: { title: string; category: MilestoneCategory; fileName: string; fileSize: number }) => {
    const doc: VaultDoc = {
      id: "v_" + Date.now(),
      title: newDoc.title,
      category: newDoc.category,
      fileName: newDoc.fileName,
      fileSize: newDoc.fileSize,
      uploadedAt: new Date().toISOString().split("T")[0],
    };
    setDocs((prev) => [doc, ...prev]);
  };

  return (
    <div style={{ padding: "36px 48px 64px", maxWidth: 1200, width: "100%", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "var(--rounded-md)",
              background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-bright) 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <FolderSimple size={20} color="white" weight="fill" />
            </div>
            <h1 className="display-md" style={{ color: "var(--color-on-dark)" }}>
              Bilik Dokumen (Document Vault)
            </h1>
          </div>
          <p className="body-md" style={{ color: "var(--color-on-dark-mute)" }}>
            Penyimpanan berkas legal & finansial terenkripsi RLS Supabase untuk bisnis {business.name}.
          </p>
        </div>

        <button onClick={() => setShowUpload(true)} className="btn btn-primary" style={{ gap: 8 }}>
          <UploadSimple size={18} weight="bold" /> Unggah Berkas Baru
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {categories.map((cat) => (
          <VaultCategoryCard
            key={cat}
            category={cat}
            count={docs.filter((d) => d.category === cat).length}
            active={selectedCat === cat}
            onClick={() => setSelectedCat(selectedCat === cat ? "all" : cat)}
          />
        ))}
      </div>

      <VaultDocumentList docs={filteredDocs} />

      {showUpload && (
        <FileUploadModal onClose={() => setShowUpload(false)} onUpload={handleUpload} />
      )}
    </div>
  );
}
