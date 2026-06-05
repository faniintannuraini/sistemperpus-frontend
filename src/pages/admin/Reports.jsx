import React, { useState } from 'react';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('peminjaman');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock Export Handlers
  const handleExportPDF = () => {
    alert('Mengekspor laporan ke format PDF...');
  };

  const handleExportExcel = () => {
    alert('Mengekspor laporan ke format Excel (.xlsx)...');
  };

  // Dummy Data for Tab 1: Laporan Peminjaman
  const borrowReports = [
    { id: 'TRX-2026-001', student: 'Budi Santoso', nim: '120220001', book: 'Pengantar Algoritma dan Struktur Data', borrowDate: '05 Juni 2026', returnDate: '-', status: 'Belum Kembali' },
    { id: 'TRX-2026-002', student: 'Siti Aminah', nim: '120220002', book: 'Pemrograman Web Modern dengan React', borrowDate: '04 Juni 2026', returnDate: '-', status: 'Belum Kembali' },
    { id: 'TRX-2026-003', student: 'Rian Hidayat', nim: '120220003', book: 'Dasar-Dasar Desain Grafis', borrowDate: '29 Mei 2026', returnDate: '05 Juni 2026', status: 'Sudah Kembali' },
    { id: 'TRX-2026-004', student: 'Dewi Lestari', nim: '120220004', book: 'Laskar Pelangi', borrowDate: '30 Mei 2026', returnDate: '05 Juni 2026', status: 'Sudah Kembali' },
    { id: 'TRX-2026-005', student: 'Fajar Nugraha', nim: '120220005', book: 'Kecerdasan Buatan dan Masa Depan', borrowDate: '01 Juni 2026', returnDate: '-', status: 'Belum Kembali' }
  ];

  // Dummy Data for Tab 2: Laporan Denda
  const fineReports = [
    { id: 'PRX-8815', student: 'Maurine Fladya', nim: '2303010055', total: 'Rp. 50.000', status: 'Belum Bayar', payDate: '-' },
    { id: 'PRX-8811', student: 'Budi Santoso', nim: '120220001', total: 'Rp. 30.000', status: 'Lunas', payDate: '01 Juni 2026' },
    { id: 'PRX-8812', student: 'Siti Aminah', nim: '120220002', total: 'Rp. 20.000', status: 'Lunas', payDate: '02 Juni 2026' },
    { id: 'PRX-8813', student: 'Rian Hidayat', nim: '120220003', total: 'Rp. 70.000', status: 'Lunas', payDate: '03 Juni 2026' }
  ];

  // Dummy Data for Tab 3: Laporan Stok Buku
  const stockReports = [
    { title: 'Pengantar Algoritma dan Struktur Data', category: 'Teknologi', total: 12, borrowed: 1, available: 11 },
    { title: 'Pemrograman Web Modern dengan React', category: 'Teknologi', total: 8, borrowed: 1, available: 7 },
    { title: 'Dasar-Dasar Desain Grafis', category: 'Desain', total: 5, borrowed: 1, available: 4 },
    { title: 'Analisis Data dengan Python', category: 'Teknologi', total: 0, borrowed: 0, available: 0 },
    { title: 'Kecerdasan Buatan dan Masa Depan', category: 'Sains', total: 3, borrowed: 1, available: 2 }
  ];

  return (
    <div style={{
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      color: '#1e293b'
    }}>
      {/* Page Header Area */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* Title */}
        <div>
          <h1 style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: 700,
            color: '#0f172a',
            letterSpacing: '-0.5px'
          }}>
            Laporan Perpustakaan
          </h1>
          <p style={{
            margin: '4px 0 0 0',
            fontSize: '14px',
            color: '#64748b'
          }}>
            Pantau aktivitas peminjaman dan rekapitulasi denda
          </p>
        </div>

        {/* Export Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Export PDF */}
          <button
            onClick={handleExportPDF}
            className="export-pdf-btn"
            style={{
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s',
              boxShadow: '0 2px 4px rgba(239, 68, 68, 0.1)'
            }}
          >
            <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export PDF</span>
          </button>

          {/* Export Excel */}
          <button
            onClick={handleExportExcel}
            className="export-excel-btn"
            style={{
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s',
              boxShadow: '0 2px 4px rgba(16, 185, 129, 0.1)'
            }}
          >
            <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Tabs Menu */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e2e8f0',
        gap: '24px',
        overflowX: 'auto'
      }}>
        {/* Tab 1 */}
        <button
          onClick={() => { setActiveTab('peminjaman'); setCurrentPage(1); }}
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 4px',
            fontSize: '15px',
            fontWeight: 600,
            color: activeTab === 'peminjaman' ? '#2563eb' : '#64748b',
            borderBottom: activeTab === 'peminjaman' ? '3px solid #2563eb' : '3px solid transparent',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s'
          }}
        >
          Laporan Peminjaman
        </button>

        {/* Tab 2 */}
        <button
          onClick={() => { setActiveTab('denda'); setCurrentPage(1); }}
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 4px',
            fontSize: '15px',
            fontWeight: 600,
            color: activeTab === 'denda' ? '#2563eb' : '#64748b',
            borderBottom: activeTab === 'denda' ? '3px solid #2563eb' : '3px solid transparent',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s'
          }}
        >
          Laporan Denda
        </button>

        {/* Tab 3 */}
        <button
          onClick={() => { setActiveTab('stok'); setCurrentPage(1); }}
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 4px',
            fontSize: '15px',
            fontWeight: 600,
            color: activeTab === 'stok' ? '#2563eb' : '#64748b',
            borderBottom: activeTab === 'stok' ? '3px solid #2563eb' : '3px solid transparent',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s'
          }}
        >
          Laporan Stok Buku
        </button>
      </div>

      {/* Main Table Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        overflow: 'hidden'
      }}>
        {activeTab === 'peminjaman' && (
          /* TAB 1: Laporan Peminjaman Table */
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafafb' }}>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>ID TRANSAKSI</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>MAHASISWA</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>JUDUL BUKU</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>TANGGAL PINJAM</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>TANGGAL KEMBALI</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {borrowReports.map((report, idx) => (
                  <tr
                    key={report.id}
                    className="table-row-hover"
                    style={{
                      borderBottom: idx !== borrowReports.length - 1 ? '1px solid #f1f5f9' : 'none',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 700, color: '#475569' }}>{report.id}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>{report.student}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>NIM: {report.nim}</div>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#334155' }}>{report.book}</td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>{report.borrowDate}</td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>{report.returnDate}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{
                        backgroundColor: report.status === 'Belum Kembali' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                        color: report.status === 'Belum Kembali' ? '#ef4444' : '#10b981',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        {report.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'denda' && (
          /* TAB 2: Laporan Denda Table */
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafafb' }}>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>ID DENDA</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>MAHASISWA</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>TOTAL DENDA</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>STATUS PEMBAYARAN</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>TANGGAL BAYAR</th>
                </tr>
              </thead>
              <tbody>
                {fineReports.map((report, idx) => (
                  <tr
                    key={report.id}
                    className="table-row-hover"
                    style={{
                      borderBottom: idx !== fineReports.length - 1 ? '1px solid #f1f5f9' : 'none',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 700, color: '#475569' }}>{report.id}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>{report.student}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>NIM: {report.nim}</div>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#0f172a', fontWeight: 700 }}>{report.total}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{
                        backgroundColor: report.status === 'Belum Bayar' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                        color: report.status === 'Belum Bayar' ? '#ef4444' : '#10b981',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        {report.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>{report.payDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'stok' && (
          /* TAB 3: Laporan Stok Buku Table */
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafafb' }}>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>JUDUL BUKU</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>KATEGORI</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>TOTAL STOK</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>DIPINJAM</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>TERSEDIA</th>
                </tr>
              </thead>
              <tbody>
                {stockReports.map((report, idx) => (
                  <tr
                    key={idx}
                    className="table-row-hover"
                    style={{
                      borderBottom: idx !== stockReports.length - 1 ? '1px solid #f1f5f9' : 'none',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <td style={{ padding: '14px 20px', fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>{report.title}</td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>
                      <span style={{
                        backgroundColor: '#f1f5f9',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: '#475569',
                        fontWeight: 500
                      }}>{report.category}</span>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '14px', color: '#0f172a', fontWeight: 600, textAlign: 'center' }}>{report.total}</td>
                    <td style={{ padding: '14px 20px', fontSize: '14px', color: '#f59e0b', fontWeight: 600, textAlign: 'center' }}>{report.borrowed}</td>
                    <td style={{ padding: '14px 20px', fontSize: '14px', color: '#10b981', fontWeight: 600, textAlign: 'center' }}>{report.available}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        marginTop: '12px'
      }}>
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '8px 14px',
            fontSize: '13px',
            fontWeight: 600,
            color: currentPage === 1 ? '#cbd5e1' : '#334155',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
          }}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            style={{
              backgroundColor: currentPage === num ? '#2563eb' : '#ffffff',
              border: currentPage === num ? '1px solid #2563eb' : '1px solid #e2e8f0',
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              fontSize: '13px',
              fontWeight: 600,
              color: currentPage === num ? '#ffffff' : '#334155',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
            }}
          >
            {num}
          </button>
        ))}

        {/* Next Button */}
        <button
          disabled={currentPage === 3}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, 3))}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '8px 14px',
            fontSize: '13px',
            fontWeight: 600,
            color: currentPage === 3 ? '#cbd5e1' : '#334155',
            cursor: currentPage === 3 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
          }}
        >
          Next
        </button>
      </div>

      {/* Style Injection */}
      <style>{`
        .export-pdf-btn:hover {
          background-color: #dc2626 !important;
        }
        .export-excel-btn:hover {
          background-color: #059669 !important;
        }
        .table-row-hover:hover {
          background-color: #f8fafc;
        }
      `}</style>
    </div>
  );
}
