import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const studentStats = [
    { title: 'Pinjaman Aktif', value: '2 Buku', icon: '📖', color: '#3b82f6', bg: '#eff6ff' },
    { title: 'Jatuh Tempo Terdekat', value: '12 Juni 2026', icon: '📅', color: '#f59e0b', bg: '#fffbeb' },
    { title: 'Total Riwayat', value: '15 Transaksi', icon: 'history', iconIsEmoji: false, color: '#10b981', bg: '#ecfdf5' },
    { title: 'Denda Aktif', value: 'Rp 0', icon: '💰', color: '#ef4444', bg: '#fef2f2' }
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
            backgroundColor: '#10b981',
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
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>STUDENT PORTAL</span>
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
      <main style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>Dashboard Mahasiswa</h2>
            <p style={{ margin: '4px 0 0 0', color: '#64748b' }}>Selamat datang di Perpustakaan Digital, silakan cari buku yang Anda inginkan.</p>
          </div>
          {/* Quick Search */}
          <div style={{ display: 'flex', gap: '8px', minWidth: '300px' }}>
            <input 
              type="text" 
              placeholder="Cari buku berdasarkan judul atau penulis..."
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                outline: 'none',
                fontSize: '14px'
              }}
            />
            <button style={{
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '0 16px',
              cursor: 'pointer',
              fontWeight: 600
            }}>Cari</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {studentStats.map((stat, idx) => (
            <div key={idx} style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px 24px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>{stat.title}</span>
                <h3 style={{ margin: '8px 0 0 0', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>{stat.value}</h3>
              </div>
              <div style={{
                backgroundColor: stat.bg,
                color: stat.color,
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                {stat.icon === 'history' ? (
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
          {/* Active Loans */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 700 }}>Buku yang Sedang Dipinjam</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                <div style={{ fontSize: '32px' }}>📘</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 600 }}>Struktur Data dan Analisis Algoritma</h4>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Dipinjam tanggal: 29 Mei 2026</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    backgroundColor: '#fffbeb',
                    color: '#b45309',
                    padding: '4px 8px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 600,
                    display: 'inline-block',
                    marginBottom: '6px'
                  }}>Sisa 7 Hari</span>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Jatuh Tempo: 12 Juni 2026</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ fontSize: '32px' }}>📙</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 600 }}>Dasar Pemrograman Python</h4>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Dipinjam tanggal: 01 Juni 2026</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    backgroundColor: '#fffbeb',
                    color: '#b45309',
                    padding: '4px 8px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 600,
                    display: 'inline-block',
                    marginBottom: '6px'
                  }}>Sisa 10 Hari</span>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Jatuh Tempo: 15 Juni 2026</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <div style={{
            backgroundColor: '#eff6ff',
            borderRadius: '12px',
            border: '1px solid #bfdbfe',
            padding: '24px',
            color: '#1e3a8a'
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 700 }}>Informasi & Ketentuan</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.6' }}>
              <li>Batas waktu maksimal peminjaman adalah 14 hari.</li>
              <li>Perpanjangan peminjaman dapat diajukan 3 hari sebelum jatuh tempo.</li>
              <li>Keterlambatan pengembalian buku dikenakan denda Rp 1.000 / hari per buku.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
