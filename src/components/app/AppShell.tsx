import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  ListChecks,
  Search,
  MessageSquare,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/app/ThemeToggle";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/notes", label: "Meeting Notes", icon: NotebookPen },
  { to: "/tasks", label: "Task Planner", icon: ListChecks },
  { to: "/research", label: "Research Assistant", icon: Search },
  { to: "/chat", label: "AI Chatbot", icon: MessageSquare },
] as const;

function NavList({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <nav className="flex flex-col gap-1 p-3">
      {nav.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact: to === "/" }}
          activeProps={{
            className: "bg-sidebar-accent text-sidebar-accent-foreground",
          }}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Icon className="size-4 shrink-0" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

function SidebarInner({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex items-center gap-2.5 border-b border-sidebar-border px-5 py-5">
        <span className="grid size-9 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Sparkles className="size-4" />
        </span>
        <div className="leading-tight">
          <p className="font-display text-sm font-semibold text-sidebar-accent-foreground">
            Workplace AI
          </p>
          <p className="text-xs text-sidebar-foreground/60">Productivity Assistant</p>
        </div>
      </div>
      <NavList onNavigate={onNavigate} />
      <div className="mt-auto space-y-3 p-4">
        <ThemeToggle />
        <p className="rounded-lg border border-sidebar-border/70 p-3 text-[11px] leading-relaxed text-sidebar-foreground/60">
          AI output can be inaccurate. Always review and edit before sharing externally.
        </p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[272px_1fr]">
      <aside className="sticky top-0 hidden h-screen lg:block">
        <SidebarInner />
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-surface/85 px-4 py-3 backdrop-blur lg:hidden">
          <button
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-lg border border-border"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <span className="font-display text-sm font-semibold">Workplace AI</span>
          <div className="ml-auto">
            <ThemeToggle variant="bar" />
          </div>
        </header>

        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-foreground/40"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-72 shadow-xl">
              <SidebarInner onNavigate={() => setOpen(false)} />
            </div>
          </div>
        )}

        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-10">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}