export type AttendanceStatus =
  | "Hadir"
  | "Terlambat"
  | "Izin"
  | "Sakit"
  | "Alfa"
  | "Libur";

export type Employee = {
  id: string;
  employeeCode: string;
  name: string;
  division: string;
  position: string;
  phone: string;
  joinDate: string;
  status: "Aktif" | "Nonaktif";
};

export type Attendance = {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: AttendanceStatus;
  note: string;
};

export type InventoryItem = {
  id: string;
  itemCode: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  unit: string;
  location: string;
  condition: "Baik" | "Perlu Perbaikan" | "Rusak";
  updatedAt: string;
};
