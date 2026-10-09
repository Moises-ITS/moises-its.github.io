import { useState, useCallback, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { personal } from "../data";
import { ease } from "../motion";
import { ChatBot } from "./ChatBot";
import { GooeyLoader } from "./ui/gooey-loader";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease } },
};

const chatFadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease, delay: 0.45 } },
};

// Headline sharpens out of a blur while its letters draw together
const unblur = {
  hidden: { opacity: 0, filter: "blur(16px)", letterSpacing: "0.02em", scale: 1.04 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    letterSpacing: "-0.045em",
    scale: 1,
    transition: { duration: 1.6, ease },
  },
};

/* ─── Typing role ────────────────────────────────────────────────────────── */

const TYPE_START_MS = 2800; // after the name has sharpened and the cursor has blinked a few times
const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 2000;
const GAP_MS = 350;

type TypePhase = "typing" | "holding" | "deleting";

/** Types each role, holds it, deletes it, moves on. Starts holding the first role in full. */
function useTypingRoles(roles: string[], enabled: boolean) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(roles[0]?.length ?? 0);
  const [phase, setPhase] = useState<TypePhase>("holding");

  useEffect(() => {
    if (!enabled || roles.length < 2) return;
    let t: ReturnType<typeof setTimeout>;

    if (!started) {
      t = setTimeout(() => setStarted(true), TYPE_START_MS);
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("deleting"), HOLD_MS);
    } else if (phase === "deleting") {
      t =
        length > 0
          ? setTimeout(() => setLength((l) => l - 1), DELETE_MS)
          : setTimeout(() => {
              setIndex((i) => (i + 1) % roles.length);
              setPhase("typing");
            }, GAP_MS);
    } else {
      t =
        length < roles[index].length
          ? // slight jitter so it reads as human typing
            setTimeout(() => setLength((l) => l + 1), TYPE_MS + Math.random() * 50)
          : setTimeout(() => setPhase("holding"), 0);
    }
    return () => clearTimeout(t);
  }, [enabled, roles, started, index, length, phase]);

  return { started, text: roles[index].slice(0, length), phase };
}

/* ─── Magnetic button: drifts toward the cursor, springs back ───────────── */

function Magnetic({ children, disabled }: { children: React.ReactNode; disabled: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.5 });

  const handleMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (disabled || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const pull = 0.3;
    const max = 10;
    x.set(Math.max(-max, Math.min(max, (e.clientX - (r.left + r.width / 2)) * pull)));
    y.set(Math.max(-max, Math.min(max, (e.clientY - (r.top + r.height / 2)) * pull)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    // the padded hit area starts the pull before the cursor touches the button
    <span className="magnet" onPointerMove={handleMove} onPointerLeave={reset}>
      <motion.span className="magnet__inner" style={{ x: sx, y: sy }}>
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const [isListening, setIsListening] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const roles = personal.roles;
  const typing = useTypingRoles(roles, !reduced);

  // As the hero scrolls away, the intro recedes: lags behind, shrinks, fades
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const introScale = useTransform(scrollYProgress, [0, 0.7], reduced ? [1, 1] : [1, 0.86]);
  // function form on purpose: framer hands range-based opacity to the browser's native
  // ScrollTimeline, which tracks the whole page instead of the hero target
  const introOpacity = useTransform(scrollYProgress, (p) =>
    reduced ? 1 : Math.min(1, Math.max(0, 1 - (p - 0.1) / 0.55))
  );
  const introY = useTransform(scrollYProgress, [0, 0.7], reduced ? [0, 0] : [0, 90]);

  const handleRecordingChange = useCallback((recording: boolean) => {
    setIsListening(recording);
  }, []);

  // One cursor: blinks after the name, then glides down to type the roles
  const caretOnRole = typing.started;
  const caret = (
    <motion.span
      layoutId="hero-caret"
      // only animate the jump from the name to the role line, not every keystroke
      layoutDependency={caretOnRole}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className={`hero__caret${
        caretOnRole ? (typing.phase === "holding" ? " hero__caret--idle" : " hero__caret--active") : ""
      }`}
      aria-hidden="true"
    />
  );

  return (
    <section className="hero" id="top" aria-label="Introduction" ref={heroRef}>
      <motion.div variants={stagger} initial={reduced ? false : "hidden"} animate="visible">
        <motion.div
          className="hero__intro"
          variants={stagger}
          style={{ scale: introScale, opacity: introOpacity, y: introY }}
        >
          <motion.p className="hero__eyebrow" variants={fadeUp}>
            CS + Applied Math @ NJIT
          </motion.p>
          <motion.h1 className="hero__title" variants={unblur}>
            <span className="hero__title-text">{personal.name}.</span>
            {!caretOnRole && caret}
          </motion.h1>
          <motion.p className="hero__sub" variants={fadeUp}>
            <span className="sr-only">{roles.join(", ")}</span>
            <span aria-hidden="true">{reduced ? roles[0] : typing.text}</span>
            {caretOnRole && caret}
          </motion.p>
          <motion.div className="hero__actions" variants={fadeUp}>
            <Magnetic disabled={reduced}>
              <motion.a href="#work" className="btn-pill" whileTap={reduced ? undefined : { scale: 0.96 }}>
                See my work
              </motion.a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div className="hero__chat" variants={chatFadeUp}>
          <AnimatePresence>
            {isListening && (
              <motion.div
                className="hero__orb"
                initial={{ opacity: 0, height: 0, scale: 0.8 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease }}
              >
                <GooeyLoader
                  primaryColor="#0071e3"
                  secondaryColor="#5ac8fa"
                  borderColor="rgba(0, 113, 227, 0.15)"
                  size={120}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <ChatBot onRecordingChange={handleRecordingChange} />
        </motion.div>
      </motion.div>
    </section>
  );
}
