import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NusaWork Control",
  description: "Sistem manajemen karyawan, absensi, inventori, dan laporan perusahaan."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
