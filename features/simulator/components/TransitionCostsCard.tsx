import { Scales, Info } from "@phosphor-icons/react";
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
        Perkiraan Biaya Transisi & Pajak Suksesi
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--color-on-dark-mute)" }}>Estimasi PPh Final Aset Properti (2.5% PPh Final & 5% BPHTB)</span>
          <span style={{ color: "var(--color-on-dark)", fontWeight: 600 }}>{formatRupiah(estimatedTaxCost)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--color-on-dark-mute)" }}>Estimasi Biaya Notaris & Akta Perubahan PT (~0.8%)</span>
          <span style={{ color: "var(--color-on-dark)", fontWeight: 600 }}>{formatRupiah(estimatedNotaryCost)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "var(--color-on-dark-mute)" }}>PPh Hibah Saham Keluarga Sedarah (PMK 90/2020)</span>
          <span style={{ color: "#10b981", fontWeight: 600 }}>Fasilitas 0% (SKB Hibah)</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid var(--color-hairline-dark)", fontSize: 14, fontWeight: 700 }}>
          <span style={{ color: "var(--color-on-dark)" }}>Total Cadangan Biaya Transisi</span>
          <span style={{ color: "var(--color-accent-warning)" }}>{formatRupiah(totalTransitionCost)}</span>
        </div>

        {/* Disclaimer Box */}
        <div style={{
          marginTop: 10,
          padding: "10px 12px",
          borderRadius: 8,
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          border: "1px solid rgba(245, 158, 11, 0.25)",
          fontSize: 11,
          color: "#cbd5e1",
          lineHeight: 1.5,
          display: "flex",
          gap: 8,
        }}>
          <Info size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong>Disclaimer Pajak & Hukum:</strong> Perhitungan di atas merupakan simulasi awal. Pengalihan saham PT Tertutup non-hibah dikenakan PPh Pasal 17 berbasis Capital Gain, sedangkan hibah saham ke keluarga sedarah (orang tua/anak) dapat memanfaatkan pembebasan PPh 0% sesuai <strong>PMK No. 90/PMK.03/2020</strong> & Pasal 4(3) UU PPh.
          </div>
        </div>
      </div>
    </div>
  );
}
