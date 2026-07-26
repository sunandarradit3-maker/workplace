# NusaWork Control

MVP dashboard perusahaan untuk mengelola:

- Data karyawan
- Absensi hadir, terlambat, izin, sakit, alfa, dan libur
- Inventori dan batas stok minimum
- Barang masuk dan keluar
- Grafik kehadiran dan pergerakan stok
- Laporan absensi dan inventori
- Cetak serta ekspor PDF
- Struktur hak akses Owner, Admin HR, Admin Gudang, dan Viewer

## Tampilan yang tersedia

- `/login`
- `/dashboard`
- `/karyawan`
- `/absensi`
- `/inventori`
- `/laporan`
- `/pengaturan`

## Menjalankan demo

1. Salin `.env.example` menjadi `.env.local`.
2. Pastikan `NEXT_PUBLIC_DEMO_MODE="true"`.
3. Jalankan:

```bash
npm install
npm run dev
```

4. Buka `http://localhost:3000`.
5. Pada halaman login, tekan **Masuk ke dashboard**. Isian akun pada mode demo hanya untuk tampilan.

## Menyiapkan database produksi

Project menyertakan `supabase/schema.sql` yang berisi:

- Tabel profil pengguna dan peran
- Tabel karyawan
- Tabel absensi
- Tabel inventori
- Riwayat transaksi stok
- Audit log
- Trigger perubahan stok atomik
- Row Level Security berdasarkan peran

Langkah pemasangan:

1. Buat project Supabase baru.
2. Buka SQL Editor dan jalankan `supabase/schema.sql`.
3. Opsional: jalankan `supabase/seed.sql` untuk data contoh.
4. Isi `.env.local`:

```env
NEXT_PUBLIC_APP_NAME="NusaWork Control"
NEXT_PUBLIC_COMPANY_NAME="Nama Perusahaan"
NEXT_PUBLIC_DEMO_MODE="false"
NEXT_PUBLIC_SUPABASE_URL="https://PROJECT.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="ANON_KEY"
```

5. Buat akun pengguna melalui Supabase Auth.
6. Tambahkan profil pengguna pada tabel `profiles` dan tetapkan role yang sesuai.

> UI yang disertakan pada paket ini adalah MVP/demo interaktif. Sebelum go-live, sambungkan form CRUD ke tabel Supabase, aktifkan autentikasi pada route dashboard, dan lakukan pengujian hak akses. Skema database dan klien Supabase sudah disiapkan agar tahap integrasi lebih cepat.

## Deploy ke Vercel

1. Push folder project ke GitHub.
2. Import repository di Vercel sebagai project Next.js.
3. Tambahkan seluruh environment variable.
4. Jalankan deployment.

## Penyesuaian untuk buyer

Ubah nilai berikut di `.env.local`:

- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_COMPANY_NAME`

Logo dapat menggantikan brand mark pada `components/sidebar.tsx` dan `app/login/page.tsx`.

## Keamanan

Baca `SECURITY.md` sebelum sistem digunakan untuk data perusahaan nyata. Jangan gunakan mode demo sebagai sistem produksi.
