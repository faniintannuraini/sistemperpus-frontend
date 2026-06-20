import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function Borrowings() {
  const [activeTab, setActiveTab] = useState('menunggu');

  // Dummy Data for Tab 1: Menunggu Diambil
  const [pendingRequests, setPendingRequests] = useState([
    { id: 'TRX-2026-001', student: 'Budi Santoso', nim: '120220001', book: 'Pengantar Algoritma dan Struktur Data', date: '05 Juni 2026 (10:15)', status: 'Menunggu Diambil' },
    { id: 'TRX-2026-002', student: 'Siti Aminah', nim: '120220002', book: 'Pemrograman Web Modern dengan React', date: '04 Juni 2026 (14:30)', status: 'Menunggu Diambil' },
    { id: 'TRX-2026-003', student: 'Lani Rahmawati', nim: '120220007', book: 'Analisis Data dengan Python', date: '04 Juni 2026 (16:45)', status: 'Menunggu Diambil' }
  ]);

  // Dummy Data for Tab 2: Sedang Dipinjam
  const [activeLoans, setActiveLoans] = useState([
    { id: 'TRX-2026-004', student: 'Rian Hidayat', nim: '120220003', book: 'Dasar-Dasar Desain Grafis', borrowDate: '29 Mei 2026', dueDate: '05 Juni 2026', status: 'Dipinjam' },
    { id: 'TRX-2026-005', student: 'Dewi Lestari', nim: '120220004', book: 'Laskar Pelangi', borrowDate: '30 Mei 2026', dueDate: '06 Juni 2026', status: 'Dipinjam' },
    { id: 'TRX-2026-006', student: 'Fajar Nugraha', nim: '120220005', book: 'Kecerdasan Buatan dan Masa Depan', borrowDate: '01 Juni 2026', dueDate: '08 Juni 2026', status: 'Dipinjam' },
    { id: 'TRX-2026-007', student: 'Indra Wijaya', nim: '120220006', book: 'Manajemen Bisnis dan Startup', borrowDate: '02 Juni 2026', dueDate: '09 Juni 2026', status: 'Dipinjam' }
  ]);

  // Handlers
  const handleHandover = (trx) => {
    Swal.fire({
      title: 'Peminjaman Aktif',
      text: `Buku "${trx.book}" diserahkan kepada ${trx.student}. Status peminjaman aktif.`,
      icon: 'success',
      confirmButtonColor: '#2563eb'
    });
    // Move to active loans (simulated)
    const newLoan = {
      id: trx.id,
      student: trx.student,
      nim: trx.nim,
      book: trx.book,
      borrowDate: '05 Juni 2026',
      dueDate: '12 Juni 2026',
      status: 'Dipinjam'
    };
    setPendingRequests(pendingRequests.filter(item => item.id !== trx.id));
    setActiveLoans([newLoan, ...activeLoans]);
  };

  const handleReturn = (trx) => {
    Swal.fire({
      title: 'Pengembalian Berhasil',
      text: `Pengembalian buku "${trx.book}" oleh ${trx.student} berhasil diterima.`,
      icon: 'success',
      confirmButtonColor: '#10b981'
    });
    // Remove from active loans (simulated)
    setActiveLoans(activeLoans.filter(item => item.id !== trx.id));
  };

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
          Kelola proses penyerahan dan penerimaan buku fisik mahasiswa.
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
        {activeTab === 'menunggu' ? (
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
                      key={req.id}
                      className="table-row-hover"
                      style={{
                        borderBottom: idx !== pendingRequests.length - 1 ? '1px solid #f1f5f9' : 'none',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 700, color: '#475569' }}>{req.id}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>{req.student}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>NIM: {req.nim}</div>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#334155' }}>{req.book}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>{req.date}</td>
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
                          {req.status}
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
                      key={loan.id}
                      className="table-row-hover"
                      style={{
                        borderBottom: idx !== activeLoans.length - 1 ? '1px solid #f1f5f9' : 'none',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 700, color: '#475569' }}>{loan.id}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>{loan.student}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>NIM: {loan.nim}</div>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#334155' }}>{loan.book}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>{loan.borrowDate}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#ef4444', fontWeight: 600 }}>{loan.dueDate}</td>
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
                          {loan.status}
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
