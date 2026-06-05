import React, { useState } from 'react';

export default function Users() {
  const departments = [
    'Semua Program Studi',
    'Teknik Informatika',
    'Sistem Informasi',
    'Desain Komunikasi Visual',
    'Manajemen Bisnis',
    'Teknik Elektro'
  ];

  const initialUsers = [
    { id: 1, name: 'Budi Santoso', nim: '120220001', prodi: 'Teknik Informatika', email: 'budi@mhs.ac.id', status: 'Aktif' },
    { id: 2, name: 'Siti Aminah', nim: '120220002', prodi: 'Sistem Informasi', email: 'siti@mhs.ac.id', status: 'Aktif' },
    { id: 3, name: 'Rian Hidayat', nim: '120220003', prodi: 'Desain Komunikasi Visual', email: 'rian@mhs.ac.id', status: 'Aktif' },
    { id: 4, name: 'Dewi Lestari', nim: '120220004', prodi: 'Manajemen Bisnis', email: 'dewi@mhs.ac.id', status: 'Aktif' },
    { id: 5, name: 'Fajar Nugraha', nim: '120220005', prodi: 'Teknik Informatika', email: 'fajar@mhs.ac.id', status: 'Aktif' },
    { id: 6, name: 'Indra Wijaya', nim: '120220006', prodi: 'Teknik Elektro', email: 'indra@mhs.ac.id', status: 'Aktif' },
    { id: 7, name: 'Lani Rahmawati', nim: '120220007', prodi: 'Sistem Informasi', email: 'lani@mhs.ac.id', status: 'Aktif' },
    { id: 8, name: 'Rizky Pratama', nim: '120220008', prodi: 'Desain Komunikasi Visual', email: 'rizky@mhs.ac.id', status: 'Aktif' }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [selectedProdi, setSelectedProdi] = useState('Semua Program Studi');

  // Action Handlers
  const handleAddUser = () => {
    alert('Aksi Tambah Mahasiswa dipicu (Modal form tambah mahasiswa baru akan muncul).');
  };

  const handleEdit = (user) => {
    alert(`Edit Data Mahasiswa: "${user.name}" (Modal form edit data mahasiswa akan muncul).`);
  };

  const handleHapus = (userId) => {
    if (confirm('Apakah Anda yakin ingin menghapus mahasiswa ini dari database?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  // Filter Logic
  const filteredUsers = users.filter(user => {
    return selectedProdi === 'Semua Program Studi' || user.prodi === selectedProdi;
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
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '9px 14px',
            fontSize: '14px',
            color: '#334155',
            outline: 'none',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.02)',
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
          className="tambah-user-btn"
          style={{
            backgroundColor: '#10b981', // green accent
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
            boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.1), 0 2px 4px -1px rgba(16, 185, 129, 0.06)'
          }}
        >
          <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <span>Tambah Mahasiswa</span>
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
        {filteredUsers.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#fafafb' }}>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>DATA MAHASISWA</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>PROGRAM STUDI</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>EMAIL</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>STATUS</th>
                  <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '12px', fontWeight: 600, textAlign: 'center', width: '150px' }}>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, idx) => (
                  <tr
                    key={user.id}
                    className="table-row-hover"
                    style={{
                      borderBottom: idx !== filteredUsers.length - 1 ? '1px solid #f1f5f9' : 'none',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    {/* Student Data Column (Name & NIM) */}
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: '#0f172a' }}>{user.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>NIM: {user.nim}</div>
                    </td>

                    {/* Program Studi Column */}
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>
                      {user.prodi}
                    </td>

                    {/* Email Column */}
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>
                      {user.email}
                    </td>

                    {/* Status Column */}
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.08)',
                        color: '#10b981',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        {user.status}
                      </span>
                    </td>

                    {/* Actions Column */}
                    <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(user)}
                          className="action-btn-edit"
                          aria-label="Edit Mahasiswa"
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
                          onClick={() => handleHapus(user.id)}
                          className="action-btn-delete"
                          aria-label="Hapus Mahasiswa"
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: 500 }}>Tidak ada mahasiswa yang ditemukan</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px' }}>Coba ubah filter Program Studi Anda.</p>
          </div>
        )}
      </div>

      {/* Styles Injection */}
      <style>{`
        .tambah-user-btn:hover {
          background-color: #059669 !important;
          transform: translateY(-1px);
        }
        .tambah-user-btn:active {
          transform: translateY(0);
        }
        .table-row-hover:hover {
          background-color: #f8fafc;
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
