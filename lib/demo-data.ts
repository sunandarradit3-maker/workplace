import type { Attendance, Employee, InventoryItem } from "./types";

export const employees: Employee[] = [
  {
    id: "emp-001",
    employeeCode: "KRY-001",
    name: "Andi Pratama",
    division: "Operasional",
    position: "Supervisor",
    phone: "0812-5550-1001",
    joinDate: "2024-02-12",
    status: "Aktif"
  },
  {
    id: "emp-002",
    employeeCode: "KRY-002",
    name: "Siti Rahma",
    division: "Keuangan",
    position: "Admin Finance",
    phone: "0812-5550-1002",
    joinDate: "2024-03-05",
    status: "Aktif"
  },
  {
    id: "emp-003",
    employeeCode: "KRY-003",
    name: "Dimas Saputra",
    division: "Gudang",
    position: "Staff Gudang",
    phone: "0812-5550-1003",
    joinDate: "2024-05-20",
    status: "Aktif"
  },
  {
    id: "emp-004",
    employeeCode: "KRY-004",
    name: "Nadia Putri",
    division: "HR",
    position: "HR Officer",
    phone: "0812-5550-1004",
    joinDate: "2025-01-10",
    status: "Aktif"
  },
  {
    id: "emp-005",
    employeeCode: "KRY-005",
    name: "Rizky Maulana",
    division: "Operasional",
    position: "Staff Lapangan",
    phone: "0812-5550-1005",
    joinDate: "2025-04-18",
    status: "Nonaktif"
  }
];

export const attendance: Attendance[] = [
  {
    id: "att-001",
    employeeId: "emp-001",
    employeeName: "Andi Pratama",
    date: "2026-07-25",
    checkIn: "07:53",
    checkOut: "17:04",
    status: "Hadir",
    note: ""
  },
  {
    id: "att-002",
    employeeId: "emp-002",
    employeeName: "Siti Rahma",
    date: "2026-07-25",
    checkIn: "08:12",
    checkOut: "17:10",
    status: "Terlambat",
    note: "Kendala kendaraan"
  },
  {
    id: "att-003",
    employeeId: "emp-003",
    employeeName: "Dimas Saputra",
    date: "2026-07-25",
    checkIn: null,
    checkOut: null,
    status: "Sakit",
    note: "Surat dokter diterima"
  },
  {
    id: "att-004",
    employeeId: "emp-004",
    employeeName: "Nadia Putri",
    date: "2026-07-25",
    checkIn: "07:48",
    checkOut: "17:01",
    status: "Hadir",
    note: ""
  }
];

export const inventory: InventoryItem[] = [
  {
    id: "inv-001",
    itemCode: "BRG-001",
    name: "Laptop Operasional",
    category: "Elektronik",
    stock: 12,
    minStock: 4,
    unit: "Unit",
    location: "Ruang IT",
    condition: "Baik",
    updatedAt: "2026-07-25T08:15:00+07:00"
  },
  {
    id: "inv-002",
    itemCode: "BRG-002",
    name: "Kertas A4",
    category: "ATK",
    stock: 8,
    minStock: 10,
    unit: "Rim",
    location: "Gudang A",
    condition: "Baik",
    updatedAt: "2026-07-25T09:00:00+07:00"
  },
  {
    id: "inv-003",
    itemCode: "BRG-003",
    name: "Printer Laser",
    category: "Elektronik",
    stock: 3,
    minStock: 2,
    unit: "Unit",
    location: "Ruang Admin",
    condition: "Perlu Perbaikan",
    updatedAt: "2026-07-24T16:40:00+07:00"
  },
  {
    id: "inv-004",
    itemCode: "BRG-004",
    name: "Tinta Printer Hitam",
    category: "ATK",
    stock: 4,
    minStock: 6,
    unit: "Botol",
    location: "Gudang A",
    condition: "Baik",
    updatedAt: "2026-07-25T10:10:00+07:00"
  },
  {
    id: "inv-005",
    itemCode: "BRG-005",
    name: "Safety Helmet",
    category: "Keselamatan",
    stock: 40,
    minStock: 15,
    unit: "Pcs",
    location: "Gudang B",
    condition: "Baik",
    updatedAt: "2026-07-23T11:30:00+07:00"
  }
];

export const attendanceTrend = [
  { day: "Sen", hadir: 28, tidakHadir: 3 },
  { day: "Sel", hadir: 29, tidakHadir: 2 },
  { day: "Rab", hadir: 27, tidakHadir: 4 },
  { day: "Kam", hadir: 30, tidakHadir: 1 },
  { day: "Jum", hadir: 26, tidakHadir: 5 },
  { day: "Sab", hadir: 21, tidakHadir: 2 }
];

export const stockMovement = [
  { month: "Feb", masuk: 48, keluar: 30 },
  { month: "Mar", masuk: 42, keluar: 35 },
  { month: "Apr", masuk: 55, keluar: 44 },
  { month: "Mei", masuk: 37, keluar: 29 },
  { month: "Jun", masuk: 63, keluar: 51 },
  { month: "Jul", masuk: 52, keluar: 39 }
];
