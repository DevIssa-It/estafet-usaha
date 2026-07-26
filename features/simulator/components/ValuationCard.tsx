import { formatRupiah } from "./utils";

interface ValuationCardProps {
  businessName: string;
  estimatedValuation: number;
  industryMultiplier: number;
  netAssetValue: number;
}

export function ValuationCard({
  businessName,
  estimatedValuation,
  industryMultiplier,
  netAssetValue,
}: ValuationCardProps) {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(73,79,223,0.18) 0%, rgba(73,79,223,0.04) 100%)",
      border: "1px solid rgba(73,79,223,0.3)",
      borderRadius: "var(--rounded-lg)",
      padding: 24,
    }}>
      <div className="caption" style={{ color: "var(--color-stone)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
        Estimasi Valuasi Bisnis {businessName}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, color: "var(--color-on-dark)", marginBottom: 8 }}>
        {formatRupiah(estimatedValuation)}
      </div>
      <p className="body-sm" style={{ color: "var(--color-on-dark-mute)", lineHeight: 1.5 }}>
        Dihitung berdasarkan <strong>SDE Multiplier {industryMultiplier}x</strong> ditambah 50% nilai aset bersih ({formatRupiah(netAssetValue)}).
      </p>
    </div>
  );
}
