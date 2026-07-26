"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, Plus, Search, Trash2, X } from "lucide-react";
import { inventory as initialInventory } from "@/lib/demo-data";
import type { InventoryItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "./status-badge";

const emptyForm = {
  name: "",
  category: "ATK",
  stock: 0,
  minStock: 1,
  unit: "Pcs",
  location: "Gudang A",
  condition: "Baik" as InventoryItem["condition"]
};

export function InventoryManager() {
  const [rows, setRows] = useState<InventoryItem[]>(initialInventory);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => {
    const keyword = query.toLowerCase();
    return rows.filter((row) => [row.itemCode, row.name, row.category, row.location].some((value) => value.toLowerCase().includes(keyword)));
  }, [query, rows]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const nextNumber = rows.length + 1;
    setRows((current) => [{
      id: crypto.randomUUID(),
      itemCode: `BRG-${String(nextNumber).padStart(3, "0")}`,
      name: form.name,
      category: form.category,
      stock: Number(form.stock),
      minStock: Number(form.minStock),
      unit: form.unit,
      location: form.location,
      condition: form.condition,
      updatedAt: new Date().toISOString()
    }, ...current]);
    setForm(emptyForm);
    setOpen(false);
  }

  function adjustStock(id: string, delta: number) {
    setRows((current) => current.map((row) => row.id === id ? { ...row, stock: Math.max(0, row.stock + delta), updatedAt: new Date().toISOString() } : row));
  }

  return (
    <>
      <div className="toolbar">
        <label className="search-field"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari kode, nama, kategori..." /></label>
        <button className="button button-primary" onClick={() => setOpen(true)}><Plus size={18} /> Tambah barang</button>
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table>
            <thead><tr><th>Barang</th><th>Kategori</th><th>Stok</th><th>Lokasi</th><th>Kondisi</th><th>Diperbarui</th><th>Aksi stok</th><th /></tr></thead>
            <tbody>{filtered.map((row) => {
              const lowStock = row.stock <= row.minStock;
              return <tr key={row.id}>
                <td><div><strong>{row.name}</strong><small className="block-muted">{row.itemCode}</small></div></td>
                <td>{row.category}</td>
                <td><div className="stock-cell"><strong className={lowStock ? "text-danger" : ""}>{row.stock} {row.unit}</strong>{lowStock && <span>Stok menipis</span>}</div></td>
                <td>{row.location}</td>
                <td><StatusBadge value={row.condition} /></td>
                <td>{formatDate(row.updatedAt)}</td>
                <td><div className="inline-actions"><button className="mini-button success" onClick={() => adjustStock(row.id, 1)} title="Barang masuk"><ArrowDownToLine size={16} /> Masuk</button><button className="mini-button warning" onClick={() => adjustStock(row.id, -1)} title="Barang keluar"><ArrowUpFromLine size={16} /> Keluar</button></div></td>
                <td><button className="icon-button danger" aria-label={`Hapus ${row.name}`} onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))}><Trash2 size={17} /></button></td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      </div>

      {open && <div className="modal-backdrop"><form className="modal" onSubmit={submit}>
        <div className="modal-header"><div><span className="eyebrow">Inventori</span><h2>Tambah barang</h2></div><button type="button" className="icon-button" onClick={() => setOpen(false)}><X size={20} /></button></div>
        <div className="form-grid">
          <label className="field field-span-2">Nama barang<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label className="field">Kategori<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>ATK</option><option>Elektronik</option><option>Keselamatan</option><option>Furnitur</option><option>Lainnya</option></select></label>
          <label className="field">Satuan<select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}><option>Pcs</option><option>Unit</option><option>Rim</option><option>Box</option><option>Botol</option></select></label>
          <label className="field">Stok awal<input type="number" min="0" required value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} /></label>
          <label className="field">Batas stok minimum<input type="number" min="0" required value={form.minStock} onChange={(e) => setForm({ ...form, minStock: Number(e.target.value) })} /></label>
          <label className="field">Lokasi<input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label>
          <label className="field">Kondisi<select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value as InventoryItem["condition"] })}><option>Baik</option><option>Perlu Perbaikan</option><option>Rusak</option></select></label>
        </div>
        <div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => setOpen(false)}>Batal</button><button className="button button-primary">Simpan barang</button></div>
      </form></div>}
    </>
  );
}
