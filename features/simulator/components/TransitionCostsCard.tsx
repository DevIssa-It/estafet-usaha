import { Scales } from "@phosphor-icons/react";
import { formatRupiah } from "./utils";

interface TransitionCostsCardProps {
  estimatedTaxCost: number;
  estimatedNotaryCost: number;
  totalTransitionCost: number;
}

export function TransitionCostsCard({
  estimatedTaxCost,
  estimatedNotaryCost,
  totalTransitionCost,
}: TransitionCostsCardProps) {
  return (
    <div className="card-dark">
      <h3 className="heading-sm" style={{ color: "var(--color-on-dark)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <Scales size={18} color="var(--color-accent-warning)" />
        Perkiraan Biaya Transisi & Legal Suksesi
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--color-on-dark-mute)" }}>Estimasi Pajak Transfer Aset / Hibah (PPh 2.5%)</span>
          <span style={{ color: "var(--color-on-dark)", fontWeight: 600 }}>{formatRupiah(estimatedTaxCost)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--color-on-dark-mute)" }}>Estimasi Biaya Notaris & Akta (0.8%)</span>
          <span style={{ color: "var(--color-on-dark)", fontWeight: 600 }}>{formatRupiah(estimatedNotaryCost)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid var(--color-hairline-dark)", fontSize: 14, fontWeight: 700 }}>
          <span style={{ color: "var(--color-on-dark)" }}>Total Cadangan Biaya Transisi</span>
          <span style={{ color: "var(--color-accent-warning)" }}>{formatRupiah(totalTransitionCost)}</span>
        </div>
      </div>
    </div>
  );
}
