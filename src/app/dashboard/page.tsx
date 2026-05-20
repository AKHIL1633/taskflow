import { KanbanBoard } from "@/components/KanbanBoard";
import { db } from "@/lib/store";

// Server Component: fetch data on the server, pass to client board
export default function DashboardPage() {
  const tasks = db.getAllTasks();

  return <KanbanBoard initialTasks={tasks} />;
}
