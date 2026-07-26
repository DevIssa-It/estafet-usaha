import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Sparkle, Copy, ArrowRight } from "@phosphor-icons/react";

interface OnboardingSuccessModalProps {
  inviteCode: string;
}

export function OnboardingSuccessModal({ inviteCode }: OnboardingSuccessModalProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: "var(--color-canvas-dark)" }}>
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: "var(--rounded-lg)", background: "linear-gradient(135deg, var(--color-accent-teal) 0%, #00d4a0 100%)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <Check size={32} color="white" weight="bold" />
        </div>
        <h1 className="heading-lg" style={{ color: "var(--color-on-dark)", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span>Bisnis berhasil dibuat!</span>
          <Sparkle size={20} color="var(--color-accent-teal)" weight="fill" />
        </h1>
        <p className="body-md" style={{ color: "var(--color-on-dark-mute)", marginBottom: 32 }}>
          Bagikan kode undangan di bawah kepada Penerus bisnis Anda untuk bergabung ke platform.
        </p>

        <div style={{ backgroundColor: "var(--color-surface-elevated)", border: "1px solid var(--color-hairline-dark)", borderRadius: "var(--rounded-lg)", padding: 28, marginBottom: 24 }}>
          <p className="body-sm" style={{ color: "var(--color-stone)", marginBottom: 12 }}>Kode Undangan untuk Penerus</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "var(--color-primary-bright)", letterSpacing: 8 }}>
              {inviteCode}
            </span>
            <button onClick={handleCopy} style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "var(--color-accent-teal)" : "var(--color-stone)" }}>
              {copied ? <Check size={20} weight="bold" /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        <button onClick={() => router.push("/dashboard")} className="btn btn-primary" style={{ width: "100%", gap: 8 }}>
          Lanjut ke Dashboard <ArrowRight size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}
