import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store";
import { CreateTaskPayload } from "@/types";

// GET /api/tasks
export async function GET() {
  try {
    const tasks = db.getAllTasks();
    return NextResponse.json({ data: tasks, success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch tasks", status: 500 }, { status: 500 });
  }
}

// POST /api/tasks
export async function POST(request: NextRequest) {
  try {
    const body: CreateTaskPayload = await request.json();

    // Validate required fields
    if (!body.title?.trim()) {
      return NextResponse.json(
        { error: "Title is required", status: 400 },
        { status: 400 }
      );
    }

    const task = db.createTask({
      title:       body.title.trim(),
      description: body.description?.trim() ?? "",
      status:      body.status      ?? "todo",
      priority:    body.priority    ?? "medium",
      assignee:    body.assignee    ?? "Unassigned",
      dueDate:     body.dueDate     ?? new Date().toISOString().split("T")[0],
      tags:        body.tags        ?? [],
    });

    return NextResponse.json({ data: task, success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create task", status: 500 }, { status: 500 });
  }
}
