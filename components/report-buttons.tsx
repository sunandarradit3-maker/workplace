"use client";

import { Download, Printer } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { attendance, inventory } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

export function ReportButtons({ type }: { type: "attendance" | "inventory" }) {
  function downloadPdf() {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const company = process.env.NEXT_PUBLIC_COMPANY_NAME || "Nama Perusahaan";
    const title = type === "attendance" ? "Laporan Absensi Karyawan" : "Laporan Inventori Barang";

    doc.setFontSize(18);
    doc.text(company, 14, 16);
    doc.setFontSize(12);
    doc.text(title, 14, 24);
    doc.setFontSize(9);
    doc.text(`Dicetak: ${new Intl.DateTimeFormat("id-ID", { dateStyle: "full", timeStyle: "short" }).format(new Date())}`, 14, 31);

    if (type === "attendance") {
      autoTable(doc, {
        startY: 38,
        head: [["Tanggal", "Kode", "Karyawan", "Jam Masuk", "Jam Pulang", "Status", "Keterangan"]],
        body: attendance.map((row) => [formatDate(row.date), row.employeeId, row.employeeName, row.checkIn || "-", row.checkOut || "-", row.status, row.note || "-"]),
        styles: { fontSize: 8, cellPadding: 2.5 },
        headStyles: { fillColor: [24, 49, 83] }
      });
    } else {
      autoTable(doc, {
        startY: 38,
        head: [["Kode", "Nama Barang", "Kategori", "Stok", "Minimum", "Lokasi", "Kondisi"]],
        body: inventory.map((row) => [row.itemCode, row.name, row.category, `${row.stock} ${row.unit}`, row.minStock, row.location, row.condition]),
        styles: { fontSize: 8, cellPadding: 2.5 },
        headStyles: { fillColor: [24, 49, 83] }
      });
    }

    const pageCount = doc.getNumberOfPages();
    for (let page = 1; page <= pageCount; page += 1) {
      doc.setPage(page);
      doc.setFontSize(8);
      doc.text(`Halaman ${page} dari ${pageCount}`, 270, 200, { align: "right" });
    }

    doc.save(`${type === "attendance" ? "laporan-absensi" : "laporan-inventori"}.pdf`);
  }

  return (
    <div className="report-actions">
      <button className="button button-secondary" onClick={() => window.print()}><Printer size={18} /> Cetak</button>
      <button className="button button-primary" onClick={downloadPdf}><Download size={18} /> Simpan PDF</button>
    </div>
  );
}
