import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { ToolWorkspace } from "@/components/app/ToolWorkspace";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | Workplace AI" },
      {
        name: "description",
        content:
          "Turn goals into prioritized, time-boxed task plans with owners, effort estimates and milestones.",
      },
      { property: "og:title", content: "AI Task Planner | Workplace AI" },
      {
        property: "og:description",
        content: "Break down work into prioritized tasks and a realistic schedule.",
      },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  return (
    <AppShell>
      <ToolWorkspace
        title="AI Task Planner"
        description="Describe your goal and constraints, and get a prioritized breakdown you can edit and share."
        cta="Build plan"
        system="You are a pragmatic project planner. Break goals into concrete tasks. Output sections: Objective, Prioritized Tasks (table-style list with priority, effort estimate, suggested owner), Schedule by day or week, Dependencies, Risks. Be realistic about effort and never invent people or facts not provided."
        fields={[
          { name: "goal", label: "Goal or project", type: "textarea", rows: 5, placeholder: "Launch the internal onboarding portal for 40 new hires." },
          { name: "deadline", label: "Deadline / timeframe", type: "text", placeholder: "e.g. 3 weeks" },
          { name: "capacity", label: "Team & capacity", type: "text", placeholder: "e.g. 2 designers, 1 developer, 10h/week each" },
          { name: "style", label: "Planning style", type: "select", options: ["Daily checklist", "Weekly sprint plan", "Milestone roadmap"] },
        ]}
        buildPrompt={(v) =>
          `Goal:\n${v["goal"]}\n\nTimeframe: ${v["deadline"] || "Not stated"}\nTeam & capacity: ${v["capacity"] || "Not stated"}\nPlanning style: ${v["style"]}`
        }
      />
    </AppShell>
  );
}