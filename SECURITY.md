# Security Checklist

Sebelum dipakai untuk data perusahaan sungguhan:

1. Matikan `NEXT_PUBLIC_DEMO_MODE`.
2. Hubungkan Supabase dan jalankan `supabase/schema.sql`.
3. Aktifkan MFA untuk akun owner dan admin.
4. Jangan simpan service-role key di browser atau variabel `NEXT_PUBLIC_*`.
5. Pastikan seluruh tabel memakai Row Level Security.
6. Buat akun admin per orang; jangan berbagi satu kata sandi.
7. Aktifkan backup database dan uji pemulihannya.
8. Gunakan domain HTTPS dan jangan menaruh data sensitif pada log aplikasi.
9. Lakukan pengecekan hak akses Owner, HR Admin, Admin Gudang, dan Viewer sebelum go-live.
10. Simpan ekspor PDF hanya pada perangkat dan lokasi yang diizinkan perusahaan.
