"use client";

import { ArrowRight } from "@phosphor-icons/react";

interface NotaryProfileFormProps {
  form: { sk_number: string; ini_number: string; city: string; office_address: string };
  onChange: (field: string, val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export function NotaryProfileForm({
  form, onChange, onSubmit, loading,
}: NotaryProfileFormProps) {
  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>Nomor SK AHU Kemenkumham *</label>
        <input className="input-field-dark" placeholder="Contoh: AHU-0019283.AH.02.01.2018" value={form.sk_number}
          onChange={e => onChange("sk_number", e.target.value)} required />
      </div>
      <div>
        <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>Nomor Anggota INI (Ikatan Notaris Indonesia) *</label>
        <input className="input-field-dark" placeholder="Contoh: INI-JKT-8821" value={form.ini_number}
          onChange={e => onChange("ini_number", e.target.value)} required />
      </div>
      <div>
        <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>Wilayah Kota / Kabupaten *</label>
        <input className="input-field-dark" placeholder="Contoh: Jakarta Selatan, Surabaya, Yogyakarta" value={form.city}
          onChange={e => onChange("city", e.target.value)} required />
      </div>
      <div>
        <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>Alamat Kantor Resmi</label>
        <textarea className="input-field-dark" placeholder="Jl. HR Rasuna Said No. 12, Jakarta Selatan" value={form.office_address}
          onChange={e => onChange("office_address", e.target.value)} rows={2} style={{ height: "auto", resize: "none", paddingTop: 10 }} />
      </div>
      <button className="btn btn-cobalt" type="submit" disabled={loading}
        style={{ width: "100%", justifyContent: "center", padding: "12px", marginTop: 8 }}>
        {loading ? "Memproses..." : "Simpan Profil & Tampil di Katalog Notaris"}
        {!loading && <ArrowRight size={16} weight="bold" style={{ marginLeft: 8 }} />}
      </button>
    </form>
  );
}
