"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

export function CtaSection() {
  return (
    <section style={{ padding: "88px 0", backgroundColor: "var(--color-surface-soft)" }}>
      <div className="container-content">
        <div className="card-featured text-center" style={{ padding: "64px 32px", position: "relative", overflow: "hidden" }}>
          <h2 className="heading-xl" style={{ color: "white", marginBottom: 16 }}>
            Siapkan Masa Depan Bisnis Keluarga Anda Hari Ini
          </h2>
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.85)", maxWidth: 540, margin: "0 auto 32px" }}>
            Jangan biarkan kerja keras puluhan tahun pudar karena transisi yang tidak terencana. Mulai petakan suksesi bisnis secara gratis.
          </p>
          <Link href="/auth?mode=register" className="btn btn-primary" style={{ padding: "14px 32px", fontSize: 16, gap: 8 }}>
            Daftar Sekarang <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
