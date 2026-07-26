import Image from "next/image";

export function LandingFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--color-hairline-dark)", padding: "40px 0", backgroundColor: "var(--color-canvas-dark)", fontSize: 13, color: "var(--color-stone)" }}>
      <div className="container-content" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image
            src="/logo.png"
            alt="Estafet Usaha Logo"
            width={24}
            height={24}
            style={{ borderRadius: "var(--rounded-md)", objectFit: "cover" }}
          />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--color-on-dark)" }}>
            Estafet Usaha
          </span>
        </div>
        <div>
          Dibuat untuk IndonesiaNEXT Hackathon Individu ke-10 · Tema Literasi Finansial
        </div>
      </div>
    </footer>
  );
}
