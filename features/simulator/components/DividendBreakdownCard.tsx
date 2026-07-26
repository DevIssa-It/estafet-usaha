import { Bank } from "@phosphor-icons/react";
import { formatRupiah } from "./utils";

interface DividendBreakdownCardProps {
  founderShare: number;
  successorShare: number;
  founderAnnualDividend: number;
  successorAnnualDividend: number;
}

export function DividendBreakdownCard({
  founderShare,
  successorShare,
  founderAnnualDividend,
  successorAnnualDividend,
}: DividendBreakdownCardProps) {
  return (
    <div className="card-dark">
      <h3 className="heading-sm" style={{ color: "var(--color-on-dark)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <Bank size={18} color="var(--color-accent-teal)" />
        Proyeksi Dividen Tahunan Keluarga
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ backgroundColor: "var(--color-surface-elevated)", padding: 16, borderRadius: "var(--rounded-md)" }}>
          <div style={{ fontSize: 12, color: "var(--color-stone)", marginBottom: 4 }}>Pendiri ({founderShare}%)</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-primary-bright)" }}>
            {formatRupiah(founderAnnualDividend)}
          </div>
          <div style={{ fontSize: 11, color: "var(--color-on-dark-mute)", marginTop: 2 }}>/tahun</div>
        </div>

        <div style={{ backgroundColor: "var(--color-surface-elevated)", padding: 16, borderRadius: "var(--rounded-md)" }}>
          <div style={{ fontSize: 12, color: "var(--color-stone)", marginBottom: 4 }}>Penerus ({successorShare}%)</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-accent-teal)" }}>
            {formatRupiah(successorAnnualDividend)}
          </div>
          <div style={{ fontSize: 11, color: "var(--color-on-dark-mute)", marginTop: 2 }}>/tahun</div>
        </div>
      </div>
    </div>
  );
}
