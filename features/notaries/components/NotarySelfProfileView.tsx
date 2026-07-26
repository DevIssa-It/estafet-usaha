"use client";

import { useState } from "react";
import { Profile } from "@/types";
import { NotarySelfHeader } from "./self/NotarySelfHeader";
import { NotaryVerificationBadgeCard } from "./self/NotaryVerificationBadgeCard";
import { NotaryEditProfileForm } from "./self/NotaryEditProfileForm";
import { NotaryPortalTabSwitcher } from "./self/NotaryPortalTabSwitcher";
import { IncomingInvitationsList } from "./invitations/IncomingInvitationsList";

interface NotarySelfProfileViewProps {
  profile: Profile;
}

export function NotarySelfProfileView({ profile }: NotarySelfProfileViewProps) {
  const [activeTab, setActiveTab] = useState<"invitations" | "profile">("invitations");
  const [form, setForm] = useState({
    name: profile.full_name || "Dewi Rahmawati, S.H., M.Kn.",
    skNumber: "AHU-0019283.AH.02.01.2018",
    iniNumber: "INI-JKT-8821",
    city: "Jakarta Selatan",
    address: "Jl. HR Rasuna Said Blok X-5 No. 12, Kuningan, Jakarta Selatan",
    specializations: "Suksesi Bisnis Keluarga, Akta Hibah Saham & Aset, Family Charter Notariil, Pembaruan Akta PT/CV",
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ padding: "36px 48px 64px", maxWidth: 1000, width: "100%", margin: "0 auto" }}>
      <NotarySelfHeader />
      <NotaryVerificationBadgeCard />
      <NotaryPortalTabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "invitations" ? (
        <IncomingInvitationsList />
      ) : (
        <NotaryEditProfileForm
          form={form}
          onChange={(field, val) => setForm((prev) => ({ ...prev, [field]: val }))}
          onSubmit={handleSave}
          saved={saved}
        />
      )}
    </div>
  );
}
