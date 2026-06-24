import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prepareStream, getOpenAIClient, FALLBACK_MESSAGE } from "../../lib/chat/handler";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const prep = await prepareStream(req.body);

  if (prep.errorBody) {
    if (prep.errorHeaders) {
      for (const [key, value] of Object.entries(prep.errorHeaders)) {
        res.setHeader(key, value);
      }
    }
    return res.status(prep.status).json(prep.errorBody);
  }

  if (!prep.streamMessages) {
    return res.status(200).json({ reply: FALLBACK_MESSAGE, matched: false });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const stream = await getOpenAIClient().chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    max_tokens: 400,
    stream: true,
    messages: prep.streamMessages,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }
  }

  res.write("data: [DONE]\n\n");
  res.end();
}
