"use client";

import { useState } from "react";
import { Brain, Copy, Check } from "@phosphor-icons/react";
import { formatTime } from "@/lib/utils";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  time?: string;
}

// Clean Markdown parser removing raw asterisks (* and **) even inside bold tags
function renderFormattedContent(text: string) {
  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    let processedLine = line;
    let isBullet = false;

    if (processedLine.trim().startsWith("* ") || processedLine.trim().startsWith("- ")) {
      isBullet = true;
      processedLine = processedLine.trim().replace(/^[\*\-]\s+/, "• ");
    }

    const parts = processedLine.split(/(\*\*.*?\*\*|\*.*?\*)/g);

    const inlineElements = parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const cleanText = part.slice(2, -2).replaceAll("*", "");
        return <strong key={index} style={{ fontWeight: 700 }}>{cleanText}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        const cleanText = part.slice(1, -1).replaceAll("*", "");
        return <em key={index}>{cleanText}</em>;
      }
      return part.replaceAll("*", "");
    });

    return (
      <div key={lineIdx} style={{ marginBottom: lineIdx === lines.length - 1 ? 0 : 4, paddingLeft: isBullet ? 6 : 0 }}>
        {inlineElements}
      </div>
    );
  });
}

export function ChatBubble({ role, content, time }: ChatBubbleProps) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", width: "100%", margin: "6px 0" }}>
      <div style={{
        maxWidth: "80%",
        width: "fit-content",
        display: "flex", flexDirection: "column", gap: 4,
        alignItems: isUser ? "flex-end" : "flex-start",
      }}>
        {!isUser && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 22, height: 22, borderRadius: "var(--rounded-sm)",
                background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-bright) 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Brain size={12} color="white" weight="fill" />
              </div>
              <span style={{ fontSize: 11, color: "var(--color-stone)", fontWeight: 600 }}>AI Advisor</span>
            </div>

            <button
              onClick={handleCopy}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: copied ? "var(--color-accent-teal)" : "var(--color-stone)",
                fontSize: 11, display: "flex", alignItems: "center", gap: 4,
              }}
            >
              {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />}
              <span>{copied ? "Tersalin!" : "Salin"}</span>
            </button>
          </div>
        )}

        <div className={isUser ? "chat-bubble-user" : "chat-bubble-ai"}>
          <div style={{ fontSize: 14, lineHeight: 1.6, margin: 0, userSelect: "text", WebkitUserSelect: "text" }}>
            {renderFormattedContent(content)}
          </div>
        </div>

        {time && (
          <span style={{ fontSize: 11, color: "var(--color-stone)" }}>
            {formatTime(time)}
          </span>
        )}
      </div>
    </div>
  );
}
