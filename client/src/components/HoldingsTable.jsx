export default function HoldingsTable({ holdings, prices, getPnL, onRemove }) {
  const fmt = (n) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  if (!holdings.length) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>◎</div>
        <p style={styles.emptyText}>No holdings yet</p>
        <p style={styles.emptySub}>Add a stock to get started</p>
      </div>
    );
  }

  return (
    <div style={styles.tableWrap}>
      <table style={styles.table}>
        <thead>
          <tr>
            {['Stock', 'Exchange', 'Qty', 'Buy price', 'Current', 'Invested', 'Value', 'P&L', ''].map((h) => (
              <th key={h} style={styles.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {holdings.map((h, i) => {
            const pnl   = getPnL(h);
            const key   = `${h.ticker}:${h.exchange}`;
            const quote = prices[key];
            const pos   = pnl ? pnl.pnl >= 0 : null;

            return (
              <tr key={key} style={{ animationDelay: `${i * 0.04}s` }} className="fade-up">
                <td style={styles.td}>
                  <div style={styles.ticker}>{h.ticker}</div>
                  <div style={styles.company}>
                    {h.companyName.length > 20 ? h.companyName.slice(0, 18) + '…' : h.companyName}
                  </div>
                </td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.exBadge,
                    background: h.exchange === 'NSE' ? 'rgba(200,241,53,0.1)' : 'rgba(59,130,246,0.1)',
                    color: h.exchange === 'NSE' ? 'var(--accent)' : '#60a5fa',
                  }}>
                    {h.exchange}
                  </span>
                </td>
                <td style={styles.td}>{h.quantity}</td>
                <td style={styles.td}>{fmt(h.buyPrice)}</td>
                <td style={styles.td}>
                  {quote ? (
                    <div>
                      <div>{fmt(quote.price)}</div>
                      <div style={{ fontSize: 11, color: parseFloat(quote.change) >= 0 ? 'var(--green)' : 'var(--red)' }}>
                        {parseFloat(quote.change) >= 0 ? '+' : ''}{quote.changePercent}
                      </div>
                    </div>
                  ) : <span style={{ color: 'var(--muted)' }}>—</span>}
                </td>
                <td style={styles.td}>{pnl ? fmt(pnl.invested) : '—'}</td>
                <td style={styles.td}>{pnl ? fmt(pnl.currentVal) : '—'}</td>
                <td style={styles.td}>
                  {pnl ? (
                    <div>
                      <div style={{ color: pos ? 'var(--green)' : 'var(--red)', fontWeight: 500 }}>
                        {pos ? '+' : ''}{fmt(pnl.pnl)}
                      </div>
                      <div style={{ fontSize: 11, color: pos ? 'var(--green)' : 'var(--red)' }}>
                        {pos ? '+' : ''}{pnl.pnlPct}%
                      </div>
                    </div>
                  ) : '—'}
                </td>
                <td style={styles.td}>
                  <button
                    className="btn btn-danger"
                    style={{ padding: '5px 12px', fontSize: 12 }}
                    onClick={() => onRemove(h.ticker, h.exchange)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  tableWrap: { overflowX: 'auto', borderRadius: 14, border: '1px solid var(--border)' },
  table: { width: '100%', borderCollapse: 'collapse', background: 'var(--surface)' },
  th: {
    textAlign: 'left', padding: '12px 16px',
    fontSize: 11, color: 'var(--muted)',
    textTransform: 'uppercase', letterSpacing: '0.06em',
    borderBottom: '1px solid var(--border)',
    whiteSpace: 'nowrap', background: 'var(--surface2)',
  },
  td: {
    padding: '14px 16px', fontSize: 14,
    borderBottom: '1px solid var(--border)',
    verticalAlign: 'middle', whiteSpace: 'nowrap',
  },
  ticker: { fontWeight: 500, color: 'var(--accent)', fontSize: 14 },
  company: { fontSize: 11, color: 'var(--muted)', marginTop: 2 },
  exBadge: {
    fontSize: 11, fontWeight: 600, padding: '3px 8px',
    borderRadius: 6, letterSpacing: '0.04em',
  },
  empty: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 14, padding: '60px 24px', textAlign: 'center',
  },
  emptyIcon: { fontSize: 36, color: 'var(--muted)', marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: 500, marginBottom: 6 },
  emptySub: { fontSize: 14, color: 'var(--muted)' },
};
