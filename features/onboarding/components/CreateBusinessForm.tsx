"use client";

import { ArrowRight } from "@phosphor-icons/react";

interface CreateBusinessFormProps {
  form: { name: string; description: string; industry: string; founded_year: string };
  onChange: (field: string, val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  industries: string[];
}

export function CreateBusinessForm({
  form, onChange, onSubmit, loading, industries,
}: CreateBusinessFormProps) {
  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>Nama Bisnis *</label>
        <input className="input-field-dark" placeholder="Toko Batik Santoso" value={form.name}
          onChange={e => onChange("name", e.target.value)} required />
      </div>
      <div>
        <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>Industri *</label>
        <select className="input-field-dark" value={form.industry}
          onChange={e => onChange("industry", e.target.value)} required>
          <option value="">Pilih industri...</option>
          {industries.map(i => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <div>
        <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>Tahun Berdiri</label>
        <input className="input-field-dark" type="number" placeholder="1998" min="1900" max={new Date().getFullYear()}
          value={form.founded_year} onChange={e => onChange("founded_year", e.target.value)} />
      </div>
      <div>
        <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>Deskripsi Singkat</label>
        <textarea className="input-field-dark" placeholder="Ceritakan sedikit tentang bisnis Anda..."
          value={form.description} onChange={e => onChange("description", e.target.value)}
          rows={3} style={{ height: "auto", resize: "none", paddingTop: 14 }} />
      </div>
      <button className="btn btn-cobalt" type="submit" disabled={loading}
        style={{ width: "100%", justifyContent: "center", padding: "12px", marginTop: 8 }}>
        {loading ? "Memproses..." : "Buat Bisnis & Dapatkan Kode Undangan"}
        {!loading && <ArrowRight size={16} weight="bold" style={{ marginLeft: 8 }} />}
      </button>
    </form>
  );
}
