"use client";

import { Scales } from "@phosphor-icons/react";

export function NotariesEmptyState() {
  return (
    <div style={{
      backgroundColor: "var(--color-surface-card)", border: "1px solid var(--color-hairline-dark)", borderRadius: 16,
      padding: 48, textAlign: "center", color: "var(--color-stone)",
    }}>
      <Scales size={48} color="var(--color-faint)" style={{ marginBottom: 12 }} />
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-ink)", marginBottom: 4 }}>
        Notaris Tidak Ditemukan
      </h3>
      <p style={{ fontSize: 14, margin: 0 }}>
        Tidak ada notaris yang sesuai dengan kata kunci atau filter kota yang dipilih.
      </p>
    </div>
  );
}
