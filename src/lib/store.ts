import { Task, Stats } from "@/types";
import { v4 as uuidv4 } from "uuid";

// ─── Seed Data ────────────────────────────────────────────────────────────────
const now = new Date().toISOString();

const seedTasks: Task[] = [
  {
    id: uuidv4(), title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment to Vercel.",
    status: "done", priority: "high", assignee: "Riya S.",
    dueDate: "2024-06-10", tags: ["devops", "automation"], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), title: "Design database schema",
    description: "Create ERD and define tables for users, tasks, and projects using PostgreSQL.",
    status: "done", priority: "high", assignee: "Arjun K.",
    dueDate: "2024-06-12", tags: ["database", "architecture"], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), title: "Build REST API endpoints",
    description: "Implement CRUD operations for tasks using Next.js App Router API routes.",
    status: "in-progress", priority: "high", assignee: "You",
    dueDate: "2024-06-20", tags: ["backend", "api"], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), title: "Implement Kanban board UI",
    description: "Build drag-and-drop Kanban board with dnd-kit. Support column reordering.",
    status: "in-progress", priority: "medium", assignee: "You",
    dueDate: "2024-06-22", tags: ["frontend", "ui"], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), title: "Write unit tests",
    description: "Add Jest + React Testing Library tests for all components and API handlers.",
    status: "todo", priority: "medium", assignee: "Riya S.",
    dueDate: "2024-06-28", tags: ["testing"], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), title: "Add authentication with NextAuth",
    description: "Integrate GitHub OAuth and credentials-based login using NextAuth.js v5.",
    status: "todo", priority: "high", assignee: "Arjun K.",
    dueDate: "2024-07-01", tags: ["auth", "security"], createdAt: now, updatedAt: now,
  },
  {
    id: uuidv4(), title: "Mobile responsive design",
    description: "Ensure all pages work across breakpoints. Test on iOS and Android browsers.",
    status: "todo", priority: "low", assignee: "You",
    dueDate: "2024-07-05", tags: ["ui", "responsive"], createdAt: now, updatedAt: now,
  },
];

// ─── In-Memory Store ──────────────────────────────────────────────────────────
// In production, replace this with Prisma + PostgreSQL calls.

let tasks: Task[] = [...seedTasks];

export const db = {
  // READ
  getAllTasks(): Task[] {
    return [...tasks].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getTaskById(id: string): Task | undefined {
    return tasks.find((t) => t.id === id);
  },

  // CREATE
  createTask(payload: Omit<Task, "id" | "createdAt" | "updatedAt">): Task {
    const task: Task = {
      ...payload,
      id:        uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.unshift(task);
    return task;
  },

  // UPDATE
  updateTask(id: string, payload: Partial<Task>): Task | null {
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    tasks[idx] = { ...tasks[idx], ...payload, updatedAt: new Date().toISOString() };
    return tasks[idx];
  },

  // DELETE
  deleteTask(id: string): boolean {
    const before = tasks.length;
    tasks = tasks.filter((t) => t.id !== id);
    return tasks.length < before;
  },

  // STATS
  getStats(): Stats {
    return {
      total:       tasks.length,
      todo:        tasks.filter((t) => t.status === "todo").length,
      inProgress:  tasks.filter((t) => t.status === "in-progress").length,
      done:        tasks.filter((t) => t.status === "done").length,
      highPriority: tasks.filter((t) => t.priority === "high" && t.status !== "done").length,
    };
  },
};
