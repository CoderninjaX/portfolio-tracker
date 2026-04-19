
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../hooks/usePortfolio';
import Navbar from '../components/Navbar';
import StatsBar from '../components/StatsBar';
import HoldingsTable from '../components/HoldingsTable';
import AddStockModal from '../components/AddStockModal';

export default function Dashboard() {
  const { user } = useAuth();
  const {
    holdings, prices, loading, refreshing,
    error, addStock, removeStock, getPnL, totals, refetch,
  } = usePortfolio();

  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.loadingLogo}>PortFolio</div>
        <div style={styles.loadingDot} />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar refreshing={refreshing} onRefresh={refetch} />

      <main style={styles.main}>
        <div style={styles.pageHeader} className="fade-up">
          <div>
            <h1 style={styles.greeting}>
              Good {getTimeOfDay()}, {user?.name?.split(' ')[0]}
            </h1>
            <p style={styles.sub}>
              {holdings.length
                ? `You're tracking ${holdings.length} stock${holdings.length > 1 ? 's' : ''}`
                : 'Your portfolio is empty'}
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
            style={{ fontSize: 14 }}
          >
            + Add stock
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <StatsBar totals={totals} holdingsCount={holdings.length} />

        <div style={styles.tableSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Holdings</h2>
            <span style={styles.liveTag}>
              <span style={styles.liveDot} />
              Live prices
            </span>
          </div>
          <HoldingsTable
            holdings={holdings}
            prices={prices}
            getPnL={getPnL}
            onRemove={removeStock}
          />
        </div>
      </main>

      {showModal && (
        <AddStockModal
          onAdd={addStock}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

const styles = {
  page: { minHeight: '100vh', background: 'var(--bg)' },
  main: { maxWidth: 1100, margin: '0 auto', padding: '36px 24px' },
  pageHeader: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  greeting: {
    fontFamily: 'var(--font-serif)',
    fontSize: 28,
    fontWeight: 400,
    marginBottom: 4,
  },
  sub: { color: 'var(--muted)', fontSize: 14 },
  error: {
    background: 'var(--red-bg)', color: 'var(--red)',
    padding: '12px 16px', borderRadius: 10, marginBottom: 20, fontSize: 13,
  },
  tableSection: { marginTop: 8 },
  sectionHeader: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 14,
  },
  sectionTitle: { fontSize: 16, fontWeight: 500 },
  liveTag: {
    display: 'flex', alignItems: 'center', gap: 6,
    fontSize: 12, color: 'var(--muted)',
  },
  liveDot: {
    width: 6, height: 6,
    borderRadius: '50%',
    background: 'var(--green)',
    animation: 'pulse 2s ease infinite',
  },
  loadingScreen: {
    minHeight: '100vh',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: 24,
  },
  loadingLogo: {
    fontFamily: 'var(--font-serif)',
    fontSize: 36, color: 'var(--accent)',
  },
  loadingDot: {
    width: 8, height: 8, borderRadius: '50%',
    background: 'var(--accent)',
    animation: 'pulse 1s ease infinite',
  },
};
