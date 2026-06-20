import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/admin-layout.css';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [profile, setProfile] = useState({ nama: 'Administrator', role: 'admin' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        // Keep sidebar open on desktop transition
        setSidebarOpen(true);
      } else {
        // Keep sidebar closed on mobile transition by default
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
      console.error('Error fetching admin profile:', error);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Keluar Akun',
      text: 'Apakah Anda yakin ingin keluar dari panel admin?',
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

  return (
    <div className="admin-layout-container">
      {/* Backdrop overlay for mobile drawer only */}
      {isMobile && sidebarOpen && (
        <div className="admin-sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${!sidebarOpen ? 'collapsed' : ''} ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-brand">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 21C12 21 8.5 17 3 17V5C8.5 5 12 9 12 9M12 21C12 21 15.5 17 21 17V5C15.5 5 12 9 12 9M12 21V9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className="brand-text">SIPUS ADMIN</h2>
        </div>

        <ul className="admin-sidebar-menu">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
              onClick={handleMenuClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
              </svg>
              <span className="menu-text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/buku"
              className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
              onClick={handleMenuClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="menu-text">Kelola Buku</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
              onClick={handleMenuClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="menu-text">Kelola User</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/peminjaman"
              className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
              onClick={handleMenuClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span className="menu-text">Peminjaman</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/denda"
              className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
              onClick={handleMenuClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="menu-text">Denda</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/laporan"
              className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
              onClick={handleMenuClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H3a2 2 0 01-2-2V5a2 2 0 012-2h18a2 2 0 012 2v14a2 2 0 01-2 2z" />
              </svg>
              <span className="menu-text">Laporan</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/profil"
              className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
              onClick={handleMenuClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="menu-text">Profil</span>
            </NavLink>
          </li>
        </ul>

        <div className="admin-sidebar-footer">
          <button className="admin-logout-btn" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="menu-text">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-content">
        {/* Top Navbar */}
        <nav className="admin-navbar">
          <div className="admin-navbar-left">
            <button
              className="hamburger-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle Sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="search-container">
              <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Cari data, mahasiswa, atau buku..."
              />
            </div>
          </div>

          <div className="admin-navbar-right">
            {/* Notification Button */}
            <button className="notification-btn" aria-label="Notifications">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="notification-badge"></span>
            </button>

            {/* Admin Profile Display */}
            <div className="admin-profile-info">
              <div className="admin-details">
                <span className="admin-name">{profile.nama || 'Administrator'}</span>
                <span className="admin-role">{profile.role === 'admin' ? 'Petugas Perpustakaan' : 'Super Admin'}</span>
              </div>
              <div className="admin-avatar">{profile.nama ? profile.nama.slice(0, 2).toUpperCase() : 'AD'}</div>
            </div>
          </div>
        </nav>

        {/* Content Outlet */}
        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
