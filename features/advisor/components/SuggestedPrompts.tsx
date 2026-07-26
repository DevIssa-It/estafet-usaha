import { Brain } from "@phosphor-icons/react";

interface SuggestedPromptsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export function SuggestedPrompts({ prompts, onSelect }: SuggestedPromptsProps) {
  return (
    <div style={{ maxWidth: 840, width: "100%", margin: "auto", textAlign: "center" }}>
      <div style={{
        width: 64, height: 64, borderRadius: "var(--rounded-lg)",
        background: "linear-gradient(135deg, rgba(73,79,223,0.2) 0%, rgba(73,79,223,0.05) 100%)",
        border: "1px solid rgba(73,79,223,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 20px",
      }}>
        <Brain size={32} color="var(--color-primary)" weight="duotone" />
      </div>

      <h2 className="heading-md" style={{ color: "var(--color-on-dark)", marginBottom: 10 }}>
        Selamat datang di AI Advisor
      </h2>
      <p className="body-md" style={{ color: "var(--color-on-dark-mute)", marginBottom: 32 }}>
        Tanyakan apa saja tentang proses transfer kepemilikan, aspek legal, atau strategi suksesi bisnis keluarga Anda.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, textAlign: "left" }}>
        {prompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => onSelect(prompt)}
            style={{
              padding: "14px 16px",
              backgroundColor: "var(--color-surface-elevated)",
              border: "1px solid var(--color-hairline-dark)",
              borderRadius: "var(--rounded-md)",
              color: "var(--color-on-dark-mute)",
              fontSize: 13, lineHeight: 1.5,
              cursor: "pointer", textAlign: "left",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = "var(--color-primary)";
              btn.style.color = "var(--color-on-dark)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.borderColor = "var(--color-hairline-dark)";
              btn.style.color = "var(--color-on-dark-mute)";
            }}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
