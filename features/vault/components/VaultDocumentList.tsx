import { FilePdf, DownloadSimple, Lock } from "@phosphor-icons/react";
import { MilestoneCategory, CATEGORY_LABELS, CATEGORY_COLORS } from "@/types";

export interface VaultDoc {
  id: string;
  title: string;
  category: MilestoneCategory;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
}

interface VaultDocumentListProps {
  docs: VaultDoc[];
}

export function VaultDocumentList({ docs }: VaultDocumentListProps) {
  const formatKB = (bytes: number) => (bytes / 1024 / 1024).toFixed(1) + " MB";

  return (
    <div className="card-dark">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 className="heading-sm" style={{ color: "var(--color-on-dark)" }}>
          Daftar Berkas Dokumen ({docs.length})
        </h2>
        <div style={{ fontSize: 12, color: "var(--color-accent-teal)", display: "flex", alignItems: "center", gap: 6 }}>
          <Lock size={14} /> Terproteksi Enkripsi Supabase RLS
        </div>
      </div>

      {docs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--color-stone)" }}>
          Belum ada dokumen tersimpan di kategori ini.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {docs.map((d) => {
            const color = CATEGORY_COLORS[d.category];
            return (
              <div key={d.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 16px",
                backgroundColor: "var(--color-surface-elevated)",
                border: "1px solid var(--color-hairline-dark)",
                borderRadius: "var(--rounded-md)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <FilePdf size={28} color={color} weight="fill" />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-on-dark)" }}>{d.title}</div>
                    <div style={{ fontSize: 12, color: "var(--color-stone)", marginTop: 2 }}>
                      {d.fileName} · {formatKB(d.fileSize)} · Diunggah {d.uploadedAt}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: "2px 10px",
                    borderRadius: "var(--rounded-full)",
                    backgroundColor: color + "20", color, border: `1px solid ${color}`,
                  }}>
                    {CATEGORY_LABELS[d.category]}
                  </span>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert(`Mengunduh ${d.fileName}...`); }}
                    style={{ color: "var(--color-primary-bright)", display: "flex", alignItems: "center", gap: 4, fontSize: 13, textDecoration: "none" }}
                  >
                    <DownloadSimple size={16} /> Unduh
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
