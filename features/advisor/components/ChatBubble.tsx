"use client";

import { useState } from "react";
import { Brain, Copy, Check } from "@phosphor-icons/react";
import { formatTime } from "@/lib/utils";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  time?: string;
}

// Advanced Markdown parser rendering headings, numbered lists, bullets, and bold highlights cleanly
function renderFormattedContent(text: string, isUser: boolean) {
  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    let trimmed = line.trim();

    if (!trimmed) {
      return <div key={lineIdx} style={{ height: 6 }} />;
    }

    // Header 1, 2, or 3 (### Heading)
    if (trimmed.startsWith("#")) {
      const headingText = trimmed.replace(/^#+\s*/, "").replaceAll("*", "");
      return (
        <h4
          key={lineIdx}
          style={{
            fontSize: 14,
            fontWeight: 700,
            marginTop: lineIdx === 0 ? 0 : 14,
            marginBottom: 6,
            color: isUser ? "#ffffff" : "#4f46e5",
            letterSpacing: "-0.2px",
            borderBottom: isUser ? "none" : "1px solid #e0e7ff",
            paddingBottom: 4,
          }}
        >
          {headingText}
        </h4>
      );
    }

    let isBullet = false;
    let isNumber = false;
    let processedLine = line;

    if (trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
      isBullet = true;
      processedLine = "• " + trimmed.replace(/^[\*\-•]\s+/, "");
    } else if (/^\d+\.\s+/.test(trimmed)) {
      isNumber = true;
    }

    const parts = processedLine.split(/(\*\*.*?\*\*|\*.*?\*)/g);

    const inlineElements = parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const cleanText = part.slice(2, -2).replaceAll("*", "");
        return (
          <strong key={index} style={{ fontWeight: 700, color: isUser ? "#ffffff" : "#0f172a" }}>
            {cleanText}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        const cleanText = part.slice(1, -1).replaceAll("*", "");
        return <em key={index}>{cleanText}</em>;
      }
      return part.replaceAll("*", "");
    });

    return (
      <div
        key={lineIdx}
        style={{
          marginBottom: 4,
          paddingLeft: isBullet || isNumber ? 8 : 0,
          lineHeight: 1.6,
        }}
      >
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
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", width: "100%", margin: "8px 0" }}>
      <div style={{
        maxWidth: "82%",
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
              <span style={{ fontSize: 11, color: "var(--color-stone)", fontWeight: 600 }}>AI Suksesi Advisor</span>
            </div>

            <button
              onClick={handleCopy}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: copied ? "#059669" : "var(--color-stone)",
                fontSize: 11, display: "flex", alignItems: "center", gap: 4,
                padding: "2px 6px", borderRadius: 4,
              }}
            >
              {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />}
              <span>{copied ? "Tersalin!" : "Salin Teks"}</span>
            </button>
          </div>
        )}

        <div className={isUser ? "chat-bubble-user" : "chat-bubble-ai"}>
          <div style={{ fontSize: 14, lineHeight: 1.6, margin: 0, userSelect: "text", WebkitUserSelect: "text" }}>
            {renderFormattedContent(content, isUser)}
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
