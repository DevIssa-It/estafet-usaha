"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

export function HeroSection() {
  return (
    <section style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden", backgroundColor: "#f8fafc" }}>
      {/* Background glow radial */}
      <div style={{
        position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
        width: 650, height: 650, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container-content text-center" style={{ position: "relative", zIndex: 1 }}>
        {/* Pill Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 9999, backgroundColor: "#e0e7ff", border: "1px solid #c7d2fe", marginBottom: 24 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#4f46e5" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#4338ca" }}>
            Platform Suksesi Bisnis Keluarga Pertama di Indonesia
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="display-lg" style={{ color: "#0f172a", marginBottom: 20, maxWidth: 840, margin: "0 auto 20px", fontWeight: 700, lineHeight: 1.15 }}>
          Jaga Keberlanjutan Bisnis Keluarga Hingga <span style={{ color: "#4f46e5" }}>Lintas Generasi</span>
        </h1>

        {/* Subtitle */}
        <p className="body-lg" style={{ maxWidth: 620, margin: "0 auto 36px", color: "#475569", fontSize: 18, lineHeight: 1.6 }}>
          Estafet Usaha membantu Pendiri dan Penerus UMKM merencanakan suksesi bisnis secara terstruktur melalui 4 dimensi suksesi dan pendampingan AI Advisor.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link href="/auth?mode=register" className="btn btn-cobalt" style={{ padding: "14px 32px", fontSize: 16, height: 50, gap: 8, fontWeight: 600 }}>
            Mulai Rencana Suksesi <ArrowRight size={18} weight="bold" />
          </Link>
          <a href="#fitur" className="btn btn-outline-dark" style={{ padding: "14px 32px", fontSize: 16, height: 50, fontWeight: 600 }}>
            Pelajari Fitur
          </a>
        </div>

        {/* Trust Badges */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28, marginTop: 44, color: "#64748b", fontSize: 14, flexWrap: "wrap" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 500 }}>
            <CheckCircle size={18} color="#0d9488" weight="fill" /> Gratis Registrasi
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 500 }}>
            <CheckCircle size={18} color="#0d9488" weight="fill" /> 12 Milestone Terstruktur
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 500 }}>
            <CheckCircle size={18} color="#0d9488" weight="fill" /> Gemini 2.0 AI Advisor
          </span>
        </div>
      </div>
    </section>
  );
}
