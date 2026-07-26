import { useRef } from "react";
import { PaperPlaneTilt, ArrowClockwise } from "@phosphor-icons/react";

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export function ChatInput({ value, onChange, onSend, isLoading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.target as HTMLTextAreaElement;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  return (
    <div style={{
      padding: "16px 32px 24px",
      borderTop: "1px solid var(--color-hairline-dark)",
      backgroundColor: "var(--color-surface-deep)",
      flexShrink: 0,
    }}>
      <div
        style={{
          display: "flex", gap: 10, alignItems: "flex-end",
          backgroundColor: "var(--color-surface-elevated)",
          border: "1px solid var(--color-hairline-dark)",
          borderRadius: "var(--rounded-lg)",
          padding: "12px 14px",
          transition: "border-color 0.15s",
        }}
        onFocusCapture={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-primary)")}
        onBlurCapture={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-hairline-dark)")}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Tanyakan tentang suksesi bisnis Anda... (Enter untuk kirim)"
          disabled={isLoading}
          rows={1}
          style={{
            flex: 1, background: "none", border: "none", outline: "none",
            color: "var(--color-on-dark)", fontSize: 14, lineHeight: 1.6,
            resize: "none", fontFamily: "var(--font-body)",
            maxHeight: 120, overflowY: "auto",
          }}
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || isLoading}
          style={{
            width: 36, height: 36, borderRadius: "var(--rounded-md)",
            background: value.trim() && !isLoading ? "var(--color-primary)" : "var(--color-surface-elevated)",
            border: "none",
            cursor: value.trim() && !isLoading ? "pointer" : "default",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s", flexShrink: 0,
          }}
        >
          {isLoading
            ? <ArrowClockwise size={16} color="var(--color-stone)" style={{ animation: "spin 1s linear infinite" }} />
            : <PaperPlaneTilt size={16} color={value.trim() ? "white" : "var(--color-stone)"} weight="fill" />
          }
        </button>
      </div>

      <p className="caption" style={{ color: "var(--color-stone)", marginTop: 8, textAlign: "center" }}>
        AI Advisor bukan pengganti konsultan hukum atau keuangan profesional.
      </p>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
