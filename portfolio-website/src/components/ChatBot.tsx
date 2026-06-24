import { useState, useRef, useEffect } from "react";
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
      if (!isSafeUrl(rawHref)) {
        return match[1];
      }
      return (
        <a
          key={i}
          href={rawHref}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-link"
        >
          {match[1]}
        </a>
      );
    }
    return part;
  });
}

function formatResetTime(resetAt?: string): string {
  if (!resetAt) return "";
  const date = new Date(resetAt);
  if (Number.isNaN(date.getTime())) return "";
  return ` You can try again after ${date.toLocaleString()}.`;
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
  const messagesContainerRef = useRef<HTMLDivElement>(null);

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
    if (!cleaned) return;

    if (cleaned.length > MAX_MESSAGE_LENGTH) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: cleaned },
        {
          role: "assistant",
          content: `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`,
        },
      ]);
      return;
    }

    const userMessage: Message = { role: "user", content: cleaned };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(STREAM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleaned }),
      });

      const contentType = response.headers.get("content-type") ?? "";

      if (!contentType.includes("text/event-stream")) {
        const data = await response.json();

        if (response.status === 429) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `You've reached the limit of 5 questions every 12 hours.${formatResetTime(data.resetAt)} Feel free to reach out on [LinkedIn](https://linkedin.com/in/moiseszuniga)!`,
            },
          ]);
          return;
        }

        if (!response.ok) {
          const errorMessage =
            typeof data.error === "string"
              ? data.error
              : "Sorry, something went wrong. Please try again.";
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: errorMessage },
          ]);
          return;
        }

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
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
            const { content } = JSON.parse(payload);
            if (content) {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last?.role === "assistant") {
                  updated[updated.length - 1] = {
                    ...last,
                    content: last.content + content,
                  };
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
          content:
            "Sorry, I'm having trouble connecting right now. Please try again or reach out directly: [LinkedIn](https://linkedin.com/in/moiseszuniga)",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot chatbot__panel">
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
          <div />
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
            disabled={isLoading}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="chatbot__footer">
        <PromptInputBox
          embedded
          placeholder={`Ask anything about ${personal.firstName}...`}
          onSend={handleSend}
          isLoading={isLoading}
          onRecordingChange={onRecordingChange}
        />
      </div>
    </div>
  );
}
