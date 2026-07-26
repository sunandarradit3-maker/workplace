"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { attendanceTrend, stockMovement } from "@/lib/demo-data";

export function AttendanceChart() {
  return (
    <div className="chart-wrap" aria-label="Grafik kehadiran mingguan">
      <ResponsiveContainer width="100%" height={290}>
        <LineChart data={attendanceTrend} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} />
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--line)" }} />
          <Legend iconType="circle" />
          <Line type="monotone" dataKey="hadir" name="Hadir" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="tidakHadir" name="Tidak hadir" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function InventoryChart() {
  return (
    <div className="chart-wrap" aria-label="Grafik pergerakan stok bulanan">
      <ResponsiveContainer width="100%" height={290}>
        <BarChart data={stockMovement} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} />
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--line)" }} />
          <Legend iconType="circle" />
          <Bar dataKey="masuk" name="Barang masuk" fill="#0f766e" radius={[5, 5, 0, 0]} />
          <Bar dataKey="keluar" name="Barang keluar" fill="#7c3aed" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
