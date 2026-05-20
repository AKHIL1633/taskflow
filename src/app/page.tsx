import Link from "next/link";
import { ArrowRight, CheckSquare, Zap, Users, BarChart2 } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-600 to-brand-800 flex flex-col items-center justify-center px-4 text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 animate-fade-in">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur">
          <CheckSquare className="w-7 h-7" />
        </div>
        <span className="text-3xl font-bold tracking-tight">TaskFlow</span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center max-w-2xl leading-tight animate-slide-up mb-4">
        Manage your work,<br />
        <span className="text-brand-200">beautifully.</span>
      </h1>
      <p className="text-lg text-brand-100 text-center max-w-lg mb-10 animate-slide-up">
        A full-stack Kanban task manager built with Next.js 14, TypeScript, and REST APIs.
        Drag, drop, and ship faster.
      </p>

      <Link
        href="/dashboard"
        className="group flex items-center gap-2 bg-white text-brand-700 font-semibold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 animate-scale-in"
      >
        Open Dashboard
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-3 justify-center mt-14 animate-fade-in">
        {[
          { icon: Zap,       text: "Next.js 14 App Router" },
          { icon: CheckSquare, text: "TypeScript strict mode" },
          { icon: BarChart2,  text: "REST API + CRUD" },
          { icon: Users,     text: "Drag-and-Drop Kanban" },
        ].map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-2 bg-white/10 backdrop-blur text-sm px-4 py-2 rounded-full border border-white/20"
          >
            <Icon className="w-4 h-4" />
            {text}
          </div>
        ))}
      </div>
    </main>
  );
}
