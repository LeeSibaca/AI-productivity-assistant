import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { ToolWorkspace } from "@/components/app/ToolWorkspace";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | Workplace AI" },
      {
        name: "description",
        content:
          "Draft professional workplace emails in seconds with structured AI prompts and fully editable output.",
      },
      { property: "og:title", content: "Smart Email Generator | Workplace AI" },
      {
        property: "og:description",
        content: "Generate polished, on-tone business emails and edit them before sending.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <AppShell>
      <ToolWorkspace
        title="Smart Email Generator"
        description="Describe the situation and the assistant drafts a clear, professional email in the tone you choose."
        cta="Draft email"
        system="You are an expert business communication assistant. Write clear, concise, professional emails. Always return a subject line followed by the email body. Avoid filler, avoid inventing facts, and use placeholders in [brackets] for unknown details."
        fields={[
          { name: "recipient", label: "Recipient & role", type: "text", placeholder: "e.g. Priya, client project sponsor" },
          { name: "purpose", label: "Purpose / key points", type: "textarea", rows: 6, placeholder: "Explain the delay in the Q3 report, propose a new date, request confirmation." },
          { name: "tone", label: "Tone", type: "select", options: ["Professional", "Friendly", "Direct", "Apologetic", "Persuasive", "Formal"] },
          { name: "length", label: "Length", type: "select", options: ["Short", "Medium", "Detailed"] },
        ]}
        buildPrompt={(v) =>
          [
            `Recipient: ${v["recipient"] || "colleague"}`,
            `Tone: ${v["tone"]}`,
            `Length: ${v["length"]}`,
            `Purpose and key points:\n${v["purpose"]}`,
            "",
            "Write the email. Format as:\nSubject: ...\n\n<body with greeting, body paragraphs, and sign-off>",
          ].join("\n")
        }
      />
    </AppShell>
  );
}