import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../services/api';
import '../../styles/student-book-detail.css';

// Import cover images
import pythonCover from '../../assets/images/python_book_cover.png';
import mlCover from '../../assets/images/ml_book_cover.png';
import cCover from '../../assets/images/c_book_cover.png';

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [categories, setCategories] = useState([]);
  const [borrowed, setBorrowed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookDetails();
    fetchCategories();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/buku/${id}`);
      if (response.data && response.data.status === 'success') {
        setBook(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Gagal memuat detail buku.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/kategori');
      if (response.data && response.data.status === 'success') {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getCategoryName = (idKategori) => {
    const cat = categories.find(c => String(c.id_kategori) === String(idKategori));
    return cat ? cat.nama_kategori : 'Teknik Informatika';
  };

  const getBookEmoji = (title) => {
    const t = (title || '').toLowerCase();
    if (t.includes('code') || t.includes('program') || t.includes('algorithm') || t.includes('c ')) return '💻';
    if (t.includes('sains') || t.includes('history') || t.includes('science') || t.includes('bumi')) return '🌌';
    if (t.includes('ekonomi') || t.includes('bisnis') || t.includes('akuntansi') || t.includes('uang')) return '📈';
    return '📖';
  };

  const getCoverImage = (title, id) => {
    const t = (title || '').toLowerCase();
    if (t.includes('machine') || t.includes('learning') || t.includes('ml')) return mlCover;
    if (t.includes('expert c') || t.includes(' c ') || t.includes('programming c') || t.startsWith('c ')) return cCover;
    
    const idx = id ? parseInt(id, 10) : 0;
    if (idx % 3 === 1) return mlCover;
    if (idx % 3 === 2) return cCover;
    return pythonCover;
  };

  const handleBorrowRequest = async () => {
    if (!book || book.stok <= 0 || borrowed) return;

    setSubmitting(true);

    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];

    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    const formattedNextWeek = nextWeek.toISOString().split('T')[0];

    const payload = {
      id_buku: book.id_buku,
      tanggal_pinjam: formattedToday,
      tanggal_kembali: formattedNextWeek
    };

    try {
      const response = await api.post('/peminjaman', payload);
      if (response.data && response.data.status === 'success') {
        setBorrowed(true);
        Swal.fire({
          title: 'Pengajuan Berhasil!',
          text: `Permintaan peminjaman buku "${book.judul}" telah berhasil diajukan, menunggu persetujuan admin.`,
          icon: 'success',
          confirmButtonColor: '#2563eb'
        });
        // Refresh details to sync stock count
        fetchBookDetails();
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
      const errorMsg = error.response?.data?.message || 'Gagal mengajukan peminjaman buku.';
      Swal.fire({
        title: 'Gagal!',
        text: errorMsg,
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: '#64748b' }}>
        <h3>Memuat detail buku...</h3>
      </div>
    );
  }

  if (!book) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: '#64748b', flexDirection: 'column' }}>
        <h3>Buku tidak ditemukan</h3>
        <button onClick={() => navigate('/student/explore')} style={{ marginTop: '16px', padding: '10px 20px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const isAvailable = book.stok > 0;

  return (
    <div className="detail-page-wrapper">
      {/* Navigation & Back Action */}
      <div className="detail-navigation">
        <button className="back-link" onClick={() => navigate('/student/explore')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Katalog
        </button>
      </div>

      {/* Book Detail Card Container */}
      <div className="book-detail-card">
        {/* Left Column - Cover & Borrow Action Button */}
        <div className="detail-left-column">
          <div className="large-cover">
            <img
              src={getCoverImage(book.judul, book.id_buku)}
              alt={book.judul}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '15px',
                display: 'block'
              }}
            />
          </div>

          <div className="borrow-action-wrapper">
            <button
              className="borrow-action-btn"
              onClick={handleBorrowRequest}
              disabled={!isAvailable || borrowed || submitting}
            >
              {submitting ? (
                'Mengajukan...'
              ) : borrowed ? (
                'Sudah Diajukan'
              ) : !isAvailable ? (
                'Stok Habis'
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Pinjam Buku
                </>
              )}
            </button>

            {borrowed && (
              <div className="success-borrow-msg">
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Permintaan peminjaman berhasil diajukan!
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Info Specs */}
        <div className="detail-right-column">
          <div className="detail-header-info">
            <div className="detail-badges-row">
              <span className="detail-category-tag">{getCategoryName(book.id_kategori)}</span>
              <span className={`detail-status-badge ${isAvailable ? 'available' : 'unavailable'}`}>
                {isAvailable ? `Tersedia (${book.stok})` : 'Stok Habis'}
              </span>
            </div>
            <h1 className="detail-title-h1">{book.judul}</h1>
            <p className="detail-author-p">
              Ditulis oleh <span className="author-link-style">{book.pengarang}</span>
            </p>
          </div>

          {/* Description Section */}
          <div className="description-sec">
            <h3 className="description-title">Sinopsis</h3>
            <p className="description-content">
              Buku teks komprehensif berjudul "{book.judul}" ditulis oleh {book.pengarang} yang diterbitkan oleh {book.penerbit}. Buku ini sangat direkomendasikan untuk menunjang perkuliahan, riset akademik, maupun referensi profesional.
            </p>
          </div>

          {/* Modern Details Card */}
          <div className="modern-details-card">
            <h3 className="description-title" style={{ marginTop: 0, marginBottom: '16px' }}>Informasi Detail</h3>
            <div className="metadata-grid">
              <div className="metadata-item">
                <span className="metadata-label">Penerbit</span>
                <span className="metadata-value">{book.penerbit || '-'}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Tahun Terbit</span>
                <span className="metadata-value">{book.tahun_terbit}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Lokasi Rak</span>
                <span className="metadata-value">{book.rak || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
