import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../../services/api';
import '../../styles/student-history.css';

// Import cover images
import pythonCover from '../../assets/images/python_book_cover.png';
import mlCover from '../../assets/images/ml_book_cover.png';
import cCover from '../../assets/images/c_book_cover.png';
import accountingCover from '../../assets/images/accounting_book_cover.png';
import ekonomiMikroCover from '../../assets/images/ekonomi_mikro_cover.png';
import manajemenOperasionalCover from '../../assets/images/manajemen_operasional_cover.png';
import algoritmaPemrogramanCover from '../../assets/images/algoritma_pemrograman_cover.png';
import pengantarAkuntansiCover from '../../assets/images/pengantar_akuntansi_cover.png';

export default function History() {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await api.get('/peminjaman');
      if (response.data && response.data.status === 'success') {
        const hist = response.data.data.filter(
          item => item.status === 'dikembalikan' || item.status === 'ditolak'
        );
        setHistoryList(hist);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getReturnStatus = (item) => {
    if (item.status === 'ditolak') return 'Ditolak';
    if (!item.tanggal_dikembalikan) return 'Tepat Waktu';
    const returned = new Date(item.tanggal_dikembalikan);
    const due = new Date(item.tanggal_kembali);
    return returned > due ? 'Terlambat' : 'Tepat Waktu';
  };

  const getCoverImage = (title, id, gambar) => {
    if (gambar) {
      if (gambar.startsWith('http')) return gambar;
      return `${import.meta.env.VITE_API_URL}/${gambar}`;
    }
    const t = (title || '').toLowerCase();
    if (t.includes('machine') || t.includes('learning') || t.includes('ml')) return mlCover;
    if (t.includes('expert c') || t.includes(' c ') || t.includes('programming c') || t.startsWith('c ')) return cCover;
    if (t.includes('ekonomi') || t.includes('mikro')) return ekonomiMikroCover;
    if (t.includes('akuntansi') && t.includes('keuangan')) return accountingCover;
    if (t.includes('akuntansi')) return pengantarAkuntansiCover;
    if (t.includes('manajemen') || t.includes('operasional')) return manajemenOperasionalCover;
    if (t.includes('algoritma') || t.includes('pemrograman')) return algoritmaPemrogramanCover;
    
    const idx = id ? parseInt(id, 10) : 0;
    const rem = idx % 8;
    if (rem === 1) return mlCover;
    if (rem === 2) return cCover;
    if (rem === 3) return ekonomiMikroCover;
    if (rem === 4) return accountingCover;
    if (rem === 5) return manajemenOperasionalCover;
    if (rem === 6) return algoritmaPemrogramanCover;
    if (rem === 7) return pengantarAkuntansiCover;
    return pythonCover;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const stats = {
    total: historyList.length,
    onTime: historyList.filter(item => getReturnStatus(item) === 'Tepat Waktu').length,
    late: historyList.filter(item => getReturnStatus(item) === 'Terlambat').length
  };

  const handleReborrow = (bookId, title) => {
    Swal.fire({
      title: 'Pinjam Buku Ini Lagi?',
      text: `Apakah Anda yakin ingin mengajukan peminjaman kembali untuk buku "${title}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Ajukan!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0];

        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        const formattedNextWeek = nextWeek.toISOString().split('T')[0];

        const payload = {
          id_buku: bookId,
          tanggal_pinjam: formattedToday,
          tanggal_kembali: formattedNextWeek
        };

        try {
          const response = await api.post('/peminjaman', payload);
          if (response.data && response.data.status === 'success') {
            Swal.fire({
              title: 'Berhasil Diajukan!',
              text: `Permintaan peminjaman buku "${title}" berhasil diajukan.`,
              icon: 'success',
              confirmButtonColor: '#10b981'
            });
            fetchHistory();
          }
        } catch (error) {
          console.error('Error re-borrowing book:', error);
          const errorMsg = error.response?.data?.message || 'Gagal mengajukan peminjaman buku.';
          Swal.fire({
            title: 'Gagal!',
            text: errorMsg,
            icon: 'error',
            confirmButtonColor: '#ef4444'
          });
        }
      }
    });
  };

  return (
    <div className="history-page-wrapper">
      {/* Page Header */}
      <div className="history-header">
        <h1 className="history-title-main">Riwayat Pinjaman</h1>
        <p className="history-subtitle-main">
          Catatan buku yang pernah kamu pinjam dan kembalikan.
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="history-stats-row">
        {/* Card 1: Total */}
        <div className="history-stat-card">
          <div className="stat-icon-box blue-box">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stat-icon">
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM16 17H8V15H16V17ZM16 13H8V11H16V13ZM16 9H8V7H16V9Z" fill="#2563eb"/>
            </svg>
          </div>
          <div className="stat-text-box">
            <span className="stat-label">Total Buku Dipinjam</span>
            <span className="stat-number">{stats.total} Buku</span>
          </div>
        </div>

        {/* Card 2: Tepat Waktu */}
        <div className="history-stat-card">
          <div className="stat-icon-box green-box">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stat-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#10b981"/>
            </svg>
          </div>
          <div className="stat-text-box">
            <span className="stat-label">Tepat Waktu</span>
            <span className="stat-number">{stats.onTime} Buku</span>
          </div>
        </div>

        {/* Card 3: Terlambat */}
        <div className="history-stat-card">
          <div className="stat-icon-box red-box">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stat-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#ef4444"/>
            </svg>
          </div>
          <div className="stat-text-box">
            <span className="stat-label">Terlambat</span>
            <span className="stat-number">{stats.late} Buku</span>
          </div>
        </div>
      </div>

      {/* History Cards Stack */}
      <div className="history-stack">
        {loading ? (
          <h3 style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>Memuat data riwayat...</h3>
        ) : historyList.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#64748b', padding: '40px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3>Tidak ada riwayat peminjaman</h3>
            <p>Anda belum pernah meminjam dan mengembalikan buku.</p>
          </div>
        ) : (
          historyList.map((item) => {
            const retStatus = getReturnStatus(item);
            const isLate = retStatus === 'Terlambat';
            const isDitolak = retStatus === 'Ditolak';

            return (
              <div key={item.id_transaksi} className="history-card-item">
                {/* Left Side: Cover & Info */}
                <div className="card-left-section">
                  <div className="book-cover-wrapper">
                    <img 
                      src={getCoverImage(item.book?.judul, item.id_buku, item.book?.gambar)} 
                      alt={item.book?.judul || 'Cover'} 
                      className="book-cover-img" 
                    />
                  </div>
                  
                  <div className="book-info-wrapper">
                    <h3 className="book-title">
                      {item.book?.judul || 'Buku'}
                    </h3>
                    <p className="book-author">{item.book?.pengarang || '-'}</p>
                    <p className="book-year">{item.book?.tahun_terbit || '-'}</p>

                    <div className="borrow-details-list">
                      <p className="detail-item">Pinjam: {formatDate(item.tanggal_pinjam)}</p>
                      <p className="detail-item">Kembali: {formatDate(item.tanggal_kembali)}</p>
                      {item.tanggal_dikembalikan && (
                        <p className="detail-item" style={{ color: '#10b981', fontWeight: 600 }}>Dikembalikan: {formatDate(item.tanggal_dikembalikan)}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side: Status Badge & Pinjam Lagi Button */}
                <div className="card-right-section">
                  <span className={`status-badge-custom ${isDitolak ? 'badge-red-history' : isLate ? 'badge-red-history' : 'badge-green-history'}`}>
                    {retStatus}
                  </span>

                  <button
                    className="pinjam-lagi-btn-custom"
                    onClick={() => handleReborrow(item.id_buku, item.book?.judul)}
                  >
                    Pinjam Lagi
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
