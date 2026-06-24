import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleChatRequest } from "../../lib/chat/handler";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const result = await handleChatRequest(req.body);

  if (result.headers) {
    for (const [key, value] of Object.entries(result.headers)) {
      res.setHeader(key, value);
    }
  }

  return res.status(result.status).json(result.body);
}
