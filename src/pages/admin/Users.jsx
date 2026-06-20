import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [prodis, setProdis] = useState([]);
  const [selectedProdi, setSelectedProdi] = useState('Semua Program Studi');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [formData, setFormData] = useState({
    id_user: '',
    nama: '',
    nim: '',
    id_prodi: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    fetchUsers();
    fetchProdis();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/user');
      if (response.data && response.data.status === 'success') {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Gagal memuat data mahasiswa.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  const fetchProdis = async () => {
    try {
      const response = await api.get('/program-studi');
      if (response.data && response.data.status === 'success') {
        setProdis(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching program studi:', error);
    }
  };

  // Action Handlers
  const handleAddUser = () => {
    setModalMode('add');
    setFormData({
      id_user: '',
      nama: '',
      nim: '',
      id_prodi: prodis[0]?.id_prodi || '',
      email: '',
      password: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    const foundProdi = prodis.find(p => p.nama_prodi === user.nama_prodi);
    setModalMode('edit');
    setFormData({
      id_user: user.id_user,
      nama: user.nama,
      nim: user.nim,
      id_prodi: foundProdi ? foundProdi.id_prodi : (prodis[0]?.id_prodi || ''),
      email: user.email,
      password: ''
    });
    setIsModalOpen(true);
  };

  const handleHapus = (userId) => {
    Swal.fire({
      title: 'Hapus Mahasiswa',
      text: 'Apakah Anda yakin ingin menghapus mahasiswa ini dari database?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`/admin/user/${userId}`);
          if (response.data && response.data.status === 'success') {
            Swal.fire({
              title: 'Terhapus!',
              text: 'Data mahasiswa berhasil dihapus.',
              icon: 'success',
              confirmButtonColor: '#10b981'
            });
            fetchUsers();
          }
        } catch (error) {
          console.error('Error deleting user:', error);
          const errorMsg = error.response?.data?.message || 'Gagal menghapus data mahasiswa.';
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
    if (!formData.nama.trim() || !formData.nim.trim() || !formData.email.trim() || !formData.id_prodi) {
      Swal.fire({
        title: 'Formulir Belum Lengkap',
        text: 'Harap isi nama, NIM, email, dan program studi mahasiswa.',
        icon: 'warning',
        confirmButtonColor: '#ea580c'
      });
      return;
    }

    if (modalMode === 'add' && (!formData.password || formData.password.length < 6)) {
      Swal.fire({
        title: 'Formulir Belum Lengkap',
        text: 'Password minimal 6 karakter wajib diisi untuk mahasiswa baru.',
        icon: 'warning',
        confirmButtonColor: '#ea580c'
      });
      return;
    }

    const payload = {
      nama: formData.nama,
      nim: formData.nim,
      email: formData.email,
      id_prodi: parseInt(formData.id_prodi, 10)
    };

    if (formData.password) {
      payload.password = formData.password;
    }

    try {
      if (modalMode === 'add') {
        const response = await api.post('/admin/user', payload);
        if (response.data && response.data.status === 'success') {
          Swal.fire({
            title: 'Berhasil!',
            text: 'Data mahasiswa baru berhasil ditambahkan.',
            icon: 'success',
            confirmButtonColor: '#10b981'
          });
          fetchUsers();
          setIsModalOpen(false);
        }
      } else {
        const response = await api.put(`/admin/user/${formData.id_user}`, payload);
        if (response.data && response.data.status === 'success') {
          Swal.fire({
            title: 'Berhasil!',
            text: 'Data mahasiswa berhasil diperbarui.',
            icon: 'success',
            confirmButtonColor: '#10b981'
          });
          fetchUsers();
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error('Error saving user:', error);
      const errorMsg = error.response?.data?.message || 'Gagal menyimpan data mahasiswa.';
      Swal.fire({
        title: 'Gagal!',
        text: errorMsg,
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  // Filter Logic
  const filteredUsers = users.filter(user => {
    return selectedProdi === 'Semua Program Studi' || user.nama_prodi === selectedProdi;
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
          Kelola Data User
        </h1>
        <p style={{
          margin: '4px 0 0 0',
          fontSize: '14px',
          color: '#64748b'
        }}>
          Manajemen data anggota perpustakaan (mahasiswa).
        </p>
      </div>

      {/* Toolbar: Prodi Dropdown and Add Student Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* Dropdown filter Prodi */}
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
          {prodis.map((p) => (
            <option key={p.id_prodi} value={p.nama_prodi}>{p.nama_prodi}</option>
          ))}
        </select>

        {/* Tambah Mahasiswa Button */}
        <button
          onClick={handleAddUser}
          className="admin-add-btn-user"
          style={{
            backgroundColor: '#10b981', // Green background
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
          <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <span>Tambah Mahasiswa</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
      }}>
        {filteredUsers.length > 0 ? (
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
                  <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '14px', fontWeight: 600 }}>Data Mahasiswa</th>
                  <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '14px', fontWeight: 600 }}>Program Studi</th>
                  <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '14px', fontWeight: 600 }}>Email</th>
                  <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '14px', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '14px', fontWeight: 600, width: '120px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id_user}
                    style={{
                      borderBottom: index !== filteredUsers.length - 1 ? '1px solid #e2e8f0' : 'none'
                    }}
                  >
                    {/* Student Data Column (Name & NIM) */}
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{user.nama}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>NIM: {user.nim}</div>
                    </td>

                    {/* Program Studi Column */}
                    <td style={{
                      padding: '16px 24px',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#334155'
                    }}>
                      {user.nama_prodi || 'Umum'}
                    </td>

                    {/* Email Column */}
                    <td style={{
                      padding: '16px 24px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#334155'
                    }}>
                      {user.email}
                    </td>

                    {/* Status Column */}
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
                        Aktif
                      </span>
                    </td>

                    {/* Actions Column */}
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(user)}
                          title="Edit Mahasiswa"
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
                          className="admin-edit-action-btn-user"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>

                        {/* Hapus Button */}
                        <button
                          onClick={() => handleHapus(user.id_user)}
                          title="Hapus Mahasiswa"
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
                          className="admin-delete-action-btn-user"
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
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            <svg style={{ width: '48px', height: '48px', color: '#cbd5e1', marginBottom: '12px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: 500 }}>Tidak ada mahasiswa yang ditemukan</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px' }}>Coba ubah filter Program Studi Anda.</p>
          </div>
        )}
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
                {modalMode === 'add' ? 'Tambah Mahasiswa Baru' : 'Edit Data Mahasiswa'}
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
              {/* Nama Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Fani Intan Nuraini"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
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

              {/* NIM Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>NIM</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 2201012"
                  value={formData.nim}
                  onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
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

              {/* Program Studi Select */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Program Studi</label>
                <select
                  value={formData.id_prodi}
                  onChange={(e) => setFormData({ ...formData, id_prodi: e.target.value })}
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
                  <option value="" disabled>Pilih Program Studi</option>
                  {prodis.map((p) => (
                    <option key={p.id_prodi} value={p.id_prodi}>
                      {p.nama_prodi}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email</label>
                <input
                  type="email"
                  required
                  placeholder="Contoh: fani@student.unper.ac.id"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

              {/* Password Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                  Password {modalMode === 'edit' && '(Kosongkan jika tidak ingin mengubah)'}
                </label>
                <input
                  type="password"
                  required={modalMode === 'add'}
                  placeholder={modalMode === 'add' ? "Minimal 6 karakter" : "Masukkan password baru"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                    backgroundColor: modalMode === 'add' ? '#10b981' : '#3b82f6',
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
        .admin-add-btn-user:hover {
          background-color: #059669 !important;
        }
        .admin-edit-action-btn-user:hover {
          background-color: #fff7ed !important;
          border-color: #ea580c !important;
          color: #ea580c !important;
        }
        .admin-delete-action-btn-user:hover {
          background-color: #fef2f2 !important;
          border-color: #dc2626 !important;
          color: #dc2626 !important;
        }
      `}</style>
    </div>
  );
}
