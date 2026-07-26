"use client";

import { Star } from "@phosphor-icons/react";
import { NotaryReview } from "../../data/notariesData";

interface NotaryReviewsListProps {
  reviews: NotaryReview[];
  rating: number;
}

export function NotaryReviewsList({ reviews, rating }: NotaryReviewsListProps) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--color-ink)", margin: 0 }}>
          Ulasan Terverifikasi ({reviews.length})
        </h4>
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 700, color: "#d97706" }}>
          <Star size={16} weight="fill" /> {rating} / 5.0
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {reviews.map((rev) => (
          <div key={rev.id} style={{
            backgroundColor: "var(--color-canvas-dark)",
            border: "1px solid var(--color-hairline-dark)",
            borderRadius: 10,
            padding: 12,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-ink)" }}>
                {rev.authorName} <span style={{ fontSize: 11, fontWeight: 400, color: "var(--color-stone)" }}>({rev.businessName})</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--color-ash)" }}>{rev.date}</div>
            </div>
            <div style={{ display: "flex", gap: 2, marginBottom: 6 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} color={i < rev.rating ? "#f59e0b" : "var(--color-faint)"} weight="fill" />
              ))}
            </div>
            <p style={{ fontSize: 12, color: "var(--color-mute)", margin: 0, lineHeight: 1.4 }}>
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
