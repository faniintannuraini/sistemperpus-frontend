import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/student-dashboard.css';

// Import generated book covers
import pythonCover from '../../assets/images/python_book_cover.png';
import mlCover from '../../assets/images/ml_book_cover.png';
import cCover from '../../assets/images/c_book_cover.png';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    user_info: { nama: '', prodi: 'Teknik Informatika' },
    jadwal_pengembalian: [],
    target_bulan_ini: { selesai: 0, target: 6, persentase: 0 },
    buku_baru: [],
    sering_dipinjam: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard/mahasiswa');
      if (response.data && response.data.status === 'success') {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching student dashboard:', error);
    }
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

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getUrgencyClass = (dueDateString) => {
    if (!dueDateString) return 'normal';
    const due = new Date(dueDateString);
    const now = new Date();
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 ? 'urgent' : 'normal';
  };

  return (
    <div className="student-dashboard-wrapper">
      {/* Left Main Content */}
      <div className="dashboard-main-column">
        {/* Welcome Hero Banner */}
        <div className="welcome-hero-banner">
          <div className="hero-banner-info">
            <h1 className="hero-banner-title">
              Halo {dashboardData.user_info.nama || 'Mahasiswa'}, cari buku apa hari ini?
            </h1>
            <p className="hero-banner-desc">
              Temukan referensi terbaik untuk menunjang tugas kuliah dan riset kamu di Perpustakaan UNPER.
            </p>
            <button className="hero-banner-btn" onClick={() => navigate('/student/explore')}>
              Lihat Rekomendasi Buku
            </button>
          </div>
        </div>

        {/* Section: Buku Baru */}
        <section className="books-section">
          <div className="books-section-header">
            <h2 className="books-section-title">Buku Baru di Perpustakaan</h2>
            <a href="/student/explore" className="books-section-link">LIHAT SEMUA</a>
          </div>
          <div className="books-grid">
            {dashboardData.buku_baru.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '14px', padding: '12px' }}>Belum ada buku baru.</p>
            ) : (
              dashboardData.buku_baru.map((book) => (
                <div key={book.id_buku} className="book-card-item" onClick={() => navigate(`/student/book/${book.id_buku}`)} style={{ cursor: 'pointer' }}>
                  <div className="book-card-cover-wrapper">
                    <img src={getCoverImage(book.judul, book.id_buku)} alt={book.judul} className="book-card-cover-img" />
                  </div>
                  <div className="book-card-details">
                    <h3 className="book-card-title">{book.judul}</h3>
                    <p className="book-card-author">{book.pengarang}</p>
                    <span className="book-card-stock">Stock : {book.stok}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Section: Sering Dipinjam */}
        <section className="books-section">
          <div className="books-section-header">
            <h2 className="books-section-title">Sering Dipinjam Mahasiswa</h2>
            <a href="/student/explore" className="books-section-link">LIHAT SEMUA</a>
          </div>
          <div className="books-grid">
            {dashboardData.sering_dipinjam.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '14px', padding: '12px' }}>Belum ada rekomendasi buku terpopuler.</p>
            ) : (
              dashboardData.sering_dipinjam.map((book) => (
                <div key={`fav-${book.id_buku}`} className="book-card-item" onClick={() => navigate(`/student/book/${book.id_buku}`)} style={{ cursor: 'pointer' }}>
                  <div className="book-card-cover-wrapper">
                    <img src={getCoverImage(book.judul, book.id_buku)} alt={book.judul} className="book-card-cover-img" />
                  </div>
                  <div className="book-card-details">
                    <h3 className="book-card-title">{book.judul}</h3>
                    <p className="book-card-author">{book.pengarang}</p>
                    <span className="book-card-stock">Stock : {book.stok}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Right Sidebar Column */}
      <div className="dashboard-sidebar-column">
        {/* Date Card */}
        <div className="sidebar-date-card">
          <span className="date-card-icon">📅</span>
          <span className="date-card-text">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        {/* Return Schedules */}
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">⏰ Jadwal Pengembalian</h3>
          <div className="schedule-cards-list">
            {dashboardData.jadwal_pengembalian.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '13px', padding: '8px 0' }}>Tidak ada jadwal pengembalian terdekat.</p>
            ) : (
              dashboardData.jadwal_pengembalian.map((item) => {
                const urgency = getUrgencyClass(item.tanggal_kembali);
                return (
                  <div key={item.id_transaksi} className={`schedule-card ${urgency}`}>
                    <div className="schedule-card-left">
                      <div className={`schedule-icon-box ${urgency}`}>
                        {urgency === 'urgent' ? '⚠️' : '✔️'}
                      </div>
                      <div className="schedule-info-box">
                        <h4 className="schedule-book-name">{item.book?.judul || 'Buku'}</h4>
                        <span className="schedule-borrow-date">Dipinjam: {formatDate(item.tanggal_pinjam)}</span>
                      </div>
                    </div>
                    <div className={`schedule-due-box ${urgency}`}>
                      <span>📅 {formatDate(item.tanggal_kembali)}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Target Membaca */}
        <div className="sidebar-section target-section">
          <h3 className="sidebar-section-title">🏆 Target Bulan Ini</h3>
          <div className="target-progress-header">
            <span className="target-progress-qty">
              {dashboardData.target_bulan_ini.selesai} dari {dashboardData.target_bulan_ini.target} Buku
            </span>
            <span className="target-progress-percent">{dashboardData.target_bulan_ini.persentase}%</span>
          </div>
          <div className="target-progress-bar-wrapper">
            <div 
              className="target-progress-bar-fill" 
              style={{ width: `${dashboardData.target_bulan_ini.persentase}%` }}
            ></div>
          </div>
          <p className="target-progress-footer">
            {dashboardData.target_bulan_ini.selesai >= dashboardData.target_bulan_ini.target 
              ? 'Selamat! Target membaca Anda tercapai!' 
              : `Ayo selesaikan ${dashboardData.target_bulan_ini.target - dashboardData.target_bulan_ini.selesai} buku lagi!`}
          </p>
        </div>
      </div>
    </div>
  );
}
