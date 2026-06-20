import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../styles/student-history.css';

// Import cover images
import pythonCover from '../../assets/images/python_book_cover.png';
import mlCover from '../../assets/images/ml_book_cover.png';

export default function History() {

  // Dummy Stats matching Figma
  const stats = {
    total: 2,
    onTime: 1,
    late: 1
  };

  // Dummy History data matching Figma
  const historyData = [
    {
      id: 1,
      title: 'Programming',
      author: 'Abdur Rahman',
      year: '2022',
      borrowDate: '02 Mar 2026',
      returnDate: '09 Mar 2026',
      status: 'Tepat Waktu',
      cover: pythonCover
    },
    {
      id: 2,
      title: 'Programming', // "Machine Learning for Beginners" shown as "Programming" in Figma mockup
      subtitle: 'Machine Learning for Beginners',
      author: 'Abdur Rahman',
      year: '2022',
      borrowDate: '02 Mar 2026',
      returnDate: '09 Mar 2026',
      status: 'Terlambat',
      cover: mlCover
    }
  ];

  const handleReborrow = (title) => {
    Swal.fire({
      title: 'Pinjam Buku Ini Lagi?',
      text: `Apakah Anda yakin ingin mengajukan peminjaman kembali untuk buku "${title}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Ajukan!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Berhasil Diajukan!',
          text: `Permintaan peminjaman buku "${title}" berhasil diajukan.`,
          icon: 'success',
          confirmButtonColor: '#10b981'
        });
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
        {historyData.map((item) => {
          const isLate = item.status === 'Terlambat';
          
          return (
            <div key={item.id} className="history-card-item">
              {/* Left Side: Cover & Info */}
              <div className="card-left-section">
                {item.cover ? (
                  <div className="book-cover-wrapper">
                    <img src={item.cover} alt={item.title} className="book-cover-img" />
                  </div>
                ) : (
                  <div className="book-cover-wrapper-empty"></div>
                )}
                
                <div className="book-info-wrapper">
                  <h3 className="book-title">
                    {item.title}
                    {item.subtitle && <span className="book-subtitle-text"> ({item.subtitle})</span>}
                  </h3>
                  <p className="book-author">{item.author}</p>
                  <p className="book-year">{item.year}</p>

                  <div className="borrow-details-list">
                    <p className="detail-item">Pinjam: {item.borrowDate}</p>
                    <p className="detail-item">Kembali: {item.returnDate}</p>
                  </div>
                </div>
              </div>

              {/* Right Side: Status Badge & Pinjam Lagi Button */}
              <div className="card-right-section">
                <span className={`status-badge-custom ${isLate ? 'badge-red-history' : 'badge-green-history'}`}>
                  {item.status}
                </span>

                <button
                  className="pinjam-lagi-btn-custom"
                  onClick={() => handleReborrow(item.title)}
                >
                  Pinjam Lagi
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
