import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, NotebookPen, ListChecks, Search, MessageSquare, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { AiDisclaimer } from "@/components/app/AiDisclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate everyday work: draft emails, summarize meetings, plan tasks, research topics and chat with an AI assistant.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "Five AI tools for professionals: email, meeting notes, task planning, research and chat.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    desc: "Turn a few bullet points into a polished, on-tone business email.",
  },
  {
    to: "/notes",
    icon: NotebookPen,
    title: "Meeting Notes Summarizer",
    desc: "Extract decisions, action items and owners from messy notes.",
  },
  {
    to: "/tasks",
    icon: ListChecks,
    title: "AI Task Planner",
    desc: "Break goals into prioritized tasks with effort and schedule.",
  },
  {
    to: "/research",
    icon: Search,
    title: "AI Research Assistant",
    desc: "Structured briefings with risks and what to verify yourself.",
  },
  {
    to: "/chat",
    icon: MessageSquare,
    title: "AI Chatbot",
    desc: "A conversational assistant for anything else on your plate.",
  },
] as const;

const stats = [
  { label: "Workflows", value: "5" },
  { label: "Avg. draft time", value: "< 20s" },
  { label: "Output", value: "Fully editable" },
];

function Dashboard() {
  return (
    <AppShell>
      <div className="space-y-8">
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Workplace AI
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Automate the busywork, keep the judgement
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Five focused AI workflows for professionals. Every prompt is structured, every output
            is editable, and nothing leaves your hands unreviewed.
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-xl font-semibold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {tools.map(({ to, icon: Icon, title, desc }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="size-5" />
              </span>
              <h2 className="mt-4 text-base font-semibold">{title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Open tool
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </section>

        <AiDisclaimer />
      </div>
    </AppShell>
  );
}
