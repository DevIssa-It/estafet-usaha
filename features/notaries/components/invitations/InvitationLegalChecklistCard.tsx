"use client";

import { ShieldCheck, MapPin, Scales, UsersThree, Scroll } from "@phosphor-icons/react";

export function InvitationLegalChecklistCard() {
  const points = [
    { icon: ShieldCheck, title: "PMPJ & Beneficial Owner", desc: "Identitas Pendiri & NIB terverifikasi valid", color: "#059669" },
    { icon: MapPin, title: "Wilayah Jabatan Notaris", desc: "Domisili usaha berada dalam cakupan wilayah kerja", color: "#4f46e5" },
    { icon: Scales, title: "Status Objek Hukum & Aset", desc: "Saham & aset usaha terkonfirmasi bebas sengketa", color: "#d97706" },
    { icon: UsersThree, title: "Persetujuan Sah Keluarga", desc: "Persetujuan Harta Bersama & Kesepakatan Waris", color: "#2563eb" },
    { icon: Scroll, title: "Kebutuhan Akta Notaris", desc: "Akta Hibah Saham & Perancangan Family Charter", color: "#7c3aed" },
  ];

  return (
    <div style={{ backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 12, padding: 16, marginBottom: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#065f46", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
        <ShieldCheck size={16} weight="fill" /> Lembar Pertimbangan Hukum Notaris (5 Pilar PMPJ)
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {points.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, backgroundColor: "#ffffff", padding: "8px 12px", borderRadius: 8, border: "1px solid #d1fae5" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon size={16} color={p.color} weight="fill" />
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{p.title}</span>
              </div>
              <span style={{ fontSize: 11, color: "#047857", fontWeight: 600, marginLeft: "auto" }}>{p.desc}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
