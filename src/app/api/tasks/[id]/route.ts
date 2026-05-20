import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store";
import { UpdateTaskPayload } from "@/types";

type Params = { params: { id: string } };

// GET /api/tasks/:id
export async function GET(_: NextRequest, { params }: Params) {
  const task = db.getTaskById(params.id);
  if (!task) {
    return NextResponse.json({ error: "Task not found", status: 404 }, { status: 404 });
  }
  return NextResponse.json({ data: task, success: true });
}

// PATCH /api/tasks/:id
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const body: UpdateTaskPayload = await request.json();
    const updated = db.updateTask(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: "Task not found", status: 404 }, { status: 404 });
    }
    return NextResponse.json({ data: updated, success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update task", status: 500 }, { status: 500 });
  }
}

// DELETE /api/tasks/:id
export async function DELETE(_: NextRequest, { params }: Params) {
  const deleted = db.deleteTask(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Task not found", status: 404 }, { status: 404 });
  }
  return NextResponse.json({ data: { id: params.id }, success: true });
}
