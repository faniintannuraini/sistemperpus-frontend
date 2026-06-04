# Struktur Folder Frontend

src/

├── assets/
│   ├── images/
│   ├── icons/
│   └── styles/
│
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── DataTable.jsx
│   ├── SearchBar.jsx
│   └── Loading.jsx
│
├── layouts/
│   ├── AuthLayout.jsx
│   └── DashboardLayout.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Books.jsx
│   ├── Members.jsx
│   ├── Borrowings.jsx
│   └── Returns.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── services/
│   ├── api.js
│   ├── authService.js
│   └── bookService.js
│
├── App.jsx
└── main.jsx

## Prinsip

* Setiap halaman ditempatkan di folder pages.
* Komponen yang digunakan berulang ditempatkan di folder components.
* Semua request API ditempatkan di folder services.
* Layout dipisahkan agar mudah digunakan kembali.
