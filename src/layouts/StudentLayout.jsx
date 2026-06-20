import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/student-layout.css';

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768); // Default open on desktop
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [profile, setProfile] = useState({ nama: 'Fani', nama_prodi: 'Teknik Informatika' });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/user/profil');
      if (response.data && response.data.data) {
        setProfile(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching student profile:', error);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Keluar Akun',
      text: 'Apakah Anda yakin ingin keluar dari akun Anda?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Keluar!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.post('/logout');
        } catch (err) {
          console.error('Logout error:', err);
        }
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
      }
    });
  };

  const handleMenuClick = () => {
    if (isMobile) {
      setSidebarOpen(false); // Close sidebar on mobile item click
    }
  };

  const isExploreActive =
    location.pathname === '/student/explore' ||
    location.pathname.startsWith('/student/explore/') ||
    location.pathname.startsWith('/student/books') ||
    location.pathname.startsWith('/student/book');

  return (
    <div className="student-layout-container">
      {/* Backdrop overlay for mobile drawer only */}
      {isMobile && sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar (260px or collapsed to 80px / fixed on mobile) */}
      <aside className={`student-sidebar ${!sidebarOpen ? 'collapsed' : ''} ${sidebarOpen ? 'open' : ''}`}>
        <div className="student-sidebar-brand">
          <div className="brand-logo-container">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="6" fill="#2563eb" />
              <g transform="translate(2.4, 2.4) scale(0.8)">
                <path
                  d="M12 21C12 21 8.5 17 3 17V5C8.5 5 12 9 12 9M12 21C12 21 15.5 17 21 17V5C15.5 5 12 9 12 9M12 21V9"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
          <div className="brand-text-container">
            <h2 className="brand-text brand-title">Perpustakaan</h2>
            <span className="brand-text brand-subtitle">UNPER Tasikmalaya</span>
          </div>
        </div>

        <ul className="student-sidebar-menu">
          <li>
            <NavLink to="/student/dashboard" className={({ isActive }) => `student-menu-item ${isActive ? 'active' : ''}`} onClick={handleMenuClick}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="menu-text">Beranda</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/explore" className={`student-menu-item ${isExploreActive ? 'active' : ''}`} onClick={handleMenuClick}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="menu-text">Eksplorasi Buku</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/loans" className={({ isActive }) => `student-menu-item ${isActive ? 'active' : ''}`} onClick={handleMenuClick}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="menu-text">Pinjamanku</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/history" className={({ isActive }) => `student-menu-item ${isActive ? 'active' : ''}`} onClick={handleMenuClick}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="menu-text">Riwayat Peminjaman</span>
            </NavLink>
          </li>
        </ul>

        <div className="student-sidebar-footer">
          <button className="student-logout-btn" onClick={handleLogout}>
            <span className="menu-text">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="student-main-content">
        {/* Top Navbar */}
        <nav className="student-navbar">
          <div className="student-navbar-left">
            <button className="hamburger-btn" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle Sidebar">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="search-container">
              <svg
                className="search-icon"
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
                className="search-input"
                placeholder="Cari judul buku, penulis, atau ISBN..."
                value={new URLSearchParams(location.search).get('q') || ''}
                onChange={(e) => navigate(`/student/explore?q=${encodeURIComponent(e.target.value)}`)}
              />
            </div>
          </div>

          <div className="student-navbar-right">
            <div className="user-profile-info">
              <div className="user-details">
                <span className="user-name">{profile.nama || 'Mahasiswa'}</span>
                <span className="user-role">{profile.nama_prodi || 'Teknik Informatika'}</span>
              </div>
              <div className="user-avatar">{profile.nama ? profile.nama.charAt(0).toUpperCase() : 'M'}</div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="student-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
