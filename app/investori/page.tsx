import { AppShell } from "@/components/app-shell";
import { InventoryManager } from "@/components/inventory-manager";

export default function InventoryPage() {
  return <AppShell><section className="page-heading"><div><span className="eyebrow">Aset dan stok</span><h1>Inventori barang</h1><p>Kelola stok masuk, stok keluar, kondisi, dan lokasi barang.</p></div></section><InventoryManager /></AppShell>;
}
