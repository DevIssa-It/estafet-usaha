import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

export function CtaSection() {
  return (
    <section style={{ padding: "80px 0 100px", backgroundColor: "var(--color-surface-card)", borderTop: "1px solid var(--color-hairline-dark)" }}>
      <div className="container-content text-center">
        <h2 className="heading-lg" style={{ color: "var(--color-on-dark)", marginBottom: 16 }}>
          Siap Merencanakan Suksesi Bisnis Keluarga Anda?
        </h2>
        <p className="body-md" style={{ color: "var(--color-stone)", maxWidth: 520, margin: "0 auto 32px" }}>
          Mulai langkah pertama hari ini secara gratis. Buat akun, undang penerus, dan dapatkan panduan AI Advisor.
        </p>
        <Link href="/auth?mode=register" className="btn btn-cobalt" style={{ padding: "14px 32px", fontSize: 16, gap: 8 }}>
          Mulai Sekarang — Gratis <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
