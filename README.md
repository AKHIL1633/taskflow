# TaskFlow 🗂️

> A full-stack Kanban project management app built with **Next.js 14**, **TypeScript**, and **REST APIs**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-brightgreen?style=flat-square)](https://taskflow-lake-nu.vercel.app)
[![CI/CD](https://img.shields.io/github/actions/workflow/status/AKHIL1633/taskflow/ci-cd.yml?label=CI%2FCD&style=flat-square)](https://github.com/AKHIL1633/taskflow/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square)](https://nextjs.org/)

## ✨ Features

- **Kanban Board** — Drag-and-drop tasks across *To Do*, *In Progress*, and *Done* columns (powered by `@dnd-kit`)
- **Full CRUD** — Create, read, update, and delete tasks via REST API routes
- **TypeScript throughout** — Strict types for all domain models, API payloads, and props
- **Stats Dashboard** — Live totals for task status and high-priority items
- **Priority & Tags** — Label tasks by urgency and category
- **Overdue detection** — Due dates highlight when a task is past its deadline
- **CI/CD Pipeline** — GitHub Actions runs lint → test → build → deploy on every push

## 🛠️ Tech Stack

| Layer        | Technology                                      |
|--------------|-------------------------------------------------|
| Framework    | Next.js 14 (App Router)                         |
| Language     | TypeScript (strict mode)                        |
| Styling      | Tailwind CSS                                    |
| Drag & Drop  | @dnd-kit/core + @dnd-kit/sortable               |
| API          | Next.js Route Handlers (REST)                   |
| Data layer   | In-memory store → swap for Prisma + PostgreSQL  |
| Testing      | Jest + React Testing Library                    |
| CI/CD        | GitHub Actions → Vercel                         |

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/AKHIL1633/taskflow.git
cd taskflow

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and navigate to `/dashboard`.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/tasks/          # REST API routes (GET, POST, PATCH, DELETE)
│   ├── dashboard/          # Server component — fetches & passes data
│   └── page.tsx            # Landing page
├── components/
│   ├── KanbanBoard.tsx     # Main board (DnD context, state management)
│   ├── KanbanColumn.tsx    # Drop zone per status column
│   ├── TaskCard.tsx        # Draggable task card
│   ├── CreateTaskModal.tsx # Controlled form for new tasks
│   └── StatsCard.tsx       # Metric display widget
├── lib/
│   ├── store.ts            # In-memory DB (replace with Prisma in production)
│   └── api.ts              # Client-side API service layer
├── types/
│   └── index.ts            # All TypeScript interfaces & types
└── __tests__/
    └── store.test.ts       # Unit tests for data layer
```

## 🧪 Running Tests

```bash
npm test                    # Run all tests
npm test -- --coverage      # With coverage report
```

## 🌐 API Reference

| Method | Endpoint         | Description       |
|--------|------------------|-------------------|
| GET    | `/api/tasks`     | Fetch all tasks   |
| POST   | `/api/tasks`     | Create a new task |
| PATCH  | `/api/tasks/:id` | Update a task     |
| DELETE | `/api/tasks/:id` | Delete a task     |

## 📈 Roadmap

- [ ] PostgreSQL + Prisma ORM integration
- [ ] NextAuth.js authentication
- [ ] Team workspaces & multi-user support
- [ ] Activity feed & notifications

## 📄 License

MIT © P Akhil