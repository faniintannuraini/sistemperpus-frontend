# Database Plan

## users

Menyimpan data akun login.

| Field | Type |
|---------|---------|
| id_user | INT |
| email | VARCHAR |
| password | VARCHAR |
| role | ENUM(admin, mahasiswa) |

---

## admin

Menyimpan data admin perpustakaan.

| Field | Type |
|---------|---------|
| id_admin | INT |
| id_user | INT |
| nama | VARCHAR |


Relasi:
- Admin memiliki satu User

---

## prodi

Menyimpan data program studi.

| Field | Type |
|---------|---------|
| id_prodi | INT |
| nama_prodi | VARCHAR |

---

## mahasiswa

Menyimpan data mahasiswa.

| Field | Type |
|---------|---------|
| id_mahasiswa | INT |
| id_user | INT |
| id_prodi | INT |
| nim | VARCHAR |
| nama | VARCHAR |

Relasi:
- Mahasiswa memiliki satu User
- Mahasiswa memiliki satu Prodi

---

## kategori

Menyimpan kategori buku.

| Field | Type |
|---------|---------|
| id_kategori | INT |
| nama_kategori | VARCHAR |

---

## buku

Menyimpan data koleksi buku.

| Field | Type |
|---------|---------|
| id_buku | INT |
| id_kategori | INT |
| id_rak | VARCHAR |
| judul | VARCHAR |
| penulis | VARCHAR |
| penerbit | VARCHAR |
| isbn | VARCHAR |
| tahun_terbit | YEAR |
| jml_halaman | INT |
| lokasi_rak | VARCHAR |
| stok | INT |
| cover_img | VARCHAR |

Relasi:
- Buku memiliki satu Kategori

---

## peminjaman

Menyimpan transaksi peminjaman.

| Field | Type |
|---------|---------|
| id_transaksi | INT |
| id_user | INT |
| id_buku | INT |
| tgl_request | DATE |
| tgl_pinjam | DATE |
| tgl_kembali | DATE |
| status | VARCHAR |

Relasi:
- User dapat memiliki banyak Peminjaman
- Buku dapat muncul di banyak Peminjaman
- Admin mengelola Peminjaman

---

## denda

Menyimpan data keterlambatan.

| Field | Type |
|---------|---------|
| id_denda | INT |
| id_transaksi | INT |
| jml_hari | INT |
| total_denda | DECIMAL |
| status_bayar | ENUM(lunas, belum_lunas) |

Relasi:
- Satu Peminjaman memiliki 0 atau 1 Denda