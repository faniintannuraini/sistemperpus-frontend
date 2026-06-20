import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function Users() {
  const departments = [
    'Semua Program Studi',
    'Teknik Informatika',
    'Sistem Informasi',
    'Teknik Sipil'
  ];

  const initialUsers = [
    { id: 1, name: 'Azizah Nur Rahma', nim: '2201010', prodi: 'Teknik Informatika', email: 'azizah@student.unper.ac.id', status: 'Aktif' },
    { id: 2, name: 'Hesti Wahyuni', nim: '2201011', prodi: 'Teknik Informatika', email: 'hesti@student.unper.ac.id', status: 'Aktif' },
    { id: 3, name: 'Fani Intan Nuraini', nim: '2201012', prodi: 'Teknik Informatika', email: 'fani@student.unper.ac.id', status: 'Aktif' },
    { id: 4, name: 'Maurine Fladya A', nim: '2201013', prodi: 'Teknik Informatika', email: 'mauri@student.unper.ac.id', status: 'Aktif' },
    { id: 5, name: 'Euis Samsiah', nim: '2201014', prodi: 'Teknik Informatika', email: 'euis@student.unper.ac.id', status: 'Aktif' },
    { id: 6, name: 'Esti Hartati', nim: '2201015', prodi: 'Teknik Informatika', email: 'esti@student.unper.ac.id', status: 'Aktif' },
    { id: 7, name: 'Irzha Wiardi P', nim: '2201016', prodi: 'Teknik Informatika', email: 'irzha@student.unper.ac.id', status: 'Aktif' }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [selectedProdi, setSelectedProdi] = useState('Semua Program Studi');

  // Action Handlers
  const handleAddUser = () => {
    Swal.fire({
      title: 'Tambah Mahasiswa',
      text: 'Aksi Tambah Mahasiswa dipicu (Modal form tambah mahasiswa baru akan muncul).',
      icon: 'info',
      confirmButtonColor: '#10b981'
    });
  };

  const handleEdit = (user) => {
    Swal.fire({
      title: 'Edit Mahasiswa',
      text: `Edit Data Mahasiswa: "${user.name}" (Modal form edit data mahasiswa akan muncul).`,
      icon: 'info',
      confirmButtonColor: '#3b82f6'
    });
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
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter(u => u.id !== userId));
        Swal.fire({
          title: 'Terhapus!',
          text: 'Data mahasiswa berhasil dihapus.',
          icon: 'success',
          confirmButtonColor: '#10b981'
        });
      }
    });
  };

  // Filter Logic
  const filteredUsers = users.filter(user => {
    return selectedProdi === 'Semua Program Studi' || user.prodi === selectedProdi;
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
          Manajemen data anggota perpustakaan (mahasiswa dan dosen).
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
          {departments.map((dep, index) => (
            <option key={index} value={dep}>{dep}</option>
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
                    key={user.id}
                    style={{
                      borderBottom: index !== filteredUsers.length - 1 ? '1px solid #e2e8f0' : 'none'
                    }}
                  >
                    {/* Student Data Column (Name & NIM) */}
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{user.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>NIM: {user.nim}</div>
                    </td>

                    {/* Program Studi Column */}
                    <td style={{
                      padding: '16px 24px',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#334155'
                    }}>
                      {user.prodi}
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
                        {user.status}
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
                          onClick={() => handleHapus(user.id)}
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

      {/* Style overrides */}
      <style>{`
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
