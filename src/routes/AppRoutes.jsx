import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminBooks from "../pages/admin/Books";
import AdminUsers from "../pages/admin/Users";
import AdminBorrowings from "../pages/admin/Borrowings";
import AdminFines from "../pages/admin/Fines";
import AdminReports from "../pages/admin/Reports";
import AdminProfile from "../pages/admin/Profile";
import StudentLayout from "../layouts/StudentLayout";
import StudentDashboard from "../pages/student/Dashboard";
import StudentBooks from "../pages/student/Books";
import BookDetail from "../pages/student/BookDetail";
import StudentBorrowings from "../pages/student/Borrowings";
import StudentHistory from "../pages/student/History";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect empty path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes wrapped in AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="buku" element={<AdminBooks />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="peminjaman" element={<AdminBorrowings />} />
          <Route path="borrowings" element={<AdminBorrowings />} />
          <Route path="denda" element={<AdminFines />} />
          <Route path="laporan" element={<AdminReports />} />
          <Route path="profil" element={<AdminProfile />} />
        </Route>
        
        {/* Student Routes wrapped in StudentLayout */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="explore" element={<StudentBooks />} />
          <Route path="book/:id" element={<BookDetail />} />
          <Route path="loans" element={<StudentBorrowings />} />
          <Route path="history" element={<StudentHistory />} />
        </Route>
        
        {/* Fallback route - redirect any undefined path to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
