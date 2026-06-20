import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../styles/student-borrowings.css';

// Import book cover images
import pythonCover from '../../assets/images/python_book_cover.png';
import mlCover from '../../assets/images/ml_book_cover.png';
import cCover from '../../assets/images/c_book_cover.png';

export default function Borrowings() {
  const [borrowings, setBorrowings] = useState([
    {
      id: 1,
      title: 'Python Programming',
      author: 'Martin Evans',
      year: '2022',
      borrowDate: '12 April 2026',
      dueDate: '17 April 2026',
      idPinjam: 'PNJ-8821',
      status: 'Jatuh Tempo Besok',
      cover: pythonCover,
      isRenewed: false
    },
    {
      id: 2,
      title: 'Machine Learning',
      author: 'Jerry N. P.',
      year: '2022',
      borrowDate: '13 April 2026',
      dueDate: '19 April 2026',
      idPinjam: 'PNJ-8822',
      status: 'Masa Pinjam Aman',
      cover: mlCover,
      isRenewed: false
    },
    {
      id: 3,
      title: 'Expert C Programming',
      author: 'Petter Van Der Lenden',
      year: '2022',
      borrowDate: '13 April 2026',
      dueDate: '15 April 2026',
      idPinjam: 'PNJ-8822',
      status: 'Terlambat 2 hari',
      cover: cCover,
      denda: '5.000'
    }
  ]);

  const handleRenew = (id, title) => {
    Swal.fire({
      title: 'Perpanjang Peminjaman?',
      text: `Apakah Anda yakin ingin memperpanjang masa pinjam buku "${title}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Perpanjang!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        setBorrowings(prev =>
          prev.map(item => {
            if (item.id === id) {
              return {
                ...item,
                dueDate: '26 April 2026',
                isRenewed: true
              };
            }
            return item;
          })
        );

        Swal.fire({
          title: 'Berhasil!',
          text: `Masa pinjam buku "${title}" berhasil diperpanjang.`,
          icon: 'success',
          confirmButtonColor: '#10b981'
        });
      }
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
        {borrowings.map((item) => {
          const isOverdue = item.status.includes('Terlambat');
          const isDueSoon = item.status === 'Jatuh Tempo Besok';
          const isAman = item.status === 'Masa Pinjam Aman';

          return (
            <div
              key={item.id}
              className={`borrowing-card-item ${isOverdue ? 'overdue-card' : ''}`}
            >
              {/* Left Side: Cover & Info */}
              <div className="card-left-section">
                <div className="book-cover-wrapper">
                  <img src={item.cover} alt={item.title} className="book-cover-img" />
                </div>
                <div className="book-info-wrapper">
                  <h3 className="book-title">{item.title}</h3>
                  <p className="book-author">{item.author}</p>
                  <p className="book-year">{item.year}</p>

                  <div className="borrow-details-list">
                    <p className="detail-item">Dipinjam : {item.borrowDate}</p>
                    <p className="detail-item">ID Pinjam: {item.idPinjam}</p>
                  </div>
                </div>
              </div>

              {/* Right Side: Due Date & Actions */}
              <div className="card-right-section">
                <span className={`due-date-text ${isOverdue ? 'red-due-date' : ''}`}>
                  {item.dueDate}
                </span>

                {/* Status Badge */}
                <span className={`status-badge-custom ${isOverdue ? 'badge-red' : isDueSoon ? 'badge-yellow' : 'badge-green'}`}>
                  {item.status}
                </span>

                {/* Actions */}
                {isOverdue ? (
                  <div className="denda-box">
                    <span className="warning-icon">⚠️</span>
                    <span className="denda-text">Denda Rp {item.denda}</span>
                  </div>
                ) : (
                  <button
                    className={`renew-btn ${item.isRenewed || isDueSoon ? 'disabled-btn' : 'active-btn'}`}
                    onClick={() => !item.isRenewed && !isDueSoon && handleRenew(item.id, item.title)}
                    disabled={item.isRenewed || isDueSoon}
                  >
                    {item.isRenewed ? 'Diperpanjang' : 'Perpanjang Masa Pinjam'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
