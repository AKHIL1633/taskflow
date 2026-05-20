import { Priority } from "@/types";

const MAP: Record<Priority, { label: string; cls: string }> = {
  high:   { label: "High",   cls: "bg-red-100 text-red-700" },
  medium: { label: "Medium", cls: "bg-yellow-100 text-yellow-700" },
  low:    { label: "Low",    cls: "bg-green-100 text-green-700" },
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  const { label, cls } = MAP[priority];
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cls}`}>
      {label}
    </span>
  );
}
