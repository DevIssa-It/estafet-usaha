"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  House,
  Brain,
  CheckSquare,
  Calculator,
  FileText,
  FolderSimple,
  GraduationCap,
  Scales,
  SignOut,
} from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types";

interface SidebarProps {
  profile: Profile | null;
  businessName?: string;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: House },
  { href: "/simulator", label: "Simulasi Finansial", icon: Calculator },
  { href: "/milestones", label: "Milestone Suksesi", icon: CheckSquare },
  { href: "/documents", label: "Dokumen Suksesi", icon: FileText },
  { href: "/vault", label: "Bilik Dokumen (Vault)", icon: FolderSimple },
  { href: "/notaries", label: "Katalog Notaris", icon: Scales, badge: "Verified" },
  { href: "/learn", label: "Edukasi Suksesi", icon: GraduationCap },
  { href: "/advisor", label: "AI Advisor", icon: Brain, badge: "AI" },
];

export function Sidebar({ profile, businessName }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <aside className="sidebar" style={{
      backgroundColor: "#0d1117",
      borderRight: "1px solid #21262d",
    }}>
      {/* Logo */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "20px 14px 16px",
        borderBottom: "1px solid #21262d",
        marginBottom: 12,
      }}>
        <Image
          src="/logo.png"
          alt="Estafet Usaha Logo"
          width={32}
          height={32}
          style={{ borderRadius: "var(--rounded-md)", objectFit: "cover", flexShrink: 0 }}
        />
        <div style={{ overflow: "hidden" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Estafet Usaha
          </div>
          {businessName && (
            <div style={{ fontSize: 11, color: "#8b949e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {businessName}
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, paddingTop: 8 }}>
        {navItems
          .filter(({ href }) => {
            const role = profile?.role || "pendiri";
            if (role === "penerus") {
              // Successor hides financial simulator and notary catalog by default
              return href !== "/simulator" && href !== "/notaries";
            }
            if (role === "notaris") {
              // Notary hides simulator and milestone creation
              return href !== "/simulator" && href !== "/milestones";
            }
            return true;
          })
          .map(({ href, label, icon: Icon, badge }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href}
              className={`sidebar-link ${isActive ? "active" : ""}`}
              style={{
                backgroundColor: isActive ? "#1f293d" : "transparent",
                color: isActive ? "#ffffff" : "#8b949e",
                borderLeft: isActive ? "3px solid #6366f1" : "3px solid transparent",
                borderRadius: "0 var(--rounded-md) var(--rounded-md) 0",
              }}>
              <Icon size={18} weight={isActive ? "fill" : "regular"} color={isActive ? "#818cf8" : "#8b949e"} />
              <span>{label}</span>
              {badge && (
                <span style={{
                  marginLeft: "auto", fontSize: 10, fontWeight: 700,
                  backgroundColor: "#4f46e5", color: "white",
                  borderRadius: "var(--rounded-full)", padding: "2px 7px",
                }}>{badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div style={{ borderTop: "1px solid #21262d", paddingTop: 12, marginTop: 8 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 12px",
          borderRadius: "var(--rounded-md)",
          marginBottom: 4,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: "var(--rounded-full)",
            backgroundColor: "#4f46e5",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, color: "white", fontWeight: 700, fontSize: 14,
          }}>
            {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : "U"}
          </div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {profile?.full_name || "User"}
            </div>
            <div style={{ fontSize: 11, color: "#8b949e" }}>
              {
                profile?.role === "pendiri" ? "Generasi Pendiri" :
                profile?.role === "notaris" ? "Notaris Partner" :
                profile?.role === "advisor" ? "External Advisor" :
                profile?.role === "calon_penerus" ? "Calon Penerus" :
                "Generasi Penerus"
              }
            </div>
          </div>
        </div>

        <button onClick={handleSignOut}
          className="sidebar-link"
          style={{ width: "100%", background: "none", border: "none", textAlign: "left", color: "#8b949e" }}>
          <SignOut size={16} />
          <span style={{ fontSize: 13 }}>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
