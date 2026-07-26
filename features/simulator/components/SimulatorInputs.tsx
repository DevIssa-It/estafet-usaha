import { CurrencyDollar } from "@phosphor-icons/react";
import { formatRupiah } from "./utils";

interface SimulatorInputsProps {
  monthlyRevenue: number;
  setMonthlyRevenue: (val: number) => void;
  profitMargin: number;
  setProfitMargin: (val: number) => void;
  totalAssets: number;
  setTotalAssets: (val: number) => void;
  totalLiabilities: number;
  setTotalLiabilities: (val: number) => void;
  successorShare: number;
  setSuccessorShare: (val: number) => void;
  founderShare: number;
}

export function SimulatorInputs({
  monthlyRevenue, setMonthlyRevenue,
  profitMargin, setProfitMargin,
  totalAssets, setTotalAssets,
  totalLiabilities, setTotalLiabilities,
  successorShare, setSuccessorShare,
  founderShare,
}: SimulatorInputsProps) {
  return (
    <div className="card-dark" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h2 className="heading-sm" style={{ color: "var(--color-on-dark)", display: "flex", alignItems: "center", gap: 8 }}>
        <CurrencyDollar size={18} color="var(--color-primary-bright)" />
        Input Parameter Keuangan
      </h2>

      {/* Monthly Revenue */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <label className="body-sm" style={{ color: "var(--color-on-dark-mute)" }}>Omset Bulanan Rata-Rata</label>
          <span className="body-sm-bold" style={{ color: "var(--color-primary-bright)" }}>
            {formatRupiah(monthlyRevenue)}
          </span>
        </div>
        <input
          type="range" min={10000000} max={500000000} step={5000000}
          value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
          style={{ width: "100%", accentColor: "var(--color-primary)" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--color-stone)", marginTop: 4 }}>
          <span>Rp 10 Juta</span>
          <span>Rp 500 Juta</span>
        </div>
      </div>

      {/* Profit Margin */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <label className="body-sm" style={{ color: "var(--color-on-dark-mute)" }}>Margin Keuntungan Bersih (%)</label>
          <span className="body-sm-bold" style={{ color: "var(--color-accent-teal)" }}>
            {profitMargin}% ({formatRupiah(monthlyRevenue * (profitMargin / 100))}/bln)
          </span>
        </div>
        <input
          type="range" min={5} max={50} step={1}
          value={profitMargin} onChange={(e) => setProfitMargin(Number(e.target.value))}
          style={{ width: "100%", accentColor: "var(--color-accent-teal)" }}
        />
      </div>

      {/* Total Assets & Liabilities */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label className="body-sm" style={{ color: "var(--color-on-dark-mute)", display: "block", marginBottom: 8 }}>Total Aset Usaha</label>
          <input className="input-field-dark" type="number" value={totalAssets}
            onChange={(e) => setTotalAssets(Number(e.target.value))} />
        </div>
        <div>
          <label className="body-sm" style={{ color: "var(--color-on-dark-mute)", display: "block", marginBottom: 8 }}>Total Utang / Kewajiban</label>
          <input className="input-field-dark" type="number" value={totalLiabilities}
            onChange={(e) => setTotalLiabilities(Number(e.target.value))} />
        </div>
      </div>

      {/* Successor Share Allocation Slider */}
      <div style={{ borderTop: "1px solid var(--color-hairline-dark)", paddingTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <label className="body-sm" style={{ color: "var(--color-on-dark-mute)" }}>Simulasi Alokasi Saham Penerus</label>
          <span className="body-sm-bold" style={{ color: "var(--color-accent-warning)" }}>
            Penerus {successorShare}% · Pendiri {founderShare}%
          </span>
        </div>
        <input
          type="range" min={0} max={100} step={5}
          value={successorShare} onChange={(e) => setSuccessorShare(Number(e.target.value))}
          style={{ width: "100%", accentColor: "var(--color-accent-warning)" }}
        />
      </div>
    </div>
  );
}
