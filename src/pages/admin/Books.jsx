import React, { useState } from 'react';
import Swal from 'sweetalert2';

// Import cover images
import pythonCover from '../../assets/images/python_book_cover.png';
import mlCover from '../../assets/images/ml_book_cover.png';
import cCover from '../../assets/images/c_book_cover.png';

export default function Books() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'Python Programming',
      author: 'Martin Evans',
      isbn: '997-655-111',
      category: 'Informatika',
      stock: '15 Exemplar',
      location: 'Rak-IT 104',
      cover: pythonCover
    },
    {
      id: 2,
      title: 'Machine Learning',
      author: 'Jerry N. P.',
      isbn: '997-655-111',
      category: 'Informatika',
      stock: '15 Exemplar',
      location: 'Rak-IT 104',
      cover: mlCover
    },
    {
      id: 3,
      title: 'Expert C Programming',
      author: 'Petter Van Lindeb',
      isbn: '997-655-111',
      category: 'Informatika',
      stock: '15 Exemplar',
      location: 'Rak-IT 104',
      cover: cCover
    }
  ]);

  const [selectedProdi, setSelectedProdi] = useState('Semua Program Studi');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    isbn: '',
    category: 'Informatika',
    stock: '15 Exemplar',
    location: 'Rak-IT 104',
    coverType: 'python'
  });

  const getCoverImage = (type) => {
    if (type === 'ml') return mlCover;
    if (type === 'c') return cCover;
    return pythonCover;
  };

  const handleAddBook = () => {
    setModalMode('add');
    setFormData({
      id: '',
      title: '',
      author: '',
      isbn: '',
      category: 'Informatika',
      stock: '15 Exemplar',
      location: 'Rak-IT 104',
      coverType: 'python'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (book) => {
    setModalMode('edit');
    let coverType = 'python';
    if (book.cover === mlCover) coverType = 'ml';
    else if (book.cover === cCover) coverType = 'c';

    setFormData({
      ...book,
      coverType
    });
    setIsModalOpen(true);
  };

  const handleHapus = (bookId) => {
    Swal.fire({
      title: 'Hapus Buku',
      text: 'Apakah Anda yakin ingin menghapus buku ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        setBooks(books.filter((b) => b.id !== bookId));
        Swal.fire({
          title: 'Terhapus!',
          text: 'Buku berhasil dihapus.',
          icon: 'success',
          confirmButtonColor: '#10b981'
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim() || !formData.isbn.trim()) {
      Swal.fire({
        title: 'Formulir Belum Lengkap',
        text: 'Harap isi judul buku, penulis, dan ISBN.',
        icon: 'warning',
        confirmButtonColor: '#ea580c'
      });
      return;
    }

    const updatedBook = {
      ...formData,
      cover: getCoverImage(formData.coverType)
    };
    delete updatedBook.coverType;

    if (modalMode === 'add') {
      const newBook = {
        ...updatedBook,
        id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1
      };
      setBooks([...books, newBook]);
      Swal.fire({
        title: 'Berhasil!',
        text: 'Buku baru berhasil ditambahkan.',
        icon: 'success',
        confirmButtonColor: '#10b981'
      });
    } else {
      setBooks(books.map(b => b.id === formData.id ? updatedBook : b));
      Swal.fire({
        title: 'Berhasil!',
        text: 'Data buku berhasil diperbarui.',
        icon: 'success',
        confirmButtonColor: '#10b981'
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      color: '#1e293b',
      maxWidth: '1200px',
      margin: '0 auto',
      boxSizing: 'border-box'
    }}>
      {/* Title Header */}
      <div>
        <h1 style={{
          margin: 0,
          fontSize: '24px',
          fontWeight: 700,
          color: '#0f172a',
          letterSpacing: '-0.5px'
        }}>
          Kelola Data Buku
        </h1>
        <p style={{
          margin: '4px 0 0 0',
          fontSize: '14px',
          color: '#64748b'
        }}>
          Manajemen koleksi buku fisik dan digital perpus
        </p>
      </div>

      {/* Toolbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* Dropdown Program Studi */}
        <select
          value={selectedProdi}
          onChange={(e) => setSelectedProdi(e.target.value)}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '14px',
            color: '#334155',
            outline: 'none',
            cursor: 'pointer',
            minWidth: '200px'
          }}
        >
          <option value="Semua Program Studi">Semua Program Studi</option>
          <option value="Informatika">Informatika</option>
          <option value="Sistem Informasi">Sistem Informasi</option>
          <option value="Teknik Sipil">Teknik Sipil</option>
        </select>

        {/* Tambahkan Buku Button */}
        <button
          onClick={handleAddBook}
          className="admin-add-btn"
          style={{
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.2s ease'
          }}
        >
          {/* Add/Book Icon */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <line x1="12" y1="6" x2="12" y2="12" />
            <line x1="9" y1="9" x2="15" y2="9" />
          </svg>
          <span>Tambahkan Buku</span>
        </button>
      </div>

      {/* Books Table Wrapper */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left'
          }}>
            <thead>
              <tr style={{
                borderBottom: '1px solid #e2e8f0',
                backgroundColor: '#fafafb'
              }}>
                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '14px', fontWeight: 600 }}>
                  Detail Buku
                </th>
                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '14px', fontWeight: 600 }}>
                  Kategori
                </th>
                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '14px', fontWeight: 600 }}>
                  Stok Tersedia
                </th>
                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '14px', fontWeight: 600 }}>
                  Lokasi Rak
                </th>
                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '14px', fontWeight: 600 }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr
                  key={book.id}
                  style={{
                    borderBottom: index !== books.length - 1 ? '1px solid #e2e8f0' : 'none'
                  }}
                >
                  {/* Detail Buku Column */}
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '54px',
                        height: '72px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        border: '1px solid #f1f5f9',
                        flexShrink: 0,
                        backgroundColor: '#f8fafc'
                      }}>
                        <img
                          src={book.cover}
                          alt={book.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: '#0f172a'
                        }}>{book.title}</span>
                        <span style={{
                          fontSize: '12px',
                          color: '#64748b',
                          marginTop: '4px'
                        }}>
                          Penulis: {book.author} | ISBN {book.isbn}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Kategori Column */}
                  <td style={{
                    padding: '16px 24px',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#334155'
                  }}>
                    {book.category}
                  </td>

                  {/* Stok Tersedia Column */}
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      backgroundColor: '#dcfce7',
                      color: '#10b981',
                      padding: '6px 14px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      display: 'inline-block'
                    }}>
                      {book.stock}
                    </span>
                  </td>

                  {/* Lokasi Rak Column */}
                  <td style={{
                    padding: '16px 24px',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#334155'
                  }}>
                    {book.location}
                  </td>

                  {/* Aksi Column */}
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(book)}
                        title="Edit Buku"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          backgroundColor: '#ffffff',
                          border: '1.5px solid #f97316',
                          color: '#f97316',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        className="admin-edit-action-btn"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleHapus(book.id)}
                        title="Hapus Buku"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          backgroundColor: '#ffffff',
                          border: '1.5px solid #ef4444',
                          color: '#ef4444',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        className="admin-delete-action-btn"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '16px',
          boxSizing: 'border-box'
        }}>
          <div
            className="modal-scrollable"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              animation: 'modalSlideUp 0.3s ease-out'
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: 700,
                color: '#0f172a'
              }}>
                {modalMode === 'add' ? 'Tambahkan Buku Baru' : 'Edit Detail Buku'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Judul Buku Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Judul Buku</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Python Programming"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    padding: '10px 14px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  className="modal-input"
                />
              </div>

              {/* Penulis Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Penulis</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Martin Evans"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  style={{
                    padding: '10px 14px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  className="modal-input"
                />
              </div>

              {/* ISBN Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>ISBN</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 997-655-111"
                  value={formData.isbn}
                  onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                  style={{
                    padding: '10px 14px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  className="modal-input"
                />
              </div>

              {/* Kategori Select */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    padding: '10px 14px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Informatika">Informatika</option>
                  <option value="Sistem Informasi">Sistem Informasi</option>
                  <option value="Teknik Sipil">Teknik Sipil</option>
                </select>
              </div>

              {/* Stok Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Stok Tersedia</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 15 Exemplar"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  style={{
                    padding: '10px 14px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  className="modal-input"
                />
              </div>

              {/* Lokasi Rak Select */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Lokasi Rak</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  style={{
                    padding: '10px 14px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Rak-IT 101">Rak-IT 101</option>
                  <option value="Rak-IT 102">Rak-IT 102</option>
                  <option value="Rak-IT 103">Rak-IT 103</option>
                  <option value="Rak-IT 104">Rak-IT 104</option>
                  <option value="Rak-IT 105">Rak-IT 105</option>
                  <option value="Rak-Umum 201">Rak-Umum 201</option>
                  <option value="Rak-Umum 202">Rak-Umum 202</option>
                </select>
              </div>

              {/* Pilih Cover Select */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Pilih Visual Cover Buku</label>
                <select
                  value={formData.coverType}
                  onChange={(e) => setFormData({ ...formData, coverType: e.target.value })}
                  style={{
                    padding: '10px 14px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="python">Python Programming Cover</option>
                  <option value="ml">Machine Learning Cover</option>
                  <option value="c">Expert C Programming Cover</option>
                </select>
              </div>

              {/* Modal Footer Actions */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '12px',
                marginTop: '12px',
                borderTop: '1px solid #f1f5f9',
                paddingTop: '20px'
              }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 18px',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  className="modal-cancel-btn"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 18px',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: modalMode === 'add' ? '#3b82f6' : '#f97316',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  className="modal-submit-btn"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Style overrides */}
      <style>{`
        .modal-scrollable::-webkit-scrollbar {
          width: 6px;
        }
        .modal-scrollable::-webkit-scrollbar-track {
          background: transparent;
        }
        .modal-scrollable::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .modal-scrollable::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        @keyframes modalSlideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .modal-input:focus {
          border-color: #3b82f6 !important;
        }
        .modal-cancel-btn:hover {
          background-color: #f8fafc !important;
        }
        .modal-submit-btn:hover {
          opacity: 0.9 !important;
        }
        .admin-add-btn:hover {
          background-color: #2563eb !important;
        }
        .admin-edit-action-btn:hover {
          background-color: #fff7ed !important;
          border-color: #ea580c !important;
          color: #ea580c !important;
        }
        .admin-delete-action-btn:hover {
          background-color: #fef2f2 !important;
          border-color: #dc2626 !important;
          color: #dc2626 !important;
        }
      `}</style>
    </div>
  );
}
