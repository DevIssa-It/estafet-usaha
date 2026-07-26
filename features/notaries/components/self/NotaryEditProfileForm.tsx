"use client";

import { ShieldCheck, Certificate, Check, FloppyDisk } from "@phosphor-icons/react";

interface NotaryEditProfileFormProps {
  form: {
    name: string;
    skNumber: string;
    iniNumber: string;
    city: string;
    address: string;
    specializations: string;
  };
  onChange: (field: string, val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  saved: boolean;
}

export function NotaryEditProfileForm({
  form, onChange, onSubmit, saved,
}: NotaryEditProfileFormProps) {
  return (
    <div style={{
      backgroundColor: "var(--color-surface-card)",
      border: "1px solid var(--color-hairline-dark)",
      borderRadius: 16,
      padding: 32,
    }}>
      {saved && (
        <div style={{
          padding: "12px 16px", borderRadius: 10,
          backgroundColor: "#d1fae5", border: "1px solid #a7f3d0", color: "#047857",
          fontSize: 13, fontWeight: 600, marginBottom: 20,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <Check size={18} weight="bold" /> Profil Notaris & Verifikasi Berhasil Diperbarui!
        </div>
      )}

      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8, fontWeight: 600 }}>
              Nama Lengkap & Gelar Resmi *
            </label>
            <input className="input-field-dark" value={form.name}
              onChange={(e) => onChange("name", e.target.value)} required />
          </div>

          <div>
            <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8, fontWeight: 600 }}>
              Wilayah Kota / Kabupaten Kantor *
            </label>
            <input className="input-field-dark" value={form.city}
              onChange={(e) => onChange("city", e.target.value)} required />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8, fontWeight: 600 }}>
              Nomor SK AHU Kemenkumham RI *
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <ShieldCheck size={18} color="#059669" style={{ position: "absolute", left: 14 }} weight="fill" />
              <input className="input-field-dark" value={form.skNumber}
                onChange={(e) => onChange("skNumber", e.target.value)} required
                style={{ paddingLeft: 42 }} />
            </div>
          </div>

          <div>
            <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8, fontWeight: 600 }}>
              Nomor Anggota INI (Ikatan Notaris Indonesia) *
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Certificate size={18} color="var(--color-primary)" style={{ position: "absolute", left: 14 }} weight="fill" />
              <input className="input-field-dark" value={form.iniNumber}
                onChange={(e) => onChange("iniNumber", e.target.value)} required
                style={{ paddingLeft: 42 }} />
            </div>
          </div>
        </div>

        <div>
          <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8, fontWeight: 600 }}>
            Alamat Lengkap Kantor Resmi
          </label>
          <textarea className="input-field-dark" value={form.address}
            onChange={(e) => onChange("address", e.target.value)}
            rows={2} style={{ height: "auto", resize: "none", paddingTop: 10 }} />
        </div>

        <div>
          <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8, fontWeight: 600 }}>
            Spesialisasi Keahlian & Akta Suksesi (Pisahkan dengan koma)
          </label>
          <input className="input-field-dark" value={form.specializations}
            onChange={(e) => onChange("specializations", e.target.value)} />
        </div>

        <button className="btn btn-cobalt" type="submit"
          style={{ width: "fit-content", padding: "12px 24px", gap: 8, marginTop: 8 }}>
          <FloppyDisk size={18} weight="bold" /> Simpan Perubahan Profil Notaris
        </button>
      </form>
    </div>
  );
}
