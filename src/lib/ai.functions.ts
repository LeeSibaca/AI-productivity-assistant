import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const RunInput = z.object({
  system: z.string().min(1),
  messages: z.array(MessageSchema).min(1),
});

export const runAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => RunInput.parse(input))
  .handler(async ({ data }) => {
    const { runGateway } = await import("./ai.server");
    return runGateway(data.system, data.messages);
  });