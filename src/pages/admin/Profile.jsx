import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('supersecretadmin123');

  const handleResetPassword = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Reset Password',
      text: 'Aksi Reset Password dipicu (Email konfirmasi reset password telah dikirim).',
      icon: 'success',
      confirmButtonColor: '#ef4444'
    });
  };

  return (
    <div style={{
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      color: '#1e293b'
    }}>
      {/* Title Header */}
      <div>
        <h1 style={{
          margin: 0,
          fontSize: '28px',
          fontWeight: 700,
          color: '#0f172a',
          letterSpacing: '-0.5px'
        }}>
          Profil Admin
        </h1>
        <p style={{
          margin: '4px 0 0 0',
          fontSize: '14px',
          color: '#64748b'
        }}>
          Kelola informasi profil pribadi dan pengaturan keamanan akun Anda.
        </p>
      </div>

      {/* Grid Layout Container */}
      <div className="profile-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* CARD KIRI: Profile Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '32px 24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* Avatar bulat besar */}
          <div style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            fontWeight: 700,
            marginBottom: '16px',
            boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)'
          }}>
            A
          </div>

          <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>Admin Fani</h2>
          <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Petugas Perpustakaan</span>

          {/* Divider */}
          <div style={{
            width: '100%',
            borderTop: '1px solid #e2e8f0',
            margin: '24px 0'
          }}></div>

          {/* Email badge */}
          <span style={{
            backgroundColor: '#eff6ff',
            color: '#2563eb',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 600
          }}>
            admin@perpustakaan.id
          </span>
        </div>

        {/* CARD KANAN: Informasi Akun */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '32px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}>
          <h2 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Informasi Akun</h2>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Field Nama */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Nama Lengkap</label>
              <input
                type="text"
                value="Admin Fani"
                disabled
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  color: '#64748b',
                  outline: 'none',
                  cursor: 'not-allowed'
                }}
              />
            </div>

            {/* Field Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Alamat Email</label>
              <input
                type="email"
                value="admin@perpustakaan.id"
                disabled
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  color: '#64748b',
                  outline: 'none',
                  cursor: 'not-allowed'
                }}
              />
            </div>

            {/* Field Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Kata Sandi</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '10px 45px 10px 14px',
                    fontSize: '14px',
                    color: '#0f172a',
                    outline: 'none',
                    width: '100%',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                    transition: 'border-color 0.2s'
                  }}
                  className="password-input"
                />
                {/* Show/Hide Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                  }}
                >
                  {showPassword ? (
                    /* Eye Off Icon */
                    <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    /* Eye Icon */
                    <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Reset Password Button */}
            <button
              onClick={handleResetPassword}
              className="reset-btn"
              style={{
                backgroundColor: '#ef4444', // Red button
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s, transform 0.1s',
                alignSelf: 'flex-start',
                marginTop: '8px',
                boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.1)'
              }}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>

      {/* Style Injection */}
      <style>{`
        .password-input:focus {
          border-color: #2563eb !important;
        }
        .reset-btn:hover {
          background-color: #dc2626 !important;
          transform: translateY(-1px);
        }
        .reset-btn:active {
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          .profile-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
