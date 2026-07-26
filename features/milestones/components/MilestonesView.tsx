"use client";

import { useState, useTransition } from "react";
import { ArrowClockwise, CheckSquare } from "@phosphor-icons/react";
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

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--color-stone)" }}>
            <CheckSquare size={40} weight="duotone" style={{ display: "block", margin: "0 auto 12px" }} />
            <p className="body-md">Tidak ada milestone yang cocok dengan filter.</p>
          </div>
        ) : (
          filtered.map((m) => (
            <MilestoneCard key={m.id} milestone={m} canEdit={true} onStatusChange={handleStatusChange} />
          ))
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
