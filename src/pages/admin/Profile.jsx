import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../../services/api';

export default function Profile() {
  const [profile, setProfile] = useState({
    nama: '',
    email: '',
    nip: '',
    role: 'admin'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/user/profil');
      if (response.data && response.data.data) {
        setProfile(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Gagal memuat profil admin.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Reset Password',
      text: 'Aksi Reset Password dipicu. Email konfirmasi perubahan kata sandi telah dikirim ke email Anda.',
      icon: 'success',
      confirmButtonColor: '#ef4444'
    });
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
        <h3>Memuat data profil...</h3>
      </div>
    );
  }

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
          Informasi profil pribadi dan pengaturan keamanan akun Anda.
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
            {profile.nama ? profile.nama.charAt(0).toUpperCase() : 'A'}
          </div>

          <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>{profile.nama}</h2>
          <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>
            {profile.role === 'admin' ? 'Petugas Perpustakaan' : 'Anggota'}
          </span>

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
            {profile.email}
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
                value={profile.nama}
                disabled
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  color: '#475569',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'not-allowed'
                }}
              />
            </div>

            {/* Field NIP */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>NIP / ID Petugas</label>
              <input
                type="text"
                value={profile.nip || '-'}
                disabled
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  color: '#475569',
                  fontWeight: 600,
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
                value={profile.email}
                disabled
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  color: '#475569',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'not-allowed'
                }}
              />
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
