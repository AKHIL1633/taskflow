"use client";
import { Task } from "@/types";
import { PriorityBadge } from "./PriorityBadge";
import { Calendar, User, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task:     Task;
  onDelete: (id: string) => void;
  onEdit:   (task: Task) => void;
}

export function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform:  CSS.Transform.toString(transform),
    transition,
    opacity:    isDragging ? 0.4 : 1,
  };

  const isOverdue =
    task.status !== "done" &&
    new Date(task.dueDate) < new Date(new Date().toDateString());

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing hover:shadow-md transition-all group"
      {...attributes}
      {...listeners}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3
          className="text-sm font-semibold text-gray-900 leading-tight cursor-pointer hover:text-brand-600 transition-colors"
          onClick={() => onEdit(task)}
        >
          {task.title}
        </h3>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 flex-shrink-0"
          aria-label="Delete task"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{task.description}</p>
      )}

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <PriorityBadge priority={task.priority} />
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {task.assignee}
          </span>
          <span className={`flex items-center gap-1 ${isOverdue ? "text-red-500 font-medium" : ""}`}>
            <Calendar className="w-3 h-3" />
            {new Date(task.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </span>
        </div>
      </div>
    </div>
  );
}
