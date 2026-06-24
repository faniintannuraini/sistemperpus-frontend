import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../../services/api';

// Import cover images
import pythonCover from '../../assets/images/python_book_cover.png';
import mlCover from '../../assets/images/ml_book_cover.png';
import cCover from '../../assets/images/c_book_cover.png';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [formData, setFormData] = useState({
    id_buku: '',
    judul: '',
    pengarang: '',
    penerbit: '',
    tahun_terbit: '',
    stok: '',
    id_kategori: '',
    rak: 'RAK-IT 101'
  });

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
      Swal.fire({
        title: 'Error!',
        text: 'Gagal memuat data buku.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
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

  const getCoverImage = (title, id) => {
    const t = (title || '').toLowerCase();
    if (t.includes('machine') || t.includes('learning') || t.includes('ml')) return mlCover;
    if (t.includes('expert c') || t.includes(' c ') || t.includes('programming c') || t.startsWith('c ')) return cCover;
    
    const idx = id ? parseInt(id, 10) : 0;
    if (idx % 3 === 1) return mlCover;
    if (idx % 3 === 2) return cCover;
    return pythonCover;
  };

  const getCategoryName = (idKategori) => {
    const cat = categories.find(c => String(c.id_kategori) === String(idKategori));
    return cat ? cat.nama_kategori : 'Teknik Informatika';
  };

  const handleAddBook = () => {
    setModalMode('add');
    setFormData({
      id_buku: '',
      judul: '',
      pengarang: '',
      penerbit: '',
      tahun_terbit: new Date().getFullYear().toString(),
      stok: '10',
      id_kategori: categories[0]?.id_kategori || '',
      rak: 'RAK-IT 101'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (book) => {
    setModalMode('edit');
    setFormData({
      id_buku: book.id_buku,
      judul: book.judul,
      pengarang: book.pengarang,
      penerbit: book.penerbit,
      tahun_terbit: book.tahun_terbit ? book.tahun_terbit.toString() : '',
      stok: book.stok ? book.stok.toString() : '',
      id_kategori: book.id_kategori || '',
      rak: book.rak || 'RAK-IT 101'
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`/buku/${bookId}`);
          if (response.data && response.data.status === 'success') {
            Swal.fire({
              title: 'Terhapus!',
              text: 'Buku berhasil dihapus.',
              icon: 'success',
              confirmButtonColor: '#10b981'
            });
            fetchBooks();
          }
        } catch (error) {
          console.error('Error deleting book:', error);
          const errorMsg = error.response?.data?.message || 'Gagal menghapus data buku.';
          Swal.fire({
            title: 'Gagal!',
            text: errorMsg,
            icon: 'error',
            confirmButtonColor: '#ef4444'
          });
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.judul.trim() || !formData.pengarang.trim() || !formData.penerbit.trim() || !formData.tahun_terbit || !formData.stok || !formData.id_kategori) {
      Swal.fire({
        title: 'Formulir Belum Lengkap',
        text: 'Harap isi semua data buku.',
        icon: 'warning',
        confirmButtonColor: '#ea580c'
      });
      return;
    }

    const currentYear = new Date().getFullYear();
    const year = parseInt(formData.tahun_terbit, 10);
    const stock = parseInt(formData.stok, 10);

    if (isNaN(year) || year < 1000 || year > currentYear + 1) {
      Swal.fire({
        title: 'Tahun Terbit Tidak Valid',
        text: `Tahun terbit harus antara 1000 dan ${currentYear + 1}.`,
        icon: 'warning',
        confirmButtonColor: '#ea580c'
      });
      return;
    }

    if (isNaN(stock) || stock < 0) {
      Swal.fire({
        title: 'Stok Tidak Valid',
        text: 'Stok tersedia minimal bernilai 0.',
        icon: 'warning',
        confirmButtonColor: '#ea580c'
      });
      return;
    }

    const payload = {
      judul: formData.judul,
      pengarang: formData.pengarang,
      penerbit: formData.penerbit,
      tahun_terbit: year,
      stok: stock,
      id_kategori: parseInt(formData.id_kategori, 10),
      rak: formData.rak
    };

    try {
      if (modalMode === 'add') {
        const response = await api.post('/buku', payload);
        if (response.data && response.data.status === 'success') {
          Swal.fire({
            title: 'Berhasil!',
            text: 'Buku baru berhasil ditambahkan.',
            icon: 'success',
            confirmButtonColor: '#10b981'
          });
          fetchBooks();
          setIsModalOpen(false);
        }
      } else {
        const response = await api.put(`/buku/${formData.id_buku}`, payload);
        if (response.data && response.data.status === 'success') {
          Swal.fire({
            title: 'Berhasil!',
            text: 'Data buku berhasil diperbarui.',
            icon: 'success',
            confirmButtonColor: '#10b981'
          });
          fetchBooks();
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error('Error saving book:', error);
      const errorMsg = error.response?.data?.message || 'Gagal menyimpan data buku.';
      Swal.fire({
        title: 'Gagal!',
        text: errorMsg,
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  const filteredBooks = books.filter(book => {
    if (selectedCategory === 'Semua Kategori') return true;
    return String(book.id_kategori) === String(selectedCategory);
  });

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
        {/* Dropdown Kategori */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '10px 40px 10px 16px',
            fontSize: '14px',
            color: '#334155',
            outline: 'none',
            cursor: 'pointer',
            minWidth: '200px',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 16px center',
            backgroundSize: '16px'
          }}
        >
          <option value="Semua Kategori">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id_kategori} value={cat.id_kategori}>
              {cat.nama_kategori}
            </option>
          ))}
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
                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  Detail Buku
                </th>
                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  Kategori
                </th>
                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  Stok Tersedia
                </th>
                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  Lokasi Rak
                </th>
                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                    Tidak ada data buku.
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book, index) => (
                  <tr
                    key={book.id_buku}
                    style={{
                      borderBottom: index !== filteredBooks.length - 1 ? '1px solid #e2e8f0' : 'none'
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
                            src={getCoverImage(book.judul, book.id_buku)}
                            alt={book.judul}
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
                          }}>{book.judul}</span>
                          <span style={{
                            fontSize: '12px',
                            color: '#64748b',
                            marginTop: '4px'
                          }}>
                            Penulis: {book.pengarang} | Penerbit: {book.penerbit} ({book.tahun_terbit})
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Kategori Column */}
                    <td style={{
                      padding: '16px 24px',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#334155',
                      whiteSpace: 'nowrap'
                    }}>
                      {getCategoryName(book.id_kategori)}
                    </td>

                    {/* Stok Tersedia Column */}
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{
                        backgroundColor: book.stok > 0 ? '#dcfce7' : '#fee2e2',
                        color: book.stok > 0 ? '#10b981' : '#ef4444',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        display: 'inline-block',
                        whiteSpace: 'nowrap'
                      }}>
                        {book.stok} Exemplar
                      </span>
                    </td>

                    {/* Lokasi Rak Column */}
                    <td style={{
                      padding: '16px 24px',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#334155'
                    }}>
                      {book.rak}
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
                          onClick={() => handleHapus(book.id_buku)}
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
                ))
              )}
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
              borderRadius: '20px',
              width: '100%',
              maxWidth: '780px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
              animation: 'modalSlideUp 0.3s ease-out'
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '24px 32px 16px 32px',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#dbeafe',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    <circle cx="12" cy="11" r="3" />
                    <line x1="12" y1="9.5" x2="12" y2="12.5" />
                    <line x1="10.5" y1="11" x2="13.5" y2="11" />
                  </svg>
                </div>
                <h2 style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#0f172a'
                }}>
                  {modalMode === 'add' ? 'Tambah Buku Baru' : 'Edit Detail Buku'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'background-color 0.2s'
                }}
                className="modal-close-hover"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '20px'
              }}>
                {/* Judul Buku Input */}
                <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Judul Buku</label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan Judul Buku..."
                    value={formData.judul}
                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                    style={{
                      padding: '12px 16px',
                      fontSize: '14px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#f1f5f9',
                      outline: 'none',
                      color: '#0f172a',
                      boxSizing: 'border-box',
                      width: '100%',
                      transition: 'all 0.2s'
                    }}
                    className="modal-input-field"
                  />
                </div>

                {/* Penulis Input */}
                <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Penulis</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Penulis..."
                    value={formData.pengarang}
                    onChange={(e) => setFormData({ ...formData, pengarang: e.target.value })}
                    style={{
                      padding: '12px 16px',
                      fontSize: '14px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#f1f5f9',
                      outline: 'none',
                      color: '#0f172a',
                      boxSizing: 'border-box',
                      width: '100%',
                      transition: 'all 0.2s'
                    }}
                    className="modal-input-field"
                  />
                </div>

                {/* Penerbit Input */}
                <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Penerbit</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Penulis..."
                    value={formData.penerbit}
                    onChange={(e) => setFormData({ ...formData, penerbit: e.target.value })}
                    style={{
                      padding: '12px 16px',
                      fontSize: '14px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#f1f5f9',
                      outline: 'none',
                      color: '#0f172a',
                      boxSizing: 'border-box',
                      width: '100%',
                      transition: 'all 0.2s'
                    }}
                    className="modal-input-field"
                  />
                </div>

                {/* Kategori Select */}
                <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Kategori</label>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <select
                      value={formData.id_kategori}
                      onChange={(e) => setFormData({ ...formData, id_kategori: e.target.value })}
                      style={{
                        padding: '12px 16px',
                        fontSize: '14px',
                        borderRadius: '12px',
                        border: 'none',
                        backgroundColor: '#f1f5f9',
                        outline: 'none',
                        color: '#0f172a',
                        width: '100%',
                        cursor: 'pointer',
                        appearance: 'none',
                        boxSizing: 'border-box'
                      }}
                      className="modal-select-field"
                    >
                      <option value="" disabled>Kategori Buku</option>
                      {categories.map((cat) => (
                        <option key={cat.id_kategori} value={cat.id_kategori}>
                          {cat.nama_kategori}
                        </option>
                      ))}
                    </select>
                    <div style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: '#64748b',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bahasa Input */}
                <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Bahasa</label>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <select
                      value={formData.bahasa || 'Bahasa Indonesia'}
                      onChange={(e) => setFormData({ ...formData, bahasa: e.target.value })}
                      style={{
                        padding: '12px 16px',
                        fontSize: '14px',
                        borderRadius: '12px',
                        border: 'none',
                        backgroundColor: '#f1f5f9',
                        outline: 'none',
                        color: '#0f172a',
                        width: '100%',
                        cursor: 'pointer',
                        appearance: 'none',
                        boxSizing: 'border-box'
                      }}
                      className="modal-select-field"
                    >
                      <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                      <option value="Bahasa Inggris">Bahasa Inggris</option>
                      <option value="Bahasa Lainnya">Bahasa Lainnya</option>
                    </select>
                    <div style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: '#64748b',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* ISBN */}
                <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>ISBN</label>
                  <input
                    type="text"
                    placeholder="Contoh: 978-602-..."
                    value={formData.isbn || ''}
                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    style={{
                      padding: '12px 16px',
                      fontSize: '14px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#f1f5f9',
                      outline: 'none',
                      color: '#0f172a',
                      boxSizing: 'border-box',
                      width: '100%',
                      transition: 'all 0.2s'
                    }}
                    className="modal-input-field"
                  />
                </div>

                {/* Tahun Terbit */}
                <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Tahun Terbit</label>
                  <input
                    type="number"
                    required
                    min="1000"
                    max={new Date().getFullYear() + 1}
                    placeholder="YYY"
                    value={formData.tahun_terbit}
                    onChange={(e) => setFormData({ ...formData, tahun_terbit: e.target.value })}
                    style={{
                      padding: '12px 16px',
                      fontSize: '14px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#f1f5f9',
                      outline: 'none',
                      color: '#0f172a',
                      boxSizing: 'border-box',
                      width: '100%',
                      transition: 'all 0.2s'
                    }}
                    className="modal-input-field"
                  />
                </div>

                {/* Jumlah Halaman */}
                <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Jumlah Halaman</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Contoh: 350"
                    value={formData.halaman || ''}
                    onChange={(e) => setFormData({ ...formData, halaman: e.target.value })}
                    style={{
                      padding: '12px 16px',
                      fontSize: '14px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#f1f5f9',
                      outline: 'none',
                      color: '#0f172a',
                      boxSizing: 'border-box',
                      width: '100%',
                      transition: 'all 0.2s'
                    }}
                    className="modal-input-field"
                  />
                </div>

                {/* Stok Tersedia */}
                <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Stok Tersedia</label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="Jumlah fisik buku..."
                    value={formData.stok}
                    onChange={(e) => setFormData({ ...formData, stok: e.target.value })}
                    style={{
                      padding: '12px 16px',
                      fontSize: '14px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#f1f5f9',
                      outline: 'none',
                      color: '#0f172a',
                      boxSizing: 'border-box',
                      width: '100%',
                      transition: 'all 0.2s'
                    }}
                    className="modal-input-field"
                  />
                </div>

                {/* Lokasi Rak */}
                <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Lokasi Rak</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rak IT-04"
                    value={formData.rak}
                    onChange={(e) => setFormData({ ...formData, rak: e.target.value })}
                    style={{
                      padding: '12px 16px',
                      fontSize: '14px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#f1f5f9',
                      outline: 'none',
                      color: '#0f172a',
                      boxSizing: 'border-box',
                      width: '100%',
                      transition: 'all 0.2s'
                    }}
                    className="modal-input-field"
                  />
                </div>

                {/* Upload Cover Buku */}
                <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Upload Cover Buku</label>
                  <div style={{
                    border: '2px dashed #cbd5e1',
                    borderRadius: '16px',
                    padding: '24px',
                    textAlign: 'center',
                    backgroundColor: '#f8fafc',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'border-color 0.2s'
                  }}
                  className="cover-uploader"
                  onClick={() => document.getElementById('cover-file-input').click()}
                  >
                    <input 
                      type="file" 
                      id="cover-file-input" 
                      accept="image/jpeg,image/png,image/webp" 
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFormData({ ...formData, coverFileName: e.target.files[0].name });
                          Swal.fire({
                            title: 'File Terpilih',
                            text: e.target.files[0].name,
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false
                          });
                        }
                      }}
                    />
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#eff6ff',
                      color: '#3b82f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>
                      {formData.coverFileName ? (
                        <span>File terpilih: <strong style={{ color: '#2563eb' }}>{formData.coverFileName}</strong></span>
                      ) : (
                        <span>Tarik & lepas file di sini atau <strong style={{ color: '#2563eb' }}>Cari File</strong></span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                      Format didukung: JPG, PNG, WEBP (Max 2MB)
                    </div>
                  </div>
                </div>

                {/* Sinopsis / Deskripsi Singkat */}
                <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Sinopsis / Deskripsi Singkat</label>
                  <textarea
                    placeholder="Masukkan ringkasan sinopsis atau deskripsi buku di sini..."
                    rows={4}
                    value={formData.sinopsis || ''}
                    onChange={(e) => setFormData({ ...formData, sinopsis: e.target.value })}
                    style={{
                      padding: '12px 16px',
                      fontSize: '14px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#f1f5f9',
                      outline: 'none',
                      color: '#0f172a',
                      boxSizing: 'border-box',
                      width: '100%',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      transition: 'all 0.2s'
                    }}
                    className="modal-input-field"
                  />
                </div>
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
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  className="modal-cancel-btn"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  className="modal-submit-btn"
                >
                  Simpan Buku
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
        .modal-input-field:focus,
        .modal-select-field:focus {
          background-color: #e2e8f0 !important;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15) !important;
        }
        .modal-close-hover:hover {
          background-color: #f1f5f9 !important;
        }
        .cover-uploader:hover {
          border-color: #2563eb !important;
          background-color: #f1f5f9 !important;
        }
        .modal-cancel-btn:hover {
          background-color: #f8fafc !important;
        }
        .modal-submit-btn:hover {
          opacity: 0.95 !important;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2) !important;
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
