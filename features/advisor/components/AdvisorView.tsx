"use client";

import { useState, useRef, useEffect } from "react";
import { Brain } from "@phosphor-icons/react";
import { Profile, ChatMessage } from "@/types";
import { TypingIndicator } from "./TypingIndicator";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { AdvisorHeader } from "./AdvisorHeader";

interface AdvisorViewProps {
  profile: Profile;
  businessName: string;
  initialHistory: ChatMessage[];
}

const SUGGESTED_PROMPTS = {
  pendiri: [
    "Bagaimana cara saya mulai mendelegasikan tanggung jawab operasional ke penerus?",
    "Apa dokumen legal yang wajib disiapkan untuk suksesi bisnis di Indonesia?",
    "Bagaimana cara menilai kesiapan penerus untuk mengambil alih bisnis?",
    "Apa risiko utama dalam proses suksesi bisnis keluarga UMKM?",
  ],
  penerus: [
    "Bagaimana cara saya membangun kepercayaan dari karyawan lama sebagai penerus?",
    "Apa yang harus saya pelajari sebelum mengambil alih bisnis keluarga?",
    "Bagaimana cara mengelola ekspektasi pendiri yang masih ingin terlibat?",
    "Apa strategi untuk mempertahankan pelanggan setia saat terjadi pergantian kepemimpinan?",
  ],
};

type Message = { role: "user" | "assistant"; content: string; time?: string };

export function AdvisorView({ profile, businessName, initialHistory }: AdvisorViewProps) {
  const [messages, setMessages] = useState<Message[]>(
    initialHistory.map((m) => ({ role: m.role, content: m.content, time: m.created_at }))
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const prompts = SUGGESTED_PROMPTS[profile.role] ?? SUGGESTED_PROMPTS.pendiri;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setInput("");

    const userMsg: Message = { role: "user", content: text, time: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/advisor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response, time: new Date().toISOString() }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Maaf, terjadi kesalahan. Pastikan koneksi internet Anda stabil dan coba lagi.",
        time: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      <AdvisorHeader businessName={businessName} role={profile.role} />

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
        {messages.length === 0 ? (
          <SuggestedPrompts prompts={prompts} onSelect={sendMessage} />
        ) : (
          messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} content={msg.content} time={msg.time} />
          ))
        )}

        {isLoading && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div style={{
              width: 22, height: 22, borderRadius: "var(--rounded-sm)",
              background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-bright) 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Brain size={12} color="white" weight="fill" />
            </div>
            <div className="chat-bubble-ai" style={{ paddingTop: 8, paddingBottom: 8 }}>
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={() => sendMessage(input)}
        isLoading={isLoading}
      />
    </div>
  );
}
