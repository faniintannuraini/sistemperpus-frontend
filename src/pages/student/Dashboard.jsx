import React from 'react';
import '../../styles/student-dashboard.css';

export default function StudentDashboard() {
  // Dummy Data
  const recentBooks = [
    { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Teknologi' },
    { id: 2, title: 'Clean Code: A Handbook of Agile Software Craftsmanship', author: 'Robert C. Martin', category: 'Teknologi' },
    { id: 3, title: 'Design Patterns: Elements of Reusable Object-Oriented Software', author: 'Erich Gamma', category: 'Teknologi' },
    { id: 4, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', category: 'Teknologi' },
  ];

  const returnSchedules = [
    { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', dueDate: '08 Jun 2026', daysLeft: 3, status: 'warning' },
    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', dueDate: '12 Jun 2026', daysLeft: 7, status: 'normal' },
    { id: 3, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', dueDate: '06 Jun 2026', daysLeft: 1, status: 'urgent' },
  ];

  const readingTarget = {
    completed: 3,
    target: 5,
    month: 'Juni 2026'
  };

  const progressPercentage = (readingTarget.completed / readingTarget.target) * 100;

  return (
    <div className="dashboard-wrapper">
      {/* Hero Banner */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <h1>Selamat Datang Kembali, Nama Mahasiswa!</h1>
          <p>Temukan dan pinjam berbagai macam buku akademik serta referensi terbaik untuk mendukung studi Anda.</p>
        </div>
      </section>

      {/* Grid Layout */}
      <div className="dashboard-grid">
        {/* Left Column: Recent Books */}
        <section className="dashboard-section">
          <div className="section-title">
            <span>Daftar Buku Terbaru</span>
          </div>
          <div className="book-grid">
            {recentBooks.map((book) => (
              <div key={book.id} className="book-card">
                <div className="book-cover-placeholder">
                  📚 {book.category}
                </div>
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Target Membaca & Jadwal Pengembalian */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Target Membaca */}
          <section className="dashboard-section">
            <div className="section-title">
              <span>Target Membaca Bulan Ini</span>
            </div>
            <div className="reading-target-card">
              <div className="target-stats">
                <span className="target-progress-text">{readingTarget.completed}</span>
                <span className="target-total-text">/ {readingTarget.target} Buku ({readingTarget.month})</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <p className="target-message">
                Bagus! Anda telah menyelesaikan <strong>{readingTarget.completed}</strong> dari target <strong>{readingTarget.target}</strong> buku bulan ini. Selesaikan {readingTarget.target - readingTarget.completed} buku lagi untuk mencapai target Anda!
              </p>
            </div>
          </section>

          {/* Jadwal Pengembalian */}
          <section className="dashboard-section">
            <div className="section-title">
              <span>Jadwal Pengembalian</span>
            </div>
            <div className="schedule-list">
              {returnSchedules.map((schedule) => (
                <div key={schedule.id} className={`schedule-item ${schedule.status}`}>
                  <div className="schedule-book-info">
                    <h4 className="schedule-book-title">{schedule.title}</h4>
                    <p className="schedule-book-author">{schedule.author}</p>
                  </div>
                  <div className="schedule-due">
                    <span className="due-date">{schedule.dueDate}</span>
                    <span className={`due-badge ${schedule.status}`}>
                      {schedule.daysLeft === 1 ? 'Besok' : `${schedule.daysLeft} hari lagi`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
