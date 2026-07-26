interface DocumentFormWizardProps {
  successorSalary: string;
  setSuccessorSalary: (val: string) => void;
  retainedProfitPercent: string;
  setRetainedProfitPercent: (val: string) => void;
  founderVetoRights: string;
  setFounderVetoRights: (val: string) => void;
  conflictResolution: string;
  setConflictResolution: (val: string) => void;
  effectiveDate: string;
  setEffectiveDate: (val: string) => void;
}

export function DocumentFormWizard({
  successorSalary, setSuccessorSalary,
  retainedProfitPercent, setRetainedProfitPercent,
  founderVetoRights, setFounderVetoRights,
  conflictResolution, setConflictResolution,
  effectiveDate, setEffectiveDate,
}: DocumentFormWizardProps) {
  return (
    <div className="card-dark no-print" style={{ display: "flex", flexDirection: "column", gap: 20, height: "fit-content" }}>
      <h2 className="heading-sm" style={{ color: "var(--color-on-dark)", borderBottom: "1px solid var(--color-hairline-dark)", paddingBottom: 12 }}>
        Klausul Kesepakatan
      </h2>

      <div>
        <label className="body-sm" style={{ color: "var(--color-on-dark-mute)", display: "block", marginBottom: 6 }}>
          Gaji Pokok Penerus (Rp/bulan)
        </label>
        <input
          className="input-field-dark"
          type="text"
          value={successorSalary}
          onChange={(e) => setSuccessorSalary(e.target.value)}
        />
      </div>

      <div>
        <label className="body-sm" style={{ color: "var(--color-on-dark-mute)", display: "block", marginBottom: 6 }}>
          Laba Ditahan untuk Laba Usaha (%)
        </label>
        <input
          className="input-field-dark"
          type="number"
          value={retainedProfitPercent}
          onChange={(e) => setRetainedProfitPercent(e.target.value)}
          min="0" max="100"
        />
      </div>

      <div>
        <label className="body-sm" style={{ color: "var(--color-on-dark-mute)", display: "block", marginBottom: 6 }}>
          Hak Veto Pendiri pada Keputusan Besar
        </label>
        <select
          className="input-field-dark"
          value={founderVetoRights}
          onChange={(e) => setFounderVetoRights(e.target.value)}
        >
          <option value="ya">Ya (Pendiri memegang hak veto)</option>
          <option value="tidak">Tidak (Keputusan mayoritas suara)</option>
        </select>
      </div>

      <div>
        <label className="body-sm" style={{ color: "var(--color-on-dark-mute)", display: "block", marginBottom: 6 }}>
          Mekanisme Resolusi Konflik
        </label>
        <input
          className="input-field-dark"
          type="text"
          value={conflictResolution}
          onChange={(e) => setConflictResolution(e.target.value)}
        />
      </div>

      <div>
        <label className="body-sm" style={{ color: "var(--color-on-dark-mute)", display: "block", marginBottom: 6 }}>
          Tanggal Berlaku Kesepakatan
        </label>
        <input
          className="input-field-dark"
          type="date"
          value={effectiveDate}
          onChange={(e) => setEffectiveDate(e.target.value)}
        />
      </div>
    </div>
  );
}
