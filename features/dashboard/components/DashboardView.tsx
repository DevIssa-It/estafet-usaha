"use client";

import Link from "next/link";
import { CheckCircle, Users, Trophy, Fire, ArrowRight } from "@phosphor-icons/react";
import { Profile, Business, Milestone } from "@/types";
import { StatsCard } from "./StatsCard";
import { CategoryBreakdown } from "./CategoryBreakdown";
import { AdvisorCTA } from "./AdvisorCTA";
import { UpcomingMilestones } from "./UpcomingMilestones";
import { TeamMembers } from "./TeamMembers";
import { InviteBanner } from "./InviteBanner";
import { ReadinessScoreCard } from "./ReadinessScoreCard";

interface DashboardViewProps {
  profile: Profile & { businesses?: Business };
  business: Business;
  milestones: Milestone[];
  members: { id: string; full_name: string; role: string }[];
}

export function DashboardView({
  profile,
  business,
  milestones,
  members,
}: DashboardViewProps) {
  const completed = milestones.filter((m) => m.status === "completed").length;
  const inProgress = milestones.filter((m) => m.status === "in_progress").length;
  const total = milestones.length;

  const stats = [
    { label: "Total Milestone", value: total, icon: CheckCircle, color: "#4f46e5" },
    { label: "Selesai", value: completed, icon: Trophy, color: "#0284c7" },
    { label: "Dalam Proses", value: inProgress, icon: Fire, color: "#6366f1" },
    { label: "Anggota Tim", value: members.length, icon: Users, color: "#4338ca" },
  ];

  return (
    <div style={{ padding: "36px 48px 64px", maxWidth: 1400, width: "100%", margin: "0 auto" }}>
      {/* Welcome Top Banner */}
      <div className="card-dark" style={{
        marginBottom: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 32px",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid #e2e8f0",
        borderRadius: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Avatar Circle */}
          <div style={{
            width: 56, height: 56, borderRadius: 9999,
            backgroundColor: "#4f46e5", color: "white",
            fontSize: 22, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(79,70,229,0.25)",
            flexShrink: 0,
          }}>
            {profile.full_name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h1 className="heading-lg" style={{ color: "#0f172a", fontSize: 24, fontWeight: 700 }}>
                {business.name}
              </h1>
              <span className="badge-tag" style={{ fontSize: 12, backgroundColor: "#e0e7ff", color: "#4338ca", border: "1px solid #c7d2fe" }}>
                {profile.role === "pendiri" ? "Generasi Pendiri" : "Generasi Penerus"}
              </span>
            </div>
            <p className="body-md" style={{ color: "#475569", marginTop: 4 }}>
              Selamat datang kembali, <strong>{profile.full_name}</strong>. Berikut ikhtisar suksesi bisnis Anda.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/milestones" className="btn btn-cobalt" style={{ padding: "10px 20px", fontSize: 14, gap: 8, fontWeight: 600 }}>
            Kelola Milestone <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </div>

      {/* Readiness Score Radar Card - Spans 100% Full Width */}
      <ReadinessScoreCard milestones={milestones} />

      {/* Stats Cards Row - Spans 100% Full Width */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {stats.map((s, i) => (
          <StatsCard key={i} label={s.label} value={s.value} icon={s.icon} color={s.color} />
        ))}
      </div>

      {/* Main Grid: 2 Columns */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* Left Side (Wide Column) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Category Breakdown */}
          <div className="card-dark" style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24 }}>
            <h2 className="heading-sm" style={{ color: "#0f172a", marginBottom: 16, fontSize: 16, fontWeight: 700 }}>
              Kemajuan per Dimensi Suksesi
            </h2>
            <CategoryBreakdown milestones={milestones} />
          </div>

          {/* Team Members Card - Multi-column member grid */}
          <div className="card-dark" style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24 }}>
            <TeamMembers members={members} />
          </div>
        </div>

        {/* Right Side */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Invite Code */}
          <InviteBanner inviteCode={business?.invite_code || "ESTAFET"} role={profile?.role} />

          {/* Upcoming Milestones */}
          <div className="card-dark" style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 className="heading-sm" style={{ color: "#0f172a", fontSize: 16, fontWeight: 700 }}>
                Milestones Berikutnya
              </h2>
              <Link href="/milestones" style={{ fontSize: 12, color: "#4f46e5", textDecoration: "none", fontWeight: 600 }}>
                Lihat Semua
              </Link>
            </div>
            <UpcomingMilestones milestones={milestones} />
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Banner: AI Advisor CTA (Spans 100% Full Width across screen) */}
      <div style={{ width: "100%" }}>
        <AdvisorCTA businessName={business?.name || "Bisnis Anda"} role={profile?.role} />
      </div>
    </div>
  );
}
