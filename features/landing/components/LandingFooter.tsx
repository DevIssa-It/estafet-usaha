"use client";

import Link from "next/link";
import Image from "next/image";

export function LandingFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--color-hairline-dark)", padding: "48px 0 32px", backgroundColor: "var(--color-surface-deep)" }}>
      <div className="container-content">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Image
              src="/logo.png"
              alt="Estafet Usaha Logo"
              width={28}
              height={28}
              style={{ borderRadius: "var(--rounded-sm)", objectFit: "cover" }}
            />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--color-on-dark)" }}>
              Estafet Usaha
            </span>
          </div>

          <div style={{ display: "flex", gap: 24, fontSize: 14 }}>
            <a href="#fitur" style={{ color: "var(--color-stone)", textDecoration: "none" }}>Fitur</a>
            <a href="#cara-kerja" style={{ color: "var(--color-stone)", textDecoration: "none" }}>Cara Kerja</a>
            <a href="#peran" style={{ color: "var(--color-stone)", textDecoration: "none" }}>Peran</a>
            <Link href="/auth" style={{ color: "var(--color-stone)", textDecoration: "none" }}>Masuk</Link>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--color-hairline-dark)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, fontSize: 12, color: "var(--color-stone)" }}>
          <span>&copy; {new Date().getFullYear()} Estafet Usaha. Dibuat untuk UMKM Indonesia.</span>
          <span>Inovasi Suksesi Bisnis Keluarga</span>
        </div>
      </div>
    </footer>
  );
}
