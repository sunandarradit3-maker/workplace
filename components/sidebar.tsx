"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  Building2,
  CalendarCheck2,
  FileBarChart,
  LayoutDashboard,
  Settings,
  Users,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/karyawan", label: "Data Karyawan", icon: Users },
  { href: "/absensi", label: "Absensi", icon: CalendarCheck2 },
  { href: "/inventori", label: "Inventori", icon: Boxes },
  { href: "/laporan", label: "Laporan", icon: FileBarChart },
  { href: "/pengaturan", label: "Pengaturan", icon: Settings }
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "NusaWork Control";
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Nama Perusahaan";

  return (
    <>
      <button
        aria-label="Tutup menu"
        className={cn("sidebar-overlay", open && "sidebar-overlay-open")}
        onClick={onClose}
      />
      <aside className={cn("sidebar", open && "sidebar-open")}>
        <div className="brand-row">
          <div className="brand-mark">
            <Building2 size={22} />
          </div>
          <div>
            <strong>{appName}</strong>
            <span>{companyName}</span>
          </div>
          <button className="icon-button sidebar-close" onClick={onClose} aria-label="Tutup menu">
            <X size={20} />
          </button>
        </div>

        <nav className="nav-list" aria-label="Navigasi utama">
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("nav-link", active && "nav-link-active")}
                onClick={onClose}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot" />
          <div>
            <strong>Sistem aktif</strong>
            <small>Mode demo perusahaan</small>
          </div>
        </div>
      </aside>
    </>
  );
}
