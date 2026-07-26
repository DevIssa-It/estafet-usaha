import Link from "next/link";
import Image from "next/image";

interface AuthHeaderProps {
  mode: "login" | "register";
}

export function AuthHeader({ mode }: AuthHeaderProps) {
  return (
    <div style={{ textAlign: "center", marginBottom: 32 }}>
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none", marginBottom: 24 }}>
        <Image
          src="/logo.png"
          alt="Estafet Usaha Logo"
          width={40}
          height={40}
          style={{ borderRadius: "var(--rounded-md)", objectFit: "cover" }}
        />
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, color: "var(--color-on-dark)" }}>
          Estafet Usaha
        </span>
      </Link>
      <h1 className="heading-lg" style={{ color: "var(--color-on-dark)", marginBottom: 8 }}>
        {mode === "login" ? "Selamat datang kembali" : "Mulai perjalanan suksesi"}
      </h1>
      <p className="body-sm" style={{ color: "var(--color-stone)" }}>
        {mode === "login" ? "Masuk ke akun Estafet Usaha Anda" : "Daftarkan bisnis keluarga Anda sekarang"}
      </p>
    </div>
  );
}
