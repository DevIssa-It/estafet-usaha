"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

export function CtaSection() {
  return (
    <section style={{ padding: "88px 0", backgroundColor: "var(--color-surface-soft)" }}>
      <div className="container-content">
        <div className="card-featured text-center" style={{ padding: "64px 32px", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)", borderRadius: 24, boxShadow: "0 12px 32px rgba(79, 70, 229, 0.25)" }}>
          <h2 className="heading-xl" style={{ color: "#ffffff", marginBottom: 16, fontSize: 32, fontWeight: 700 }}>
            Siapkan Masa Depan Bisnis Keluarga Anda Hari Ini
          </h2>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.9)", maxWidth: 580, margin: "0 auto 36px", fontSize: 16, lineHeight: 1.6 }}>
            Jangan biarkan kerja keras puluhan tahun pudar karena transisi yang tidak terencana. Mulai petakan suksesi bisnis secara gratis.
          </p>
          <Link
            href="/auth?mode=register"
            className="btn"
            style={{
              padding: "16px 36px",
              fontSize: 16,
              fontWeight: 700,
              backgroundColor: "#ffffff",
              color: "#0f172a",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 9999,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              textDecoration: "none",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            Daftar Sekarang <ArrowRight size={18} weight="bold" color="#0f172a" />
          </Link>
        </div>
      </div>
    </section>
  );
}
