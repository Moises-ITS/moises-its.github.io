import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import express from "express";
import { handleChatRequest, prepareStream, getOpenAIClient, FALLBACK_MESSAGE } from "../lib/chat/handler";
import { extractClientIp } from "../lib/chat/rate-limit-memory";

const app = express();

app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin ?? "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Expose-Headers", "X-RateLimit-Remaining, X-RateLimit-Reset");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  next();
});

app.use(express.json({ limit: "4kb" }));

app.post("/api/chat", async (req: express.Request, res: express.Response): Promise<void> => {
  const clientIp = extractClientIp(req.headers as Record<string, string | string[] | undefined>, req.socket?.remoteAddress);
  const result = await handleChatRequest(req.body, clientIp);

  if (result.headers) {
    for (const [key, value] of Object.entries(result.headers)) {
      res.setHeader(key, value);
    }
  }

  res.status(result.status).json(result.body);
});

app.post("/api/chat/stream", async (req: express.Request, res: express.Response): Promise<void> => {
  const clientIp = extractClientIp(req.headers as Record<string, string | string[] | undefined>, req.socket?.remoteAddress);
  const prep = await prepareStream(req.body, clientIp);

  if (prep.errorBody) {
    if (prep.errorHeaders) {
      for (const [key, value] of Object.entries(prep.errorHeaders)) {
        res.setHeader(key, value);
      }
    }
    res.status(prep.status).json(prep.errorBody);
    return;
  }

  if (!prep.streamMessages) {
    res.status(200).json({ reply: FALLBACK_MESSAGE, matched: false });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  if (prep.remaining !== undefined) {
    res.setHeader("X-RateLimit-Remaining", String(prep.remaining));
  }
  if (prep.resetAt) {
    res.setHeader("X-RateLimit-Reset", prep.resetAt);
  }

  res.write(`data: ${JSON.stringify({ meta: { remaining: prep.remaining, resetAt: prep.resetAt } })}\n\n`);

  const stream = await getOpenAIClient().chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    max_tokens: 300,
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
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Dev API server running at http://localhost:${PORT}`);
});
