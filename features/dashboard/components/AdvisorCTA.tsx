import Link from "next/link";
import { Brain, ArrowRight } from "@phosphor-icons/react";

interface AdvisorCTAProps {
  businessName?: string;
  role?: string;
}

export function AdvisorCTA({ businessName = "Bisnis Anda", role = "pendiri" }: AdvisorCTAProps) {
  return (
    <div style={{
      width: "100%",
      backgroundColor: "#e0e7ff",
      border: "1px solid #c7d2fe",
      borderRadius: 16,
      padding: "28px 36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 24,
      boxShadow: "0 2px 8px rgba(79, 70, 229, 0.08)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, maxWidth: 640 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
        }}>
          <Brain size={26} color="white" weight="fill" />
        </div>
        <div>
          <h3 className="heading-sm" style={{ color: "#0f172a", marginBottom: 4, fontSize: 18, fontWeight: 700 }}>
            AI Advisor Suksesi 24/7 (Google Gemini AI)
          </h3>
          <p className="body-sm" style={{ color: "#334155", fontSize: 14, lineHeight: 1.5 }}>
            Dapatkan panduan hukum, valuasi finansial, dan strategi pendelegasian operasional untuk <strong>{businessName}</strong> secara instan.
          </p>
        </div>
      </div>

      <Link
        href="/advisor"
        className="btn btn-cobalt"
        style={{ padding: "12px 24px", fontSize: 14, fontWeight: 600, gap: 8, height: 44, flexShrink: 0 }}
      >
        Mulai Konsultasi AI <ArrowRight size={16} weight="bold" />
      </Link>
    </div>
  );
}
