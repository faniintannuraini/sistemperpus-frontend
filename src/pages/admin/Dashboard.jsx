import React from 'react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Buku', count: '1,240', icon: '📚', change: '+12 buku baru minggu ini', color: '#2563eb', bg: 'rgba(37, 99, 235, 0.05)' },
    { title: 'Total User', count: '450', icon: '👥', change: '+8 anggota baru hari ini', color: '#10b981', bg: 'rgba(16, 185, 129, 0.05)' },
    { title: 'Buku Dipinjam', count: '84', icon: '📖', change: '12 buku menunggu diambil', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.05)' },
    { title: 'Denda Aktif', count: 'Rp 150,000', icon: '⚠️', change: 'Dari 5 peminjam terlambat', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.05)' }
  ];

  const requests = [
    { name: 'Budi Santoso', book: 'Pengantar Algoritma dan Struktur Data', date: '05 Juni 2026', status: 'Menunggu Diambil', badgeColor: '#2563eb', badgeBg: 'rgba(37, 99, 235, 0.08)' },
    { name: 'Siti Aminah', book: 'Pemrograman Web Modern dengan React', date: '04 Juni 2026', status: 'Menunggu Diambil', badgeColor: '#2563eb', badgeBg: 'rgba(37, 99, 235, 0.08)' },
    { name: 'Rian Hidayat', book: 'Dasar-Dasar Desain Grafis', date: '04 Juni 2026', status: 'Sedang Dipinjam', badgeColor: '#10b981', badgeBg: 'rgba(16, 185, 129, 0.08)' },
    { name: 'Dewi Lestari', book: 'Analisis Data dengan Python', date: '03 Juni 2026', status: 'Terlambat', badgeColor: '#ef4444', badgeBg: 'rgba(239, 68, 68, 0.08)' }
  ];

  const activities = [
    { user: 'Admin', desc: 'Menambahkan 5 buku kategori Teknologi Informasi', time: '10 menit yang lalu' },
    { user: 'Budi Santoso', desc: 'Mengajukan peminjaman buku "Pengantar Algoritma"', time: '25 menit yang lalu' },
    { user: 'Siti Aminah', desc: 'Mengembalikan buku "UI/UX Design Essentials"', time: '1 jam yang lalu' },
    { user: 'Rian Hidayat', desc: 'Melakukan pembayaran denda keterlambatan', time: '2 jam yang lalu' },
    { user: 'Dewi Lestari', desc: 'Mendaftar sebagai anggota perpustakaan baru', time: '3 jam yang lalu' }
  ];

  const quickOverview = {
    lateBooks: [
      { title: 'Logika Matematika', user: 'Dewi Lestari', days: '3 hari terlambat' },
      { title: 'Jaringan Komputer', user: 'Fajar Nugraha', days: '1 hari terlambat' }
    ],
    borrowedToday: [
      { title: 'Pemrograman Web Modern', category: 'Teknologi' },
      { title: 'Dasar-Dasar Desain Grafis', category: 'Desain' },
      { title: 'Kecerdasan Buatan', category: 'Teknologi' }
    ],
    activeUsers: [
      { name: 'Budi Santoso', info: '3 peminjaman aktif' },
      { name: 'Siti Aminah', info: '2 peminjaman aktif' },
      { name: 'Rian Hidayat', info: '2 peminjaman aktif' }
    ]
  };

  return (
    <div style={{
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      color: '#1e293b'
    }}>
      {/* Header Dashboard */}
      <div>
        <h1 style={{
          margin: 0,
          fontSize: '28px',
          fontWeight: 700,
          color: '#0f172a',
          letterSpacing: '-0.5px',
          lineHeight: '1.2'
        }}>
          Halo, Admin!
        </h1>
        <p style={{
          margin: '6px 0 0 0',
          fontSize: '14px',
          color: '#64748b',
          fontWeight: 400
        }}>
          Berikut adalah ringkasan aktivitas dan status operasional perpustakaan hari ini.
        </p>
      </div>

      {/* Statistik Ringkas (4 Cards) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="stat-card-hover"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'default'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{stat.title}</span>
              <div style={{
                backgroundColor: stat.bg,
                color: stat.color,
                fontSize: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {stat.icon}
              </div>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>{stat.count}</h3>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 400, marginTop: '4px', display: 'block' }}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid: Permintaan Peminjaman & Aktivitas Terbaru */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gap: '24px',
        alignItems: 'start'
      }} className="dashboard-main-grid">
        {/* Section Permintaan Peminjaman */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Permintaan Peminjaman</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>MAHASISWA</th>
                  <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>JUDUL BUKU</th>
                  <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>TANGGAL</th>
                  <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, idx) => (
                  <tr key={idx} style={{ borderBottom: idx !== requests.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>{req.name}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', color: '#334155' }}>{req.book}</td>
                    <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '13px' }}>{req.date}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        backgroundColor: req.badgeBg,
                        color: req.badgeColor,
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>{req.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section Aktivitas Terbaru */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Aktivitas Terbaru</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activities.map((act, idx) => (
              <div key={idx} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                borderLeft: '2px solid #e2e8f0',
                paddingLeft: '14px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '-5px',
                  top: '4px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#2563eb'
                }}></div>
                <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.4' }}>
                  <strong style={{ color: '#0f172a' }}>{act.user}</strong> {act.desc.replace(act.user, '')}
                </div>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Ringkasan Cepat */}
      <div>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Ringkasan Cepat</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {/* Card: Buku Terlambat */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '20px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚠️</span> Buku Terlambat
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quickOverview.lateBooks.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{item.title}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{item.user}</div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600, backgroundColor: 'rgba(239, 68, 68, 0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                    {item.days}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Buku Dipinjam Hari Ini */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '20px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#2563eb', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📘</span> Dipinjam Hari Ini
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quickOverview.borrowedToday.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{item.title}</div>
                  <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600, backgroundColor: 'rgba(37, 99, 235, 0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Pengguna Aktif */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '20px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⭐</span> Pengguna Aktif
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quickOverview.activeUsers.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{item.name}</div>
                  <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>{item.info}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Extra Responsive stylesheet inject code */}
      <style>{`
        .stat-card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03) !important;
        }
        @media (max-width: 1024px) {
          .dashboard-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
