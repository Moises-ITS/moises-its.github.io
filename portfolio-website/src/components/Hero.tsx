import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "../data";
import { ChatBot } from "./ChatBot";
import { GooeyLoader } from "./ui/gooey-loader";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const avatarExit = {
  opacity: 0,
  scale: 0.8,
  rotate: -10,
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

const avatarEnter = {
  opacity: 1,
  scale: 1,
  rotate: 0,
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

const loaderEnter = {
  opacity: 1,
  scale: 1,
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 },
};

const loaderExit = {
  opacity: 0,
  scale: 0.7,
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

export function Hero() {
  const [isListening, setIsListening] = useState(false);

  const handleRecordingChange = useCallback((recording: boolean) => {
    setIsListening(recording);
  }, []);

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <motion.div
        className="hero__center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <div className="hero__text">
          <motion.h1 className="hero__greeting" variants={fadeUp}>
            Hi, I'm{" "}
            <span className="hero__name-accent">{personal.firstName}</span>
          </motion.h1>

          <motion.p className="hero__typing" variants={fadeUp}>
            <span className="hero__typing-text">{personal.titleLine}</span>
            <span className="hero__cursor" aria-hidden="true" />
          </motion.p>

          <motion.div className="hero__chatbot" variants={fadeUp}>
            <ChatBot onRecordingChange={handleRecordingChange} />
          </motion.div>
        </div>

        <motion.div className="hero__avatar-wrap" variants={fadeUp}>
          <AnimatePresence mode="wait">
            {isListening ? (
              <motion.div
                key="loader"
                className="hero__loader"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={loaderEnter}
                exit={loaderExit}
              >
                <GooeyLoader
                  primaryColor="#00b4ff"
                  secondaryColor="#00e5ff"
                  borderColor="rgba(0, 200, 255, 0.3)"
                  size={300}
                />
              </motion.div>
            ) : (
              <motion.div
                key="avatar"
                className="hero__avatar"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={avatarEnter}
                exit={avatarExit}
              >
                <img src="/avatar.jpg" alt={`${personal.name} portrait`} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
