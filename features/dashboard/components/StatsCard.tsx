interface StatsCardProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
}

export function StatsCard({ label, value, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="card-dark" style={{ padding: 24 }}>
      <div style={{
        width: 36, height: 36, borderRadius: "var(--rounded-md)",
        backgroundColor: color + "20",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 16,
      }}>
        <Icon size={18} color={color} weight="fill" />
      </div>
      <div className="heading-lg" style={{ color: "var(--color-on-dark)", marginBottom: 4 }}>
        {value}
      </div>
      <div className="body-sm" style={{ color: "var(--color-stone)" }}>{label}</div>
    </div>
  );
}
