"use client";

import { useState, useTransition } from "react";
import { ArrowClockwise, CheckSquare, ShieldCheck } from "@phosphor-icons/react";
import { Milestone, Profile, MilestoneCategory, MilestoneStatus } from "@/types";
import { updateMilestoneStatus } from "@/features/milestones/actions/milestones.actions";
import { useRouter } from "next/navigation";
import { MilestoneCard } from "./MilestoneCard";
import { MilestoneFilters } from "./MilestoneFilters";
import { MilestonesProgressBar } from "./MilestonesProgressBar";

interface MilestonesViewProps {
  profile: Profile;
  milestones: Milestone[];
}

export function MilestonesView({ profile, milestones }: MilestonesViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeCategory, setActiveCategory] = useState<MilestoneCategory | "all">("all");
  const [activeStatus, setActiveStatus] = useState<MilestoneStatus | "all">("all");

  const handleStatusChange = (id: string, status: MilestoneStatus) => {
    startTransition(async () => {
      await updateMilestoneStatus(id, status);
      router.refresh();
    });
  };

  const filtered = milestones.filter((m) => {
    const catMatch = activeCategory === "all" || m.category === activeCategory;
    const statusMatch = activeStatus === "all" || m.status === activeStatus;
    return catMatch && statusMatch;
  });

  const completed = milestones.filter((m) => m.status === "completed").length;
  const total = milestones.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div style={{ padding: "36px 48px 64px", maxWidth: 1300, width: "100%", margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 className="display-md" style={{ color: "var(--color-on-dark)", marginBottom: 8 }}>
          Milestone Suksesi
        </h1>
        <p className="body-md" style={{ color: "var(--color-on-dark-mute)" }}>
          Lacak setiap tahapan proses suksesi bisnis keluarga Anda.
        </p>
      </div>

      <MilestonesProgressBar completed={completed} total={total} pct={pct} />

      <MilestoneFilters
        milestones={milestones}
        activeCategory={activeCategory}
        activeStatus={activeStatus}
        onCategoryChange={setActiveCategory}
        onStatusChange={setActiveStatus}
      />

      {isPending && (
        <div style={{ textAlign: "center", padding: "12px 0", color: "var(--color-stone)", fontSize: 13 }}>
          <ArrowClockwise size={14} style={{ display: "inline", marginRight: 6, animation: "spin 1s linear infinite" }} />
          Menyimpan perubahan...
        </div>
      )}

      {/* Access Permission Control Banner */}
      <div style={{
        backgroundColor: "var(--color-surface-soft)",
        border: "1px solid var(--color-hairline-dark)",
        borderRadius: 12,
        padding: "12px 16px",
        marginBottom: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-ink)", fontWeight: 600 }}>
          <ShieldCheck size={18} color="var(--color-primary)" weight="fill" />
          Hak Akses Pengaturan: {profile.role === "pendiri" ? "Pendiri (Kontrol Penuh All Milestone)" : profile.role === "notaris" ? "Notaris Partner (Verifikasi Milestone Legalitas)" : "Penerus (Milestone Operasional & Relasional)"}
        </div>
        <div style={{ fontSize: 12, color: "var(--color-stone)" }}>
          {profile.role === "pendiri" ? "Anda dapat mengubah seluruh status milestone." : profile.role === "notaris" ? "Wewenang khusus milestone legal & hukum." : "Wewenang khusus milestone operasional & relasi."}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--color-stone)" }}>
            <CheckSquare size={40} weight="duotone" style={{ display: "block", margin: "0 auto 12px" }} />
            <p className="body-md">Tidak ada milestone yang cocok dengan filter.</p>
          </div>
        ) : (
          filtered.map((m) => {
            // Compute role-based edit permissions
            const isFounder = profile.role === "pendiri";
            const isNotary = profile.role === "notaris" && m.category === "legal";
            const isSuccessor = profile.role === "penerus" && (m.category === "operational" || m.category === "relational");
            const canEditMilestone = isFounder || isNotary || isSuccessor;

            return (
              <MilestoneCard key={m.id} milestone={m} canEdit={canEditMilestone} onStatusChange={handleStatusChange} />
            );
          })
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
