"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight } from "@phosphor-icons/react";

export function Navbar() {
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
        {/* Brand Logo & Name */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image
            src="/logo.png"
            alt="Estafet Usaha Logo"
            width={32}
            height={32}
            style={{ borderRadius: "var(--rounded-md)", objectFit: "cover" }}
          />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "#0f172a", letterSpacing: "-0.3px" }}>
            Estafet Usaha
          </span>
        </Link>

        {/* Center Navigation Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="hidden-mobile">
          <a href="#fitur" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            Fitur
          </a>
          <a href="#cara-kerja" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            Cara Kerja
          </a>
          <a href="#peran" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            Peran Suksesi
          </a>
        </div>

        {/* Distinct Action Buttons: Masuk (Login) & Daftar (Register) */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/auth"
            className="btn btn-outline-dark"
            style={{ padding: "8px 18px", fontSize: 13, height: 38, fontWeight: 600 }}
          >
            Masuk
          </Link>
          <Link
            href="/auth?mode=register"
            className="btn btn-cobalt"
            style={{ padding: "8px 18px", fontSize: 13, height: 38, gap: 6, fontWeight: 600 }}
          >
            Daftar Bisnis <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
