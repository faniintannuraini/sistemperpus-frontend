# User Flow

## Flow Autentikasi

User membuka aplikasi
↓
Masuk ke halaman Login
↓
Input email dan password
↓
Sistem melakukan autentikasi
↓
Role terdeteksi

Jika role = Mahasiswa
→ Dashboard Mahasiswa

Jika role = Admin
→ Dashboard Admin

---

# Flow Mahasiswa

## 1. Melihat Katalog Buku

Login
↓
Dashboard Mahasiswa
↓
Eksplorasi Buku
↓
Cari atau Filter Buku
↓
Pilih Buku
↓
Detail Buku

---

## 2. Mengajukan Peminjaman Buku

Detail Buku
↓
Klik Tombol Pinjam
↓
Sistem membuat permintaan peminjaman
↓
Status = Menunggu Diambil
↓
Menunggu konfirmasi admin

---

## 3. Melihat Pinjaman Aktif

Dashboard
↓
Pinjamanku
↓
Melihat daftar buku yang sedang dipinjam
↓
Melihat tanggal jatuh tempo
↓
Perpanjang masa pinjam (opsional)

---

## 4. Mengembalikan Buku

Mahasiswa datang ke perpustakaan
↓
Admin menerima buku
↓
Status transaksi berubah menjadi Dikembalikan
↓
Masuk ke Riwayat Pinjaman

---

## 5. Melihat Riwayat

Dashboard
↓
Riwayat Pinjaman
↓
Melihat seluruh transaksi yang pernah dilakukan

---

## 6. Melihat Denda

Dashboard
↓
Pinjaman atau Riwayat
↓
Melihat status keterlambatan
↓
Melihat nominal denda

---

## 7. Mengelola Profil

Dashboard
↓
Profil
↓
Melihat informasi akun
↓
Mengubah password

---

# Flow Admin

## 1. Dashboard

Login
↓
Dashboard Admin
↓
Melihat statistik:

* Total Buku
* Total Mahasiswa
* Buku Dipinjam
* Denda Belum Dibayar

---

## 2. Kelola User

Dashboard
↓
Kelola User
↓
Tambah Mahasiswa
atau
Edit Mahasiswa
atau
Hapus Mahasiswa

---

## 3. Kelola Buku

Dashboard
↓
Kelola Buku
↓
Tambah Buku
atau
Edit Buku
atau
Hapus Buku

---

## 4. Persetujuan Peminjaman

Mahasiswa mengajukan pinjaman
↓
Masuk ke menu Kelola Peminjaman
↓
Tab Menunggu Diambil
↓
Admin menyerahkan buku
↓
Status berubah menjadi Sedang Dipinjam

---

## 5. Pengembalian Buku

Menu Kelola Peminjaman
↓
Tab Sedang Dipinjam
↓
Mahasiswa mengembalikan buku
↓
Admin menerima buku
↓
Status berubah menjadi Dikembalikan

Jika terlambat
↓
Sistem membuat data denda

---

## 6. Kelola Denda

Menu Kelola Denda
↓
Melihat daftar denda
↓
Mahasiswa membayar denda
↓
Admin mengonfirmasi pembayaran
↓
Status = Lunas

---

## 7. Laporan

Menu Laporan
↓
Laporan Peminjaman
atau
Laporan Denda
atau
Laporan Stok Buku
↓
Export PDF
atau
Export Excel

---

## 8. Profil Admin

Dashboard
↓
Profil
↓
Melihat informasi akun
↓
Mengubah password

---

# Status Peminjaman

Menunggu Diambil
↓
Sedang Dipinjam
↓
Dikembalikan

atau

Sedang Dipinjam
↓
Terlambat
↓
Denda Dibuat
↓
Denda Dibayar
↓
Dikembalikan

---

# Status Denda

Belum Lunas
↓
Menunggu Pembayaran
↓
Lunas
