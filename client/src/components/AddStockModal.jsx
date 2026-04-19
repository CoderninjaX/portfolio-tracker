import { useState } from 'react';
import axios from 'axios';

export default function AddStockModal({ onAdd, onClose }) {
  const [exchange, setExchange]   = useState('NSE');
  const [query, setQuery]         = useState('');
  const [results, setResults]     = useState([]);
  const [selected, setSelected]   = useState(null);
  const [quantity, setQuantity]   = useState('');
  const [buyPrice, setBuyPrice]   = useState('');
  const [searching, setSearching] = useState(false);
  const [adding, setAdding]       = useState(false);
  const [error, setError]         = useState('');

  const search = async () => {
    if (!query.trim()) return;
    setSearching(true);
    setError('');
    try {
      const { data } = await axios.get(`/api/stocks/search/${query}?exchange=${exchange}`);
      setResults(data);
      if (!data.length) setError(`No results found on ${exchange}`);
    } catch {
      setError('Search failed. Try again.');
    } finally {
      setSearching(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') search(); };

  const handleAdd = async () => {
    if (!selected || !quantity || !buyPrice) return setError('Please fill in all fields');
    setAdding(true);
    setError('');
    try {
      await onAdd(selected.ticker, selected.name, exchange, parseFloat(quantity), parseFloat(buyPrice));
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add stock');
    } finally {
      setAdding(false);
    }
  };

  const fmtINR = (n) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal} className="fade-up">
        <div style={styles.header}>
          <h2 style={styles.title}>Add stock</h2>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {/* Exchange toggle */}
        <div style={styles.exchangeRow}>
          {['NSE', 'BSE'].map((ex) => (
            <button
              key={ex}
              style={{
                ...styles.exBtn,
                ...(exchange === ex ? styles.exBtnActive : {}),
              }}
              onClick={() => { setExchange(ex); setResults([]); setSelected(null); }}
            >
              {ex}
            </button>
          ))}
          <span style={styles.exHint}>
            {exchange === 'NSE' ? 'National Stock Exchange' : 'Bombay Stock Exchange'}
          </span>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {!selected ? (
          <>
            <div style={styles.searchRow}>
              <input
                className="input"
                placeholder={`Search on ${exchange} (e.g. Reliance, TCS)`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button className="btn btn-primary" onClick={search} disabled={searching}>
                {searching ? '…' : 'Search'}
              </button>
            </div>
            <div style={styles.results}>
              {results.map((r) => (
                <div
                  key={r.symbol}
                  style={styles.result}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  onClick={() => { setSelected(r); setError(''); }}
                >
                  <span style={styles.ticker}>{r.ticker}</span>
                  <span style={styles.resultName}>{r.name}</span>
                  <span style={styles.exTag}>{r.exchange}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={styles.addForm}>
            <div style={styles.selectedStock}>
              <span style={styles.ticker}>{selected.ticker}</span>
              <span style={styles.exTag}>{exchange}</span>
              <span style={{ color: 'var(--muted2)', fontSize: 13, flex: 1 }}>{selected.name}</span>
              <button
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 13 }}
                onClick={() => setSelected(null)}
              >
                Change
              </button>
            </div>
            <div style={styles.fields}>
              <div style={styles.field}>
                <label style={styles.label}>Quantity</label>
                <input
                  className="input"
                  type="number"
                  placeholder="e.g. 10"
                  min="0.0001"
                  step="any"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  autoFocus
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Buy price (₹)</label>
                <input
                  className="input"
                  type="number"
                  placeholder="e.g. 2450.00"
                  min="0"
                  step="any"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                />
              </div>
            </div>
            {quantity && buyPrice && (
              <div style={styles.summary}>
                Total invested: <strong>{fmtINR(parseFloat(quantity) * parseFloat(buyPrice))}</strong>
              </div>
            )}
            <button
              className="btn btn-primary"
              onClick={handleAdd}
              disabled={adding}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {adding ? 'Adding…' : `Add ${selected.ticker} (${exchange}) to portfolio`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 100, padding: 20,
  },
  modal: {
    width: '100%', maxWidth: 480,
    background: 'var(--surface)',
    border: '1px solid var(--border2)',
    borderRadius: 20,
    padding: 28,
  },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  title: { fontSize: 18, fontFamily: 'var(--font-serif)', fontWeight: 400 },
  closeBtn: { background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 16 },
  exchangeRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 },
  exBtn: {
    padding: '6px 16px', borderRadius: 8, border: '1px solid var(--border2)',
    background: 'transparent', color: 'var(--muted2)', cursor: 'pointer',
    fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
  },
  exBtnActive: {
    background: 'var(--accent)', color: '#0a0c0f', borderColor: 'var(--accent)',
  },
  exHint: { fontSize: 12, color: 'var(--muted)', marginLeft: 4 },
  searchRow: { display: 'flex', gap: 10, marginBottom: 12 },
  results: { display: 'flex', flexDirection: 'column', gap: 2, maxHeight: 280, overflowY: 'auto' },
  result: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '10px 12px', borderRadius: 8, cursor: 'pointer', transition: 'background 0.15s',
  },
  ticker: { fontWeight: 500, fontSize: 14, color: 'var(--accent)', minWidth: 80 },
  resultName: { fontSize: 13, color: 'var(--muted2)', flex: 1 },
  exTag: {
    fontSize: 11, fontWeight: 500, padding: '2px 7px',
    borderRadius: 6, background: 'var(--surface2)', color: 'var(--muted2)',
  },
  addForm: { display: 'flex', flexDirection: 'column', gap: 16 },
  selectedStock: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '12px 14px', background: 'var(--surface2)', borderRadius: 10,
  },
  fields: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 12, color: 'var(--muted2)', fontWeight: 500 },
  summary: { fontSize: 13, color: 'var(--muted2)', textAlign: 'center', padding: '4px 0' },
  error: {
    background: 'var(--red-bg)', color: 'var(--red)',
    padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 12,
  },
};
