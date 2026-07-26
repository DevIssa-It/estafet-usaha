import { ArrowRight } from "@phosphor-icons/react";
import type { UserRole } from "@/types";
import { ModeToggle } from "./ModeToggle";
import { RoleSelector } from "./RoleSelector";
import { PasswordInput } from "./PasswordInput";

interface AuthFormProps {
  mode: "login" | "register";
  form: { email: string; password: string; fullName: string; role: UserRole };
  error: string;
  loading: boolean;
  onModeToggle: (mode: "login" | "register") => void;
  onFormChange: (field: string, value: string) => void;
  onRoleChange: (role: UserRole) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AuthForm({
  mode, form, error, loading,
  onModeToggle, onFormChange, onRoleChange, onSubmit,
}: AuthFormProps) {
  return (
    <div style={{
      backgroundColor: "var(--color-surface-elevated)",
      border: "1px solid var(--color-hairline-dark)",
      borderRadius: "var(--rounded-lg)",
      padding: 32,
    }}>
      <ModeToggle mode={mode} onToggle={onModeToggle} />

      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {mode === "register" && (
          <div>
            <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>
              Nama Lengkap
            </label>
            <input className="input-field-dark" type="text" placeholder="Budi Santoso"
              value={form.fullName} onChange={(e) => onFormChange("fullName", e.target.value)} required />
          </div>
        )}

        <div>
          <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>
            Email
          </label>
          <input className="input-field-dark" type="email" placeholder="budi@contoh.com"
            value={form.email} onChange={(e) => onFormChange("email", e.target.value)} required />
        </div>

        <div>
          <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>
            Password
          </label>
          <PasswordInput
            value={form.password}
            onChange={(val) => onFormChange("password", val)}
            required minLength={8}
          />
        </div>

        {mode === "register" && (
          <RoleSelector value={form.role} onChange={onRoleChange} />
        )}

        {error && (
          <div style={{
            backgroundColor: "rgba(226,59,74,0.12)",
            border: "1px solid rgba(226,59,74,0.3)",
            borderRadius: "var(--rounded-md)",
            padding: "10px 14px",
            color: "var(--color-accent-danger)", fontSize: 14,
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-cobalt"
          disabled={loading}
          style={{ marginTop: 8, width: "100%", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Memproses..." : mode === "login" ? "Masuk" : "Buat Akun"}
          {!loading && <ArrowRight size={16} weight="bold" />}
        </button>
      </form>
    </div>
  );
}
