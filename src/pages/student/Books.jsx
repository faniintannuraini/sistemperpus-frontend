import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
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
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Read search query from URL query parameter 'q'
  const searchQuery = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/buku');
      if (response.data && response.data.status === 'success') {
        setBooks(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/kategori');
      if (response.data && response.data.status === 'success') {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getCoverImage = (title, id, gambar) => {
    if (gambar) {
      if (gambar.startsWith('http')) return gambar;
      return `${import.meta.env.VITE_API_URL}/${gambar}`;
    }
    const t = (title || '').toLowerCase();
    if (t.includes('machine') || t.includes('learning') || t.includes('ml')) return mlCover;
    if (t.includes('expert c') || t.includes(' c ') || t.includes('programming c') || t.startsWith('c ')) return cCover;
    if (t.includes('ekonomi') || t.includes('mikro')) return ekonomiMikroCover;
    if (t.includes('akuntansi') && t.includes('keuangan')) return accountingCover;
    if (t.includes('akuntansi')) return pengantarAkuntansiCover;
    if (t.includes('manajemen') || t.includes('operasional')) return manajemenOperasionalCover;
    if (t.includes('algoritma') || t.includes('pemrograman')) return algoritmaPemrogramanCover;
    
    const idx = id ? parseInt(id, 10) : 0;
    const rem = idx % 8;
    if (rem === 1) return mlCover;
    if (rem === 2) return cCover;
    if (rem === 3) return ekonomiMikroCover;
    if (rem === 4) return accountingCover;
    if (rem === 5) return manajemenOperasionalCover;
    if (rem === 6) return algoritmaPemrogramanCover;
    if (rem === 7) return pengantarAkuntansiCover;
    return pythonCover;
  };

  // Filtering Logic
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.pengarang.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'Semua' || String(book.id_kategori) === String(selectedCategory);

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
          <button
            className={`category-btn ${selectedCategory === 'Semua' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Semua')}
          >
            Semua
          </button>
          {categories.map((category) => (
            <button
              key={category.id_kategori}
              className={`category-btn ${String(selectedCategory) === String(category.id_kategori) ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id_kategori)}
            >
              {category.nama_kategori}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="catalog-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id_buku}
              className="catalog-card"
              onClick={() => navigate(`/student/book/${book.id_buku}`)}
              style={{ cursor: 'pointer' }}
            >
              {/* Cover Container */}
              <div className="cover-container">
                <img src={getCoverImage(book.judul, book.id_buku, book.gambar)} alt={book.judul} className="cover-img" />
              </div>

              {/* Book Details */}
              <div className="book-details">
                <h3 className="book-title-h3">{book.judul}</h3>
                <p className="book-author-p">{book.pengarang}</p>
                <p className="book-year-p">{book.tahun_terbit}</p>
                <p className="book-stock-p">Stock : {book.stok}</p>
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
