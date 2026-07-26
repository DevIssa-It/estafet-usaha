"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, CheckCircle, Warning, Sparkle } from "@phosphor-icons/react";

interface Notification {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: "info" | "warning" | "success";
}

const INITIAL_NOTIFS: Notification[] = [
  {
    id: "1",
    title: "Tenggat Notaris Suksesi",
    desc: "Milestone 'Konsultasi Notaris' dijadwalkan bulan ini.",
    time: "2 jam lalu",
    unread: true,
    type: "warning",
  },
  {
    id: "2",
    title: "AI Advisor Update",
    desc: "AI Advisor memberikan saran delegasi baru untuk bisnis Anda.",
    time: "1 hari lalu",
    unread: true,
    type: "info",
  },
  {
    id: "3",
    title: "Milestone Selesai",
    desc: "'Valuasi Bisnis' berhasil ditandai selesai.",
    time: "3 hari lalu",
    unread: false,
    type: "success",
  },
];

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL_NOTIFS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: 36, height: 36, borderRadius: "var(--rounded-full)",
          border: "1px solid var(--color-hairline-dark)",
          backgroundColor: "var(--color-surface-soft)",
          color: "var(--color-ink)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "all 0.15s", position: "relative",
        }}
      >
        <Bell size={18} weight="regular" />
        {unreadCount > 0 && (
          <span style={{
            position: "absolute", top: 2, right: 2,
            width: 9, height: 9, borderRadius: "50%",
            backgroundColor: "var(--color-accent-danger)",
            border: "2px solid var(--color-surface-card)",
          }} />
        )}
      </button>

      {open && (
        <div style={{
          position: "absolute", top: 46, right: 0, width: 340,
          backgroundColor: "var(--color-surface-elevated)",
          border: "1px solid var(--color-hairline-dark)",
          borderRadius: "var(--rounded-lg)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
          zIndex: 100, overflow: "hidden",
        }}>
          <div style={{
            padding: "14px 16px",
            borderBottom: "1px solid var(--color-hairline-dark)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-on-dark)" }}>
              Notifikasi Suksesi ({unreadCount})
            </span>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "var(--color-primary-bright)", fontWeight: 600 }}
              >
                Tandai dibaca
              </button>
            )}
          </div>

          <div style={{ maxHeight: 280, overflowY: "auto" }}>
            {notifs.map((n) => (
              <div key={n.id} style={{
                padding: "12px 16px",
                borderBottom: "1px solid var(--color-hairline-dark)",
                backgroundColor: n.unread ? "rgba(73,79,223,0.06)" : "transparent",
                display: "flex", gap: 10, alignItems: "flex-start",
              }}>
                <div style={{ marginTop: 2 }}>
                  {n.type === "warning" ? (
                    <Warning size={16} color="var(--color-accent-warning)" weight="fill" />
                  ) : n.type === "success" ? (
                    <CheckCircle size={16} color="var(--color-accent-teal)" weight="fill" />
                  ) : (
                    <Sparkle size={16} color="var(--color-primary-bright)" weight="fill" />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-on-dark)" }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: "var(--color-on-dark-mute)", marginTop: 2 }}>{n.desc}</div>
                  <div style={{ fontSize: 10, color: "var(--color-stone)", marginTop: 4 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
