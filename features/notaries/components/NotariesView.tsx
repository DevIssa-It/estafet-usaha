"use client";

import { useState } from "react";
import { NOTARIES_DATA, Notary } from "../data/notariesData";
import { CredibilityBanner } from "./CredibilityBanner";
import { NotaryCard } from "./NotaryCard";
import { NotaryDetailModal } from "./NotaryDetailModal";
import { NotariesHeader } from "./view/NotariesHeader";
import { NotarySearchFilterBar } from "./view/NotarySearchFilterBar";
import { NotariesEmptyState } from "./view/NotariesEmptyState";

interface NotariesViewProps {
  businessInviteCode?: string;
}

const CITIES = ["Semua Kota", "Jakarta Selatan", "Yogyakarta", "Surabaya", "Bandung"];

export function NotariesView({ businessInviteCode = "ESTAFET" }: NotariesViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Semua Kota");
  const [selectedNotary, setSelectedNotary] = useState<Notary | null>(null);

  const filteredNotaries = NOTARIES_DATA.filter((n) => {
    const matchesSearch =
      n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.skNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCity = selectedCity === "Semua Kota" || n.city === selectedCity;

    return matchesSearch && matchesCity;
  });

  return (
    <div style={{ padding: "36px 48px 64px", maxWidth: 1400, width: "100%", margin: "0 auto" }}>
      <NotariesHeader />
      <CredibilityBanner />

      <NotarySearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCity={selectedCity}
        onCitySelect={setSelectedCity}
        cities={CITIES}
      />

      {filteredNotaries.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20,
        }}>
          {filteredNotaries.map((notary) => (
            <NotaryCard key={notary.id} notary={notary} onSelect={setSelectedNotary} />
          ))}
        </div>
      ) : (
        <NotariesEmptyState />
      )}

      <NotaryDetailModal
        notary={selectedNotary}
        inviteCode={businessInviteCode}
        onClose={() => setSelectedNotary(null)}
      />
    </div>
  );
}
