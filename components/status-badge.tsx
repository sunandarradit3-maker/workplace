import { cn } from "@/lib/utils";

export function StatusBadge({ value }: { value: string }) {
  const normalized = value.toLowerCase().replaceAll(" ", "-");
  return <span className={cn("badge", `badge-${normalized}`)}>{value}</span>;
}
