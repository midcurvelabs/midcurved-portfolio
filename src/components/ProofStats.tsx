const STATS = [
  {
    value: "5M+",
    label: "views generated",
  },
  {
    value: "10K+",
    label: "total audience and growing",
  },
  {
    value: "30+",
    label: "apps shipped and compounding daily",
  },
];

export function ProofStats() {
  return (
    <div className="mc-proof-stats" aria-label="Midcurved proof stats">
      {STATS.map((stat) => (
        <div className="mc-proof-stat" key={stat.value}>
          <span className="mc-proof-stat__value">{stat.value}</span>
          <span className="mc-proof-stat__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
