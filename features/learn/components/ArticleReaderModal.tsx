import { X, CheckCircle } from "@phosphor-icons/react";
import { CourseModule } from "./CourseModuleCard";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/types";

interface ArticleReaderModalProps {
  module: CourseModule;
  onClose: () => void;
  onComplete: (id: string) => void;
}

export function ArticleReaderModal({ module, onClose, onComplete }: ArticleReaderModalProps) {
  const color = CATEGORY_COLORS[module.category];
  const label = CATEGORY_LABELS[module.category];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      backgroundColor: "rgba(0,0,0,0.8)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div style={{
        backgroundColor: "var(--color-surface-elevated)",
        border: "1px solid var(--color-hairline-dark)",
        borderRadius: "var(--rounded-lg)",
        width: "100%", maxWidth: 640, maxHeight: "85vh",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        <div style={{
          padding: "16px 24px", borderBottom: "1px solid var(--color-hairline-dark)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: "var(--rounded-full)", backgroundColor: color + "20", color, border: `1px solid ${color}` }}>
            {label}
          </span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--color-stone)", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: 24, overflowY: "auto", flex: 1 }}>
          <h2 className="heading-md" style={{ color: "var(--color-on-dark)", marginBottom: 16 }}>
            {module.title}
          </h2>
          <div className="body-md" style={{ color: "var(--color-on-dark-mute)", lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {module.content}
          </div>
        </div>

        <div style={{ padding: "16px 24px", borderTop: "1px solid var(--color-hairline-dark)", display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button onClick={onClose} className="btn btn-outline-dark">Tutup</button>
          <button
            onClick={() => { onComplete(module.id); onClose(); }}
            className="btn btn-cobalt"
            style={{ gap: 6 }}
          >
            <CheckCircle size={16} /> Tandai Selesai Dibaca
          </button>
        </div>
      </div>
    </div>
  );
}
