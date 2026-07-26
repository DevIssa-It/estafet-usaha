"use client";

import { useState } from "react";
import { Calculator } from "@phosphor-icons/react";
import { Profile, Business } from "@/types";
import { SimulatorInputs } from "./SimulatorInputs";
import { ValuationCard } from "./ValuationCard";
import { TransitionCostsCard } from "./TransitionCostsCard";
import { DividendBreakdownCard } from "./DividendBreakdownCard";

interface FinancialSimulatorViewProps {
  profile: Profile;
  business: Business;
}

export function FinancialSimulatorView({ profile, business }: FinancialSimulatorViewProps) {
  // Input states
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(50000000);
  const [profitMargin, setProfitMargin] = useState<number>(20);
  const [totalAssets, setTotalAssets] = useState<number>(250000000);
  const [totalLiabilities, setTotalLiabilities] = useState<number>(50000000);
  const [successorShare, setSuccessorShare] = useState<number>(40);

  // Valuation Calculations
  const annualRevenue = monthlyRevenue * 12;
  const annualProfit = annualRevenue * (profitMargin / 100);
  const netAssetValue = Math.max(0, totalAssets - totalLiabilities);
  const industryMultiplier = 3.2;
  const estimatedValuation = Math.round(annualProfit * industryMultiplier + netAssetValue * 0.5);

  // Transition Costs
  const estimatedTaxCost = Math.round(totalAssets * 0.025);
  const estimatedNotaryCost = Math.round(estimatedValuation * 0.008);
  const totalTransitionCost = estimatedTaxCost + estimatedNotaryCost;

  // Dividends
  const founderShare = 100 - successorShare;
  const successorAnnualDividend = Math.round(annualProfit * (successorShare / 100));
  const founderAnnualDividend = Math.round(annualProfit * (founderShare / 100));

  return (
    <div style={{ padding: "36px 48px 64px", maxWidth: 1200, width: "100%", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "var(--rounded-md)",
            background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-bright) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Calculator size={20} color="white" weight="fill" />
          </div>
          <h1 className="display-md" style={{ color: "var(--color-on-dark)" }}>
            Simulasi Finansial & Valuasi Suksesi
          </h1>
        </div>
        <p className="body-md" style={{ color: "var(--color-on-dark-mute)" }}>
          Hitung estimasi nilai bisnis {business.name}, alokasi dividen keluarga, serta perkiraan biaya pajak & legal suksesi.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <SimulatorInputs
          monthlyRevenue={monthlyRevenue} setMonthlyRevenue={setMonthlyRevenue}
          profitMargin={profitMargin} setProfitMargin={setProfitMargin}
          totalAssets={totalAssets} setTotalAssets={setTotalAssets}
          totalLiabilities={totalLiabilities} setTotalLiabilities={setTotalLiabilities}
          successorShare={successorShare} setSuccessorShare={setSuccessorShare}
          founderShare={founderShare}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <ValuationCard
            businessName={business.name}
            estimatedValuation={estimatedValuation}
            industryMultiplier={industryMultiplier}
            netAssetValue={netAssetValue}
          />
          <TransitionCostsCard
            estimatedTaxCost={estimatedTaxCost}
            estimatedNotaryCost={estimatedNotaryCost}
            totalTransitionCost={totalTransitionCost}
          />
          <DividendBreakdownCard
            founderShare={founderShare}
            successorShare={successorShare}
            founderAnnualDividend={founderAnnualDividend}
            successorAnnualDividend={successorAnnualDividend}
          />
        </div>
      </div>
    </div>
  );
}
