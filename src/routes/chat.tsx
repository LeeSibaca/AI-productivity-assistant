import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { AiDisclaimer } from "@/components/app/AiDisclaimer";
import { runAssistant } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot Assistant | Workplace AI" },
      {
        name: "description",
        content:
          "Chat with an AI workplace assistant for drafting, planning, analysis and day-to-day work questions.",
      },
      { property: "og:title", content: "AI Chatbot Assistant | Workplace AI" },
      {
        property: "og:description",
        content: "A conversational assistant for everyday professional tasks.",
      },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM =
  "You are a helpful, concise AI workplace productivity assistant. Help with writing, planning, summarizing and analysis. Ask a clarifying question when the request is ambiguous. Never invent facts; state uncertainty clearly. Keep answers well structured and skimmable.";

const suggestions = [
  "Rewrite this update so it's clearer for executives",
  "Help me prepare an agenda for a 30-minute retro",
  "Suggest ways to cut my weekly meeting load",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const run = useServerFn(runAssistant);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await run({ data: { system: SYSTEM, messages: next } });
      setMessages([...next, { role: "assistant", content: res.text }]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "The assistant is unavailable");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold sm:text-3xl">AI Chatbot</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            A general-purpose assistant that remembers the conversation while you work.
          </p>
        </header>

        <div className="flex h-[62vh] min-h-[420px] flex-col rounded-xl border border-border bg-surface shadow-sm">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Sparkles className="size-5" />
                </span>
                <p className="text-sm text-muted-foreground">Start with a prompt</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                      : "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5 text-sm text-secondary-foreground"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" /> Thinking…
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="flex items-end gap-2 border-t border-border p-3">
            <Textarea
              rows={2}
              value={input}
              placeholder="Ask anything about your work…"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              className="min-h-0 resize-none border-0 shadow-none focus-visible:ring-0"
            />
            <Button onClick={() => send(input)} disabled={loading || !input.trim()}>
              <Send className="size-4" />
              Send
            </Button>
          </div>
        </div>

        <AiDisclaimer />
      </div>
    </AppShell>
  );
}