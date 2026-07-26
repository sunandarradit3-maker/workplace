"use client";

import { FormEvent, useMemo, useState } from "react";
import { ClipboardCheck, Plus, Search, Trash2, X } from "lucide-react";
import { attendance as initialAttendance, employees } from "@/lib/demo-data";
import type { Attendance, AttendanceStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "./status-badge";

export function AttendanceManager() {
  const [rows, setRows] = useState<Attendance[]>(initialAttendance);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState(employees[0].id);
  const [status, setStatus] = useState<AttendanceStatus>("Hadir");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [checkIn, setCheckIn] = useState("08:00");
  const [note, setNote] = useState("");

  const filtered = useMemo(() => rows.filter((row) => `${row.employeeName} ${row.status} ${row.date}`.toLowerCase().includes(query.toLowerCase())), [query, rows]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const employee = employees.find((item) => item.id === employeeId)!;
    setRows((current) => [{
      id: crypto.randomUUID(), employeeId, employeeName: employee.name, date,
      checkIn: ["Hadir", "Terlambat"].includes(status) ? checkIn : null,
      checkOut: null, status, note
    }, ...current]);
    setOpen(false);
    setNote("");
  }

  return (
    <>
      <div className="toolbar">
        <label className="search-field"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari nama atau status..." /></label>
        <button className="button button-primary" onClick={() => setOpen(true)}><Plus size={18} /> Catat absensi</button>
      </div>
      <div className="table-card">
        <div className="table-scroll">
          <table>
            <thead><tr><th>Tanggal</th><th>Karyawan</th><th>Jam masuk</th><th>Jam pulang</th><th>Status</th><th>Keterangan</th><th /></tr></thead>
            <tbody>{filtered.map((row) => <tr key={row.id}>
              <td>{formatDate(row.date)}</td><td><strong>{row.employeeName}</strong></td><td>{row.checkIn || "—"}</td><td>{row.checkOut || "—"}</td><td><StatusBadge value={row.status} /></td><td>{row.note || "—"}</td>
              <td><button className="icon-button danger" aria-label="Hapus absensi" onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))}><Trash2 size={17} /></button></td>
            </tr>)}</tbody>
          </table>
        </div>
      </div>

      {open && <div className="modal-backdrop"><form className="modal" onSubmit={submit}>
        <div className="modal-header"><div><span className="eyebrow">Absensi</span><h2>Catat kehadiran</h2></div><button type="button" className="icon-button" onClick={() => setOpen(false)}><X size={20} /></button></div>
        <div className="form-grid">
          <label className="field field-span-2">Karyawan<select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>{employees.filter((item) => item.status === "Aktif").map((item) => <option value={item.id} key={item.id}>{item.name} — {item.division}</option>)}</select></label>
          <label className="field">Tanggal<input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></label>
          <label className="field">Status<select value={status} onChange={(e) => setStatus(e.target.value as AttendanceStatus)}><option>Hadir</option><option>Terlambat</option><option>Izin</option><option>Sakit</option><option>Alfa</option><option>Libur</option></select></label>
          <label className="field">Jam masuk<input type="time" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} disabled={!['Hadir','Terlambat'].includes(status)} /></label>
          <label className="field">Keterangan<input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Opsional" /></label>
        </div>
        <div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => setOpen(false)}>Batal</button><button className="button button-primary"><ClipboardCheck size={18} /> Simpan absensi</button></div>
      </form></div>}
    </>
  );
}
