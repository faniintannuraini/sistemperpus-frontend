import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/login', { email, password });
      if (response.data.status === 'success') {
        const { token, user } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', user.role);
        
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      } else {
        setError(response.data.message || 'Login gagal.');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Gagal terhubung ke server backend.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      {/* Left Column: Library Photo Background & Title Info */}
      <section className="login-hero-col">
        <div className="login-hero-content">
          <div className="login-hero-subtitle-top">SISTEM INFORMASI</div>
          <h1>PERPUSTAKAAN DIGITAL</h1>
          <p className="login-hero-desc">
            Akses dan kelola data buku dengan mudah,<br />
            cepat dan efisien
          </p>
        </div>
      </section>

      {/* Right Column: White Login Card */}
      <section className="login-form-col">
        <div className="login-card">
          {/* Brand Book Icon */}
          <svg 
            className="login-brand-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 21C12 21 8.5 17 3 17V5C8.5 5 12 9 12 9M12 21C12 21 15.5 17 21 17V5C15.5 5 12 9 12 9M12 21V9" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>

          <h2>Login</h2>
          <div className="login-card-subtitle">Silahkan Masuk Ke Akun Anda</div>

          {error && (
            <div className="login-error-message" style={{ 
              color: '#ef4444', 
              backgroundColor: '#fee2e2', 
              border: '1px solid #fca5a5', 
              padding: '10px', 
              borderRadius: '6px', 
              marginBottom: '15px', 
              fontSize: '14px',
              textAlign: 'center',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Input */}
            <div className="login-form-group">
              <label htmlFor="email" className="login-label">Email</label>
              <div className="login-input-group">
                <div className="login-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  className="login-text-input"
                  placeholder="name@university.ac.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="login-form-group">
              <label htmlFor="password" className="login-label">Password</label>
              <div className="login-input-group">
                <div className="login-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="login-text-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644 11.082 11.082 0 0117.828 0 1.012 1.012 0 010 .644 11.082 11.082 0 01-17.828 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* LOGIN Button */}
            <button type="submit" className="login-submit-btn">
              LOGIN
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
