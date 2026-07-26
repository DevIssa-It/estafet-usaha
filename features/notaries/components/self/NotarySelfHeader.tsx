"use client";

import { ShieldCheck } from "@phosphor-icons/react";

export function NotarySelfHeader() {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>
        <ShieldCheck size={16} weight="fill" /> Pengaturan Profil Notaris Partner
      </div>
      <h1 className="heading-lg" style={{ color: "var(--color-ink)", fontSize: 28, fontWeight: 800, margin: 0 }}>
        Kelola Profil & Status Verifikasi Notaris Anda
      </h1>
      <p className="body-md" style={{ color: "var(--color-mute)", marginTop: 4, fontSize: 14 }}>
        Atur informasi legalitas SK AHU Kemenkumham, nomor anggota INI, dan keahlian Anda untuk tampil di Katalog Notaris.
      </p>
    </div>
  );
}
