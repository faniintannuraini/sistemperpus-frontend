import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/student-dashboard.css';

// Import generated book covers
import pythonCover from '../../assets/images/python_book_cover.png';
import mlCover from '../../assets/images/ml_book_cover.png';
import cCover from '../../assets/images/c_book_cover.png';
import accountingCover from '../../assets/images/accounting_book_cover.png';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const newBooks = [
    {
      id: 1,
      title: 'Python Programming',
      subtitle: 'for Beginners',
      author: 'Abdur Rahman',
      stock: 2,
      cover: pythonCover
    },
    {
      id: 2,
      title: 'Machine Learning For Beginner',
      subtitle: 'Easy Guide Book',
      author: 'Jerry N. P.',
      stock: 2,
      cover: mlCover
    },
    {
      id: 3,
      title: 'Programming',
      subtitle: 'Expert C Programming',
      author: 'Peter Van Der Linden',
      stock: 2,
      cover: cCover
    },
    {
      id: 4,
      title: 'Akuntansi Keuangan Lanjutan',
      subtitle: '2022',
      author: 'Endah Prawesti Ningrum, S.E, M.Ak\n2022',
      stock: 2,
      cover: accountingCover
    }
  ];

  return (
    <div className="student-dashboard-wrapper">
      {/* Left Main Content */}
      <div className="dashboard-main-column">
        {/* Welcome Hero Banner */}
        <div className="welcome-hero-banner">
          <div className="hero-banner-info">
            <h1 className="hero-banner-title">Halo Fani, cari buku apa hari ini?</h1>
            <p className="hero-banner-desc">
              Temukan referensi terbaik untuk menunjang tugas kuliah dan riset kamu di Perpustakaan UNPER.
            </p>
            <button className="hero-banner-btn">Lihat Rekomendasi Buku</button>
          </div>
        </div>

        {/* Section: Buku Baru */}
        <section className="books-section">
          <div className="books-section-header">
            <h2 className="books-section-title">Buku Baru di Teknik Informatika</h2>
            <a href="/student/explore" className="books-section-link">LIHAT SEMUA</a>
          </div>
          <div className="books-grid">
            {newBooks.map((book) => (
              <div key={book.id} className="book-card-item" onClick={() => navigate(`/student/book/${book.id}`)} style={{ cursor: 'pointer' }}>
                <div className="book-card-cover-wrapper">
                  <img src={book.cover} alt={book.title} className="book-card-cover-img" />
                </div>
                <div className="book-card-details">
                  <h3 className="book-card-title">{book.title}</h3>
                  <p className="book-card-author">{book.author}</p>
                  <span className="book-card-stock">Stock : {book.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Sering Dipinjam */}
        <section className="books-section">
          <div className="books-section-header">
            <h2 className="books-section-title">Sering Dipinjam Mahasiswa</h2>
            <a href="/student/explore" className="books-section-link">LIHAT SEMUA</a>
          </div>
          <div className="books-grid">
            {newBooks.slice(0, 3).map((book) => (
              <div key={`fav-${book.id}`} className="book-card-item" onClick={() => navigate(`/student/book/${book.id}`)} style={{ cursor: 'pointer' }}>
                <div className="book-card-cover-wrapper">
                  <img src={book.cover} alt={book.title} className="book-card-cover-img" />
                </div>
                <div className="book-card-details">
                  <h3 className="book-card-title">{book.title}</h3>
                  <p className="book-card-author">{book.author}</p>
                  <span className="book-card-stock">Stock : {book.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Sidebar Column */}
      <div className="dashboard-sidebar-column">
        {/* Date Card */}
        <div className="sidebar-date-card">
          <span className="date-card-icon">📅</span>
          <span className="date-card-text">Kamis, 16 April 2026</span>
        </div>

        {/* Return Schedules */}
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">⏰ Jadwal Pengembalian</h3>
          <div className="schedule-cards-list">
            
            {/* Card 1: Urgent (Laravel) */}
            <div className="schedule-card urgent">
              <div className="schedule-card-left">
                <div className="schedule-icon-box urgent">⚠️</div>
                <div className="schedule-info-box">
                  <h4 className="schedule-book-name">Mastering Laravel 10</h4>
                  <span className="schedule-borrow-date">Dipinjam: 10 Apr 2026</span>
                </div>
              </div>
              <div className="schedule-due-box urgent">
                <span>📅 Besok, 17 Apr 2026</span>
              </div>
            </div>

            {/* Card 2: Normal (Network Forensics) */}
            <div className="schedule-card normal">
              <div className="schedule-card-left">
                <div className="schedule-icon-box normal">✔️</div>
                <div className="schedule-info-box">
                  <h4 className="schedule-book-name">Network Forensics 101</h4>
                  <span className="schedule-borrow-date">Dipinjam: 15 Apr 2026</span>
                </div>
              </div>
              <div className="schedule-due-box normal">
                <span>📅 22 Apr 2026</span>
              </div>
            </div>

          </div>
        </div>

        {/* Target Membaca */}
        <div className="sidebar-section target-section">
          <h3 className="sidebar-section-title">🏆 Target Bulan Ini</h3>
          <div className="target-progress-header">
            <span className="target-progress-qty">4 dari 6 Buku</span>
            <span className="target-progress-percent">65%</span>
          </div>
          <div className="target-progress-bar-wrapper">
            <div className="target-progress-bar-fill" style={{ width: '65%' }}></div>
          </div>
          <p className="target-progress-footer">Ayo selesaikan 2 buku lagi!</p>
        </div>
      </div>
    </div>
  );
}
