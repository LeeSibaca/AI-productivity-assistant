import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { ToolWorkspace } from "@/components/app/ToolWorkspace";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | Workplace AI" },
      {
        name: "description",
        content:
          "Get structured briefings on any work topic: key points, comparisons, risks and open questions to verify.",
      },
      { property: "og:title", content: "AI Research Assistant | Workplace AI" },
      {
        property: "og:description",
        content: "Structured briefings with explicit confidence levels and verification prompts.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <AppShell>
      <ToolWorkspace
        title="AI Research Assistant"
        description="Ask a work question and get a structured briefing, with clear flags on what needs independent verification."
        cta="Research topic"
        system="You are a rigorous research assistant for business professionals. Produce a structured briefing: Overview, Key Findings, Comparison or Options, Risks & Trade-offs, What To Verify Independently. Distinguish clearly between well-established knowledge and uncertain claims. Never fabricate statistics, citations, or sources; if you are unsure, state it plainly."
        fields={[
          { name: "topic", label: "Research question", type: "textarea", rows: 4, placeholder: "What should we consider when choosing between hybrid and remote-first policies?" },
          { name: "audience", label: "Audience", type: "select", options: ["Executive summary", "Team briefing", "Technical deep dive", "Client-facing"] },
          { name: "context", label: "Extra context or constraints", type: "textarea", rows: 4, placeholder: "Industry, region, company size, current situation..." },
        ]}
        buildPrompt={(v) =>
          `Research question:\n${v["topic"]}\n\nAudience: ${v["audience"]}\nContext: ${v["context"] || "Not stated"}`
        }
      />
    </AppShell>
  );
}