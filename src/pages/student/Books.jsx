import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/student-books.css';

// Import book cover images
import pythonCover from '../../assets/images/python_book_cover.png';
import mlCover from '../../assets/images/ml_book_cover.png';
import cCover from '../../assets/images/c_book_cover.png';
import accountingCover from '../../assets/images/accounting_book_cover.png';
import ekonomiMikroCover from '../../assets/images/ekonomi_mikro_cover.png';
import manajemenOperasionalCover from '../../assets/images/manajemen_operasional_cover.png';
import algoritmaPemrogramanCover from '../../assets/images/algoritma_pemrograman_cover.png';
import pengantarAkuntansiCover from '../../assets/images/pengantar_akuntansi_cover.png';

export default function Books() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Read search query from URL query parameter 'q'
  const searchQuery = new URLSearchParams(location.search).get('q') || '';

  // Dummy Categories matching Figma
  const categories = ['Semua', 'Informatika', 'Manajemen', 'Akuntansi'];

  // Dummy Books Data matching Figma
  const booksData = [
    { id: 1, title: 'Python Programming', author: 'Martin Evans', category: 'Informatika', stock: 2, year: '2022', cover: pythonCover },
    { id: 2, title: 'Machine Learning For Beginners', author: 'Jerry N.P.', category: 'Informatika', stock: 2, year: '2022', cover: mlCover },
    { id: 3, title: 'Expert C Programming', author: 'Peter Van Der Linden', category: 'Informatika', stock: 2, year: '2022', cover: cCover },
    { id: 4, title: 'Pengantar Ekonomi Mikro', author: 'Sri Rahayu, S.E., M.Si.', category: 'Manajemen', stock: 2, year: '2022', cover: ekonomiMikroCover },
    { id: 5, title: 'Akuntansi Keuangan Lanjutan', author: 'Endah Prawesti Ningrum, S.E, M.Ak', category: 'Akuntansi', stock: 2, year: '2022', cover: accountingCover },
    { id: 6, title: 'Manajemen Operasional', author: 'Dr. H. Mochammad Zainul, S.E, M.M.', category: 'Manajemen', stock: 2, year: '2022', cover: manajemenOperasionalCover },
    { id: 7, title: 'Algoritma Dan Pemrograman', author: 'Rinaldi Munir', category: 'Informatika', stock: 2, year: '2022', cover: algoritmaPemrogramanCover },
    { id: 8, title: 'Pengantar Akuntansi', author: 'Iwan Koerniawan, S.E., M.Th., M.Si.', category: 'Akuntansi', stock: 2, year: '2022', cover: pengantarAkuntansiCover }
  ];

  // Filtering Logic
  const filteredBooks = booksData.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'Semua' || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="books-page-wrapper">
      {/* Page Header */}
      <div className="books-header">
        <h1 className="books-page-title">Koleksi Buku</h1>
        <p className="books-page-subtitle">Cari dan temukan referensi bacaanmu.</p>
      </div>

      {/* Controls: Search and Filters */}
      <div className="controls-container">

        {/* Category Filters */}
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="catalog-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="catalog-card"
              onClick={() => navigate(`/student/book/${book.id}`)}
              style={{ cursor: 'pointer' }}
            >
              {/* Cover Container */}
              <div className="cover-container">
                <img src={book.cover} alt={book.title} className="cover-img" />
              </div>

              {/* Book Details */}
              <div className="book-details">
                <h3 className="book-title-h3">{book.title}</h3>
                <p className="book-author-p">{book.author}</p>
                <p className="book-year-p">{book.year}</p>
                <p className="book-stock-p">Stock : {book.stock}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>Buku tidak ditemukan</h3>
            <p>Cobalah mengganti kata kunci pencarian atau kategori filter lainnya.</p>
          </div>
        )}
      </div>
    </div>
  );
}
