import { ShieldCheck } from "lucide-react";

export function AiDisclaimer() {
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-accent/40 p-4">
      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent-foreground" />
      <p className="text-xs leading-relaxed text-accent-foreground">
        <strong className="font-semibold">Responsible AI notice.</strong> Outputs are generated
        by an AI model and may be incomplete, biased, or factually wrong. Review and edit every
        draft before sending it, and never paste confidential personal data, credentials, or
        client information into these tools. You remain accountable for anything you share.
      </p>
    </div>
  );
}