import { motion } from "framer-motion";

interface GooeyLoaderProps {
  primaryColor?: string;
  secondaryColor?: string;
  borderColor?: string;
  size?: number;
}

export function GooeyLoader({
  primaryColor = "#f87171",
  secondaryColor = "#fca5a5",
  borderColor = "#e5e7eb",
  size = 120,
}: GooeyLoaderProps) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width="0" height="0" className="absolute">
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            result="goo"
          />
        </filter>
      </svg>

      <div
        className="relative"
        style={{ filter: "url(#gooey)", width: size, height: size }}
      >
        <motion.div
          className="absolute rounded-full"
          style={{
            width: size * 0.45,
            height: size * 0.45,
            backgroundColor: primaryColor,
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute rounded-full"
          style={{
            width: size * 0.3,
            height: size * 0.3,
            backgroundColor: secondaryColor,
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: ["-50%", "30%", "-130%", "-50%"],
            y: ["-50%", "-120%", "-120%", "-50%"],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute rounded-full"
          style={{
            width: size * 0.25,
            height: size * 0.25,
            backgroundColor: primaryColor,
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: ["-50%", "-130%", "30%", "-50%"],
            y: ["-50%", "20%", "20%", "-50%"],
          }}
          transition={{
            duration: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute rounded-full"
          style={{
            width: size * 0.2,
            height: size * 0.2,
            backgroundColor: secondaryColor,
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: ["-50%", "50%", "-50%", "-150%", "-50%"],
            y: ["-50%", "-50%", "40%", "-50%", "-50%"],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>

      <motion.div
        className="absolute rounded-full border-2"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          borderColor: borderColor,
          opacity: 0.3,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
}
