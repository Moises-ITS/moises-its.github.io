export const ease = [0.22, 1, 0.36, 1] as const

/** Fade + rise when scrolled into view. Spread onto a motion element. */
export const reveal = (delay = 0, reduced = false) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 } as const,
        transition: { duration: 1, ease, delay },
      }
