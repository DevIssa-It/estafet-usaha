"use client";

import { Buildings, HandHeart } from "@phosphor-icons/react";

export function RolesSection() {
  return (
    <section id="peran" className="section-dark" style={{ padding: "88px 0" }}>
      <div className="container-content">
        <div className="text-center" style={{ marginBottom: 56 }}>
          <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "var(--color-primary-bright)" }}>
            DUA PERAN, SATU TUJUAN
          </span>
          <h2 className="heading-xl" style={{ marginTop: 8, color: "var(--color-on-dark)" }}>
            Didesain Khusus untuk Pendiri dan Penerus
          </h2>
          <p className="body-md" style={{ color: "var(--color-stone)", marginTop: 8 }}>
            Setiap peran memiliki kebutuhan berbeda dalam proses suksesi bisnis.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
          {/* Pendiri */}
          <div className="card-dark" style={{ borderTop: "3px solid var(--color-primary)", padding: 32, borderRadius: "var(--rounded-lg)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Buildings size={28} color="var(--color-primary-bright)" />
              <h3 className="heading-md" style={{ color: "var(--color-on-dark)", fontSize: 20 }}>Untuk Pendiri Bisnis</h3>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12, color: "var(--color-stone)", paddingLeft: 20, fontSize: 14, lineHeight: 1.6 }}>
              <li>Pantau seluruh progres suksesi dari satu dashboard</li>
              <li>Dapatkan panduan AI untuk strategi delegasi bertahap</li>
              <li>Undang penerus bergabung menggunakan kode unik</li>
              <li>Simpan riwayat dan dokumen suksesi keluarga secara aman</li>
            </ul>
          </div>

          {/* Penerus */}
          <div className="card-dark" style={{ borderTop: "3px solid var(--color-accent-teal)", padding: 32, borderRadius: "var(--rounded-lg)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <HandHeart size={28} color="var(--color-accent-teal)" />
              <h3 className="heading-md" style={{ color: "var(--color-on-dark)", fontSize: 20 }}>Untuk Generasi Penerus</h3>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12, color: "var(--color-stone)", paddingLeft: 20, fontSize: 14, lineHeight: 1.6 }}>
              <li>Pahami tahapan suksesi dan tanggung jawab baru</li>
              <li>Konsultasi AI untuk tantangan pengambilalihan operasional</li>
              <li>Update status milestone yang menjadi tanggung jawab Anda</li>
              <li>Akses materi pembelajaran dan template dokumen legal</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
