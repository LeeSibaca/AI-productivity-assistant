import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkles, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { runAssistant } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiDisclaimer } from "./AiDisclaimer";

export type Field =
  | { name: string; label: string; type: "text" | "textarea"; placeholder?: string; rows?: number }
  | { name: string; label: string; type: "select"; options: string[] };

export function ToolWorkspace({
  title,
  description,
  fields,
  system,
  buildPrompt,
  cta = "Generate with AI",
}: {
  title: string;
  description: string;
  fields: Field[];
  system: string;
  buildPrompt: (values: Record<string, string>) => string;
  cta?: string;
}) {
  const initial = Object.fromEntries(
    fields.map((f) => [f.name, f.type === "select" ? f.options[0]! : ""]),
  ) as Record<string, string>;

  const [values, setValues] = useState<Record<string, string>>(initial);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const run = useServerFn(runAssistant);

  const set = (name: string, value: string) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  async function generate() {
    setLoading(true);
    try {
      const res = await run({
        data: { system, messages: [{ role: "user", content: buildPrompt(values) }] },
      });
      setOutput(res.text);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Inputs
          </h2>
          <div className="mt-4 space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.type === "textarea" && (
                  <Textarea
                    id={field.name}
                    rows={field.rows ?? 6}
                    placeholder={field.placeholder ?? ""}
                    value={values[field.name] ?? ""}
                    onChange={(e) => set(field.name, e.target.value)}
                  />
                )}
                {field.type === "text" && (
                  <Input
                    id={field.name}
                    placeholder={field.placeholder ?? ""}
                    value={values[field.name] ?? ""}
                    onChange={(e) => set(field.name, e.target.value)}
                  />
                )}
                {field.type === "select" && (
                  <Select value={values[field.name]} onValueChange={(v) => set(field.name, v)}>
                    <SelectTrigger id={field.name}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              <Button onClick={generate} disabled={loading}>
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                {cta}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setValues(initial);
                  setOutput("");
                }}
              >
                <RotateCcw className="size-4" />
                Reset
              </Button>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Editable output
            </h2>
            <Button
              size="sm"
              variant="ghost"
              disabled={!output}
              onClick={() => {
                navigator.clipboard.writeText(output);
                toast.success("Copied to clipboard");
              }}
            >
              <Copy className="size-4" />
              Copy
            </Button>
          </div>
          <Textarea
            className="mt-4 min-h-[420px] font-sans text-sm leading-relaxed"
            value={output}
            placeholder="Your AI draft will appear here. You can edit it freely before using it."
            onChange={(e) => setOutput(e.target.value)}
          />
        </section>
      </div>

      <AiDisclaimer />
    </div>
  );
}