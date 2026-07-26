"use client";

import { FormEvent, useMemo, useState } from "react";
import { Plus, Search, Trash2, X } from "lucide-react";
import { employees as initialEmployees } from "@/lib/demo-data";
import type { Employee } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "./status-badge";

const emptyForm = {
  name: "",
  division: "Operasional",
  position: "",
  phone: "",
  joinDate: new Date().toISOString().slice(0, 10)
};

export function EmployeeManager() {
  const [rows, setRows] = useState<Employee[]>(initialEmployees);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => {
    const keyword = query.toLowerCase();
    return rows.filter((row) =>
      [row.name, row.employeeCode, row.division, row.position].some((value) =>
        value.toLowerCase().includes(keyword)
      )
    );
  }, [query, rows]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const nextNumber = rows.length + 1;
    setRows((current) => [
      {
        id: crypto.randomUUID(),
        employeeCode: `KRY-${String(nextNumber).padStart(3, "0")}`,
        name: form.name,
        division: form.division,
        position: form.position,
        phone: form.phone,
        joinDate: form.joinDate,
        status: "Aktif"
      },
      ...current
    ]);
    setForm(emptyForm);
    setOpen(false);
  }

  return (
    <>
      <div className="toolbar">
        <label className="search-field">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama, kode, divisi..." />
        </label>
        <button className="button button-primary" onClick={() => setOpen(true)}>
          <Plus size={18} /> Tambah karyawan
        </button>
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Karyawan</th>
                <th>Divisi</th>
                <th>Jabatan</th>
                <th>Kontak</th>
                <th>Tanggal masuk</th>
                <th>Status</th>
                <th aria-label="Aksi" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="person-cell">
                      <span className="mini-avatar">{row.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
                      <div><strong>{row.name}</strong><small>{row.employeeCode}</small></div>
                    </div>
                  </td>
                  <td>{row.division}</td>
                  <td>{row.position}</td>
                  <td>{row.phone}</td>
                  <td>{formatDate(row.joinDate)}</td>
                  <td><StatusBadge value={row.status} /></td>
                  <td>
                    <button className="icon-button danger" aria-label={`Hapus ${row.name}`} onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))}>
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div className="modal-backdrop" role="presentation">
          <form className="modal" onSubmit={submit}>
            <div className="modal-header">
              <div><span className="eyebrow">Data baru</span><h2>Tambah karyawan</h2></div>
              <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Tutup"><X size={20} /></button>
            </div>
            <div className="form-grid">
              <label className="field field-span-2">Nama lengkap<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
              <label className="field">Divisi<select value={form.division} onChange={(e) => setForm({ ...form, division: e.target.value })}><option>Operasional</option><option>Keuangan</option><option>Gudang</option><option>HR</option><option>IT</option></select></label>
              <label className="field">Jabatan<input required value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} /></label>
              <label className="field">Nomor HP<input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
              <label className="field">Tanggal masuk<input required type="date" value={form.joinDate} onChange={(e) => setForm({ ...form, joinDate: e.target.value })} /></label>
            </div>
            <div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => setOpen(false)}>Batal</button><button className="button button-primary">Simpan karyawan</button></div>
          </form>
        </div>
      )}
    </>
  );
}
