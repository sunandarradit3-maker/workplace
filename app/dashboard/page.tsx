import { AlertTriangle, Boxes, CalendarCheck2, PackageCheck, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { AttendanceChart, InventoryChart } from "@/components/dashboard-charts";
import { StatCard } from "@/components/stat-card";
import { attendance, employees, inventory } from "@/lib/demo-data";
import { StatusBadge } from "@/components/status-badge";

export default function DashboardPage() {
  const activeEmployees = employees.filter((item) => item.status === "Aktif").length;
  const presentToday = attendance.filter((item) => ["Hadir", "Terlambat"].includes(item.status)).length;
  const lowStock = inventory.filter((item) => item.stock <= item.minStock).length;
  const totalStock = inventory.reduce((total, item) => total + item.stock, 0);

  return (
    <AppShell>
      <section className="page-heading"><div><span className="eyebrow">Ringkasan operasional</span><h1>Selamat datang, Admin</h1><p>Pantau kondisi karyawan dan inventori perusahaan hari ini.</p></div><div className="date-pill">Sabtu, 25 Juli 2026</div></section>

      <section className="stats-grid">
        <StatCard title="Karyawan aktif" value={String(activeEmployees)} note="1 karyawan nonaktif" icon={Users} tone="blue" />
        <StatCard title="Hadir hari ini" value={String(presentToday)} note="75% tingkat kehadiran" icon={CalendarCheck2} tone="green" />
        <StatCard title="Total stok" value={String(totalStock)} note={`${inventory.length} jenis barang`} icon={Boxes} tone="purple" />
        <StatCard title="Stok menipis" value={String(lowStock)} note="Perlu segera ditindak" icon={AlertTriangle} tone="amber" />
      </section>

      <section className="dashboard-grid">
        <article className="panel panel-wide"><div className="panel-heading"><div><span className="eyebrow">Kehadiran</span><h2>Tren mingguan</h2></div><button className="text-button">Lihat detail</button></div><AttendanceChart /></article>
        <article className="panel"><div className="panel-heading"><div><span className="eyebrow">Aktivitas</span><h2>Absensi terbaru</h2></div></div><div className="activity-list">{attendance.map((row) => <div className="activity-row" key={row.id}><span className="mini-avatar">{row.employeeName.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><div><strong>{row.employeeName}</strong><small>{row.checkIn ? `Masuk pukul ${row.checkIn}` : row.note}</small></div><StatusBadge value={row.status} /></div>)}</div></article>
      </section>

      <section className="dashboard-grid second-row">
        <article className="panel panel-wide"><div className="panel-heading"><div><span className="eyebrow">Inventori</span><h2>Pergerakan stok</h2></div><button className="text-button">Lihat inventori</button></div><InventoryChart /></article>
        <article className="panel"><div className="panel-heading"><div><span className="eyebrow">Perhatian</span><h2>Stok minimum</h2></div></div><div className="alert-list">{inventory.filter((item) => item.stock <= item.minStock).map((item) => <div className="alert-row" key={item.id}><div className="alert-icon"><PackageCheck size={18} /></div><div><strong>{item.name}</strong><small>{item.stock} {item.unit} tersisa · Minimum {item.minStock}</small></div></div>)}</div></article>
      </section>
    </AppShell>
  );
}
