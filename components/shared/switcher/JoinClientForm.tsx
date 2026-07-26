"use client";

import { ArrowRight } from "@phosphor-icons/react";

interface JoinClientFormProps {
  code: string;
  onCodeChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
}

export function JoinClientForm({
  code, onCodeChange, onSubmit, loading, error,
}: JoinClientFormProps) {
  return (
    <>
      {error && (
        <div style={{ padding: "8px 12px", borderRadius: 8, backgroundColor: "#fef2f2", color: "#dc2626", fontSize: 12, marginBottom: 16 }}>
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
            Kode Undangan Klien *
          </label>
          <input
            type="text"
            placeholder="Misal: ESTAFET"
            value={code}
            onChange={(e) => onCodeChange(e.target.value.toUpperCase())}
            required
            style={{
              width: "100%", padding: "10px 14px", borderRadius: 8,
              border: "1px solid #cbd5e1", fontSize: 14, fontWeight: 700,
              letterSpacing: 2, textTransform: "uppercase", outline: "none",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-cobalt"
          style={{ width: "100%", justifyContent: "center", padding: 12, fontSize: 13, fontWeight: 600 }}
        >
          {loading ? "Menghubungkan..." : "Hubungkan Bisnis Klien"}
          {!loading && <ArrowRight size={16} weight="bold" style={{ marginLeft: 6 }} />}
        </button>
      </form>
    </>
  );
}
