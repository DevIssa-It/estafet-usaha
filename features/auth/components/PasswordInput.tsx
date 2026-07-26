"use client";

import { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";

interface PasswordInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
}

export function PasswordInput({
  value, onChange,
  placeholder = "Minimal 8 karakter",
  required, minLength,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <input
        className="input-field-dark"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        style={{ paddingRight: 48 }}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        style={{
          position: "absolute", right: 14, top: "50%",
          transform: "translateY(-50%)",
          background: "none", border: "none",
          cursor: "pointer", color: "var(--color-stone)",
          display: "flex", padding: 0,
        }}
      >
        {show ? <EyeSlash size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
