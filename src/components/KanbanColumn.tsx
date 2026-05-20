"use client";
import { Task, Column } from "@/types";
import { TaskCard } from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface KanbanColumnProps {
  column:   Column;
  tasks:    Task[];
  onDelete: (id: string) => void;
  onEdit:   (task: Task) => void;
}

export function KanbanColumn({ column, tasks, onDelete, onEdit }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="flex flex-col min-w-0">
      {/* Column header */}
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2.5 h-2.5 rounded-full ${column.color}`} />
        <h2 className="font-semibold text-gray-700 text-sm">{column.title}</h2>
        <span className="ml-auto bg-gray-100 text-gray-500 text-xs font-semibold px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={`flex-1 rounded-2xl p-3 min-h-[24rem] transition-colors ${
          isOver ? "bg-brand-50 ring-2 ring-brand-300 ring-dashed" : column.bg
        }`}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={onDelete} onEdit={onEdit} />
            ))}
            {tasks.length === 0 && (
              <div className="flex items-center justify-center h-24 text-xs text-gray-400 italic">
                Drop tasks here
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
