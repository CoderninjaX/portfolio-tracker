export default function ScreenerResults({ stocks, loading, count }) {
  const fmt = (n) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  const fmtCrore = (n) => {
    if (!n) return '—';
    const crore = n / 1e7;
    if (crore >= 10000) return `₹${(crore / 100).toFixed(1)}L Cr`;
    return `₹${crore.toFixed(0)} Cr`;
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner} />
        <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 16 }}>
          Fetching live data for stocks…
        </p>
      </div>
    );
  }

  if (!stocks) return null;

  if (!stocks.length) {
    return (
      <div style={styles.empty}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>◎</div>
        <p style={{ fontWeight: 500, marginBottom: 6 }}>No stocks matched your filters</p>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>Try adjusting your criteria</p>
      </div>
    );
  }

  return (
    <div>
      <div style={styles.header}>
        <span style={styles.count}>{count} stocks found</span>
        <span style={styles.live}>
          <span style={styles.liveDot} /> Live prices
        </span>
      </div>
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              {['Stock', 'Sector', 'Cap type', 'Price', 'Change', 'Mkt Cap', '52W High', '52W Low'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stocks.map((s, i) => {
              const pos = s.changePercent >= 0;
              return (
                <tr key={s.ticker} className="fade-up" style={{ animationDelay: `${i * 0.03}s` }}>
                  <td style={styles.td}>
                    <div style={styles.ticker}>{s.ticker}</div>
                    <div style={styles.name}>{s.name.length > 22 ? s.name.slice(0, 20) + '…' : s.name}</div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.sectorBadge}>{s.sector}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.capBadge,
                      color: s.capType === 'Large Cap' ? '#0F6E56' : s.capType === 'Mid Cap' ? '#633806' : '#3C3489',
                      background: s.capType === 'Large Cap' ? '#E1F5EE' : s.capType === 'Mid Cap' ? '#FAEEDA' : '#EEEDFE',
                    }}>
                      {s.capType}
                    </span>
                  </td>
                  <td style={styles.td}>{fmt(s.price)}</td>
                  <td style={styles.td}>
                    <div style={{ color: pos ? 'var(--green)' : 'var(--red)', fontWeight: 500 }}>
                      {pos ? '+' : ''}{s.changePercent}%
                    </div>
                    <div style={{ fontSize: 11, color: pos ? 'var(--green)' : 'var(--red)' }}>
                      {pos ? '+' : ''}{fmt(s.change)}
                    </div>
                  </td>
                  <td style={styles.td}>{fmtCrore(s.marketCap)}</td>
                  <td style={styles.td}>{s.fiftyTwoWeekHigh ? fmt(s.fiftyTwoWeekHigh) : '—'}</td>
                  <td style={styles.td}>{s.fiftyTwoWeekLow ? fmt(s.fiftyTwoWeekLow) : '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  loading: { textAlign: 'center', padding: '48px 24px' },
  spinner: {
    width: 32, height: 32, borderRadius: '50%',
    border: '3px solid var(--border)', borderTopColor: 'var(--accent)',
    animation: 'spin 0.8s linear infinite', margin: '0 auto',
  },
  empty: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 14, padding: '48px 24px', textAlign: 'center',
  },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  count: { fontSize: 14, fontWeight: 500, color: 'var(--text)' },
  live: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)' },
  liveDot: { width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2s ease infinite' },
  tableWrap: { overflowX: 'auto', borderRadius: 14, border: '1px solid var(--border)' },
  table: { width: '100%', borderCollapse: 'collapse', background: 'var(--surface)' },
  th: {
    textAlign: 'left', padding: '12px 16px',
    fontSize: 11, color: 'var(--muted)',
    textTransform: 'uppercase', letterSpacing: '0.06em',
    borderBottom: '1px solid var(--border)',
    whiteSpace: 'nowrap', background: 'var(--surface2)',
  },
  td: { padding: '13px 16px', fontSize: 13, borderBottom: '1px solid var(--border)', verticalAlign: 'middle', whiteSpace: 'nowrap' },
  ticker: { fontWeight: 500, color: 'var(--accent)', fontSize: 14 },
  name: { fontSize: 11, color: 'var(--muted)', marginTop: 2 },
  sectorBadge: { fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'var(--surface2)', color: 'var(--muted2)' },
  capBadge: { fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 6 },
};