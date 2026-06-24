import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import express from "express";
import cors from "cors";
import { handleChatRequest, prepareStream, getOpenAIClient, FALLBACK_MESSAGE } from "../lib/chat/handler";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://localhost:3003"],
  })
);
app.use(express.json({ limit: "4kb" }));

app.post("/api/chat", async (req: express.Request, res: express.Response): Promise<void> => {
  const result = await handleChatRequest(req.body);

  if (result.headers) {
    for (const [key, value] of Object.entries(result.headers)) {
      res.setHeader(key, value);
    }
  }

  res.status(result.status).json(result.body);
});

app.post("/api/chat/stream", async (req: express.Request, res: express.Response): Promise<void> => {
  const prep = await prepareStream(req.body);

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
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Dev API server running at http://localhost:${PORT}`);
});
