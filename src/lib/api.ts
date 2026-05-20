import { Task, CreateTaskPayload, UpdateTaskPayload, Stats, ApiResponse } from "@/types";

const BASE = "/api/tasks";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Network error" }));
    throw new Error(err.error ?? "Request failed");
  }
  const json: ApiResponse<T> = await res.json();
  return json.data;
}

export const taskService = {
  async getAll(): Promise<Task[]> {
    const res = await fetch(BASE, { cache: "no-store" });
    return handleResponse<Task[]>(res);
  },

  async getById(id: string): Promise<Task> {
    const res = await fetch(`${BASE}/${id}`);
    return handleResponse<Task>(res);
  },

  async create(payload: CreateTaskPayload): Promise<Task> {
    const res = await fetch(BASE, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });
    return handleResponse<Task>(res);
  },

  async update(id: string, payload: UpdateTaskPayload): Promise<Task> {
    const res = await fetch(`${BASE}/${id}`, {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });
    return handleResponse<Task>(res);
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
    await handleResponse<{ id: string }>(res);
  },
};

// Compute stats on the client from task list (avoids extra API call)
export function computeStats(tasks: Task[]): Stats {
  return {
    total:        tasks.length,
    todo:         tasks.filter((t) => t.status === "todo").length,
    inProgress:   tasks.filter((t) => t.status === "in-progress").length,
    done:         tasks.filter((t) => t.status === "done").length,
    highPriority: tasks.filter((t) => t.priority === "high" && t.status !== "done").length,
  };
}
