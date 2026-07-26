"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { joinBusiness } from "@/features/onboarding/actions/onboarding.actions";
import { JoinClientModalHeader } from "./JoinClientModalHeader";
import { JoinClientForm } from "./JoinClientForm";

interface JoinClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinClientModal({ isOpen, onClose }: JoinClientModalProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await joinBusiness(code.trim());
      onClose();
      setCode("");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Kode undangan tidak valid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div style={{
        backgroundColor: "#ffffff", border: "1px solid #cbd5e1",
        borderRadius: 16, width: "100%", maxWidth: 440, padding: 28,
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
      }}>
        <JoinClientModalHeader onClose={onClose} />

        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>
          Masukkan Kode Undangan unik yang diberikan oleh Pemilik/Owner bisnis Klien Anda.
        </p>

        <JoinClientForm
          code={code}
          onCodeChange={setCode}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
