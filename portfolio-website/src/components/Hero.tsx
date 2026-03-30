import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { personal } from '../data'

/* ─── Animation Variants ───────────────────────────────────────────────────── */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/* ─── Hero ─────────────────────────────────────────────────────────────────── */

export function Hero() {
  const pref = useReducedMotion()
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 600], [0, pref ? 0 : -50])

  // Duplicate tape items for seamless marquee
  const tapeItems = [...personal.tape, ...personal.tape]

  return (
    <section className="hero" id="top" aria-label="Introduction">
      {/* Main column */}
      <motion.div
        className="hero__main"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div className="hero__eyebrow" variants={fadeUp}>
          <span className="section-label">{personal.institution}</span>
          <div className="hero__status">
            <span className="hero__status-dot" aria-hidden="true" />
            <span>{personal.status}</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 className="hero__name" variants={fadeUp} aria-label={personal.name}>
          <span>{personal.firstName}</span>
          <span>{personal.lastName}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p className="hero__tagline" variants={fadeUp}>
          Computer Science student building scaleable systems at the intersection of
          defense, AI, and software engineering.
        </motion.p>

        {/* CTAs */}
        <motion.div className="hero__actions" variants={fadeUp}>
          <a className="btn btn--solid" href="#projects">
            Explore work
          </a>
          <a className="btn btn--ghost" href="#contact">
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      {/* Profile photo placeholder */}
      <motion.div
        className="hero__photo"
        style={{ y: parallaxY }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
      >
        <div className="hero__photo-frame">
          <img src="/profile-new.jpg" alt={`${personal.name} portrait`} />
        </div>
      </motion.div>

      {/* Scrolling tape */}
      <div className="hero__tape" aria-hidden="true">
        <div className="tape__track" role="presentation">
          {tapeItems.map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
