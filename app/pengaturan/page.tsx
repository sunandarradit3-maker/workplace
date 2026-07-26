import { AppShell } from "@/components/app-shell";

export default function SettingsPage() {
  return <AppShell>
    <section className="page-heading"><div><span className="eyebrow">Konfigurasi</span><h1>Pengaturan sistem</h1><p>Atur identitas perusahaan, aturan absensi, dan keamanan akun.</p></div></section>
    <section className="settings-grid">
      <article className="panel"><div className="panel-heading"><div><span className="eyebrow">Perusahaan</span><h2>Identitas aplikasi</h2></div></div><div className="form-grid"><label className="field field-span-2">Nama perusahaan<input defaultValue="Nama Perusahaan" /></label><label className="field field-span-2">Nama aplikasi<input defaultValue="NusaWork Control" /></label><label className="field">Jam kerja mulai<input type="time" defaultValue="08:00" /></label><label className="field">Jam kerja selesai<input type="time" defaultValue="17:00" /></label></div><div className="panel-footer"><button className="button button-primary">Simpan perubahan</button></div></article>
      <article className="panel"><div className="panel-heading"><div><span className="eyebrow">Hak akses</span><h2>Peran pengguna</h2></div></div><div className="role-list"><div><strong>Owner</strong><span>Akses penuh, termasuk pengguna dan pengaturan.</span></div><div><strong>Admin HR</strong><span>Kelola data karyawan, absensi, dan laporan.</span></div><div><strong>Admin Gudang</strong><span>Kelola inventori dan pergerakan barang.</span></div><div><strong>Viewer</strong><span>Hanya melihat dashboard dan laporan.</span></div></div></article>
    </section>
  </AppShell>;
}
