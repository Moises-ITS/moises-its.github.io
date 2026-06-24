import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PromptInputBox } from "./ui/ai-prompt-box";
import { personal } from "../data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STREAM_URL = import.meta.env.PROD
  ? "/api/chat/stream"
  : "http://localhost:3001/api/chat/stream";

const MAX_MESSAGE_LENGTH = 500;
const RATE_LIMIT = 5;
const SAFE_URL_PATTERN = /^https?:\/\//i;

function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    return SAFE_URL_PATTERN.test(parsed.href);
  } catch {
    return false;
  }
}

function renderMarkdownLinks(text: string) {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      const rawHref = match[2].startsWith("http")
        ? match[2]
        : `https://${match[2]}`;
      if (!isSafeUrl(rawHref)) return match[1];
      return (
        <a key={i} href={rawHref} target="_blank" rel="noopener noreferrer" className="chat-link">
          {match[1]}
        </a>
      );
    }
    return part;
  });
}

function formatTimeRemaining(resetAt: string): string {
  const ms = new Date(resetAt).getTime() - Date.now();
  if (ms <= 0) return "soon";
  const hours = Math.floor(ms / 3_600_000);
  const mins = Math.ceil((ms % 3_600_000) / 60_000);
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

const QUICK_ACTIONS = [
  { label: "Work", prompt: "Tell me about your projects and work experience" },
  { label: "About me", prompt: "Tell me about yourself" },
  { label: "Skills", prompt: "What are your technical skills?" },
  { label: "Contact", prompt: "How can I contact you?" },
] as const;

interface ChatBotProps {
  onRecordingChange?: (recording: boolean) => void;
}

export function ChatBot({ onRecordingChange }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionsUsed, setQuestionsUsed] = useState(0);
  const [resetAt, setResetAt] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const sessionId = useMemo(() => crypto.randomUUID(), []);

  const isLimited = questionsUsed >= RATE_LIMIT;

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    const cleaned = text
      .replace(/^\[(Search|Think|Canvas): /, "")
      .replace(/\]$/, "")
      .trim();
    if (!cleaned || isLimited) return;

    if (cleaned.length > MAX_MESSAGE_LENGTH) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: cleaned },
        { role: "assistant", content: `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.` },
      ]);
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: cleaned }]);
    setIsLoading(true);

    try {
      const response = await fetch(STREAM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleaned, sessionId }),
      });

      const contentType = response.headers.get("content-type") ?? "";

      if (!contentType.includes("text/event-stream")) {
        const data = await response.json();

        if (response.status === 429) {
          setQuestionsUsed(RATE_LIMIT);
          if (data.resetAt) setResetAt(data.resetAt);
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `You've used all 5 questions for this session. Resets in ${formatTimeRemaining(data.resetAt)}. [Email me directly →](mailto:${personal.email})`,
            },
          ]);
          return;
        }

        if (!response.ok) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: typeof data.error === "string" ? data.error : "Sorry, something went wrong." },
          ]);
          return;
        }

        if (data.remaining !== undefined) {
          setQuestionsUsed(RATE_LIMIT - data.remaining);
        }
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      setIsLoading(false);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No reader");

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6);
          if (payload === "[DONE]") break;
          try {
            const parsed = JSON.parse(payload);
            if (parsed.meta) {
              if (parsed.meta.remaining !== undefined) {
                setQuestionsUsed(RATE_LIMIT - parsed.meta.remaining);
              }
              if (parsed.meta.resetAt) setResetAt(parsed.meta.resetAt);
              continue;
            }
            if (parsed.content) {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last?.role === "assistant") {
                  updated[updated.length - 1] = { ...last, content: last.content + parsed.content };
                }
                return updated;
              });
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again or reach out directly: [LinkedIn](https://linkedin.com/in/moiseszuniga)",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const counterColor =
    questionsUsed <= 2 ? "var(--cyan)" : questionsUsed <= 4 ? "var(--gold)" : "var(--red)";

  return (
    <div className="chatbot chatbot__panel">
      {questionsUsed > 0 && (
        <div className="chatbot__rate-limit">
          <div className="chatbot__rate-bar">
            <div
              className="chatbot__rate-fill"
              style={{ width: `${(questionsUsed / RATE_LIMIT) * 100}%`, backgroundColor: counterColor }}
            />
          </div>
          <span className="chatbot__rate-text" style={{ color: counterColor }}>
            {isLimited
              ? `Limit reached · resets in ${resetAt ? formatTimeRemaining(resetAt) : "12h"}`
              : `${questionsUsed} of ${RATE_LIMIT} questions used`}
          </span>
        </div>
      )}

      {(messages.length > 0 || isLoading) && (
        <div className="chatbot__messages" ref={messagesContainerRef}>
          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`chatbot__bubble chatbot__bubble--${msg.role}`}
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                layout
              >
                {renderMarkdownLinks(msg.content)}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                key="loading"
                className="chatbot__bubble chatbot__bubble--assistant"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="chatbot__typing-indicator">
                  <span />
                  <span />
                  <span />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div
        className={`chatbot__chips${messages.length === 0 && !isLoading ? " chatbot__chips--initial" : ""}`}
        role="group"
        aria-label="Suggested questions"
      >
        {QUICK_ACTIONS.map(({ label, prompt }) => (
          <button
            key={label}
            type="button"
            className="chatbot__chip"
            onClick={() => handleSend(prompt)}
            disabled={isLoading || isLimited}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="chatbot__footer">
        <PromptInputBox
          embedded
          placeholder={isLimited ? "Question limit reached" : `Ask anything about ${personal.firstName}...`}
          onSend={handleSend}
          isLoading={isLoading}
          onRecordingChange={onRecordingChange}
        />
      </div>
    </div>
  );
}
