"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Building2, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "NusaWork Control";
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Nama Perusahaan";

  function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => router.push("/dashboard"), 350);
  }

  return (
    <main className="login-page">
      <section className="login-visual">
        <div className="login-brand">
          <div className="brand-mark large"><Building2 size={28} /></div>
          <div><strong>{appName}</strong><span>{companyName}</span></div>
        </div>
        <div className="login-message">
          <span className="eyebrow light">Sistem operasional terpusat</span>
          <h1>Kelola tim dan inventori dalam satu dashboard.</h1>
          <p>Pantau kehadiran, stok barang, aktivitas pengguna, dan laporan perusahaan secara lebih rapi.</p>
          <div className="security-row"><ShieldCheck size={20} /><span>Akses berbasis peran dan audit aktivitas</span></div>
        </div>
        <div className="login-metrics">
          <div><strong>99%</strong><span>Data lebih terstruktur</span></div>
          <div><strong>1 klik</strong><span>Ekspor laporan PDF</span></div>
          <div><strong>24/7</strong><span>Akses dashboard</span></div>
        </div>
      </section>

      <section className="login-panel">
        <form className="login-card" onSubmit={submit}>
          <div className="login-card-heading">
            <span className="eyebrow">Portal administrasi</span>
            <h2>Masuk ke sistem</h2>
            <p>Gunakan akun yang diberikan oleh administrator perusahaan.</p>
          </div>

          <label className="field">Email
            <div className="input-icon"><Mail size={18} /><input type="email" defaultValue="admin@perusahaan.co.id" required /></div>
          </label>
          <label className="field">Kata sandi
            <div className="input-icon"><LockKeyhole size={18} /><input type={showPassword ? "text" : "password"} defaultValue="admin123" required /><button type="button" className="plain-icon" onClick={() => setShowPassword((value) => !value)} aria-label="Tampilkan kata sandi">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
          </label>

          <div className="login-options"><label><input type="checkbox" defaultChecked /> Ingat perangkat ini</label><button type="button" className="text-button">Lupa kata sandi?</button></div>
          <button className="button button-primary login-submit" disabled={loading}>{loading ? "Memuat..." : <>Masuk ke dashboard <ArrowRight size={18} /></>}</button>
          <p className="demo-note">Mode demo aktif. Tekan tombol masuk untuk melihat dashboard.</p>
        </form>
      </section>
    </main>
  );
}
