import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css';
import { useEffect } from 'react';

const Login = ({ url, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Login";
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    try {
      const res = await axios.post(`${url}/api/admin/login`, { email, password });
      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token);
        setIsAuthenticated(true);
        toast.success('Welcome back, Admin!');
        navigate('/add');
      } else {
        toast.error(res.data.message || 'Login failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const IconMail = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  const IconLock = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

  const IconEye = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const IconEyeOff = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

  return (
    <div className="login-root">

      {/* ── LEFT PANEL ── */}
      <div className="login-left">
        {/* Radial glow blobs — matches screenshot */}
        <div className="glow glow-1" />
        <div className="glow glow-2" />

        <div className="left-inner">
          {/* Badge */}
          <div className="left-badge">FOOD ADMIN PORTAL</div>

          {/* Headline */}
          <h1 className="left-headline">
            Upload Foods,<br />
            <span className="accent">Track Orders,</span><br />
            Run the Kitchen.
          </h1>

          <p className="left-desc">
            Your all-in-one hub to add new dishes, manage your menu,
            monitor live orders, and keep your restaurant running smoothly
            — all from one place.
          </p>

          {/* Stats row */}
          <div className="stats-row">
            <div className="stat">
              <span className="stat-val">500+</span>
              <span className="stat-lbl">Menu Items</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-val">Live</span>
              <span className="stat-lbl">Order Tracking</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-val">JWT</span>
              <span className="stat-lbl">Secured</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="login-right">
        <div className="login-card">

          {/* Avatar */}
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '105px', height: '80px', objectFit: 'contain', borderRadius: '12px' }} />
          </div>

          <h2 className="card-title">Welcome back</h2>
          <p className="card-sub">Sign in to manage your restaurant</p>

          <form onSubmit={handleSubmit} className="login-form">

            <div className="field-group">
              <label className="field-label">EMAIL ADDRESS</label>
              <div className="input-wrap">
                <span className="input-icon"><IconMail /></span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@yourdomain.com"
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">PASSWORD</label>
              <div className="input-wrap">
                <span className="input-icon"><IconLock /></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
            </div>

            <button type="submit" className={`submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? (
                <><span className="spin" /> Signing In…</>
              ) : (
                <>Sign In <span className="btn-arrow">→</span></>
              )}
            </button>

          </form>

          <p className="card-foot">🍽️ Authorized restaurant staff only</p>

        </div>
      </div>

    </div>
  );
};

export default Login;