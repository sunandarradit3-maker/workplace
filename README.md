# Workplace Control — Production

Sistem manajemen karyawan, absensi, inventori, grafik operasional, laporan PDF/CSV, dan pengaturan hak akses berbasis Supabase.

## Membuka source di komputer

```bash
npm run setup
npm install
npm run dev
```

Perintah `npm run setup` mengekstrak source produksi dari paket `.bootstrap` ke root repository. Setelah diekstrak, README produksi lengkap, skema database, dan seluruh source Next.js akan tersedia seperti project biasa.

## Deploy ke Vercel

Repository sudah memiliki `vercel.json`. Saat di-import ke Vercel, source akan diekstrak otomatis sebelum dependency dipasang.

Environment variable yang wajib diisi:

```env
NEXT_PUBLIC_APP_NAME="Workplace Control"
NEXT_PUBLIC_COMPANY_NAME="Nama Perusahaan"
NEXT_PUBLIC_SUPABASE_URL="https://PROJECT.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="SERVICE_ROLE_KEY"
NEXT_PUBLIC_SITE_URL="https://domain-project.vercel.app"
```

Sebelum deployment, jalankan `supabase/schema.sql` pada SQL Editor Supabase dan ikuti petunjuk akun Owner dalam README yang muncul setelah proses setup.

> `SUPABASE_SERVICE_ROLE_KEY` hanya boleh disimpan sebagai environment variable server dan tidak boleh diberi prefix `NEXT_PUBLIC_`.
