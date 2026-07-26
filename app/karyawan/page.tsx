import { AppShell } from "@/components/app-shell";
import { EmployeeManager } from "@/components/employee-manager";

export default function EmployeesPage() {
  return <AppShell><section className="page-heading"><div><span className="eyebrow">Sumber daya manusia</span><h1>Data karyawan</h1><p>Kelola profil, status, divisi, dan informasi karyawan.</p></div></section><EmployeeManager /></AppShell>;
}
