import { useAuth } from '../context/AuthContext';

export default function Navbar({ refreshing, onRefresh }) {
  const { user, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>PortFolio</div>
      <div style={styles.right}>
        {refreshing && <span style={styles.refreshing}>↻ Refreshing…</span>}
        <button className="btn btn-ghost" style={{ fontSize: 13 }} onClick={onRefresh}>
          Refresh
        </button>
        <div style={styles.user}>
          <div style={styles.avatar}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <span style={styles.name}>{user?.name}</span>
        </div>
        <button className="btn btn-ghost" style={{ fontSize: 13 }} onClick={logout}>
          Sign out
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    height: 60,
    borderBottom: '1px solid var(--border)',
    background: 'var(--surface)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  logo: {
    fontFamily: 'var(--font-serif)',
    fontSize: 22,
    color: 'var(--accent)',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  refreshing: {
    fontSize: 12,
    color: 'var(--muted)',
    animation: 'pulse 1.5s ease infinite',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    background: 'var(--accent)',
    color: '#0a0c0f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 500,
  },
  name: {
    fontSize: 13,
    color: 'var(--muted2)',
  },
};
