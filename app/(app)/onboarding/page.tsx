"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UsersThree, ArrowRight } from "@phosphor-icons/react";
import { createBusiness, joinBusiness } from "@/features/onboarding/actions/onboarding.actions";
import { OnboardingSuccessModal } from "@/features/onboarding/components/OnboardingSuccessModal";
import { OnboardingFormTabs } from "@/features/onboarding/components/OnboardingFormTabs";

const INDUSTRIES = [
  "Perdagangan / Retail", "Manufaktur / Produksi", "Kuliner / F&B",
  "Jasa & Konsultan", "Pertanian / Perkebunan", "Properti & Konstruksi",
  "Transportasi & Logistik", "Teknologi & Digital", "Kesehatan & Kecantikan", "Lainnya",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"create" | "join">("create");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ inviteCode: string } | null>(null);

  const [createForm, setCreateForm] = useState({ name: "", description: "", industry: "", founded_year: "" });
  const [inviteCode, setInviteCode] = useState("");

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

  if (success) {
    return <OnboardingSuccessModal inviteCode={success.inviteCode} />;
  }

  return (
    <div style={{ minHeight: "100dvh", backgroundColor: "var(--color-canvas-dark)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 520 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 className="display-md" style={{ color: "var(--color-on-dark)", marginBottom: 12 }}>
            Mulai perjalanan suksesi Anda
          </h1>
          <p className="body-md" style={{ color: "var(--color-on-dark-mute)" }}>
            Buat profil bisnis baru atau bergabung dengan bisnis keluarga yang sudah ada.
          </p>
        </div>

        <OnboardingFormTabs tab={tab} onTabChange={(t) => { setTab(t); setError(""); }} />

        <div style={{ backgroundColor: "var(--color-surface-elevated)", border: "1px solid var(--color-hairline-dark)", borderRadius: "var(--rounded-lg)", padding: 32 }}>
          {tab === "create" ? (
            <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>Nama Bisnis *</label>
                <input className="input-field-dark" placeholder="Toko Batik Santoso" value={createForm.name}
                  onChange={e => setCreateForm({ ...createForm, name: e.target.value })} required />
              </div>
              <div>
                <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>Industri *</label>
                <select className="input-field-dark" value={createForm.industry}
                  onChange={e => setCreateForm({ ...createForm, industry: e.target.value })} required>
                  <option value="">Pilih industri...</option>
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>Tahun Berdiri</label>
                <input className="input-field-dark" type="number" placeholder="1998" min="1900" max={new Date().getFullYear()}
                  value={createForm.founded_year} onChange={e => setCreateForm({ ...createForm, founded_year: e.target.value })} />
              </div>
              <div>
                <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>Deskripsi Singkat</label>
                <textarea className="input-field-dark" placeholder="Ceritakan sedikit tentang bisnis Anda..."
                  value={createForm.description} onChange={e => setCreateForm({ ...createForm, description: e.target.value })}
                  rows={3} style={{ height: "auto", resize: "none", paddingTop: 14 }} />
              </div>
              {error && <div style={{ backgroundColor: "rgba(226,59,74,0.12)", border: "1px solid rgba(226,59,74,0.3)", borderRadius: "var(--rounded-md)", padding: "10px 14px", color: "var(--color-accent-danger)", fontSize: 14 }}>{error}</div>}
              <button type="submit" className="btn btn-cobalt" disabled={loading} style={{ width: "100%" }}>
                {loading ? "Membuat bisnis..." : "Buat Bisnis & Mulai"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleJoin} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ textAlign: "center", padding: "12px 0" }}>
                <UsersThree size={44} color="var(--color-primary)" weight="duotone" style={{ marginBottom: 12 }} />
                <p className="body-md" style={{ color: "var(--color-on-dark-mute)" }}>
                  Masukkan kode undangan yang diberikan oleh Pendiri bisnis keluarga Anda.
                </p>
              </div>
              <div>
                <label className="body-sm" style={{ color: "var(--color-stone)", display: "block", marginBottom: 8 }}>Kode Undangan</label>
                <input className="input-field-dark" placeholder="ABCDEF" value={inviteCode}
                  onChange={e => setInviteCode(e.target.value.toUpperCase())}
                  required maxLength={6}
                  style={{ textAlign: "center", fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, letterSpacing: 8, height: 64 }} />
              </div>
              {error && <div style={{ backgroundColor: "rgba(226,59,74,0.12)", border: "1px solid rgba(226,59,74,0.3)", borderRadius: "var(--rounded-md)", padding: "10px 14px", color: "var(--color-accent-danger)", fontSize: 14 }}>{error}</div>}
              <button type="submit" className="btn btn-cobalt" disabled={loading} style={{ width: "100%" }}>
                {loading ? "Bergabung..." : "Gabung ke Bisnis Keluarga"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
