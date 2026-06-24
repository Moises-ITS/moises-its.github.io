import { z } from "zod";
import {
  detectPromptInjection,
  sanitizeAndValidateMessage,
  InjectionDetectedError,
  SanitizationError,
} from "./sanitize.js";

export const chatErrorCodeSchema = z.enum([
  "validation_error",
  "rate_limited",
  "injection_detected",
  "method_not_allowed",
  "search_failed",
  "internal_error",
]);

export const chatErrorSchema = z.object({
  error: z.string(),
  code: chatErrorCodeSchema.optional(),
  resetAt: z.string().datetime().optional(),
});

export const chatRequestSchema = z
  .object({
    message: z
      .string({ error: "Message is required" })
      .trim()
      .min(1, "Message is required")
      .max(500, "Message too long (max 500 characters)")
      .refine((msg) => !detectPromptInjection(msg), {
        message:
          "Your message contains disallowed content. Please ask a question about Moises's work or background.",
      }),
    sessionId: z.string().uuid().optional(),
  })
  .strict();

export const chatSuccessSchema = z.object({
  reply: z.string().max(2000),
  matched: z.boolean(),
  topSimilarity: z.number().min(0).max(1).optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatSuccess = z.infer<typeof chatSuccessSchema>;
export type ChatError = z.infer<typeof chatErrorSchema>;

export function parseChatRequest(body: unknown): ChatRequest {
  return chatRequestSchema.parse(body);
}

export function parseChatSuccess(data: unknown): ChatSuccess {
  return chatSuccessSchema.parse(data);
}

export { sanitizeAndValidateMessage, InjectionDetectedError, SanitizationError };
