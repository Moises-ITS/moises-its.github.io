import { useState, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Maximize2, Minimize2 } from "lucide-react";
import { PromptInputBox } from "./ui/ai-prompt-box";
import { personal } from "../data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type Box = { left: number; top: number; width: number; height: number };

/** A suggestion chip in flight toward the message bubble it becomes */
interface ChipFlight {
  index: number; // index of the user message it turns into
  label: string;
  text: string;
  from: Box;
  to?: Box;
}

const toBox = (r: DOMRect): Box => ({ left: r.left, top: r.top, width: r.width, height: r.height });

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

/** Like renderMarkdownLinks, but each word is its own span that fades in on mount.
 *  Keys follow word order, so while a reply streams only the newly arrived words animate. */
function renderAnimatedWords(text: string) {
  const out: React.ReactNode[] = [];
  let k = 0;
  for (const part of text.split(/(\[.*?\]\(.*?\))/g)) {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      const rawHref = match[2].startsWith("http") ? match[2] : `https://${match[2]}`;
      out.push(
        <span className="chat-word" key={`w${k++}`}>
          {isSafeUrl(rawHref) ? (
            <a href={rawHref} target="_blank" rel="noopener noreferrer" className="chat-link">
              {match[1]}
            </a>
          ) : (
            match[1]
          )}
        </span>
      );
      continue;
    }
    for (const token of part.split(/(\s+)/)) {
      if (!token) continue;
      if (/^\s+$/.test(token)) out.push(token);
      else out.push(<span className="chat-word" key={`w${k++}`}>{token}</span>);
    }
  }
  return out;
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

const GREETING = `Hey, ask me anything about ${personal.firstName}`;

// Example questions that fade through the input's placeholder
const PLACEHOLDERS = [
  `Ask about ${personal.firstName}`,
  "Ask about his GPU pricer",
  "Ask about the SoFi demo",
  "Ask what he's building now",
];
const PLACEHOLDER_MS = 4000;
const PLACEHOLDER_FADE_MS = 300;
const GREETING_TYPING_MS = 900;

// Shared by the panel and its expand button so the button rides the corner
// exactly instead of trailing behind on its own default timing
const PANEL_LAYOUT_TRANSITION = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

// Shown in the expanded window — keep in sync with `model` in api/chat/stream.ts
const MODEL_LABEL = "GPT-4o mini";

interface ChatBotProps {
  onRecordingChange?: (recording: boolean) => void;
}

