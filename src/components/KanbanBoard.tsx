"use client";
import { useState, useCallback } from "react";
import { Task, Status, Column, CreateTaskPayload } from "@/types";
import { taskService, computeStats } from "@/lib/api";
import { KanbanColumn } from "./KanbanColumn";
import { CreateTaskModal } from "./CreateTaskModal";
import { StatsCard } from "./StatsCard";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Plus, LayoutDashboard, AlertCircle, CheckCircle2, Clock, ListTodo } from "lucide-react";
import { TaskCard } from "./TaskCard";

const COLUMNS: Column[] = [
  { id: "todo",        title: "To Do",       color: "bg-gray-400",   bg: "bg-gray-50" },
  { id: "in-progress", title: "In Progress", color: "bg-brand-500",  bg: "bg-brand-50/40" },
  { id: "done",        title: "Done",        color: "bg-emerald-500", bg: "bg-emerald-50/40" },
];

interface KanbanBoardProps {
  initialTasks: Task[];
}

export function KanbanBoard({ initialTasks }: KanbanBoardProps) {
  const [tasks,        setTasks]        = useState<Task[]>(initialTasks);
  const [showModal,    setShowModal]    = useState(false);
  const [activeTask,   setActiveTask]   = useState<Task | null>(null);
  const [editingTask,  setEditingTask]  = useState<Task | null>(null);

  const stats = computeStats(tasks);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // ── Drag handlers ──────────────────────────────────────────────────────────
  function handleDragStart({ active }: DragStartEvent) {
    setActiveTask(tasks.find((t) => t.id === active.id) ?? null);
  }

  async function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveTask(null);
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    // Dropped on a column
    const targetColumn = COLUMNS.find((c) => c.id === over.id);
    if (targetColumn && activeTask.status !== targetColumn.id) {
      const newStatus = targetColumn.id as Status;
      setTasks((prev) =>
        prev.map((t) => (t.id === activeTask.id ? { ...t, status: newStatus } : t))
      );
      await taskService.update(activeTask.id, { status: newStatus }).catch(console.error);
      return;
    }

    // Dropped on another task (reorder within column)
    const overTask = tasks.find((t) => t.id === over.id);
    if (overTask && activeTask.status === overTask.status) {
      setTasks((prev) => {
        const colTasks = prev.filter((t) => t.status === activeTask.status);
        const others   = prev.filter((t) => t.status !== activeTask.status);
        const aIdx     = colTasks.findIndex((t) => t.id === active.id);
        const oIdx     = colTasks.findIndex((t) => t.id === over.id);
        return [...others, ...arrayMove(colTasks, aIdx, oIdx)];
      });
    } else if (overTask && activeTask.status !== overTask.status) {
      // Move to different column by dropping on a task
      const newStatus = overTask.status;
      setTasks((prev) =>
        prev.map((t) => (t.id === activeTask.id ? { ...t, status: newStatus } : t))
      );
      await taskService.update(activeTask.id, { status: newStatus }).catch(console.error);
    }
  }

  // ── CRUD ───────────────────────────────────────────────────────────────────
  const handleCreate = useCallback(async (payload: CreateTaskPayload) => {
    const task = await taskService.create(payload);
    setTasks((prev) => [task, ...prev]);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    await taskService.delete(id).catch(console.error);
  }, []);

  const handleEdit = useCallback((task: Task) => {
    setEditingTask(task);
    // For brevity, we'll just update the status via a quick prompt
    // In a full app you'd open a proper edit modal
    const newStatus = window.prompt(
      `Update status for "${task.title}"\nOptions: todo | in-progress | done`,
      task.status
    ) as Status | null;
    if (newStatus && ["todo", "in-progress", "done"].includes(newStatus)) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
      );
      taskService.update(task.id, { status: newStatus }).catch(console.error);
    }
    setEditingTask(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-600 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">TaskFlow</span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-brand-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard label="Total Tasks"   value={stats.total}       icon={ListTodo}      color="text-gray-600"    bg="bg-gray-100" />
          <StatsCard label="In Progress"   value={stats.inProgress}  icon={Clock}         color="text-brand-600"   bg="bg-brand-100" />
          <StatsCard label="Completed"     value={stats.done}        icon={CheckCircle2}  color="text-emerald-600" bg="bg-emerald-100" />
          <StatsCard label="High Priority" value={stats.highPriority} icon={AlertCircle}  color="text-red-600"     bg="bg-red-100" />
        </div>

        {/* Kanban Board */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLUMNS.map((col) => (
              <KanbanColumn
                key={col.id}
                column={col}
                tasks={tasks.filter((t) => t.status === col.id)}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask && (
              <div className="rotate-2 shadow-2xl">
                <TaskCard task={activeTask} onDelete={() => {}} onEdit={() => {}} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </main>

      {showModal && (
        <CreateTaskModal onClose={() => setShowModal(false)} onCreate={handleCreate} />
      )}
    </div>
  );
}
