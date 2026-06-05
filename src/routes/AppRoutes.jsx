import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import StudentDashboard from "../pages/student/Dashboard";
import StudentBooks from "../pages/student/Books";
import BookDetail from "../pages/student/BookDetail";
import StudentBorrowings from "../pages/student/Borrowings";
import StudentHistory from "../pages/student/History";
import StudentLayout from "../layouts/StudentLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect empty path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Admin Route */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Student Routes */}
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
