// ─── Core Domain Types ────────────────────────────────────────────────────────

export type Priority = "low" | "medium" | "high";
export type Status   = "todo" | "in-progress" | "done";

export interface Task {
  id:          string;
  title:       string;
  description: string;
  status:      Status;
  priority:    Priority;
  assignee:    string;
  dueDate:     string;          // ISO date string
  tags:        string[];
  createdAt:   string;          // ISO datetime string
  updatedAt:   string;
}

// ─── API Payload Types ────────────────────────────────────────────────────────

export type CreateTaskPayload = Omit<Task, "id" | "createdAt" | "updatedAt">;
export type UpdateTaskPayload = Partial<CreateTaskPayload>;

// ─── UI / State Types ─────────────────────────────────────────────────────────

export interface Column {
  id:    Status;
  title: string;
  color: string;
  bg:    string;
}

export interface Stats {
  total:      number;
  todo:       number;
  inProgress: number;
  done:       number;
  highPriority: number;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data:    T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  error:   string;
  status:  number;
}
