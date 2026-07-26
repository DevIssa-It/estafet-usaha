"use client";

import { MapPin, Phone, EnvelopeSimple } from "@phosphor-icons/react";

interface NotaryContactCardProps {
  address: string;
  phone: string;
  email: string;
}

export function NotaryContactCard({ address, phone, email }: NotaryContactCardProps) {
  return (
    <div style={{
      backgroundColor: "var(--color-canvas-dark)",
      border: "1px solid var(--color-hairline-dark)",
      borderRadius: 12,
      padding: 16,
      display: "flex", flexDirection: "column", gap: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-charcoal)" }}>
        <MapPin size={16} color="var(--color-stone)" weight="fill" />
        <span><strong>Kantor:</strong> {address}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-charcoal)" }}>
        <Phone size={16} color="var(--color-stone)" weight="fill" />
        <span><strong>Telepon / WA:</strong> {phone}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-charcoal)" }}>
        <EnvelopeSimple size={16} color="var(--color-stone)" weight="fill" />
        <span><strong>Email:</strong> {email}</span>
      </div>
    </div>
  );
}
