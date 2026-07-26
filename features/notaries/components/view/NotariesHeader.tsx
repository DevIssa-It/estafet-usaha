"use client";

import { Scales, ShieldCheck } from "@phosphor-icons/react";

export function NotariesHeader() {
  return (
    <div style={{
      marginBottom: 28,
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20,
    }}>
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>
          <Scales size={16} weight="fill" /> Direktori Notaris Partner Suksesi
        </div>
        <h1 className="heading-lg" style={{ color: "var(--color-ink)", fontSize: 28, fontWeight: 800, margin: 0 }}>
          Katalog Notaris Terverifikasi Kemenkumham
        </h1>
        <p className="body-md" style={{ color: "var(--color-mute)", marginTop: 4, fontSize: 14 }}>
          Cari & hubungkan Notaris Partner berlisensi resmi untuk pengesahan Akta Hibah, Waris, dan Pembaruan Legalitas Bisnis Keluarga Anda.
        </p>
      </div>

      <div style={{
        backgroundColor: "#e0e7ff",
        border: "1px solid #c7d2fe",
        borderRadius: 12,
        padding: "10px 16px",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <ShieldCheck size={20} color="var(--color-primary)" weight="fill" />
        <div style={{ fontSize: 12, color: "#3730a3", fontWeight: 600 }}>
          Semua Notaris Memiliki SK AHU Valid
        </div>
      </div>
    </div>
  );
}
