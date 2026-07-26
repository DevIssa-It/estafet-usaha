"use client";

import Link from "next/link";
import { CheckCircle, Users, Trophy, Fire, ArrowRight, Target } from "@phosphor-icons/react";
import { Profile, Business, Milestone } from "@/types";
import { ProgressRing } from "./ProgressRing";
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
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    { label: "Total Milestone", value: total, icon: CheckCircle, color: "var(--color-primary)" },
    { label: "Selesai", value: completed, icon: Trophy, color: "var(--color-accent-teal)" },
    { label: "Dalam Proses", value: inProgress, icon: Fire, color: "var(--color-accent-warning)" },
    { label: "Anggota Tim", value: members.length, icon: Users, color: "var(--color-accent-pink)" },
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
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Avatar Circle */}
          <div style={{
            width: 56, height: 56, borderRadius: "var(--rounded-full)",
            backgroundColor: "var(--color-primary)", color: "white",
            fontSize: 22, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(79,70,229,0.25)",
            flexShrink: 0,
          }}>
            {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <h1 className="heading-md" style={{ color: "var(--color-on-dark)" }}>
                Selamat Datang, {profile.full_name}
              </h1>
              <span className="badge-feature" style={{ fontSize: 11, padding: "2px 10px" }}>
                {profile.role === "pendiri" ? "Pendiri" : "Penerus"}
              </span>
            </div>
            <p className="body-sm" style={{ color: "var(--color-on-dark-mute)" }}>
              {business.name} · {business.industry} {business.founded_year ? `· Est. ${business.founded_year}` : ""}
            </p>
          </div>
        </div>

        {/* Right suksesi overview badge */}
        <div style={{
          backgroundColor: "#f1f5f9",
          border: "1px solid #e2e8f0",
          borderRadius: "var(--rounded-md)",
          padding: "10px 20px",
          textAlign: "right",
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-stone)", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Status Suksesi
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--color-primary)" }}>
            {percentage}% Selesai
          </div>
        </div>
      </div>

      {/* Readiness Score Card */}
      <ReadinessScoreCard milestones={milestones} />

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Left: progress overview */}
        <div className="card-dark">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <h2 className="heading-sm" style={{ color: "var(--color-on-dark)" }}>Progress Suksesi</h2>
            <Link href="/milestones"
              style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--color-primary-bright)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
              Lihat Detail <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 28 }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <ProgressRing percentage={percentage} size={96} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--color-on-dark)" }}>
                  {percentage}%
                </span>
              </div>
            </div>
            <div>
              <div className="heading-md" style={{ color: "var(--color-on-dark)", marginBottom: 4 }}>
                {completed} / {total}
              </div>
              <div className="body-sm" style={{ color: "var(--color-on-dark-mute)" }}>Milestone selesai</div>
              {percentage >= 80 && (
                <span className="badge-success" style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12 }}>
                  <Target size={14} weight="bold" />
                  <span>Hampir selesai!</span>
                </span>
              )}
            </div>
          </div>

          <CategoryBreakdown milestones={milestones} />
        </div>

        {/* Right: advisor + upcoming + team */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <AdvisorCTA />

          <div className="card-dark">
            <h3 className="heading-sm" style={{ color: "var(--color-on-dark)", marginBottom: 16 }}>
              Milestone Berikutnya
            </h3>
            <UpcomingMilestones milestones={milestones} />
          </div>

          <TeamMembers members={members} />
        </div>
      </div>

      {/* Invite banner — Pendiri only */}
      {profile.role === "pendiri" && business.invite_code && (
        <InviteBanner business={business} />
      )}
    </div>
  );
}
