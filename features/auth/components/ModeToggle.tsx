interface ModeToggleProps {
  mode: "login" | "register";
  onToggle: (mode: "login" | "register") => void;
}

export function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4,
      backgroundColor: "#f1f5f9",
      border: "1px solid #e2e8f0",
      borderRadius: 12, padding: 4,
      marginBottom: 28,
    }}>
      {(["login", "register"] as const).map((m) => {
        const isActive = mode === m;
        return (
          <button
            key={m}
            type="button"
            onClick={() => onToggle(m)}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: isActive ? "1px solid #e2e8f0" : "1px solid transparent",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: isActive ? 600 : 500,
              transition: "all 0.2s ease-in-out",
              backgroundColor: isActive ? "#ffffff" : "transparent",
              color: isActive ? "#4f46e5" : "#64748b",
              boxShadow: isActive ? "0 1px 3px rgba(15, 23, 42, 0.08)" : "none",
            }}
          >
            {m === "login" ? "Masuk" : "Daftar"}
          </button>
        );
      })}
    </div>
  );
}

