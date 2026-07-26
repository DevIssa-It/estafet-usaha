"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AuthHeader } from "@/features/auth/components/AuthHeader";
import { AuthForm } from "@/features/auth/components/AuthForm";
import type { UserRole } from "@/types";

const ERROR_MAP: Record<string, string> = {
  "Invalid login credentials": "Email atau password salah",
  "invalid_credentials": "Email atau password salah",
  "User already registered": "Email sudah terdaftar. Silakan masuk via tab 'Masuk'",
  "already registered": "Email sudah terdaftar. Silakan masuk via tab 'Masuk'",
  "unexpected_failure": "Akun ini belum terdaftar di Supabase. Silakan buat akun baru via tab 'Daftar'.",
  "Failed to fetch": "Gagal terhubung ke Supabase. Periksa koneksi internet Anda.",
};

function parseError(err: any): string {
  if (!err) return "Terjadi kesalahan yang tidak diketahui";
  const msg = typeof err === "string" ? err : err.message || err.error_description || JSON.stringify(err);
  if (msg.includes("500") || msg.includes("Internal Server Error") || msg.includes("unexpected_failure")) {
    return "Akun belum terdaftar di Auth Supabase. Silakan klik tab 'Daftar' untuk membuat akun baru.";
  }
  const matchedKey = Object.keys(ERROR_MAP).find((key) => msg.toLowerCase().includes(key.toLowerCase()));
  return matchedKey ? ERROR_MAP[matchedKey] : (msg.length < 120 ? msg : "Gagal memproses permintaan.");
}

export function AuthClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "register">(
    searchParams.get("mode") === "register" ? "register" : "login"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "", fullName: "", role: "pendiri" as UserRole });

  const supabase = createClient();

  const handleFormChange = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "register") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: form.email.trim(),
          password: form.password,
          options: { data: { full_name: form.fullName.trim(), role: form.role } },
        });

        if (signUpError) throw signUpError;
        if (data.user) {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            full_name: form.fullName.trim(),
            role: form.role,
            business_id: null,
          });
          router.push("/onboarding");
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email.trim(),
          password: form.password,
        });

        if (signInError) throw signInError;
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Auth Exception:", err);
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100dvh", backgroundColor: "var(--color-canvas-dark)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <AuthHeader mode={mode} />
        <AuthForm
          mode={mode}
          form={form}
          error={error}
          loading={loading}
          onModeToggle={(m) => { setMode(m); setError(""); }}
          onFormChange={handleFormChange}
          onRoleChange={(role) => setForm((prev) => ({ ...prev, role }))}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
