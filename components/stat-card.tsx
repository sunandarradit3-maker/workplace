import type { LucideIcon } from "lucide-react";

export function StatCard({
  title,
  value,
  note,
  icon: Icon,
  tone = "blue"
}: {
  title: string;
  value: string;
  note: string;
  icon: LucideIcon;
  tone?: "blue" | "green" | "amber" | "purple";
}) {
  return (
    <article className="stat-card">
      <div className={`stat-icon stat-icon-${tone}`}>
        <Icon size={22} />
      </div>
      <div className="stat-copy">
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
    </article>
  );
}
