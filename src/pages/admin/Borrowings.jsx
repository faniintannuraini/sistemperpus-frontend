import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../../services/api';

export default function Borrowings() {
  const [activeTab, setActiveTab] = useState('menunggu');
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBorrowings();
  }, []);

  const fetchBorrowings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/peminjaman');
      if (response.data && response.data.status === 'success') {
        setBorrowings(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching borrowings:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Gagal memuat data persetujuan peminjaman.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleHandover = async (trx) => {
    try {
      const response = await api.patch(`/peminjaman/${trx.id_transaksi}/setujui`);
      if (response.data && response.data.status === 'success') {
        Swal.fire({
          title: 'Peminjaman Disetujui',
          text: `Buku "${trx.book_title}" berhasil diserahkan kepada ${trx.student_name}. Status peminjaman aktif.`,
          icon: 'success',
          confirmButtonColor: '#2563eb'
        });
        fetchBorrowings();
      }
    } catch (error) {
      console.error('Error handover book:', error);
      Swal.fire({
        title: 'Gagal!',
        text: error.response?.data?.message || 'Gagal memproses penyerahan buku.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  const handleReturn = async (trx) => {
    try {
      const response = await api.patch(`/peminjaman/${trx.id_transaksi}/kembalikan`);
      if (response.data && response.data.status === 'success') {
        Swal.fire({
          title: 'Pengembalian Berhasil',
          text: `Pengembalian buku "${trx.book_title}" oleh ${trx.student_name} berhasil diterima.`,
          icon: 'success',
          confirmButtonColor: '#10b981'
        });
        fetchBorrowings();
      }
    } catch (error) {
      console.error('Error returning book:', error);
      Swal.fire({
        title: 'Gagal!',
        text: error.response?.data?.message || 'Gagal memproses pengembalian buku.',
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

  // Filter borrowings based on active tab
  const pendingRequests = borrowings.filter(item => item.status === 'menunggu');
  const activeLoans = borrowings.filter(item => item.status === 'disetujui' || item.status === 'dipinjam');

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
          Kelola Persetujuan Peminjaman
        </h1>
        <p style={{
          margin: '4px 0 0 0',
          fontSize: '14px',
          color: '#64748b'
        }}>
          Kelola proses penyerahan dan penerimaan buku fisik mahasiswa secara real-time.
        </p>
      </div>

      {/* Tabs Container */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e2e8f0',
        gap: '24px'
      }}>
        {/* Tab 1: Menunggu Diambil */}
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
          <span>Menunggu Diambil</span>
          <span style={{
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 700
          }}>
            {pendingRequests.length}
          </span>
        </button>

        {/* Tab 2: Sedang Dipinjam */}
        <button
          onClick={() => setActiveTab('dipinjam')}
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 4px',
            fontSize: '15px',
            fontWeight: 600,
            color: activeTab === 'dipinjam' ? '#2563eb' : '#64748b',
            borderBottom: activeTab === 'dipinjam' ? '3px solid #2563eb' : '3px solid transparent',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Sedang Dipinjam
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
            <p style={{ margin: 0, fontSize: '15px', fontWeight: 500 }}>Memuat data transaksi peminjaman...</p>
          </div>
        ) : activeTab === 'menunggu' ? (
          /* TAB 1: Menunggu Diambil Table */
          pendingRequests.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafafb' }}>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>ID TRANSAKSI</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>MAHASISWA</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>DETAIL BUKU</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>WAKTU REQUEST</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>STATUS</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600, textAlign: 'center', width: '180px' }}>AKSI KONFIRMASI</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((req, idx) => (
                    <tr
                      key={req.id_transaksi}
                      className="table-row-hover"
                      style={{
                        borderBottom: idx !== pendingRequests.length - 1 ? '1px solid #f1f5f9' : 'none',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 700, color: '#475569' }}>PNJ-{req.id_transaksi}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>{req.student_name}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>NIM: {req.student_nim}</div>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#334155' }}>{req.book_title}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>{formatDate(req.tanggal_pinjam)}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{
                          backgroundColor: 'rgba(245, 158, 11, 0.08)',
                          color: '#f59e0b',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          fontSize: '11px',
                          fontWeight: 600,
                          whiteSpace: 'nowrap'
                        }}>
                          Menunggu Persetujuan
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleHandover(req)}
                          className="action-btn-handover"
                          style={{
                            backgroundColor: '#2563eb',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            boxShadow: '0 2px 4px rgba(37, 99, 235, 0.1)'
                          }}
                        >
                          Serahkan Buku
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: 500 }}>Tidak ada pengajuan peminjaman menunggu diambil.</p>
            </div>
          )
        ) : (
          /* TAB 2: Sedang Dipinjam Table */
          activeLoans.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafafb' }}>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>ID TRANSAKSI</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>MAHASISWA</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>BUKU</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>TANGGAL PINJAM</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>JATUH TEMPO</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>STATUS</th>
                    <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600, textAlign: 'center', width: '200px' }}>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {activeLoans.map((loan, idx) => (
                    <tr
                      key={loan.id_transaksi}
                      className="table-row-hover"
                      style={{
                        borderBottom: idx !== activeLoans.length - 1 ? '1px solid #f1f5f9' : 'none',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 700, color: '#475569' }}>PNJ-{loan.id_transaksi}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>{loan.student_name}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>NIM: {loan.student_nim}</div>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#334155' }}>{loan.book_title}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>{formatDate(loan.tanggal_pinjam)}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#ef4444', fontWeight: 600 }}>{formatDate(loan.tanggal_kembali)}</td>
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
                          Dipinjam
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleReturn(loan)}
                          className="action-btn-return"
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
                          Terima Pengembalian
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              <p style={{ margin: 0, fontSize: '15px', fontWeight: 500 }}>Tidak ada buku yang sedang dipinjam saat ini.</p>
            </div>
          )
        )}
      </div>

      {/* Injected utility styles */}
      <style>{`
        .table-row-hover:hover {
          background-color: #f8fafc;
        }
        .action-btn-handover:hover {
          background-color: #1d4ed8 !important;
        }
        .action-btn-return:hover {
          background-color: #059669 !important;
        }
      `}</style>
    </div>
  );
}
