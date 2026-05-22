import { useState } from 'react';
import axios from 'axios';
import ScreenerResults from './ScreenerResults';

const SECTORS = ['All', 'Banking', 'Finance', 'IT', 'Pharma', 'Healthcare', 'Energy', 'Auto', 'FMCG', 'Metals', 'Telecom', 'Tech', 'Fintech', 'Infrastructure', 'Real Estate'];
const CAP_TYPES = ['All', 'Large Cap', 'Mid Cap', 'Small Cap'];

const DEFAULT_FILTERS = {
  sector: 'All',
  capType: 'All',
  minPrice: '',
  maxPrice: '',
  gainers: false,
  losers: false,
};

export default function Screener() {
  const [filters, setFilters]       = useState(DEFAULT_FILTERS);
  const [aiQuery, setAiQuery]       = useState('');
  const [aiSummary, setAiSummary]   = useState('');
  const [stocks, setStocks]         = useState(null);
  const [loading, setLoading]       = useState(false);
  const [aiLoading, setAiLoading]   = useState(false);
  const [error, setError]           = useState('');
  const [count, setCount]           = useState(0);
  const [activeTab, setActiveTab]   = useState('manual'); // 'manual' | 'ai'

  const runScreen = async (f) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/api/screener', f);
      setStocks(data.stocks);
      setCount(data.count);
    } catch (err) {
      setError(err.response?.data?.message || 'Screening failed');
    } finally {
      setLoading(false);
    }
  };

  const handleManualScreen = () => runScreen(filters);

  const handleAiScreen = async () => {
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    setError('');
    setAiSummary('');
    try {
      const { data } = await axios.post('/api/ai/screen', { query: aiQuery });
      setFilters({ ...DEFAULT_FILTERS, ...data.filters });
      setAiSummary(data.filters.summary || '');
      await runScreen({ ...DEFAULT_FILTERS, ...data.filters });
    } catch (err) {
      setError(err.response?.data?.message || 'AI query failed');
    } finally {
      setAiLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleAiScreen(); };

  return (
    <div style={styles.page}>
      <div style={styles.main}>

        <div style={styles.pageHeader} className="fade-up">
          <div>
            <h1 style={styles.title}>Stock Screener</h1>
            <p style={styles.sub}>Filter NSE stocks by sector, market cap, and price — or just ask in plain English</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div style={styles.tabs}>
          {['manual', 'ai'].map(tab => (
            <button
              key={tab}
              style={{ ...styles.tab, ...(activeTab === tab ? styles.tabActive : {}) }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'manual' ? '⚙ Manual filters' : '✦ Ask AI'}
            </button>
          ))}
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {/* Manual filters */}
        {activeTab === 'manual' && (
          <div style={styles.filterCard} className="fade-in">
            <div style={styles.filterGrid}>
              <div style={styles.field}>
                <label style={styles.label}>Sector</label>
                <select
                  className="input"
                  value={filters.sector}
                  onChange={e => setFilters(f => ({ ...f, sector: e.target.value }))}
                >
                  {SECTORS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Market cap</label>
                <select
                  className="input"
                  value={filters.capType}
                  onChange={e => setFilters(f => ({ ...f, capType: e.target.value }))}
                >
                  {CAP_TYPES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Min price (₹)</label>
                <input
                  className="input"
                  type="number"
                  placeholder="e.g. 100"
                  value={filters.minPrice}
                  onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value }))}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Max price (₹)</label>
                <input
                  className="input"
                  type="number"
                  placeholder="e.g. 5000"
                  value={filters.maxPrice}
                  onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))}
                />
              </div>
            </div>
            <div style={styles.toggleRow}>
              <label style={styles.toggle}>
                <input
                  type="checkbox"
                  checked={filters.gainers}
                  onChange={e => setFilters(f => ({ ...f, gainers: e.target.checked, losers: false }))}
                />
                <span style={styles.toggleLabel}>Top gainers only</span>
              </label>
              <label style={styles.toggle}>
                <input
                  type="checkbox"
                  checked={filters.losers}
                  onChange={e => setFilters(f => ({ ...f, losers: e.target.checked, gainers: false }))}
                />
                <span style={styles.toggleLabel}>Top losers only</span>
              </label>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleManualScreen}
              disabled={loading}
              style={{ marginTop: 16 }}
            >
              {loading ? 'Screening…' : 'Screen stocks'}
            </button>
          </div>
        )}

        {/* AI filters */}
        {activeTab === 'ai' && (
          <div style={styles.filterCard} className="fade-in">
            <label style={styles.label}>Ask in plain English</label>
            <div style={styles.aiRow}>
              <input
                className="input"
                placeholder='e.g. "Show me large cap pharma stocks under ₹2000" or "top IT gainers today"'
                value={aiQuery}
                onChange={e => setAiQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button
                className="btn btn-primary"
                onClick={handleAiScreen}
                disabled={aiLoading || loading}
                style={{ whiteSpace: 'nowrap' }}
              >
                {aiLoading ? 'Thinking…' : '✦ Ask AI'}
              </button>
            </div>
            {aiSummary && (
              <div style={styles.aiSummary}>
                ✦ AI understood: <em>{aiSummary}</em>
              </div>
            )}
            <div style={styles.examples}>
              <span style={styles.exLabel}>Try:</span>
              {[
                'Large cap banking stocks',
                'Mid cap pharma under ₹1000',
                'Top gainers in IT sector',
                'Small cap energy stocks',
              ].map(ex => (
                <button
                  key={ex}
                  style={styles.exBtn}
                  onClick={() => { setAiQuery(ex); }}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div style={{ marginTop: 28 }}>
          <ScreenerResults stocks={stocks} loading={loading} count={count} />
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: 'var(--bg)' },
  main: { maxWidth: 1100, margin: '0 auto', padding: '36px 24px' },
  pageHeader: { marginBottom: 24 },
  title: { fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 400, marginBottom: 4 },
  sub: { color: 'var(--muted)', fontSize: 14 },
  tabs: { display: 'flex', gap: 8, marginBottom: 16 },
  tab: {
    padding: '8px 18px', borderRadius: 10, border: '1px solid var(--border2)',
    background: 'transparent', color: 'var(--muted2)', cursor: 'pointer',
    fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
  },
  tabActive: { background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--accent-dim)' },
  filterCard: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 14, padding: '20px 24px',
  },
  filterGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 16 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 12, color: 'var(--muted2)', fontWeight: 500 },
  toggleRow: { display: 'flex', gap: 24 },
  toggle: { display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' },
  toggleLabel: { fontSize: 13, color: 'var(--muted2)' },
  aiRow: { display: 'flex', gap: 10, marginTop: 8, marginBottom: 12 },
  aiSummary: {
    fontSize: 13, color: 'var(--accent-dim)',
    background: 'rgba(200,241,53,0.06)', padding: '10px 14px',
    borderRadius: 8, marginBottom: 12,
  },
  examples: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  exLabel: { fontSize: 12, color: 'var(--muted)' },
  exBtn: {
    fontSize: 12, padding: '4px 12px', borderRadius: 20,
    border: '1px solid var(--border2)', background: 'transparent',
    color: 'var(--muted2)', cursor: 'pointer', transition: 'all 0.15s',
  },
  error: {
    background: 'var(--red-bg)', color: 'var(--red)',
    padding: '10px 16px', borderRadius: 10, fontSize: 13, marginBottom: 16,
  },
};