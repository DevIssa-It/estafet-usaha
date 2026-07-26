import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Estafet Usaha — Platform Suksesi Bisnis Keluarga",
  description:
    "Estafet Usaha membantu keluarga pengusaha UMKM Indonesia merencanakan dan mengelola suksesi bisnis antargenerasi dengan panduan AI, milestone tracker, dan dokumentasi terstruktur.",
  keywords: ["suksesi bisnis", "UMKM", "keluarga", "estafet usaha", "literasi finansial"],
  openGraph: {
    title: "Estafet Usaha",
    description: "Platform suksesi bisnis keluarga UMKM Indonesia",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={cn("font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
