"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBusiness, joinBusiness, registerNotaryProfile } from "@/features/onboarding/actions/onboarding.actions";
import { OnboardingSuccessModal } from "./OnboardingSuccessModal";
import { OnboardingHeader } from "./OnboardingHeader";
import { NotaryTabSwitcher } from "./NotaryTabSwitcher";
import { CreateBusinessForm } from "./CreateBusinessForm";
import { NotaryProfileForm } from "./NotaryProfileForm";
import { JoinBusinessForm } from "./JoinBusinessForm";
import { UserRole } from "@/types";

const INDUSTRIES = [
  "Perdagangan / Retail", "Manufaktur / Produksi", "Kuliner / F&B",
  "Jasa & Konsultan", "Pertanian / Perkebunan", "Properti & Konstruksi",
  "Transportasi & Logistik", "Teknologi & Digital", "Kesehatan & Kecantikan", "Lainnya",
];

interface OnboardingClientViewProps {
  userRole: UserRole;
}

export function OnboardingClientView({ userRole }: OnboardingClientViewProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ inviteCode: string } | null>(null);

  const [notaryTab, setNotaryTab] = useState<"notary_profile" | "join">("notary_profile");
  const [createForm, setCreateForm] = useState({ name: "", description: "", industry: "", founded_year: "" });
  const [inviteCode, setInviteCode] = useState("");
  const [notaryForm, setNotaryForm] = useState({ sk_number: "", ini_number: "", city: "", office_address: "" });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const business = await createBusiness({
        name: createForm.name, description: createForm.description, industry: createForm.industry,
        founded_year: createForm.founded_year ? parseInt(createForm.founded_year) : null,
      });
      setSuccess({ inviteCode: business.invite_code });
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await joinBusiness(inviteCode);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Kode tidak valid");
    } finally {
      setLoading(false);
    }
  };

  const handleNotaryRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await registerNotaryProfile(notaryForm);
      router.push("/notaries");
    } catch (err: any) {
      setError(err.message || "Gagal mendaftarkan profil Notaris");
    } finally {
      setLoading(false);
    }
  };

  if (success) return <OnboardingSuccessModal inviteCode={success.inviteCode} />;

  return (
    <div style={{ minHeight: "100dvh", backgroundColor: "var(--color-canvas-dark)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 520 }}>
        <OnboardingHeader userRole={userRole} />

        {userRole === "notaris" && (
          <NotaryTabSwitcher activeTab={notaryTab} onTabChange={(t) => { setNotaryTab(t); setError(""); }} />
        )}

        <div style={{ backgroundColor: "var(--color-surface-elevated)", border: "1px solid var(--color-hairline-dark)", borderRadius: "var(--rounded-lg)", padding: 32 }}>
          {error && (
            <div style={{ padding: "10px 14px", borderRadius: 8, backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: 13, marginBottom: 18 }}>
              {error}
            </div>
          )}

          {userRole === "pendiri" && (
            <CreateBusinessForm
              form={createForm}
              onChange={(f, v) => setCreateForm(prev => ({ ...prev, [f]: v }))}
              onSubmit={handleCreate}
              loading={loading}
              industries={INDUSTRIES}
            />
          )}

          {userRole === "notaris" && notaryTab === "notary_profile" && (
            <NotaryProfileForm
              form={notaryForm}
              onChange={(f, v) => setNotaryForm(prev => ({ ...prev, [f]: v }))}
              onSubmit={handleNotaryRegister}
              loading={loading}
            />
          )}

          {((userRole !== "pendiri" && userRole !== "notaris") || (userRole === "notaris" && notaryTab === "join")) && (
            <JoinBusinessForm
              inviteCode={inviteCode}
              onCodeChange={setInviteCode}
              onSubmit={handleJoin}
              loading={loading}
              userRole={userRole}
            />
          )}
        </div>
      </div>
    </div>
  );
}