export function ChatBot({ onRecordingChange }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // true from send until the reply has fully streamed — drives the glow
  const [isResponding, setIsResponding] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderHidden, setPlaceholderHidden] = useState(false);
  const [questionsUsed, setQuestionsUsed] = useState(0);
  const [resetAt, setResetAt] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState<number>();
  // Greeting only lives in expanded mode; it's display-only and never sent to the API
  const [greeting, setGreeting] = useState<"hidden" | "typing" | "shown">("hidden");
  const greetingTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sessionId = useMemo(() => crypto.randomUUID(), []);
  const reduced = useReducedMotion() ?? false;

  const isLimited = questionsUsed >= RATE_LIMIT;

  // Fade out, swap to the next example question, fade back in
  useEffect(() => {
    if (reduced || isLimited) return;
    let swap: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      setPlaceholderHidden(true);
      swap = setTimeout(() => {
        setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
        setPlaceholderHidden(false);
      }, PLACEHOLDER_FADE_MS);
    }, PLACEHOLDER_MS);
    return () => {
      clearInterval(tick);
      clearTimeout(swap);
    };
  }, [reduced, isLimited]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isLoading, expanded]);

  // Full-screen mode: lock page scroll and close on Escape
  useEffect(() => {
    if (!expanded) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  const toggleExpanded = () => {
    // Hold the panel's spot in the page so nothing jumps while it's full screen
    if (!expanded) {
      setPlaceholderHeight(panelRef.current?.offsetHeight);
      // "Send" the greeting the first time the window opens
      if (greeting === "hidden") {
        if (reduced) {
          setGreeting("shown");
        } else {
          setGreeting("typing");
          greetingTimer.current = setTimeout(() => setGreeting("shown"), GREETING_TYPING_MS);
        }
      }
    }
    setExpanded((v) => !v);
  };

  useEffect(() => () => clearTimeout(greetingTimer.current), []);

  const showGreeting = expanded && greeting !== "hidden";

  const [flight, setFlight] = useState<ChipFlight | null>(null);

  // Once the new bubble has rendered (and the list has scrolled to it), measure where it landed
  useLayoutEffect(() => {
    if (!flight || flight.to) return;
    const raf = requestAnimationFrame(() => {
      const el = messagesContainerRef.current?.querySelector<HTMLElement>(
        `[data-msg-index="${flight.index}"]`
      );
      if (el) {
        const to = toBox(el.getBoundingClientRect());
        setFlight((f) => (f && f.index === flight.index ? { ...f, to } : f));
      }
    });
    // never leave a stranded flyer if the message didn't appear (e.g. rate-limited)
    const fallback = setTimeout(() => setFlight(null), 1500);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
    };
  }, [flight, messages.length]);

  const launchChip = (e: React.MouseEvent<HTMLButtonElement>, label: string, prompt: string) => {
    if (!reduced) {
      setFlight({
        index: messages.length,
        label,
        text: prompt,
        from: toBox(e.currentTarget.getBoundingClientRect()),
      });
    }
    handleSend(prompt);
  };

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
    setIsResponding(true);

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
      setIsResponding(false);
      setIsLoading(false);
    }
  };

  const counterColor =
    questionsUsed <= 2 ? "#34c759" : questionsUsed <= 4 ? "#ff9f0a" : "#ff3b30";

  return (
    <div style={{ minHeight: expanded ? placeholderHeight : undefined }}>
    <AnimatePresence>
      {expanded && (
        <motion.div
          key="backdrop"
          className="chatbot__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setExpanded(false)}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
    <motion.div
      ref={panelRef}
      layout={!reduced}
      transition={PANEL_LAYOUT_TRANSITION}
      style={{ borderRadius: 28 }}
      className={`chatbot chatbot__panel${expanded ? " chatbot__panel--expanded" : ""}${
        placeholderHidden && !isLimited && !reduced ? " chatbot--placeholder-hidden" : ""
      }`}
      role={expanded ? "dialog" : undefined}
      aria-modal={expanded ? true : undefined}
      aria-label={expanded ? "Chat" : undefined}
      aria-busy={isResponding}
    >
      {/* Apple Intelligence–style edge glow while the AI is answering */}
      <span className={`chatbot__glow${isResponding ? " is-on" : ""}`} aria-hidden="true" />
      <span className={`chatbot__glow chatbot__glow--soft${isResponding ? " is-on" : ""}`} aria-hidden="true" />
      <AnimatePresence>
        {expanded && (
          <motion.p
            key="model"
            className="chatbot__model"
            initial={reduced ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.4 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            Powered by {MODEL_LABEL}
          </motion.p>
        )}
      </AnimatePresence>
      <motion.button
        layout={!reduced ? "position" : false}
        transition={PANEL_LAYOUT_TRANSITION}
        type="button"
        className="chatbot__expand"
        onClick={toggleExpanded}
        aria-label={expanded ? "Exit full screen" : "Expand chat to full screen"}
        title={expanded ? "Exit full screen (Esc)" : "Expand"}
      >
        {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </motion.button>

      {questionsUsed > 0 && (
        <div className="chatbot__rate-limit">
          <div className="chatbot__rate-bar">
            <div
              className="chatbot__rate-fill"
              style={{ width: `${(questionsUsed / RATE_LIMIT) * 100}%`, backgroundColor: counterColor }}
            />
          </div>
          <span className="chatbot__rate-text">
            {isLimited
              ? `Limit reached · resets in ${resetAt ? formatTimeRemaining(resetAt) : "12h"}`
              : `${questionsUsed} of ${RATE_LIMIT} questions used`}
          </span>
        </div>
      )}

      {(messages.length > 0 || isLoading || showGreeting) && (
        <div className="chatbot__messages" ref={messagesContainerRef}>
          <AnimatePresence mode="popLayout">
            {showGreeting && (
              <motion.div
                key={greeting === "typing" ? "greeting-typing" : "greeting"}
                className="chatbot__bubble chatbot__bubble--assistant chatbot__greeting"
                initial={{ opacity: 0, y: 8, x: -24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                layout
              >
                {greeting === "typing" ? (
                  <span className="chatbot__typing-indicator" aria-label="Typing">
                    <span />
                    <span />
                    <span />
                  </span>
                ) : (
                  GREETING
                )}
              </motion.div>
            )}
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                data-msg-index={i}
                className={`chatbot__bubble chatbot__bubble--${msg.role}`}
                // user bubbles slide in from the right, AI replies from the left;
                // a bubble launched from a chip stays hidden until the flyer lands on it
                initial={
                  flight?.index === i
                    ? { opacity: 0 }
                    : { opacity: 0, y: 8, x: msg.role === "user" ? 24 : -24, scale: 0.97 }
                }
                animate={
                  flight?.index === i
                    ? { opacity: 0, transition: { duration: 0 } }
                    : { opacity: 1, y: 0, x: 0, scale: 1 }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                layout
              >
                {msg.role === "assistant" ? renderAnimatedWords(msg.content) : renderMarkdownLinks(msg.content)}
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                key="loading"
                className="chatbot__bubble chatbot__bubble--assistant"
                initial={{ opacity: 0, y: 8, x: -24 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
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
            onClick={(e) => launchChip(e, label, prompt)}
            disabled={isLoading || isLimited}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="chatbot__footer">
        <PromptInputBox
          embedded
          placeholder={isLimited ? "Question limit reached" : PLACEHOLDERS[placeholderIndex]}
          onSend={handleSend}
          isLoading={isLoading}
          onRecordingChange={onRecordingChange}
        />
      </div>
    </motion.div>
    {flight &&
      createPortal(
        <motion.div
          className="chatbot__flyer"
          aria-hidden="true"
          initial={{ ...flight.from, backgroundColor: "#f5f5f7", color: "#1d1d1f", borderRadius: 980 }}
          animate={
            flight.to
              ? { ...flight.to, backgroundColor: "#0071e3", color: "#ffffff", borderRadius: 20 }
              : { ...flight.from, scale: 0.92 }
          }
          transition={
            flight.to
              ? { type: "spring", stiffness: 260, damping: 26, mass: 0.8 }
              : { duration: 0.12 }
          }
          onAnimationComplete={() => {
            if (flight.to) setFlight(null);
          }}
        >
          <motion.span
            className="chatbot__flyer-label"
            animate={{ opacity: flight.to ? 0 : 1 }}
            transition={{ duration: 0.15 }}
          >
            {flight.label}
          </motion.span>
          <motion.span
            className="chatbot__flyer-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: flight.to ? 1 : 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
          >
            {flight.text}
          </motion.span>
        </motion.div>,
        document.body
      )}
    </div>
  );
}
