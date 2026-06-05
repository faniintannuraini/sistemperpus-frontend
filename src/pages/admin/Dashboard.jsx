import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const stats = [
    { title: 'Total Buku', count: '1,240', icon: '📚', color: '#3b82f6', bg: '#eff6ff' },
    { title: 'Total Mahasiswa', count: '450', icon: '👥', color: '#10b981', bg: '#ecfdf5' },
    { title: 'Buku Dipinjam', count: '84', icon: '📖', color: '#f59e0b', bg: '#fffbeb' },
    { title: 'Denda Belum Dibayar', count: 'Rp 150,000', icon: '⚠️', color: '#ef4444', bg: '#fef2f2' }
  ];

  return (
    <div style={{
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      color: '#1e293b'
    }}>
      {/* Navbar */}
      <nav style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            padding: '8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C12 21 8.5 17 3 17V5C8.5 5 12 9 12 9M12 21C12 21 15.5 17 21 17V5C15.5 5 12 9 12 9M12 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>SIPUS DIGITAL</h1>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>ADMIN PORTAL</span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          style={{
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
        >
          <span>Log Out</span>
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '32px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>Dashboard Admin</h2>
          <p style={{ margin: '4px 0 0 0', color: '#64748b' }}>Selamat datang kembali, Administrator.</p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>{stat.title}</span>
                <h3 style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{stat.count}</h3>
              </div>
              <div style={{
                backgroundColor: stat.bg,
                color: stat.color,
                fontSize: '24px',
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 700 }}>Ringkasan Permintaan Peminjaman</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                  <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>MAHASISWA</th>
                  <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>JUDUL BUKU</th>
                  <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>TANGGAL PENGAJUAN</th>
                  <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', fontWeight: 500 }}>Budi Santoso</td>
                  <td style={{ padding: '16px' }}>Pengantar Algoritma dan Struktur Data</td>
                  <td style={{ padding: '16px', color: '#64748b' }}>05 Juni 2026</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      backgroundColor: '#eff6ff',
                      color: '#2563eb',
                      padding: '4px 8px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>Menunggu Diambil</span>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', fontWeight: 500 }}>Siti Aminah</td>
                  <td style={{ padding: '16px' }}>Pemrograman Web Modern dengan React</td>
                  <td style={{ padding: '16px', color: '#64748b' }}>04 Juni 2026</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      backgroundColor: '#eff6ff',
                      color: '#2563eb',
                      padding: '4px 8px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>Menunggu Diambil</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
