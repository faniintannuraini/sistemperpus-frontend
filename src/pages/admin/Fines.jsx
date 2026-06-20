import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../../services/api';

export default function Fines() {
  const [activeTab, setActiveTab] = useState('menunggu');
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFines();
  }, []);

  const fetchFines = async () => {
    try {
      setLoading(true);
      const response = await api.get('/denda');
      if (response.data && response.data.status === 'success') {
        setFines(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching fines:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Gagal memuat data denda.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (fine) => {
    try {
      const response = await api.patch(`/denda/${fine.id_denda}/bayar`);
      if (response.data && response.data.status === 'success') {
        Swal.fire({
          title: 'Pembayaran Berhasil',
          text: `Pembayaran denda DEN-${fine.id_denda} sebesar Rp ${fine.jumlah_denda.toLocaleString('id-ID')} untuk ${fine.nama} berhasil dikonfirmasi.`,
          icon: 'success',
          confirmButtonColor: '#10b981'
        });
        fetchFines();
      }
    } catch (error) {
      console.error('Error paying fine:', error);
      Swal.fire({
        title: 'Gagal!',
        text: error.response?.data?.message || 'Gagal memproses pembayaran denda.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Filter denda based on active tab
  const pendingFines = fines.filter(item => item.status_bayar === 'belum_bayar');
  const finesHistory = fines.filter(item => item.status_bayar === 'sudah_bayar');

  return (
    <div style={{
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      color: '#1e293b'
    }}>
      {/* Page Header */}
      <div>
        <h1 style={{
          margin: 0,
          fontSize: '28px',
          fontWeight: 700,
          color: '#0f172a',
          letterSpacing: '-0.5px'
        }}>
          Kelola Denda
        </h1>
        <p style={{
          margin: '4px 0 0 0',
          fontSize: '14px',
          color: '#64748b'
        }}>
          Kelola denda keterlambatan pengembalian buku secara real-time.
        </p>
      </div>

      {/* Tabs Container */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e2e8f0',
        gap: '24px'
      }}>
        {/* Tab 1: Menunggu Pembayaran */}
        <button
          onClick={() => setActiveTab('menunggu')}
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 4px',
            fontSize: '15px',
            fontWeight: 600,
            color: activeTab === 'menunggu' ? '#2563eb' : '#64748b',
            borderBottom: activeTab === 'menunggu' ? '3px solid #2563eb' : '3px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
        >
          <span>Menunggu Pembayaran</span>
          <span style={{
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 700
          }}>
            {pendingFines.length}
          </span>
        </button>

        {/* Tab 2: Riwayat Denda */}
        <button
          onClick={() => setActiveTab('riwayat')}
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 4px',
            fontSize: '15px',
            fontWeight: 600,
            color: activeTab === 'riwayat' ? '#2563eb' : '#64748b',
            borderBottom: activeTab === 'riwayat' ? '3px solid #2563eb' : '3px solid transparent',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Riwayat Denda
        </button>
      </div>

      {/* Table Content Wrapper */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        overflow: 'hidden'
      }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: 500 }}>Memuat data denda...</p>
          </div>
        ) : activeTab === 'menunggu' ? (
          /* TAB 1: Menunggu Pembayaran Table */
          pendingFines.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafafb' }}>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>ID DENDA</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>MAHASISWA</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>JUMLAH HARI</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>TOTAL DENDA</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>STATUS</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600, textAlign: 'center', width: '150px' }}>AKSI KONFIRMASI</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingFines.map((fine, idx) => (
                    <tr
                      key={fine.id_denda}
                      className="table-row-hover"
                      style={{
                        borderBottom: idx !== pendingFines.length - 1 ? '1px solid #f1f5f9' : 'none',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 700, color: '#475569' }}>DEN-{fine.id_denda}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>{fine.nama}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>NIM: {fine.nim}</div>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#334155' }}>
                        {fine.jumlah_denda ? `${fine.jumlah_denda / 1000} Hari` : '-'}
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#0f172a', fontWeight: 700 }}>
                        Rp {fine.jumlah_denda.toLocaleString('id-ID')}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{
                          backgroundColor: 'rgba(239, 68, 68, 0.08)',
                          color: '#ef4444',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          fontSize: '11px',
                          fontWeight: 600,
                          whiteSpace: 'nowrap'
                        }}>
                          Belum Bayar
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                        <button
                          onClick={() => handlePayment(fine)}
                          className="action-btn-pay"
                          style={{
                            backgroundColor: '#10b981',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            boxShadow: '0 2px 4px rgba(16, 185, 129, 0.1)'
                          }}
                        >
                          Bayar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: 500 }}>Tidak ada tagihan denda pending saat ini.</p>
            </div>
          )
        ) : (
          /* TAB 2: Riwayat Denda Table */
          finesHistory.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafafb' }}>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>ID DENDA</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>MAHASISWA</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>JUMLAH HARI</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>TOTAL DENDA</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>TANGGAL PEMBAYARAN</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {finesHistory.map((history, idx) => (
                    <tr
                      key={history.id_denda}
                      className="table-row-hover"
                      style={{
                        borderBottom: idx !== finesHistory.length - 1 ? '1px solid #f1f5f9' : 'none',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 700, color: '#475569' }}>DEN-{history.id_denda}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>{history.nama}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>NIM: {history.nim}</div>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#334155' }}>
                        {history.jumlah_denda ? `${history.jumlah_denda / 1000} Hari` : '-'}
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#0f172a', fontWeight: 700 }}>
                        Rp {history.jumlah_denda.toLocaleString('id-ID')}
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>{formatDate(history.updated_at)}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{
                          backgroundColor: 'rgba(16, 185, 129, 0.08)',
                          color: '#10b981',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          fontSize: '11px',
                          fontWeight: 600,
                          whiteSpace: 'nowrap'
                        }}>
                          Lunas
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: 500 }}>Belum ada riwayat pembayaran denda.</p>
            </div>
          )
        )}
      </div>

      {/* Injected utility styles */}
      <style>{`
        .table-row-hover:hover {
          background-color: #f8fafc;
        }
        .action-btn-pay:hover {
          background-color: #059669 !important;
        }
      `}</style>
    </div>
  );
}
