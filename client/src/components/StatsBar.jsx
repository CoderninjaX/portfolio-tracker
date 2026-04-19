export default function StatsBar({ totals, holdingsCount }) {
  const isPositive = totals.pnl >= 0;

  const fmt = (n) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  return (
    <div style={styles.bar}>
      <Stat label="Total invested"   value={fmt(totals.invested)}   />
      <div style={styles.divider} />
      <Stat label="Current value"    value={fmt(totals.currentVal)} />
      <div style={styles.divider} />
      <Stat
        label="Total P&L"
        value={`${isPositive ? '+' : ''}${fmt(totals.pnl)}`}
        valueStyle={{ color: isPositive ? 'var(--green)' : 'var(--red)' }}
        badge={`${isPositive ? '+' : ''}${totals.pnlPct}%`}
        badgePositive={isPositive}
      />
      <div style={styles.divider} />
      <Stat label="Holdings" value={holdingsCount} />
    </div>
  );
}

function Stat({ label, value, valueStyle, badge, badgePositive }) {
  return (
    <div style={styles.stat}>
      <div style={styles.label}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ ...styles.value, ...valueStyle }}>{value}</div>
        {badge && (
          <span className={badgePositive ? 'tag-green' : 'tag-red'}>{badge}</span>
        )}
      </div>
    </div>
  );
}

const styles = {
  bar: {
    display: 'flex',
    gap: 0,
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 28,
  },
  stat: {
    flex: 1,
    padding: '18px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  divider: { width: '1px', background: 'var(--border)', margin: '14px 0' },
  label: { fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' },
  value: { fontSize: 20, fontWeight: 500, fontFamily: 'var(--font-serif)' },
};
