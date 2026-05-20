/**
 * @jest-environment node
 *
 * Unit tests for the in-memory data store (db).
 * In a production setup, these would use a test database with Prisma.
 */

// We re-import the module fresh for each test suite using jest.resetModules()
describe("db store", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let db: any;

  beforeEach(() => {
    jest.resetModules();
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    db = require("@/lib/store").db;
  });

  // ── CREATE ────────────────────────────────────────────────────────────────

  it("creates a task and assigns an id", () => {
    const task = db.createTask({
      title: "Test task", description: "desc",
      status: "todo", priority: "medium",
      assignee: "Alice", dueDate: "2024-12-31", tags: [],
    });
    expect(task.id).toBeDefined();
    expect(task.title).toBe("Test task");
    expect(task.createdAt).toBeDefined();
  });

  // ── READ ──────────────────────────────────────────────────────────────────

  it("retrieves all tasks (includes seed data)", () => {
    const tasks = db.getAllTasks();
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBeGreaterThan(0);
  });

  it("retrieves a task by id", () => {
    const created = db.createTask({
      title: "Find me", description: "",
      status: "todo", priority: "low",
      assignee: "Bob", dueDate: "2024-12-31", tags: [],
    });
    const found = db.getTaskById(created.id);
    expect(found).toBeDefined();
    expect(found?.title).toBe("Find me");
  });

  it("returns undefined for a non-existent id", () => {
    expect(db.getTaskById("does-not-exist")).toBeUndefined();
  });

  // ── UPDATE ────────────────────────────────────────────────────────────────

  it("updates a task's status", () => {
    const task    = db.createTask({ title: "Update me", description: "", status: "todo", priority: "medium", assignee: "", dueDate: "2024-12-31", tags: [] });
    const updated = db.updateTask(task.id, { status: "done" });
    expect(updated?.status).toBe("done");
  });

  it("returns null when updating a non-existent task", () => {
    expect(db.updateTask("fake-id", { status: "done" })).toBeNull();
  });

  // ── DELETE ────────────────────────────────────────────────────────────────

  it("deletes a task", () => {
    const task    = db.createTask({ title: "Delete me", description: "", status: "todo", priority: "low", assignee: "", dueDate: "2024-12-31", tags: [] });
    const deleted = db.deleteTask(task.id);
    expect(deleted).toBe(true);
    expect(db.getTaskById(task.id)).toBeUndefined();
  });

  it("returns false when deleting a non-existent task", () => {
    expect(db.deleteTask("ghost-id")).toBe(false);
  });

  // ── STATS ─────────────────────────────────────────────────────────────────

  it("computes stats correctly", () => {
    // Reset by adding known tasks
    db.createTask({ title: "T1", description: "", status: "todo",        priority: "high",   assignee: "", dueDate: "2024-12-31", tags: [] });
    db.createTask({ title: "T2", description: "", status: "in-progress", priority: "medium", assignee: "", dueDate: "2024-12-31", tags: [] });
    db.createTask({ title: "T3", description: "", status: "done",        priority: "low",    assignee: "", dueDate: "2024-12-31", tags: [] });

    const stats = db.getStats();
    expect(stats.total).toBeGreaterThanOrEqual(3);
    expect(stats.done).toBeGreaterThanOrEqual(1);
  });
});
