import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/student-books.css';

export default function Books() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Dummy Categories
  const categories = ['Semua', 'Teknologi', 'Sains', 'Bisnis', 'Sastra'];

  // Dummy Books Data
  const booksData = [
    { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Teknologi', stock: 5, emoji: '💻' },
    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', category: 'Teknologi', stock: 3, emoji: '🛠️' },
    { id: 3, title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Sains', stock: 2, emoji: '🌌' },
    { id: 4, title: 'Principles of Economics', author: 'N. Gregory Mankiw', category: 'Bisnis', stock: 0, emoji: '📈' },
    { id: 5, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Sastra', stock: 4, emoji: '📖' },
    { id: 6, title: 'Design Patterns', author: 'Erich Gamma', category: 'Teknologi', stock: 1, emoji: '🧩' },
    { id: 7, title: 'Cosmos', author: 'Carl Sagan', category: 'Sains', stock: 6, emoji: '🪐' },
    { id: 8, title: 'Zero to One', author: 'Peter Thiel', category: 'Bisnis', stock: 3, emoji: '💡' },
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

  const handleDetailClick = (bookId) => {
    navigate(`/student/book/${bookId}`);
  };

  return (
    <div className="books-page-wrapper">
      {/* Page Header */}
      <div className="books-header">
        <h1>Eksplorasi Katalog Buku</h1>
        <p>Temukan ribuan referensi, jurnal, dan buku terbaik untuk dipinjam.</p>
      </div>

      {/* Search and Filters Controls */}
      <div className="controls-container">
        {/* Search Field */}
        <div className="search-field">
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
            placeholder="Cari berdasarkan judul atau penulis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

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
            <div key={book.id} className="catalog-card">
              {/* Cover Container */}
              <div className="cover-container">
                <span>{book.emoji}</span>
                <span className={`stock-tag ${book.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {book.stock > 0 ? 'Tersedia' : 'Habis'}
                </span>
              </div>

              {/* Book Details */}
              <div className="book-details">
                <span className="book-tag">{book.category}</span>
                <h3 className="book-title-h3">{book.title}</h3>
                <p className="book-author-p">{book.author}</p>
                <p className="book-stock-p">
                  <span>📦</span> Stok: {book.stock} buku
                </p>
              </div>

              {/* Action Button */}
              <button className="detail-btn" onClick={() => handleDetailClick(book.id)}>
                Detail Buku
              </button>
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
