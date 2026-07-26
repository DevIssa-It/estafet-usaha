"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { UserRole } from "@/types";

interface JoinBusinessFormProps {
  inviteCode: string;
  onCodeChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  userRole: UserRole;
}

export function JoinBusinessForm({
  inviteCode, onCodeChange, onSubmit, loading, userRole,
}: JoinBusinessFormProps) {
  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>
          Kode Undangan Bisnis *
        </label>
        <input className="input-field-dark" placeholder="Masukkan 6-8 digit kode (misal: ESTAFET)" value={inviteCode}
          onChange={e => onCodeChange(e.target.value.toUpperCase())} required
          style={{ textTransform: "uppercase", letterSpacing: 2, fontWeight: 700 }} />
        <p style={{ fontSize: 12, color: "var(--color-stone)", marginTop: 6 }}>
          {userRole === "penerus" && "Dapatkan kode undangan dari Pendiri bisnis keluarga Anda."}
          {userRole === "notaris" && "Masukkan kode yang diberikan langsung oleh Pendiri bisnis Klien Anda."}
          {userRole !== "penerus" && userRole !== "notaris" && "Dapatkan kode dari pemilik bisnis."}
        </p>
      </div>

      <button className="btn btn-cobalt" type="submit" disabled={loading}
        style={{ width: "100%", justifyContent: "center", padding: "12px", marginTop: 8 }}>
        {loading ? "Memproses..." : "Bergabung ke Bisnis"}
        {!loading && <ArrowRight size={16} weight="bold" style={{ marginLeft: 8 }} />}
      </button>
    </form>
  );
}
