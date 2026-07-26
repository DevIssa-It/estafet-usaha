"use client";

import { UserRole } from "@/types";

interface OnboardingHeaderProps {
  userRole: UserRole;
}

export function OnboardingHeader({ userRole }: OnboardingHeaderProps) {
  return (
    <div style={{ textAlign: "center", marginBottom: 32 }}>
      <h1 className="display-md" style={{ color: "var(--color-on-dark)", marginBottom: 12 }}>
        {userRole === "pendiri" && "Daftarkan Bisnis Keluarga Anda"}
        {userRole === "penerus" && "Bergabung ke Bisnis Keluarga"}
        {userRole === "notaris" && "Pendaftaran Notaris Partner"}
        {(userRole === "calon_penerus" || userRole === "advisor") && "Mulai Perjalanan Suksesi"}
      </h1>
      <p className="body-md" style={{ color: "var(--color-on-dark-mute)" }}>
        {userRole === "pendiri" && "Lengkapi data bisnis untuk memulai perencanaan suksesi."}
        {userRole === "penerus" && "Masukkan Kode Undangan dari Pendiri untuk terhubung ke bisnis."}
        {userRole === "notaris" && "Pilih cara bergabung: Daftarkan profil ke Katalog Publik atau gabung via Kode Klien."}
        {(userRole === "calon_penerus" || userRole === "advisor") && "Masukkan kode undangan untuk terhubung ke tim suksesi."}
      </p>
    </div>
  );
}
