import { AppShell } from "@/components/app-shell";
import { ReportButtons } from "@/components/report-buttons";
import { attendance, inventory } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/status-badge";

export default function ReportsPage() {
  return <AppShell>
    <section className="page-heading"><div><span className="eyebrow">Dokumen perusahaan</span><h1>Laporan & cetak PDF</h1><p>Pilih laporan, periksa data, lalu cetak atau simpan sebagai PDF.</p></div></section>
    <section className="report-section panel print-section"><div className="panel-heading"><div><span className="eyebrow">Laporan 01</span><h2>Rekap absensi</h2><p>Periode 25 Juli 2026</p></div><ReportButtons type="attendance" /></div><div className="table-scroll"><table><thead><tr><th>Tanggal</th><th>Karyawan</th><th>Jam masuk</th><th>Jam pulang</th><th>Status</th><th>Keterangan</th></tr></thead><tbody>{attendance.map((row) => <tr key={row.id}><td>{formatDate(row.date)}</td><td>{row.employeeName}</td><td>{row.checkIn || "—"}</td><td>{row.checkOut || "—"}</td><td><StatusBadge value={row.status} /></td><td>{row.note || "—"}</td></tr>)}</tbody></table></div></section>
    <section className="report-section panel print-section"><div className="panel-heading"><div><span className="eyebrow">Laporan 02</span><h2>Rekap inventori</h2><p>Kondisi stok terkini</p></div><ReportButtons type="inventory" /></div><div className="table-scroll"><table><thead><tr><th>Kode</th><th>Barang</th><th>Kategori</th><th>Stok</th><th>Minimum</th><th>Lokasi</th><th>Kondisi</th></tr></thead><tbody>{inventory.map((row) => <tr key={row.id}><td>{row.itemCode}</td><td>{row.name}</td><td>{row.category}</td><td>{row.stock} {row.unit}</td><td>{row.minStock}</td><td>{row.location}</td><td><StatusBadge value={row.condition} /></td></tr>)}</tbody></table></div></section>
  </AppShell>;
}
