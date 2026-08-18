import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { ToolWorkspace } from "@/components/app/ToolWorkspace";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | Workplace AI" },
      {
        name: "description",
        content:
          "Turn raw meeting notes or transcripts into structured summaries, decisions and action items.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer | Workplace AI" },
      {
        property: "og:description",
        content: "Summaries, decisions, owners and next steps extracted from messy meeting notes.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <AppShell>
      <ToolWorkspace
        title="Meeting Notes Summarizer"
        description="Paste a transcript or rough notes and get a structured recap with decisions, owners and follow-ups."
        cta="Summarize notes"
        system="You are a meeting analyst. Summarize meeting notes accurately without inventing content. If information is missing, say 'Not stated'. Output markdown-style sections: Summary, Key Decisions, Action Items (owner + due date), Risks / Open Questions, Suggested Next Steps."
        fields={[
          { name: "context", label: "Meeting context", type: "text", placeholder: "e.g. Weekly product sync, 6 attendees" },
          { name: "notes", label: "Raw notes or transcript", type: "textarea", rows: 12, placeholder: "Paste your notes here..." },
          { name: "detail", label: "Summary depth", type: "select", options: ["Concise", "Balanced", "Detailed"] },
        ]}
        buildPrompt={(v) =>
          `Meeting context: ${v["context"] || "Not stated"}\nSummary depth: ${v["detail"]}\n\nNotes:\n${v["notes"]}`
        }
      />
    </AppShell>
  );
}