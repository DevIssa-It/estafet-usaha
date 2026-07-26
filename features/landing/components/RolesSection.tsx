"use client";

import { motion } from "framer-motion";
import { Buildings, HandHeart, CheckCircle } from "@phosphor-icons/react";

export function RolesSection() {
  return (
    <section id="peran" className="section-dark" style={{ padding: "88px 0", backgroundColor: "#f8fafc" }}>
      <div className="container-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: 56 }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "#4f46e5" }}>
            DUA PERAN, SATU TUJUAN
          </span>
          <h2 className="heading-xl" style={{ marginTop: 8, color: "#0f172a" }}>
            Didesain Khusus untuk Pendiri dan Penerus
          </h2>
          <p className="body-md" style={{ color: "#475569", marginTop: 8 }}>
            Setiap peran memiliki kebutuhan berbeda dalam proses suksesi bisnis.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
          {/* Pendiri */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="card-dark"
            style={{ borderTop: "4px solid #4f46e5", padding: 32, borderRadius: 16, borderLeft: "1px solid #e2e8f0", borderRight: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", backgroundColor: "#ffffff", boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(79, 70, 229, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Buildings size={24} color="#4f46e5" weight="duotone" />
              </div>
              <div>
                <h3 className="heading-md" style={{ color: "#0f172a", fontSize: 20, fontWeight: 600 }}>Untuk Pendiri Bisnis</h3>
                <span style={{ fontSize: 13, color: "#64748b" }}>Generasi Pertama / Pemilik Utama</span>
              </div>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 14, color: "#475569", paddingLeft: 0, listStyle: "none", fontSize: 14, lineHeight: 1.6 }}>
              {[
                "Pantau seluruh progres suksesi dari satu dashboard terpadu",
                "Dapatkan panduan AI untuk strategi pendelegasian bertahap",
                "Undang penerus bergabung menggunakan kode 6 karakter unik",
                "Simpan riwayat dan dokumen legal suksesi keluarga secara aman",
              ].map((text, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <CheckCircle size={18} color="#4f46e5" weight="fill" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Penerus */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="card-dark"
            style={{ borderTop: "4px solid #6366f1", padding: 32, borderRadius: 16, borderLeft: "1px solid #e2e8f0", borderRight: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", backgroundColor: "#ffffff", boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(99, 102, 241, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <HandHeart size={24} color="#6366f1" weight="duotone" />
              </div>
              <div>
                <h3 className="heading-md" style={{ color: "#0f172a", fontSize: 20, fontWeight: 600 }}>Untuk Generasi Penerus</h3>
                <span style={{ fontSize: 13, color: "#64748b" }}>Calon Pemimpin Masa Depan</span>
              </div>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 14, color: "#475569", paddingLeft: 0, listStyle: "none", fontSize: 14, lineHeight: 1.6 }}>
              {[
                "Pahami tahapan suksesi dan tanggung jawab kepemimpinan baru",
                "Konsultasi AI untuk tantangan pengambilalihan operasional",
                "Update status milestone yang menjadi tanggung jawab Anda",
                "Akses modul edukasi finansial dan template dokumen legal",
              ].map((text, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <CheckCircle size={18} color="#6366f1" weight="fill" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
