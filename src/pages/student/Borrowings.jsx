import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/student-borrowings.css';

export default function Borrowings() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [renewNotice, setRenewNotice] = useState('');
  
  // Dummy Initial Data
  const [borrowings, setBorrowings] = useState([
    {
      id: 1,
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      borrowDate: '25 Mei 2026',
      dueDate: '08 Juni 2026',
      status: 'Dipinjam',
      emoji: '💻',
      isRenewed: false,
    },
    {
      id: 2,
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      borrowDate: '15 Mei 2026',
      dueDate: '06 Juni 2026',
      status: 'Jatuh Tempo Besok',
      emoji: '💡',
      isRenewed: false,
    },
    {
      id: 3,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      borrowDate: '10 Mei 2026',
      dueDate: '24 Mei 2026',
      status: 'Terlambat',
      emoji: '🛠️',
      isRenewed: false,
    },
    {
      id: 4,
      title: 'Design Patterns',
      author: 'Erich Gamma',
      borrowDate: '28 Mei 2026',
      dueDate: '11 Juni 2026',
      status: 'Dipinjam',
      emoji: '🧩',
      isRenewed: false,
    },
  ]);

  // Compute stats based on current state
  const activeLoansCount = borrowings.length;
  const dueSoonCount = borrowings.filter(b => b.status === 'Jatuh Tempo Besok').length;
  const overdueCount = borrowings.filter(b => b.status === 'Terlambat').length;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDetail = (id) => {
    navigate(`/student/book/${id}`);
  };

  const handleRenew = (id, title) => {
    setBorrowings(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            dueDate: '18 Juni 2026', // Updated mock date
            status: 'Dipinjam', // Status reset to safe state
            isRenewed: true
          };
        }
        return item;
      })
    );

    setRenewNotice(`Masa pinjam buku "${title}" berhasil diperpanjang hingga 18 Juni 2026!`);
    setTimeout(() => {
      setRenewNotice('');
    }, 4000);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Dipinjam':
        return 'dipinjam';
      case 'Jatuh Tempo Besok':
        return 'jatuh-tempo-besok';
      case 'Terlambat':
        return 'terlambat';
      default:
        return '';
    }
  };

  // Filter list
  const filteredBorrowings = borrowings.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="borrowings-page-wrapper">
      {/* Page Header */}
      <div className="borrowings-header">
        <h1>Pinjamanku</h1>
        <p>Kelola daftar buku yang sedang Anda pinjam dan ajukan perpanjangan waktu.</p>
      </div>

      {/* 3 Stat Cards Row */}
      <div className="borrowings-stats-row">
        <div className="stat-card blue-accent">
          <span className="stat-card-title">Pinjaman Aktif</span>
          <span className="stat-card-number">{activeLoansCount} Buku</span>
        </div>
        <div className="stat-card yellow-accent">
          <span className="stat-card-title">Akan Jatuh Tempo</span>
          <span className="stat-card-number">{dueSoonCount} Buku</span>
        </div>
        <div className="stat-card red-accent">
          <span className="stat-card-title">Terlambat</span>
          <span className="stat-card-number">{overdueCount} Buku</span>
        </div>
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

      {/* Search & Filter Row */}
      <div className="borrowings-controls-row">
        <div className="borrowings-search-field">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Cari buku yang sedang dipinjam..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <button className="borrowings-filter-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            style={{ width: '14px', height: '14px' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
          Filter
        </button>
      </div>

      {/* Main Container Card Wrapping List */}
      <div className="borrowings-main-container-card">
        <div className="borrowings-container-header">
          <h2 className="borrowings-container-title">Daftar Buku Dipinjam</h2>
        </div>
        
        <div className="borrowings-list-container">
          {filteredBorrowings.length > 0 ? (
            filteredBorrowings.map((item) => (
              <div key={item.id} className="borrowing-card">
                
                {/* 1. Cover */}
                <div className="small-cover">
                  {item.emoji}
                </div>
                
                {/* 2. Informasi Buku (Judul, Penulis + Tanggal) */}
                <div className="borrowing-title-details">
                  <h3 className="borrowing-title">{item.title}</h3>
                  <p className="borrowing-author">Ditulis oleh {item.author}</p>
                  <div className="borrowing-dates-row">
                    <span className="borrowing-date-item">Tanggal Pinjam: <strong>{item.borrowDate}</strong></span>
                    <span className="borrowing-date-item">Jatuh Tempo: <strong>{item.dueDate}</strong></span>
                  </div>
                </div>

                {/* 3. Status */}
                <div className="borrowing-status-col">
                  <span className={`status-badge ${getStatusClass(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                {/* 4. Action */}
                <div className="borrowing-actions">
                  <button
                    className="action-btn-outline"
                    onClick={() => handleRenew(item.id, item.title)}
                    disabled={item.status === 'Terlambat' || item.isRenewed}
                  >
                    {item.isRenewed ? 'Diperpanjang' : 'Perpanjang'}
                  </button>
                  <button
                    className="action-btn-primary"
                    onClick={() => handleDetail(item.id)}
                  >
                    Detail
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="no-results" style={{ textAlign: 'center', padding: '48px', backgroundColor: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: '16px' }}>
              <h3>Tidak ada buku pinjaman yang cocok</h3>
              <p>Cobalah mengganti kata kunci pencarian Anda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
