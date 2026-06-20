import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../../services/api';
import '../../styles/student-borrowings.css';

// Import book cover images
import pythonCover from '../../assets/images/python_book_cover.png';
import mlCover from '../../assets/images/ml_book_cover.png';
import cCover from '../../assets/images/c_book_cover.png';
import accountingCover from '../../assets/images/accounting_book_cover.png';
import ekonomiMikroCover from '../../assets/images/ekonomi_mikro_cover.png';
import manajemenOperasionalCover from '../../assets/images/manajemen_operasional_cover.png';
import algoritmaPemrogramanCover from '../../assets/images/algoritma_pemrograman_cover.png';
import pengantarAkuntansiCover from '../../assets/images/pengantar_akuntansi_cover.png';

export default function Borrowings() {
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
        // Filter out returned or rejected borrowings (keep active ones)
        const activeLoans = response.data.data.filter(
          item => item.status === 'menunggu' || item.status === 'disetujui' || item.status === 'dipinjam'
        );
        setBorrowings(activeLoans);
      }
    } catch (error) {
      console.error('Error fetching borrowings:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Gagal memuat data peminjaman aktif.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  const getCoverImage = (title, id) => {
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
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getBorrowingStatus = (item) => {
    if (item.status === 'menunggu') return 'Menunggu Persetujuan';
    if (item.status === 'disetujui') return 'Silakan Ambil';
    if (item.status === 'dipinjam') {
      const today = new Date();
      const due = new Date(item.tanggal_kembali);
      if (today > due) {
        const diffTime = today - due;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `Terlambat ${diffDays} hari`;
      }
      const diffTime = due - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 1) return 'Jatuh Tempo Besok';
      return 'Masa Pinjam Aman';
    }
    return item.status;
  };

  const getDendaAmount = (dueDateString) => {
    const today = new Date();
    const due = new Date(dueDateString);
    if (today > due) {
      const diffTime = today - due;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return (diffDays * 1000).toLocaleString('id-ID');
    }
    return '0';
  };

  const handleRenew = (title) => {
    Swal.fire({
      title: 'Perpanjangan Masa Pinjam',
      text: `Perpanjangan masa pinjam buku "${title}" harus diajukan langsung melalui petugas perpustakaan di kampus.`,
      icon: 'info',
      confirmButtonColor: '#3b82f6',
      confirmButtonText: 'Mengerti'
    });
  };

  return (
    <div className="borrowings-page-wrapper">
      {/* Page Header */}
      <div className="borrowings-header">
        <h1 className="borrowings-title-main">Buku Pinjamanku</h1>
        <p className="borrowings-subtitle-main">
          Pantau batas waktu pengembalian buku yang sedang kamu pinjam.
        </p>
      </div>

      {/* Borrowing Cards Stack */}
      <div className="borrowings-stack">
        {loading ? (
          <h3 style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>Memuat data peminjaman...</h3>
        ) : borrowings.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#64748b', padding: '40px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3>Tidak ada peminjaman aktif</h3>
            <p>Anda belum meminjam buku apa pun saat ini.</p>
          </div>
        ) : (
          borrowings.map((item) => {
            const displayStatus = getBorrowingStatus(item);
            const isOverdue = displayStatus.includes('Terlambat');
            const isDueSoon = displayStatus === 'Jatuh Tempo Besok';
            const isApproved = item.status === 'disetujui' || item.status === 'menunggu';

            return (
              <div
                key={item.id_transaksi}
                className={`borrowing-card-item ${isOverdue ? 'overdue-card' : ''}`}
              >
                {/* Left Side: Cover & Info */}
                <div className="card-left-section">
                  <div className="book-cover-wrapper">
                    <img 
                      src={getCoverImage(item.book?.judul, item.id_buku)} 
                      alt={item.book?.judul || 'Cover'} 
                      className="book-cover-img" 
                    />
                  </div>
                  <div className="book-info-wrapper">
                    <h3 className="book-title">{item.book?.judul || 'Buku'}</h3>
                    <p className="book-author">{item.book?.pengarang || '-'}</p>
                    <p className="book-year">{item.book?.tahun_terbit || '-'}</p>

                    <div className="borrow-details-list">
                      <p className="detail-item">Dipinjam : {formatDate(item.tanggal_pinjam)}</p>
                      <p className="detail-item">ID Pinjam: PNJ-{item.id_transaksi}</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Due Date & Actions */}
                <div className="card-right-section">
                  <span className={`due-date-text ${isOverdue ? 'red-due-date' : ''}`}>
                    {formatDate(item.tanggal_kembali)}
                  </span>

                  {/* Status Badge */}
                  <span className={`status-badge-custom ${isOverdue ? 'badge-red' : isDueSoon ? 'badge-yellow' : 'badge-green'}`}>
                    {displayStatus}
                  </span>

                  {/* Actions */}
                  {isOverdue ? (
                    <div className="denda-box">
                      <span className="warning-icon">⚠️</span>
                      <span className="denda-text">Denda Rp {getDendaAmount(item.tanggal_kembali)}</span>
                    </div>
                  ) : (
                    <button
                      className={`renew-btn ${isApproved ? 'disabled-btn' : 'active-btn'}`}
                      onClick={() => !isApproved && handleRenew(item.book?.judul)}
                      disabled={isApproved}
                    >
                      {item.status === 'menunggu' ? 'Menunggu Persetujuan' : item.status === 'disetujui' ? 'Silakan Ambil' : 'Perpanjang Masa Pinjam'}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
