import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../../services/api';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('peminjaman');
  const [currentPage, setCurrentPage] = useState(1);

  // States for report data
  const [borrowReports, setBorrowReports] = useState([]);
  const [fineReports, setFineReports] = useState([]);
  const [stockReports, setStockReports] = useState([]);
  const [allPeminjamans, setAllPeminjamans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, [activeTab]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'peminjaman') {
        const response = await api.get('/laporan/peminjaman');
        if (response.data && response.data.status === 'success') {
          setBorrowReports(response.data.data);
        }
      } else if (activeTab === 'denda') {
        const response = await api.get('/laporan/denda');
        if (response.data && response.data.status === 'success') {
          setFineReports(response.data.data);
        }
      } else if (activeTab === 'stok') {
        const responseBooks = await api.get('/laporan/buku');
        const responseLoans = await api.get('/peminjaman');
        if (responseBooks.data && responseLoans.data) {
          setStockReports(responseBooks.data.data);
          setAllPeminjamans(responseLoans.data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBorrowedCount = (bookId) => {
    return allPeminjamans.filter(p => p.id_buku === bookId && (p.status === 'dipinjam' || p.status === 'disetujui')).length;
  };

  // Export Handlers
  const handleExportPDF = () => {
    Swal.fire({
      title: 'Mengekspor PDF...',
      text: 'Mohon tunggu sebentar, sistem sedang menyiapkan laporan PDF.',
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        try {
          const jenis = activeTab === 'stok' ? 'buku' : activeTab;
          await api.get(`/laporan/export/pdf?jenis=${jenis}`);
          setTimeout(() => {
            Swal.fire({
              title: 'Ekspor Berhasil!',
              text: `Laporan ${activeTab} telah berhasil diekspor ke format PDF.`,
              icon: 'success',
              confirmButtonColor: '#ef4444'
            });
          }, 1000);
        } catch (error) {
          Swal.fire({
            title: 'Gagal!',
            text: 'Gagal mengekspor laporan ke PDF.',
            icon: 'error',
            confirmButtonColor: '#ef4444'
          });
        }
      }
    });
  };

  const handleExportExcel = () => {
    Swal.fire({
      title: 'Mengekspor Excel...',
      text: 'Mohon tunggu sebentar, sistem sedang menyiapkan berkas Excel.',
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        try {
          const jenis = activeTab === 'stok' ? 'buku' : activeTab;
          await api.get(`/laporan/export/excel?jenis=${jenis}`);
          setTimeout(() => {
            Swal.fire({
              title: 'Ekspor Berhasil!',
              text: `Laporan ${activeTab} telah berhasil diekspor ke format Excel (.xlsx).`,
              icon: 'success',
              confirmButtonColor: '#10b981'
            });
          }, 1000);
        } catch (error) {
          Swal.fire({
            title: 'Gagal!',
            text: 'Gagal mengekspor laporan ke Excel.',
            icon: 'error',
            confirmButtonColor: '#ef4444'
          });
        }
      }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Client side pagination
  const itemsPerPage = 5;
  const getPaginatedData = (data) => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            Memuat data laporan...
          </td>
        </tr>
      );
    }

    if (activeTab === 'peminjaman') {
      const paginated = getPaginatedData(borrowReports);
      if (paginated.length === 0) {
        return (
          <tr>
            <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              Tidak ada data laporan peminjaman.
            </td>
          </tr>
        );
      }
      return paginated.map((report, idx) => (
        <tr
          key={report.id_transaksi}
          className="table-row-hover"
          style={{
            borderBottom: idx !== paginated.length - 1 ? '1px solid #f1f5f9' : 'none',
            transition: 'background-color 0.2s'
          }}
        >
          <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 700, color: '#475569' }}>PNJ-{report.id_transaksi}</td>
          <td style={{ padding: '14px 20px' }}>
            <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>{report.nama || 'Mahasiswa'}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>NIM: {report.nim || '-'}</div>
          </td>
          <td style={{ padding: '14px 20px', fontSize: '13px', color: '#334155' }}>{report.judul_buku}</td>
          <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>{formatDate(report.tanggal_pinjam)}</td>
          <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>{formatDate(report.tanggal_kembali)}</td>
          <td style={{ padding: '14px 20px' }}>
            <span style={{
              backgroundColor: report.status === 'menunggu' ? 'rgba(245, 158, 11, 0.08)' : report.status === 'dikembalikan' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(37, 99, 235, 0.08)',
              color: report.status === 'menunggu' ? '#f59e0b' : report.status === 'dikembalikan' ? '#10b981' : '#2563eb',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              textTransform: 'capitalize'
            }}>
              {report.status}
            </span>
          </td>
        </tr>
      ));
    }

    if (activeTab === 'denda') {
      const paginated = getPaginatedData(fineReports);
      if (paginated.length === 0) {
        return (
          <tr>
            <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              Tidak ada data laporan denda.
            </td>
          </tr>
        );
      }
      return paginated.map((report, idx) => (
        <tr
          key={report.id_denda}
          className="table-row-hover"
          style={{
            borderBottom: idx !== paginated.length - 1 ? '1px solid #f1f5f9' : 'none',
            transition: 'background-color 0.2s'
          }}
        >
          <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: 700, color: '#475569' }}>DEN-{report.id_denda}</td>
          <td style={{ padding: '14px 20px' }}>
            <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>{report.nama || 'Mahasiswa'}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>NIM: {report.nim || '-'}</div>
          </td>
          <td style={{ padding: '14px 20px', fontSize: '13px', color: '#0f172a', fontWeight: 700 }}>
            Rp {report.jumlah_denda.toLocaleString('id-ID')}
          </td>
          <td style={{ padding: '14px 20px' }}>
            <span style={{
              backgroundColor: report.status_bayar === 'belum_bayar' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
              color: report.status_bayar === 'belum_bayar' ? '#ef4444' : '#10b981',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}>
              {report.status_bayar === 'belum_bayar' ? 'Belum Bayar' : 'Lunas'}
            </span>
          </td>
          <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>
            {report.status_bayar === 'sudah_bayar' ? formatDate(report.updated_at) : '-'}
          </td>
        </tr>
      ));
    }

    if (activeTab === 'stok') {
      const paginated = getPaginatedData(stockReports);
      if (paginated.length === 0) {
        return (
          <tr>
            <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              Tidak ada data laporan stok buku.
            </td>
          </tr>
        );
      }
      return paginated.map((report, idx) => {
        const borrowed = getBorrowedCount(report.id_buku);
        const available = report.stok;
        const total = available + borrowed;
        return (
          <tr
            key={report.id_buku}
            className="table-row-hover"
            style={{
              borderBottom: idx !== paginated.length - 1 ? '1px solid #f1f5f9' : 'none',
              transition: 'background-color 0.2s'
            }}
          >
            <td style={{ padding: '14px 20px', fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>{report.judul}</td>
            <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>
              <span style={{
                backgroundColor: '#f1f5f9',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                color: '#475569',
                fontWeight: 500
              }}>{report.nama_kategori || 'Teknik Informatika'}</span>
            </td>
            <td style={{ padding: '14px 20px', fontSize: '14px', color: '#0f172a', fontWeight: 600, textAlign: 'center' }}>{total}</td>
            <td style={{ padding: '14px 20px', fontSize: '14px', color: '#f59e0b', fontWeight: 600, textAlign: 'center' }}>{borrowed}</td>
            <td style={{ padding: '14px 20px', fontSize: '14px', color: '#10b981', fontWeight: 600, textAlign: 'center' }}>{available}</td>
          </tr>
        );
      });
    }
  };

  const getPageCount = () => {
    const dataLength = activeTab === 'peminjaman' ? borrowReports.length : activeTab === 'denda' ? fineReports.length : stockReports.length;
    return Math.ceil(dataLength / itemsPerPage) || 1;
  };

  const pageCount = getPageCount();

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
            Pantau aktivitas peminjaman, rekapitulasi denda, dan inventaris stok buku.
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
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              {activeTab === 'peminjaman' && (
                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafafb' }}>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>ID TRANSAKSI</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>MAHASISWA</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>JUDUL BUKU</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>TANGGAL PINJAM</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>TANGGAL KEMBALI</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>STATUS</th>
                </tr>
              )}
              {activeTab === 'denda' && (
                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafafb' }}>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>ID DENDA</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>MAHASISWA</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>TOTAL DENDA</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>STATUS PEMBAYARAN</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>TANGGAL BAYAR</th>
                </tr>
              )}
              {activeTab === 'stok' && (
                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafafb' }}>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>JUDUL BUKU</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>KATEGORI</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>TOTAL STOK</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>DIPINJAM</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>TERSEDIA</th>
                </tr>
              )}
            </thead>
            <tbody>
              {renderTableBody()}
            </tbody>
          </table>
        </div>
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
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((num) => (
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
          disabled={currentPage === pageCount}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '8px 14px',
            fontSize: '13px',
            fontWeight: 600,
            color: currentPage === pageCount ? '#cbd5e1' : '#334155',
            cursor: currentPage === pageCount ? 'not-allowed' : 'pointer',
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
