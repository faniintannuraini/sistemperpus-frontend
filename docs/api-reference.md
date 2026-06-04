# API Reference

## Base URL

```text
http://localhost:8000/api
```

---

# Authentication

## Login

POST /autentikasi/login

Request:

```json
{
  "email": "student@unper.ac.id",
  "password": "password"
}
```

Response:

```json
{
  "token": "jwt_token",
  "user": {
    "id_user": 1,
    "nama": "Fani",
    "role": "mahasiswa"
  }
}
```

---

## Logout

POST /autentikasi/logout

Auth: Required

---

## Profil

GET /autentikasi/profil

Auth: Required

---

# Dashboard

## Dashboard Admin

GET /dashboard/admin

Auth: Admin

---

## Dashboard Mahasiswa

GET /dashboard/mahasiswa

Auth: Required

---

# Users

GET /users

GET /users/{id}

POST /users

PUT /users/{id}

DELETE /users/{id}

GET /program-studi

Auth: Admin

---

# Buku

GET /buku

GET /buku/{id}

GET /buku/cari?q=python

GET /buku/kategori/{id}

GET /buku/rak/{id}

GET /buku/stok/{id}

POST /buku

PUT /buku/{id}

DELETE /buku/{id}

---

# Kategori

GET /kategori

---

# Peminjaman

GET /peminjaman

GET /peminjaman/{id}

POST /peminjaman

GET /peminjaman/riwayat

GET /peminjaman/{id}/aktif

PATCH /peminjaman/{id}/setujui

PATCH /peminjaman/{id}/tolak

PATCH /peminjaman/{id}/kembalikan

---

# Denda

GET /denda

GET /denda/{id}

GET /denda/saya

PATCH /denda/{id}/bayar

---

# Laporan

GET /laporan/peminjaman

GET /laporan/pengembalian

GET /laporan/denda

GET /laporan/buku

GET /laporan/pengguna

GET /laporan/export/pdf

GET /laporan/export/excel