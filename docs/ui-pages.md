# UI Pages

## Authentication

### Login Page

Route:
- /login

Components:
- Background Image
- Login Form
- Email Input
- Password Input
- Show Password Toggle
- Login Button

API:
- POST /autentikasi/login

---

# Mahasiswa

## Dashboard

Route:
- /mahasiswa/dashboard

Components:
- Sidebar
- Navbar
- User Profile Summary
- Search Bar

API:
- GET /dashboard/mahasiswa

---

## Eksplorasi Buku

Route:
- /mahasiswa/buku

Components:
- Search Bar
- Filter Kategori
- Book Card Grid
- Pagination

API:
- GET /buku
- GET /kategori
- GET /buku/cari
- GET /buku/kategori/{id}

---

## Detail Buku

Route:
- /mahasiswa/buku/:id

Components:
- Cover Buku
- Detail Buku
- Informasi Rak
- Informasi Stok
- Tombol Pinjam

API:
- GET /buku/{id}
- POST /peminjaman

---

## Pinjamanku

Route:
- /mahasiswa/pinjamanku

Components:
- Daftar Pinjaman Aktif
- Status Pinjaman
- Tombol Perpanjang

API:
- GET /peminjaman
- GET /peminjaman/{id}/aktif

---

## Riwayat Pinjaman

Route:
- /mahasiswa/riwayat

Components:
- Statistik Riwayat
- Daftar Riwayat
- Tombol Pinjam Lagi

API:
- GET /peminjaman/riwayat

---

## Profil Mahasiswa

Route:
- /mahasiswa/profil

Components:
- Avatar
- Informasi Akun
- Form Profil
- Tombol Reset Password

API:
- GET /autentikasi/profil

---

# Admin

## Dashboard Admin

Route:
- /admin/dashboard

Components:
- Statistik Dashboard
- Ringkasan Permintaan Peminjaman
- Quick Overview

API:
- GET /dashboard/admin

---

## Kelola User

Route:
- /admin/users

Components:
- Filter Program Studi
- Tabel Mahasiswa
- Tambah User
- Edit User
- Hapus User

API:
- GET /users
- GET /users/{id}
- POST /users
- PUT /users/{id}
- DELETE /users/{id}
- GET /program-studi

---

## Kelola Buku

Route:
- /admin/buku

Components:
- Tabel Buku
- Filter Kategori
- Tambah Buku
- Edit Buku
- Hapus Buku

API:
- GET /buku
- POST /buku
- PUT /buku/{id}
- DELETE /buku/{id}

---

## Kelola Peminjaman

Route:
- /admin/peminjaman

Tab:
- Menunggu Diambil
- Sedang Dipinjam

Components:
- Tabel Peminjaman
- Tombol Serahkan Buku
- Tombol Terima Buku

API:
- GET /peminjaman
- PATCH /peminjaman/{id}/setujui
- PATCH /peminjaman/{id}/kembalikan

---

## Kelola Denda

Route:
- /admin/denda

Tab:
- Menunggu Pembayaran
- Riwayat Denda

Components:
- Tabel Denda
- Tombol Konfirmasi Pembayaran

API:
- GET /denda
- PATCH /denda/{id}/bayar

---

## Laporan

Route:
- /admin/laporan

Tab:
- Laporan Peminjaman
- Laporan Denda
- Laporan Stok Buku

Components:
- Data Table
- Export PDF
- Export Excel
- Pagination

API:
- GET /laporan/peminjaman
- GET /laporan/denda
- GET /laporan/buku
- GET /laporan/export/pdf
- GET /laporan/export/excel

---

## Profil Admin

Route:
- /admin/profil

Components:
- Avatar
- Informasi Akun
- Form Profil
- Reset Password

API:
- GET /autentikasi/profil