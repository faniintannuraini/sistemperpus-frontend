import React, { useState } from 'react';
import '../../styles/student-borrowings.css';

// Import book cover images
import pythonCover from '../../assets/images/python_book_cover.png';
import mlCover from '../../assets/images/ml_book_cover.png';
import cCover from '../../assets/images/c_book_cover.png';

export default function Borrowings() {
  const [renewNotice, setRenewNotice] = useState('');
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

    setRenewNotice(`Masa pinjam buku "${title}" berhasil diperpanjang!`);
    setTimeout(() => {
      setRenewNotice('');
    }, 3000);
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

      {/* Alert message on renewal success */}
      {renewNotice && (
        <div className="renew-success-alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {renewNotice}
        </div>
      )}

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
