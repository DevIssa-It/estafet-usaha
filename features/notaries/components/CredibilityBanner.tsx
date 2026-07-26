"use client";

import { ShieldCheck, Certificate, Star, FileText } from "@phosphor-icons/react";

export function CredibilityBanner() {
  return (
    <div style={{
      backgroundColor: "var(--color-surface-card)",
      border: "1px solid #c7d2fe",
      borderRadius: 16,
      padding: "24px 28px",
      marginBottom: 32,
      background: "linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)",
      boxShadow: "0 2px 8px rgba(79, 70, 229, 0.05)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <ShieldCheck size={26} color="var(--color-primary)" weight="fill" />
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--color-ink)", margin: 0 }}>
            Jaminan Kredibilitas Notaris Partner Estafet Usaha
          </h2>
          <p style={{ fontSize: 13, color: "var(--color-mute)", margin: "2px 0 0 0" }}>
            Bagaimana kami memastikan Notaris di direktori ini resmi, kredibel, dan terpercaya untuk bisnis Anda:
          </p>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 16,
      }}>
        <div style={{
          backgroundColor: "var(--color-surface-card)",
          padding: "16px",
          borderRadius: 12,
          border: "1px solid var(--color-hairline-dark)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <ShieldCheck size={18} color="#059669" weight="fill" />
            <strong style={{ fontSize: 14, color: "var(--color-ink)" }}>Verifikasi SK AHU Kemenkumham</strong>
          </div>
          <p style={{ fontSize: 12, color: "var(--color-stone)", lineHeight: 1.5, margin: 0 }}>
            Setiap Notaris terdaftar memiliki nomor SK Pengangkatan dari Ditjen AHU Kemenkumham RI yang tervalidasi keabsahannya.
          </p>
        </div>

        <div style={{
          backgroundColor: "var(--color-surface-card)",
          padding: "16px",
          borderRadius: 12,
          border: "1px solid var(--color-hairline-dark)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Certificate size={18} color="var(--color-primary)" weight="fill" />
            <strong style={{ fontSize: 14, color: "var(--color-ink)" }}>Anggota Terdaftar INI</strong>
          </div>
          <p style={{ fontSize: 12, color: "var(--color-stone)", lineHeight: 1.5, margin: 0 }}>
            Anggota aktif Ikatan Notaris Indonesia (INI) dengan rekam jejak profesional di wilayah hukum masing-masing.
          </p>
        </div>

        <div style={{
          backgroundColor: "var(--color-surface-card)",
          padding: "16px",
          borderRadius: 12,
          border: "1px solid var(--color-hairline-dark)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Star size={18} color="#d97706" weight="fill" />
            <strong style={{ fontSize: 14, color: "var(--color-ink)" }}>Ulasan Terverifikasi Client</strong>
          </div>
          <p style={{ fontSize: 12, color: "var(--color-stone)", lineHeight: 1.5, margin: 0 }}>
            Rating dan ulasan berasal dari para Pendiri & Penerus usaha keluarga yang telah menyelesaikan akta suksesi.
          </p>
        </div>

        <div style={{
          backgroundColor: "var(--color-surface-card)",
          padding: "16px",
          borderRadius: 12,
          border: "1px solid var(--color-hairline-dark)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <FileText size={18} color="#2563eb" weight="fill" />
            <strong style={{ fontSize: 14, color: "var(--color-ink)" }}>Transparansi Biaya Akta</strong>
          </div>
          <p style={{ fontSize: 12, color: "var(--color-stone)", lineHeight: 1.5, margin: 0 }}>
            Perkiraan estimasi biaya balik nama dan pembuatan akta disajikan secara transparan tanpa biaya tersembunyi.
          </p>
        </div>
      </div>
    </div>
  );
}
