import { Buildings, HandHeart } from "@phosphor-icons/react";

export function RolesSection() {
  return (
    <section id="peran" style={{ padding: "100px 0" }}>
      <div className="container-content">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 className="heading-lg" style={{ color: "var(--color-on-dark)", marginBottom: 12 }}>
            Pengalaman yang Disesuaikan Peran
          </h2>
          <p className="body-md" style={{ color: "var(--color-stone)" }}>
            Setiap peran memiliki kebutuhan berbeda dalam proses suksesi bisnis.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32 }}>
          {/* Pendiri */}
          <div className="card-dark" style={{ borderTop: "3px solid var(--color-primary)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Buildings size={28} color="var(--color-primary-bright)" />
              <h3 className="heading-md" style={{ color: "var(--color-on-dark)" }}>Untuk Pendiri Bisnis</h3>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, color: "var(--color-stone)", paddingLeft: 20 }}>
              <li>Pantau seluruh progres suksesi dari satu dashboard</li>
              <li>Dapatkan panduan AI untuk strategi delegasi bertahap</li>
              <li>Undang penerus bergabung menggunakan kode unik</li>
              <li>Simpan riwayat dan dokumen suksesi keluarga secara aman</li>
            </ul>
          </div>

          {/* Penerus */}
          <div className="card-dark" style={{ borderTop: "3px solid var(--color-accent-teal)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <HandHeart size={28} color="var(--color-accent-teal)" />
              <h3 className="heading-md" style={{ color: "var(--color-on-dark)" }}>Untuk Generasi Penerus</h3>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, color: "var(--color-stone)", paddingLeft: 20 }}>
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
