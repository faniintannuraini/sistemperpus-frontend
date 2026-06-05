import React, { useState } from 'react';

export default function Books() {
  const categories = ['Semua Kategori', 'Teknologi', 'Sains', 'Novel', 'Fiksi', 'Desain', 'Bisnis'];

  const initialBooks = [
    { id: 1, title: 'Pengantar Algoritma dan Struktur Data', author: 'Budi Santoso', category: 'Teknologi', stock: 12, status: 'Tersedia', coverColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', initial: 'PA' },
    { id: 2, title: 'Pemrograman Web Modern dengan React', author: 'Siti Aminah', category: 'Teknologi', stock: 8, status: 'Tersedia', coverColor: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)', initial: 'PW' },
    { id: 3, title: 'Dasar-Dasar Desain Grafis', author: 'Rian Hidayat', category: 'Desain', stock: 5, status: 'Tersedia', coverColor: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)', initial: 'DD' },
    { id: 4, title: 'Analisis Data dengan Python', author: 'Dewi Lestari', category: 'Teknologi', stock: 0, status: 'Habis', coverColor: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', initial: 'AD' },
    { id: 5, title: 'Kecerdasan Buatan dan Masa Depan', author: 'Fajar Nugraha', category: 'Sains', stock: 3, status: 'Tersedia', coverColor: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)', initial: 'KB' },
    { id: 6, title: 'Manajemen Bisnis dan Startup', author: 'Indra Wijaya', category: 'Bisnis', stock: 10, status: 'Tersedia', coverColor: 'linear-gradient(135deg, #70e1f5 0%, #ffd194 100%)', initial: 'MB' },
    { id: 7, title: 'Laskar Pelangi', author: 'Andrea Hirata', category: 'Novel', stock: 0, status: 'Habis', coverColor: 'linear-gradient(135deg, #C9FFBF 0%, #11998e 100%)', initial: 'LP' }
  ];

  const [books, setBooks] = useState(initialBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');

  // Action Handlers (Dummy Alerts)
  const handleAddBook = () => {
    alert('Aksi Tambah Buku dipicu (Modal form tambah buku akan muncul).');
  };

  const handleDetail = (book) => {
    alert(`Detail Buku: \nJudul: ${book.title}\nPenulis: ${book.author}\nKategori: ${book.category}\nStok: ${book.stock}\nStatus: ${book.status}`);
  };

  const handleEdit = (book) => {
    alert(`Edit Buku: "${book.title}" (Modal form edit buku akan muncul).`);
  };

  const handleHapus = (bookId) => {
    if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      setBooks(books.filter(b => b.id !== bookId));
    }
  };

  // Search and Filter Logic
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua Kategori' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      color: '#1e293b'
    }}>
      {/* Title Header */}
      <div>
        <h1 style={{
          margin: 0,
          fontSize: '28px',
          fontWeight: 700,
          color: '#0f172a',
          letterSpacing: '-0.5px'
        }}>
          Kelola Buku
        </h1>
        <p style={{
          margin: '4px 0 0 0',
          fontSize: '14px',
          color: '#64748b'
        }}>
          Daftar, cari, saring, dan perbarui koleksi buku perpustakaan.
        </p>
      </div>

      {/* Toolbar: Search, Filter, and Add Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flex: 1,
          minWidth: '280px',
          maxWidth: '500px'
        }}>
          {/* Search Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '8px 14px',
            width: '100%',
            gap: '8px',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)'
          }}>
            <svg style={{ color: '#94a3b8', width: '18px', height: '18px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari judul buku atau penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '14px',
                color: '#0f172a',
                width: '100%'
              }}
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '9px 14px',
              fontSize: '14px',
              color: '#334155',
              outline: 'none',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)',
              cursor: 'pointer'
            }}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Tambah Buku Button */}
        <button
          onClick={handleAddBook}
          className="tambah-buku-btn"
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 18px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.2s, transform 0.1s',
            boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -1px rgba(37, 99, 235, 0.06)'
          }}
        >
          <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Tambah Buku</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        overflow: 'hidden'
      }}>
        {filteredBooks.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafafb' }}>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600, width: '70px' }}>COVER</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>JUDUL BUKU</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>PENULIS</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>KATEGORI</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600, textAlign: 'center' }}>STOK</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>STATUS</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600, textAlign: 'center', width: '220px' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book, idx) => (
                  <tr
                    key={book.id}
                    className="table-row-hover"
                    style={{
                      borderBottom: idx !== filteredBooks.length - 1 ? '1px solid #f1f5f9' : 'none',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    {/* Cover Column */}
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{
                        width: '40px',
                        height: '56px',
                        borderRadius: '6px',
                        background: book.coverColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '14px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                      }}>
                        {book.initial}
                      </div>
                    </td>

                    {/* Title Column */}
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>{book.title}</div>
                    </td>

                    {/* Author Column */}
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>
                      {book.author}
                    </td>

                    {/* Category Column */}
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>
                      <span style={{
                        backgroundColor: '#f1f5f9',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: '#475569',
                        fontWeight: 500
                      }}>{book.category}</span>
                    </td>

                    {/* Stock Column */}
                    <td style={{ padding: '14px 20px', fontSize: '14px', color: '#0f172a', fontWeight: 600, textAlign: 'center' }}>
                      {book.stock}
                    </td>

                    {/* Status Column */}
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{
                        backgroundColor: book.status === 'Tersedia' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                        color: book.status === 'Tersedia' ? '#10b981' : '#ef4444',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        {book.status}
                      </span>
                    </td>

                    {/* Actions Column */}
                    <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>

                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(book)}
                          className="action-btn-edit"
                          aria-label="Edit Buku"
                          style={{
                            border: '1px solid #dbeafe',
                            backgroundColor: '#eff6ff',
                            color: '#2563eb',
                            borderRadius: '8px',
                            padding: '8px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          <svg style={{ width: '15px', height: '15px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        {/* Hapus Button */}
                        <button
                          onClick={() => handleHapus(book.id)}
                          className="action-btn-delete"
                          aria-label="Hapus Buku"
                          style={{
                            border: '1px solid #fee2e2',
                            backgroundColor: '#fef2f2',
                            color: '#ef4444',
                            borderRadius: '8px',
                            padding: '8px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          <svg style={{ width: '15px', height: '15px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            <svg style={{ width: '48px', height: '48px', color: '#cbd5e1', marginBottom: '12px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: 500 }}>Tidak ada buku yang ditemukan</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px' }}>Coba ubah kata kunci pencarian atau kategori filter Anda.</p>
          </div>
        )}
      </div>

      {/* Styles Injection */}
      <style>{`
        .tambah-buku-btn:hover {
          background-color: #1d4ed8 !important;
          transform: translateY(-1px);
        }
        .tambah-buku-btn:active {
          transform: translateY(0);
        }
        .table-row-hover:hover {
          background-color: #f8fafc;
        }
        .action-btn-detail:hover {
          background-color: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
        }
        .action-btn-edit:hover {
          background-color: #2563eb !important;
          color: #ffffff !important;
          border-color: #2563eb !important;
        }
        .action-btn-delete:hover {
          background-color: #ef4444 !important;
          color: #ffffff !important;
          border-color: #ef4444 !important;
        }
      `}</style>
    </div>
  );
}
