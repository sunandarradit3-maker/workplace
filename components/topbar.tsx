"use client";

import { Bell, Menu, Search } from "lucide-react";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="topbar">
      <button className="icon-button menu-button" onClick={onMenu} aria-label="Buka menu">
        <Menu size={21} />
      </button>

      <div className="topbar-search">
        <Search size={18} />
        <input aria-label="Cari data" placeholder="Cari karyawan, barang, atau laporan..." />
      </div>

      <div className="topbar-actions">
        <button className="icon-button notification-button" aria-label="Notifikasi">
          <Bell size={19} />
          <span className="notification-dot" />
        </button>
        <div className="user-chip">
          <div className="avatar">AD</div>
          <div>
            <strong>Admin Utama</strong>
            <span>Owner</span>
          </div>
        </div>
      </div>
    </header>
  );
}
