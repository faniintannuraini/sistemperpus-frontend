import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import StudentDashboard from "../pages/student/Dashboard";

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
        
        {/* Student Route */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        
        {/* Fallback route - redirect any undefined path to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
