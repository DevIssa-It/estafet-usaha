interface ModeToggleProps {
  mode: "login" | "register";
  onToggle: (mode: "login" | "register") => void;
}

export function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr",
      backgroundColor: "var(--color-surface-deep)",
      borderRadius: "var(--rounded-md)", padding: 4,
      marginBottom: 28,
    }}>
      {(["login", "register"] as const).map((m) => (
        <button
          key={m}
          onClick={() => onToggle(m)}
          style={{
            padding: "9px 16px",
            borderRadius: "calc(var(--rounded-md) - 2px)",
            border: "none", cursor: "pointer",
            fontSize: 14, fontWeight: 600,
            transition: "all 0.2s",
            backgroundColor: mode === m ? "var(--color-surface-elevated)" : "transparent",
            color: mode === m ? "var(--color-on-dark)" : "var(--color-stone)",
          }}
        >
          {m === "login" ? "Masuk" : "Daftar"}
        </button>
      ))}
    </div>
  );
}
