import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Dashboard() {
  const [statsData, setStatsData] = useState({
    total_buku: 0,
    total_mahasiswa: 0,
    buku_sedang_dipinjam: 0,
    user_belum_bayar_denda: 0
  });
  const [approvalRequests, setApprovalRequests] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard/admin');
      if (response.data && response.data.status === 'success') {
        setStatsData(response.data.data.stat_cards);
        setApprovalRequests(response.data.data.menunggu_persetujuan);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const stats = [
    {
      title: 'Total Buku',
      count: `${statsData.total_buku} Buku`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }}>
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM16 17H8V15H16V17ZM16 13H8V11H16V13ZM16 9H8V7H16V9Z" fill="#2563eb"/>
        </svg>
      ),
      bg: '#eff6ff'
    },
    {
      title: 'Total User (Mahasiswa)',
      count: `${statsData.total_mahasiswa} Mahasiswa`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }}>
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2.02c-2.33 0-7 1.17-7 3.5V19h14v-2.48c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.43V19h6v-2.48c0-2.33-4.67-3.5-7-3.5z" fill="#10b981"/>
        </svg>
      ),
      bg: '#dcfce7'
    },
    {
      title: 'Buku Sedang Dipinjam',
      count: `${statsData.buku_sedang_dipinjam} Buku`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }}>
          <path d="M5 4v2h14V4H5zm0 10h4v6H5v-6zm10 0h4v6h-4v-6zm-5-5h4v11h-4V9z" fill="#a855f7"/>
        </svg>
      ),
      bg: '#f3e8ff'
    },
    {
      title: 'Denda Belum Dibayar',
      count: `${statsData.user_belum_bayar_denda} User`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }}>
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#ef4444"/>
        </svg>
      ),
      bg: '#fee2e2'
    }
  ];

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      color: '#1e293b',
      maxWidth: '1200px',
      margin: '0 auto',
      boxSizing: 'border-box'
    }}>
      {/* Title Header */}
      <div>
        <h1 style={{
          margin: 0,
          fontSize: '24px',
          fontWeight: 700,
          color: '#0f172a',
          letterSpacing: '-0.5px'
        }}>
          Halo, Admin!
        </h1>
        <p style={{
          margin: '4px 0 0 0',
          fontSize: '14px',
          color: '#64748b'
        }}>
          Berikut adalah ringkasan data perpustakaan hari ini.
        </p>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginTop: '8px'
      }} className="admin-stats-grid">
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px 20px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxSizing: 'border-box'
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: stat.bg,
              flexShrink: 0
            }} className="stat-icon-wrapper">
              {stat.icon}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 500,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>{stat.title}</span>
              <span style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1
              }}>{stat.count}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div style={{
        marginTop: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {/* Table Title and Link */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#0f172a',
            margin: 0
          }}>
            Menunggu Persetujuan
          </h2>
          <a
            href="/admin/peminjaman"
            className="lihat-semua-link"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#3b82f6',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
          >
            Lihat Semua
          </a>
        </div>

        {/* Table Card */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left'
            }}>
              <thead>
                <tr style={{
                  borderBottom: '1px solid #e2e8f0',
                  backgroundColor: '#fafafb'
                }}>
                  <th style={{
                    padding: '16px 24px',
                    color: '#0f172a',
                    fontSize: '14px',
                    fontWeight: 700
                  }}>
                    Mahasiswa
                  </th>
                  <th style={{
                    padding: '16px 24px',
                    color: '#0f172a',
                    fontSize: '14px',
                    fontWeight: 700
                  }}>
                    Buku yang Dipinjam
                  </th>
                  <th style={{
                    padding: '16px 24px',
                    color: '#0f172a',
                    fontSize: '14px',
                    fontWeight: 700
                  }}>
                    Status Permintaan
                  </th>
                </tr>
              </thead>
              <tbody>
                {approvalRequests.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                      Tidak ada permintaan peminjaman yang menunggu persetujuan.
                    </td>
                  </tr>
                ) : (
                  approvalRequests.map((req, index) => (
                    <tr
                      key={req.id_transaksi || index}
                      style={{
                        borderBottom: index !== approvalRequests.length - 1 ? '1px solid #e2e8f0' : 'none'
                      }}
                    >
                      {/* Mahasiswa Column */}
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#0f172a'
                        }}>
                          {req.nama}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#64748b',
                          marginTop: '2px'
                        }}>
                          NIM: {req.nim}
                        </div>
                      </td>

                      {/* Buku Column */}
                      <td style={{
                        padding: '16px 24px',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#334155'
                      }}>
                        {req.book_title}
                      </td>

                      {/* Status Column */}
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{
                          backgroundColor: '#ffedd5',
                          color: '#ea580c',
                          padding: '6px 16px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 700,
                          display: 'inline-block',
                          textTransform: 'capitalize'
                        }}>
                          {req.status === 'menunggu' ? 'Menunggu Persetujuan' : req.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Style overrides */}
      <style>{`
        .lihat-semua-link:hover {
          color: #2563eb !important;
          text-decoration: underline !important;
        }
        @media (max-width: 1024px) {
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .admin-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
