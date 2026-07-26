"use client";

import { Crown, Sparkle, CheckCircle } from "@phosphor-icons/react";

export function RolesSection() {
  return (
    <section id="peran" className="section-dark">
      <div className="container-content">
        <div className="text-center" style={{ marginBottom: 56 }}>
          <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "var(--color-primary-bright)" }}>
            DUA PERAN, SATU TUJUAN
          </span>
          <h2 className="heading-xl" style={{ marginTop: 8, color: "var(--color-on-dark)" }}>
            Didesain Khusus untuk Pendiri dan Penerus
          </h2>
        </div>

        <div className="grid-responsive grid-2">
          {/* Pendiri Card */}
          <div className="card-dark" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: "var(--rounded-md)", backgroundColor: "rgba(73,79,223,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Crown size={24} color="var(--color-primary-bright)" weight="duotone" />
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--color-on-dark)" }}>Generasi Pendiri</h3>
                <span style={{ fontSize: 13, color: "var(--color-stone)" }}>Pemilik & Pengelola Pertama</span>
              </div>
            </div>

            <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Kelola roadmap suksesi dan pantau indikator kesiapan",
                "Bagikan kode undangan unik ke penerus untuk bergabung",
                "Dapatkan panduan AI khusus strategi pendelegasian",
                "Pastikan legalitas dan warisan bisnis terlindungi",
              ].map((item, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--color-stone)" }}>
                  <CheckCircle size={18} color="var(--color-accent-teal)" weight="fill" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Penerus Card */}
          <div className="card-dark" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: "var(--rounded-md)", backgroundColor: "rgba(13,148,136,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkle size={24} color="var(--color-accent-teal)" weight="duotone" />
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--color-on-dark)" }}>Generasi Penerus</h3>
                <span style={{ fontSize: 13, color: "var(--color-stone)" }}>Calon Pemimpin Masa Depan</span>
              </div>
            </div>

            <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Bergabung ke ruang kerja bisnis via kode undangan",
                "Update status milestone yang menjadi tanggung jawab",
                "Konsultasi AI untuk persiapan mengambil alih kemudi",
                "Pahami SOP, keuangan, dan relasi bisnis secara bertahap",
              ].map((item, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--color-stone)" }}>
                  <CheckCircle size={18} color="var(--color-accent-teal)" weight="fill" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
