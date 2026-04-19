import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate   = useNavigate();
  const [form, setForm]   = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.box} className="fade-up">
        <div style={styles.logo}>PortFolio</div>
        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.sub}>Sign in to your portfolio</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p style={styles.footer}>
          No account?{' '}
          <Link to="/register" style={{ color: 'var(--accent)' }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    background: 'radial-gradient(ellipse at 60% 0%, #1a2a0a 0%, var(--bg) 60%)',
  },
  box: {
    width: '100%',
    maxWidth: 400,
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 20,
    padding: '40px 36px',
  },
  logo: {
    fontFamily: 'var(--font-serif)',
    fontSize: 28,
    color: 'var(--accent)',
    marginBottom: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: 400,
    fontFamily: 'var(--font-serif)',
    marginBottom: 6,
  },
  sub: { color: 'var(--muted)', fontSize: 14, marginBottom: 28 },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, color: 'var(--muted2)', fontWeight: 500 },
  error: {
    background: 'var(--red-bg)',
    color: 'var(--red)',
    padding: '10px 14px',
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 8,
  },
  footer: { textAlign: 'center', fontSize: 13, color: 'var(--muted)', marginTop: 24 },
};
