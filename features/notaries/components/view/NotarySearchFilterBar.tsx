"use client";

import { MagnifyingGlass, Funnel } from "@phosphor-icons/react";

interface NotarySearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCity: string;
  onCitySelect: (city: string) => void;
  cities: string[];
}

export function NotarySearchFilterBar({
  searchQuery, onSearchChange, selectedCity, onCitySelect, cities,
}: NotarySearchFilterBarProps) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 16, marginBottom: 28,
      backgroundColor: "var(--color-surface-card)", border: "1px solid var(--color-hairline-dark)", borderRadius: 16, padding: 20,
    }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 260, position: "relative", display: "flex", alignItems: "center" }}>
          <MagnifyingGlass size={18} color="var(--color-stone)" style={{ position: "absolute", left: 14 }} />
          <input
            type="text"
            placeholder="Cari nama Notaris, Kota, SK Kemenkumham, atau spesialisasi akta..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px 10px 42px",
              border: "1px solid var(--color-hairline-strong)",
              borderRadius: 10,
              fontSize: 14,
              outline: "none",
              backgroundColor: "var(--color-canvas-dark)",
              color: "var(--color-ink)",
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-stone)", display: "flex", alignItems: "center", gap: 4 }}>
          <Funnel size={14} /> Filter Kota:
        </span>
        {cities.map((city) => {
          const isActive = selectedCity === city;
          return (
            <button
              key={city}
              onClick={() => onCitySelect(city)}
              style={{
                padding: "6px 14px",
                borderRadius: 9999,
                border: isActive ? "1px solid var(--color-primary)" : "1px solid var(--color-hairline-dark)",
                backgroundColor: isActive ? "var(--color-primary)" : "var(--color-surface-card)",
                color: isActive ? "var(--color-on-primary)" : "var(--color-mute)",
                fontSize: 12, fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease-in-out",
              }}
            >
              {city}
            </button>
          );
        })}
      </div>
    </div>
  );
}
