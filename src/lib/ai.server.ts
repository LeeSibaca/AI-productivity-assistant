import { streamText } from "ai";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

export type ChatMessage = { role: "user" | "assistant"; content: string };

export async function runGateway(system: string, messages: ChatMessage[]) {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("Missing LOVABLE_API_KEY");

  const gateway = createLovableAiGatewayProvider(key);
  const result = streamText({
    model: gateway("google/gemini-3.7-flash"),
    system,
    messages,
  });

  const text = await result.text;
  return { text };
}