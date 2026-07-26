import { BookOpen, Clock, CheckCircle } from "@phosphor-icons/react";
import { CATEGORY_LABELS, CATEGORY_COLORS, MilestoneCategory } from "@/types";

export interface CourseModule {
  id: string;
  title: string;
  category: MilestoneCategory;
  summary: string;
  duration: string;
  content: string;
  completed: boolean;
}

interface CourseModuleCardProps {
  module: CourseModule;
  onRead: (module: CourseModule) => void;
}

export function CourseModuleCard({ module, onRead }: CourseModuleCardProps) {
  const color = CATEGORY_COLORS[module.category];
  const categoryLabel = CATEGORY_LABELS[module.category];

  return (
    <div className="card-dark" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: "var(--rounded-full)",
            backgroundColor: color + "20", color, border: `1px solid ${color}`,
          }}>
            {categoryLabel}
          </span>
          {module.completed && (
            <span style={{ fontSize: 11, color: "var(--color-accent-teal)", display: "flex", alignItems: "center", gap: 4 }}>
              <CheckCircle size={14} weight="fill" /> Selesai
            </span>
          )}
        </div>

        <h3 className="heading-sm" style={{ color: "var(--color-on-dark)", marginBottom: 8 }}>
          {module.title}
        </h3>
        <p className="body-sm" style={{ color: "var(--color-on-dark-mute)", lineHeight: 1.5, marginBottom: 16 }}>
          {module.summary}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid var(--color-hairline-dark)" }}>
        <span style={{ fontSize: 12, color: "var(--color-stone)", display: "flex", alignItems: "center", gap: 4 }}>
          <Clock size={14} /> {module.duration}
        </span>
        <button
          onClick={() => onRead(module)}
          className="btn btn-outline-dark"
          style={{ padding: "6px 14px", fontSize: 12, gap: 6 }}
        >
          <BookOpen size={14} /> Baca Panduan
        </button>
      </div>
    </div>
  );
}
