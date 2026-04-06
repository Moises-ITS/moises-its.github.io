import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { personal } from '../data'

/* ─── Animation Variants ────────────────────────────────────────────────────────── */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/* ─── Hero ──────────────────────────────────────────────────────────────────────── */

export function Hero() {
  const pref = useReducedMotion()
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 600], [0, pref ? 0 : -40])
  const parallaxOpacity = useTransform(scrollY, [0, 400], [1, pref ? 1 : 0.25])

  const tapeItems = [...personal.tape, ...personal.tape]

  return (
    <section className="hero" id="top" aria-label="Introduction">

      {/* Two-column row */}
      <div className="hero__row">

        {/* LEFT — copy */}
        <motion.div
          className="hero__copy"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div className="hero__eyebrow" variants={fadeUp}>
            <span className="section-label">{personal.institution}</span>
            <div className="hero__status" aria-label="Status: Open to internships">
              <span className="hero__status-dot" aria-hidden="true" />
              <span>{personal.status}</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1 className="hero__name" aria-label={personal.name} variants={fadeUp}>
            <span className="hero__name-first">{personal.firstName}</span>
            <span className="hero__name-last">{personal.lastName}</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p className="hero__tagline" variants={fadeUp}>
            CS student at NJIT building full-stack apps, ML systems,
            and DevOps pipelines. Currently researching LLM security&nbsp;&amp;&nbsp;privacy.
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero__actions" variants={fadeUp}>
            <a className="btn btn--solid" href="#projects">See my projects</a>
            <a className="btn btn--ghost" href="#contact">Get in touch</a>
          </motion.div>
        </motion.div>

        {/* RIGHT — photo */}
        <motion.div
          className="hero__photo"
          style={{ y: parallaxY, opacity: parallaxOpacity }}
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
        >
          <div className="hero__photo-frame">
            <img src="/0Z0A6044.jpg" alt={`${personal.name} portrait`} />
          </div>
        </motion.div>
      </div>

      {/* Scrolling tape */}
      <motion.div
        className="hero__tape"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <div className="tape__track" role="presentation">
          {tapeItems.map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
