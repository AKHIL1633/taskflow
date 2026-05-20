"use client";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: number;
  icon:  LucideIcon;
  color: string;  // Tailwind text color class
  bg:    string;  // Tailwind bg color class
}

export function StatsCard({ label, value, icon: Icon, color, bg }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}
