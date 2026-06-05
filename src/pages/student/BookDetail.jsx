import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/student-book-detail.css';

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [borrowed, setBorrowed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Dummy Books Database
  const booksDb = [
    {
      id: 1,
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '978-0262033848',
      year: '2009',
      category: 'Teknologi',
      stock: 5,
      emoji: '💻',
      description: 'Buku teks komprehensif mengenai algoritma komputer. Cocok sebagai panduan belajar mahasiswa ilmu komputer maupun praktisi profesional. Buku ini mencakup berbagai jenis algoritma secara mendalam, menjadikannya standar akademis di seluruh dunia.'
    },
    {
      id: 2,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      year: '2008',
      category: 'Teknologi',
      stock: 3,
      emoji: '🛠️',
      description: 'Sebuah panduan praktis untuk menulis kode program yang bersih, rapi, dan mudah dipelihara. Ditulis oleh pakar perangkat lunak ternama, buku ini memberikan wawasan tentang bagaimana mengidentifikasi kode buruk dan bagaimana merefaktornya secara efisien.'
    },
    {
      id: 3,
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      isbn: '978-0553380163',
      year: '1998',
      category: 'Sains',
      stock: 2,
      emoji: '🌌',
      description: 'Menjelaskan konsep kosmologi modern secara populer untuk pembaca umum. Dari teori Dentuman Besar hingga lubang hitam, fisikawan Stephen Hawking memandu pembaca memahami bagaimana alam semesta terbentuk dan bekerja tanpa menggunakan bahasa matematika yang rumit.'
    },
    {
      id: 4,
      title: 'Principles of Economics',
      author: 'N. Gregory Mankiw',
      isbn: '978-1305155922',
      year: '2014',
      category: 'Bisnis',
      stock: 0,
      emoji: '📈',
      description: 'Buku pengantar ekonomi terpopuler di dunia. Mankiw menyajikan materi ekonomi mikro dan makro secara kontekstual, menarik, dan relevan dengan kehidupan sehari-hari, sangat direkomendasikan bagi mahasiswa bisnis maupun masyarakat umum.'
    },
    {
      id: 5,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '978-0743273565',
      year: '1925',
      category: 'Sastra',
      stock: 4,
      emoji: '📖',
      description: 'Sebuah karya klasik sastra Amerika berlatar di era Jazz tahun 1920-an. Buku ini menceritakan obsesi Jay Gatsby terhadap Daisy Buchanan, yang mengeksplorasi tema-tema kekayaan, cinta, kemewahan, dekadensi, dan impian Amerika.'
    },
    {
      id: 6,
      title: 'Design Patterns',
      author: 'Erich Gamma',
      isbn: '978-0201633610',
      year: '1994',
      category: 'Teknologi',
      stock: 1,
      emoji: '🧩',
      description: 'Sebuah karya legendaris mengenai pola desain berorientasi objek dalam rekayasa perangkat lunak. Memberikan solusi siap pakai untuk 23 masalah desain umum yang sering dihadapi oleh pengembang perangkat lunak berpengalaman.'
    },
    {
      id: 7,
      title: 'Cosmos',
      author: 'Carl Sagan',
      isbn: '978-0345331359',
      year: '1980',
      category: 'Sains',
      stock: 6,
      emoji: '🪐',
      description: 'Perjalanan menarik menjelajahi alam semesta, sejarah sains, dan tempat umat humanity di dalamnya. Carl Sagan memadukan sains, filsafat, dan sejarah untuk melukiskan gambaran yang memukau tentang keindahan kosmik.'
    },
    {
      id: 8,
      title: 'Zero to One',
      author: 'Peter Thiel',
      isbn: '978-0804139298',
      year: '2014',
      category: 'Bisnis',
      stock: 3,
      emoji: '💡',
      description: 'Buku terlaris tentang bagaimana membangun masa depan dengan menciptakan teknologi baru. Peter Thiel, salah satu pendiri PayPal dan investor awal Facebook, membagikan pandangannya tentang inovasi dan monopoli bisnis.'
    }
  ];

  // Find the book by ID
  const targetId = parseInt(id) || 1;
  const book = booksDb.find((b) => b.id === targetId) || booksDb[0];

  const currentStock = borrowed ? book.stock - 1 : book.stock;
  const isAvailable = currentStock > 0;

  const handleBorrowRequest = () => {
    if (!isAvailable || borrowed) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setBorrowed(true);
    }, 800);
  };

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
            <span>{book.emoji}</span>
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
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px', shrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
              <span className="detail-category-tag">{book.category}</span>
              <span className={`detail-status-badge ${isAvailable ? 'available' : 'unavailable'}`}>
                {isAvailable ? `Tersedia (${currentStock})` : 'Stok Habis'}
              </span>
            </div>
            <h1 className="detail-title-h1">{book.title}</h1>
            <p className="detail-author-p">
              Ditulis oleh <span className="author-link-style">{book.author}</span>
            </p>
          </div>

          {/* Description Section */}
          <div className="description-sec">
            <h3 className="description-title">Sinopsis</h3>
            <p className="description-content">{book.description}</p>
          </div>

          {/* Modern Details Card */}
          <div className="modern-details-card">
            <h3 className="description-title" style={{ marginTop: 0, marginBottom: '16px' }}>Informasi Detail</h3>
            <div className="metadata-grid">
              <div className="metadata-item">
                <span className="metadata-label">ISBN</span>
                <span className="metadata-value">{book.isbn}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Tahun Terbit</span>
                <span className="metadata-value">{book.year}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Kategori</span>
                <span className="metadata-value">{book.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
