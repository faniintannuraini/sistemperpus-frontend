import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/student-history.css';

export default function History() {
  const navigate = useNavigate();
  const [successNotice, setSuccessNotice] = useState('');

  // Dummy Initial Data
  const stats = {
    totalLoans: 12,
    onTimeReturns: 10,
    lateReturns: 2,
  };

  const historyData = [
    {
      id: 1,
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      borrowDate: '10 Jan 2026',
      returnDate: '24 Jan 2026',
      status: 'Dikembalikan',
      emoji: '💻',
    },
    {
      id: 2,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      borrowDate: '01 Feb 2026',
      returnDate: '15 Feb 2026',
      status: 'Dikembalikan',
      emoji: '🛠️',
    },
    {
      id: 3,
      title: 'Principles of Economics',
      author: 'N. Gregory Mankiw',
      borrowDate: '10 Mar 2026',
      returnDate: '30 Mar 2026',
      status: 'Terlambat', // Overdue return history
      emoji: '📈',
    },
    {
      id: 4,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      borrowDate: '05 Apr 2026',
      returnDate: '19 Apr 2026',
      status: 'Dikembalikan',
      emoji: '📖',
    },
  ];

  const handleReborrow = (title) => {
    setSuccessNotice(`Buku "${title}" berhasil diajukan untuk peminjaman baru!`);
    setTimeout(() => {
      setSuccessNotice('');
    }, 4000);
  };

  return (
    <div className="history-page-wrapper">
      {/* Page Header */}
      <div className="history-header">
        <h1>Riwayat Peminjaman</h1>
        <p>Lihat daftar seluruh buku yang pernah Anda pinjam dan kembalikan sebelumnya.</p>
      </div>

      {/* Stats Summary Cards Row (Height 90px, Soft Colors) */}
      <div className="history-stats-row">
        <div className="history-stat-card">
          <div className="history-stat-content">
            <span className="history-stat-label">Total Pinjam</span>
            <span className="history-stat-number">{stats.totalLoans} Buku</span>
          </div>
          <div className="history-stat-icon-wrapper blue">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>

        <div className="history-stat-card">
          <div className="history-stat-content">
            <span className="history-stat-label">Tepat Waktu</span>
            <span className="history-stat-number">{stats.onTimeReturns} Buku</span>
          </div>
          <div className="history-stat-icon-wrapper green">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="history-stat-card">
          <div className="history-stat-content">
            <span className="history-stat-label">Terlambat Kembali</span>
            <span className="history-stat-number">{stats.lateReturns} Buku</span>
          </div>
          <div className="history-stat-icon-wrapper purple">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successNotice && (
        <div className="renew-success-alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {successNotice}
        </div>
      )}

      {/* Main Container Card Wrapping List */}
      <div className="history-list-card">
        <div className="history-list-header">
          <h2 className="history-list-title">Riwayat Transaksi Buku</h2>
        </div>

        <div className="history-items-container">
          {historyData.map((item) => (
            <div key={item.id} className="history-item-card">
              
              {/* 1. Cover (70px x 95px) */}
              <div className="history-cover">
                {item.emoji}
              </div>

              {/* 2. Informasi Buku (Judul, Penulis + Tanggal) */}
              <div className="history-info-col">
                <h3 className="history-book-title">{item.title}</h3>
                <p className="history-book-author">{item.author}</p>
                <div className="history-book-dates">
                  <span className="history-date-item">Pinjam: <strong>{item.borrowDate}</strong></span>
                  <span className="history-date-item">Kembali: <strong>{item.returnDate}</strong></span>
                </div>
              </div>

              {/* 3. Status Badge (Returned / Lost / Late) */}
              <div className="history-status-col">
                <span className={`history-status-badge ${item.status === 'Terlambat' ? 'lost' : 'returned'}`}>
                  {item.status}
                </span>
              </div>

              {/* 4. Action Button (Pinjam Lagi) */}
              <div className="history-actions">
                <button
                  className="pinjam-lagi-btn"
                  onClick={() => handleReborrow(item.title)}
                >
                  Pinjam Lagi
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
