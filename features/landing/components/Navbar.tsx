"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight, List, X } from "@phosphor-icons/react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="navbar"
      style={{
        borderBottom: scrolled ? "1px solid var(--color-hairline-dark)" : "1px solid transparent",
        transition: "border-color 0.3s ease",
      }}
    >
      <div className="container-content" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image
            src="/logo.png"
            alt="Estafet Usaha Logo"
            width={32}
            height={32}
            style={{ borderRadius: "var(--rounded-md)", objectFit: "cover" }}
          />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--color-on-dark)" }}>
            Estafet Usaha
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden-mobile">
          <a href="#fitur" style={{ color: "var(--color-on-dark-mute)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            Fitur
          </a>
          <a href="#cara-kerja" style={{ color: "var(--color-on-dark-mute)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            Cara Kerja
          </a>
          <a href="#peran" style={{ color: "var(--color-on-dark-mute)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            Peran Suksesi
          </a>
          <Link href="/auth" className="btn btn-outline-dark" style={{ padding: "8px 16px", fontSize: 13 }}>
            Masuk
          </Link>
          <Link href="/auth?mode=register" className="btn btn-cobalt" style={{ padding: "8px 16px", fontSize: 13, gap: 6 }}>
            Mulai Sekarang <ArrowRight size={14} />
          </Link>
        </div>

        <button
          className="btn-ghost hidden-desktop"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ padding: 8, color: "var(--color-on-dark)" }}
        >
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div style={{
          backgroundColor: "var(--color-surface-card)",
          borderBottom: "1px solid var(--color-hairline-dark)",
          padding: 24, display: "flex", flexDirection: "column", gap: 16,
        }}>
          <a href="#fitur" onClick={() => setMenuOpen(false)} style={{ color: "var(--color-on-dark)", textDecoration: "none" }}>Fitur</a>
          <a href="#cara-kerja" onClick={() => setMenuOpen(false)} style={{ color: "var(--color-on-dark)", textDecoration: "none" }}>Cara Kerja</a>
          <a href="#peran" onClick={() => setMenuOpen(false)} style={{ color: "var(--color-on-dark)", textDecoration: "none" }}>Peran Suksesi</a>
          <Link href="/auth" className="btn btn-cobalt" style={{ textAlign: "center" }}>Mulai Sekarang</Link>
        </div>
      )}
    </nav>
  );
}
