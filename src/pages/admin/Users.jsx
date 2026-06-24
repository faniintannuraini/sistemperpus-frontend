import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [prodis, setProdis] = useState([]);
  const [selectedProdi, setSelectedProdi] = useState('Semua Program Studi');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    setShowPassword(false);
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
    setShowPassword(false);
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

  const executeSave = async (payload) => {
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
            text: formData.password ? 'Password berhasil di reset.' : 'Data mahasiswa berhasil diperbarui.',
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

    const nimPattern = /^\d+$/;
    if (!nimPattern.test(formData.nim.trim())) {
      Swal.fire({
        title: 'NIM Tidak Valid',
        text: 'NIM harus berupa angka saja.',
        icon: 'warning',
        confirmButtonColor: '#ea580c'
      });
      return;
    }

    if (modalMode === 'add') {
      if (!formData.password) {
        Swal.fire({
          title: 'Formulir Belum Lengkap',
          text: 'Password wajib diisi untuk mahasiswa baru.',
          icon: 'warning',
          confirmButtonColor: '#ea580c'
        });
        return;
      }
      if (formData.password.length < 6) {
        Swal.fire({
          title: 'Formulir Belum Lengkap',
          text: 'Password minimal harus 6 karakter.',
          icon: 'warning',
          confirmButtonColor: '#ea580c'
        });
        return;
      }
      if (!(/^(?=.*[A-Za-z])(?=.*\d)/).test(formData.password)) {
        Swal.fire({
          title: 'Kombinasi Password Lemah',
          text: 'Password harus berupa kombinasi huruf dan angka.',
          icon: 'warning',
          confirmButtonColor: '#ea580c'
        });
        return;
      }
    }

    if (modalMode === 'edit' && formData.password) {
      if (formData.password.length < 6) {
        Swal.fire({
          title: 'Formulir Belum Lengkap',
          text: 'Password baru minimal harus 6 karakter.',
          icon: 'warning',
          confirmButtonColor: '#ea580c'
        });
        return;
      }
      if (!(/^(?=.*[A-Za-z])(?=.*\d)/).test(formData.password)) {
        Swal.fire({
          title: 'Kombinasi Password Lemah',
          text: 'Password harus berupa kombinasi huruf dan angka.',
          icon: 'warning',
          confirmButtonColor: '#ea580c'
        });
        return;
      }
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

    if (modalMode === 'edit' && formData.password) {
      Swal.fire({
        title: 'Reset Password?',
        text: 'Apakah Anda yakin ingin mereset password mahasiswa ini?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Ya, Reset!',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          executeSave(payload);
        }
      });
    } else {
      executeSave(payload);
    }
  };

  // Filter Logic
  const filteredUsers = users.filter(user => {
    return selectedProdi === 'Semua Program Studi' || user.nama_prodi === selectedProdi;
  });

  const isPasswordValInvalid = formData.password.length > 0 && (formData.password.length < 6 || !(/^(?=.*[A-Za-z])(?=.*\d)/).test(formData.password));

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
              borderRadius: '20px',
              width: '100%',
              maxWidth: '460px',
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
                  backgroundColor: '#e6f4ea',
                  color: '#137333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="17" y1="11" x2="23" y2="11" />
                  </svg>
                </div>
                <h2 style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#0f172a'
                }}>
                  {modalMode === 'add' ? 'Tambah Mahasiswa Baru' : 'Edit Data Mahasiswa'}
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
              
              {/* NIM Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Nomor Induk Mahasiswa (NIM)</label>
                <input
                  type="text"
                  required
                  pattern="[0-9]*"
                  inputMode="numeric"
                  placeholder="Contoh : 2022010"
                  value={formData.nim}
                  onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
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

              {/* Nama Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan Nama Lengkap..."
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
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

              {/* Program Studi Select */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Program Studi</label>
                <div style={{ position: 'relative', width: '100%' }}>
                  <select
                    value={formData.id_prodi}
                    onChange={(e) => setFormData({ ...formData, id_prodi: e.target.value })}
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
                    <option value="" disabled>Program Studi</option>
                    {prodis.map((p) => (
                      <option key={p.id_prodi} value={p.id_prodi}>
                        {p.nama_prodi}
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

              {/* Email Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Email Kampus</label>
                <input
                  type="email"
                  required
                  placeholder="nim@student.unper.ac.id"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

              {/* Password Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                  Password {modalMode === 'edit' && '(Kosongkan jika tidak ingin mengubah)'}
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required={modalMode === 'add'}
                    placeholder={modalMode === 'add' ? "Masukkan Password..." : "Masukkan password baru"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    style={{
                      padding: '12px 48px 12px 16px',
                      fontSize: '14px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: '#f1f5f9',
                      outline: 'none',
                      color: '#0f172a',
                      width: '100%',
                      boxSizing: 'border-box',
                      transition: 'all 0.2s'
                    }}
                    className={`modal-input-field ${isPasswordValInvalid ? 'invalid-password' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#64748b',
                      padding: 0
                    }}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ width: '18px', height: '18px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644 11.082 11.082 0 0117.828 0 1.012 1.012 0 010 .644 11.082 11.082 0 01-17.828 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ width: '18px', height: '18px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )}
                  </button>
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
                    padding: '10px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRadius: '24px',
                    border: '1px solid #cbd5e1',
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
                    padding: '10px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    borderRadius: '24px',
                    border: 'none',
                    backgroundColor: '#0f9d58',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                  className="modal-submit-btn-user"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  Simpan Data
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
          box-shadow: 0 0 0 2px rgba(15, 157, 88, 0.15) !important;
        }
        .modal-close-hover:hover {
          background-color: #f1f5f9 !important;
        }
        .invalid-password {
          border: 1px solid #ef4444 !important;
        }
        .invalid-password:focus {
          border-color: #ef4444 !important;
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2) !important;
        }
        .modal-cancel-btn:hover {
          background-color: #f8fafc !important;
        }
        .modal-submit-btn-user:hover {
          opacity: 0.95 !important;
          box-shadow: 0 4px 12px rgba(15, 157, 88, 0.2) !important;
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
