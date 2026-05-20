"use client";
import { useState } from "react";
import { CreateTaskPayload, Priority, Status } from "@/types";
import { X } from "lucide-react";

interface Props {
  onClose:  () => void;
  onCreate: (payload: CreateTaskPayload) => Promise<void>;
}

const defaultForm: CreateTaskPayload = {
  title:       "",
  description: "",
  status:      "todo",
  priority:    "medium",
  assignee:    "",
  dueDate:     new Date().toISOString().split("T")[0],
  tags:        [],
};

export function CreateTaskModal({ onClose, onCreate }: Props) {
  const [form,    setForm]    = useState<CreateTaskPayload>(defaultForm);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  function set<K extends keyof CreateTaskPayload>(key: K, value: CreateTaskPayload[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addTag() {
    const t = tagInput.trim().toLowerCase();
    if (t && !form.tags.includes(t)) set("tags", [...form.tags, t]);
    setTagInput("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { setError("Title is required"); return; }
    setLoading(true);
    try {
      await onCreate(form);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Create New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text" value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Implement login page"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description} rows={3}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Optional details…"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition resize-none"
            />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value as Status)}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => set("priority", e.target.value as Priority)}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Assignee + Due date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
              <input
                type="text" value={form.assignee}
                onChange={(e) => set("assignee", e.target.value)}
                placeholder="Name"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date" value={form.dueDate}
                onChange={(e) => set("dueDate", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div className="flex gap-2">
              <input
                type="text" value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                placeholder="Add tag…"
                className="flex-1 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button type="button" onClick={addTag}
                className="px-4 py-2.5 bg-gray-100 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                Add
              </button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.tags.map((tag) => (
                  <span key={tag}
                    className="flex items-center gap-1 text-xs bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full border border-brand-100">
                    {tag}
                    <button type="button" onClick={() => set("tags", form.tags.filter((t) => t !== tag))}
                      className="text-brand-400 hover:text-brand-700">✕</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-60">
              {loading ? "Creating…" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
