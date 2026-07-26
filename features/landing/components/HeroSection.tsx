"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

export function HeroSection() {
  return (
    <section style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(73,79,223,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container-content text-center" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: "var(--rounded-full)", backgroundColor: "rgba(73,79,223,0.12)", border: "1px solid rgba(73,79,223,0.3)", marginBottom: 24 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--color-primary-bright)" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-primary-bright)" }}>
            Platform Suksesi Bisnis Keluarga Pertama di Indonesia
          </span>
        </div>

        <h1 className="display-lg" style={{ color: "var(--color-on-dark)", marginBottom: 20, maxWidth: 840, margin: "0 auto 20px" }}>
          Jaga Keberlanjutan Bisnis Keluarga Hingga <span style={{ color: "var(--color-primary-bright)" }}>Lintas Generasi</span>
        </h1>

        <p className="body-lg text-mute" style={{ maxWidth: 600, margin: "0 auto 36px", color: "var(--color-stone)" }}>
          Estafet Usaha membantu Pendiri dan Penerus UMKM merencanakan suksesi bisnis secara terstruktur melalui panduan 4 dimensi dan pendampingan AI Advisor.
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link href="/auth?mode=register" className="btn btn-cobalt" style={{ padding: "14px 28px", fontSize: 16, gap: 8 }}>
            Mulai Rencana Suksesi <ArrowRight size={18} />
          </Link>
          <a href="#fitur" className="btn btn-outline-dark" style={{ padding: "14px 28px", fontSize: 16 }}>
            Pelajari Fitur
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginTop: 40, color: "var(--color-stone)", fontSize: 13 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <CheckCircle size={16} color="var(--color-accent-teal)" weight="fill" /> Gratis Registrasi
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <CheckCircle size={16} color="var(--color-accent-teal)" weight="fill" /> 12 Milestone Terstruktur
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <CheckCircle size={16} color="var(--color-accent-teal)" weight="fill" /> Gemini 2.0 AI Advisor
          </span>
        </div>
      </div>
    </section>
  );
}
