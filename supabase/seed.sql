insert into public.employees (employee_code, full_name, division, position, phone, join_date)
values
  ('KRY-001', 'Andi Pratama', 'Operasional', 'Supervisor', '081255501001', '2024-02-12'),
  ('KRY-002', 'Siti Rahma', 'Keuangan', 'Admin Finance', '081255501002', '2024-03-05'),
  ('KRY-003', 'Dimas Saputra', 'Gudang', 'Staff Gudang', '081255501003', '2024-05-20'),
  ('KRY-004', 'Nadia Putri', 'HR', 'HR Officer', '081255501004', '2025-01-10');

insert into public.inventory_items (item_code, item_name, category, current_stock, minimum_stock, unit, location, condition)
values
  ('BRG-001', 'Laptop Operasional', 'Elektronik', 12, 4, 'Unit', 'Ruang IT', 'good'),
  ('BRG-002', 'Kertas A4', 'ATK', 8, 10, 'Rim', 'Gudang A', 'good'),
  ('BRG-003', 'Printer Laser', 'Elektronik', 3, 2, 'Unit', 'Ruang Admin', 'needs_repair'),
  ('BRG-004', 'Tinta Printer Hitam', 'ATK', 4, 6, 'Botol', 'Gudang A', 'good'),
  ('BRG-005', 'Safety Helmet', 'Keselamatan', 40, 15, 'Pcs', 'Gudang B', 'good');
