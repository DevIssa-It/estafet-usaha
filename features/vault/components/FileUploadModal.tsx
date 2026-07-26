"use client";

import { useState } from "react";
import { UploadSimple, X } from "@phosphor-icons/react";
import { MilestoneCategory } from "@/types";

interface FileUploadModalProps {
  onClose: () => void;
  onUpload: (doc: { title: string; category: MilestoneCategory; fileName: string; fileSize: number }) => void;
}

export function FileUploadModal({ onClose, onUpload }: FileUploadModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<MilestoneCategory>("legal");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return;

    onUpload({
      title,
      category,
      fileName: file.name,
      fileSize: file.size,
    });
    onClose();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      backgroundColor: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div style={{
        backgroundColor: "var(--color-surface-elevated)",
        border: "1px solid var(--color-hairline-dark)",
        borderRadius: "var(--rounded-lg)",
        width: "100%", maxWidth: 460, padding: 24,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 className="heading-sm" style={{ color: "var(--color-on-dark)" }}>Unggah Dokumen Berkas</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--color-stone)", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 6 }}>Nama / Judul Dokumen *</label>
            <input
              className="input-field-dark"
              placeholder="Contoh: Akta Pendirian PT / SIUP 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 6 }}>Dimensi Dokumen *</label>
            <select
              className="input-field-dark"
              value={category}
              onChange={(e) => setCategory(e.target.value as MilestoneCategory)}
            >
              <option value="legal">Legal & Hukum (Akta, SIUP, NPWP)</option>
              <option value="financial">Finansial (Laporan Keuangan, Audit, Valuasi)</option>
              <option value="operational">Operasional (SOP, Kontrak Vendor)</option>
              <option value="relational">Relational (Family Charter, Perjanjian)</option>
            </select>
          </div>

          <div>
            <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 6 }}>Pilih Berkas File *</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              style={{ color: "var(--color-on-dark)", fontSize: 13 }}
            />
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button type="button" onClick={onClose} className="btn btn-outline-dark" style={{ flex: 1 }}>Batal</button>
            <button type="submit" className="btn btn-cobalt" style={{ flex: 1, gap: 6 }}>
              <UploadSimple size={16} /> Unggah File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
