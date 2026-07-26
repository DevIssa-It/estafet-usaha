import Link from "next/link";
import { Brain, ArrowRight } from "@phosphor-icons/react";

export function AdvisorCTA() {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(73,79,223,0.15) 0%, rgba(73,79,223,0.05) 100%)",
      border: "1px solid rgba(73,79,223,0.25)",
      borderRadius: "var(--rounded-lg)",
      padding: 24,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: "var(--rounded-md)",
          background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-bright) 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Brain size={22} color="white" weight="fill" />
        </div>
        <div>
          <h3 className="heading-sm" style={{ color: "var(--color-on-dark)", marginBottom: 4 }}>
            AI Advisor Suksesi
          </h3>
          <p className="body-sm" style={{ color: "var(--color-on-dark-mute)" }}>
            Dapatkan panduan personal dari AI tentang langkah suksesi yang tepat untuk bisnis Anda.
          </p>
        </div>
      </div>
      <Link
        href="/advisor"
        className="btn btn-cobalt"
        style={{ width: "100%", justifyContent: "center", gap: 8 }}
      >
        Konsultasi Sekarang <ArrowRight size={14} />
      </Link>
    </div>
  );
}
