import { AppShell } from "@/components/app-shell";
import { AttendanceManager } from "@/components/attendance-manager";

export default function AttendancePage() {
  return <AppShell><section className="page-heading"><div><span className="eyebrow">Kehadiran tim</span><h1>Absensi karyawan</h1><p>Catat dan pantau status kehadiran karyawan setiap hari.</p></div></section><AttendanceManager /></AppShell>;
}
