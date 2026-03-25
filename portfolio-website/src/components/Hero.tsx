import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { personal } from '../data'

/* ─── Animation Variants ─────────────────────────────────────────────────────── */

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
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const slideIn = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
}

/* ─── Portrait SVG ───────────────────────────────────────────────────────────── */

function PortraitSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="portrait__svg"
      role="img"
      aria-label="Profile illustration for Moises Zuniga"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#70c3ff" />
          <stop offset="50%"  stopColor="#a488ff" />
          <stop offset="100%" stopColor="#ff7e70" />
        </linearGradient>
        <radialGradient id="bg-grd" cx="30%" cy="25%" r="70%">
          <stop offset="0%"   stopColor="rgba(91,173,255,0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <clipPath id="circle-clip">
          <circle cx="100" cy="100" r="98" />
        </clipPath>
      </defs>

      {/* Base */}
      <circle cx="100" cy="100" r="100" fill="#0b1420" />
      <circle cx="100" cy="100" r="100" fill="url(#bg-grd)" />

      {/* Subtle inner ring */}
      <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* Head */}
      <circle cx="100" cy="82" r="34" fill="url(#pg)" opacity="0.94" />

      {/* Shoulders */}
      <path
        d="M46 172 C54 144 74 128 100 128 C126 128 146 144 154 172"
        fill="none"
        stroke="url(#pg)"
        strokeWidth="26"
        strokeLinecap="round"
        clipPath="url(#circle-clip)"
      />

      {/* Accent dots */}
      <circle cx="158" cy="42" r="3.5" fill="rgba(91,173,255,0.7)" />
      <circle cx="38"  cy="60" r="2.5" fill="rgba(157,123,255,0.5)" />
      <circle cx="170" cy="140" r="2"  fill="rgba(255,107,91,0.4)" />
    </svg>
  )
}

/* ─── Identity Card ──────────────────────────────────────────────────────────── */

function IdentityCard() {
  return (
    <motion.aside
      className="identity card"
      variants={slideIn}
      initial="hidden"
      animate="visible"
    >
      <div className="identity__top">
        <span className="identity__institution">{personal.institution}</span>
        <span className="identity__badge">{personal.status}</span>
      </div>

      {/* Portrait */}
      <div className="portrait">
        <div className="portrait__ring" aria-hidden="true" />
        <div className="portrait__img">
          <PortraitSVG />
        </div>
      </div>

      {/* Bio note */}
      <div className="identity__note">
        <p>{personal.bio}</p>
      </div>

      {/* Meta rows */}
      <div className="identity__meta">
        <div className="identity__meta-row">
          <span className="identity__meta-label">Current focus</span>
          <span className="identity__meta-value">Cybersecurity · AI · Secure systems</span>
        </div>
        <div className="identity__meta-row">
          <span className="identity__meta-label">Build style</span>
          <span className="identity__meta-value">Practical, sharp, detail-oriented</span>
        </div>
        <div className="identity__meta-row">
          <span className="identity__meta-label">Location</span>
          <span className="identity__meta-value">{personal.location}</span>
        </div>
      </div>

      {/* Socials */}
      <div className="identity__socials">
        <a
          className="identity__social"
          href={`mailto:${personal.email}`}
          aria-label="Email Moises"
        >
          <Mail size={15} />
        </a>
        <a
          className="identity__social"
          href={personal.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
        >
          <Github size={15} />
        </a>
        <a
          className="identity__social"
          href={personal.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
        >
          <Linkedin size={15} />
        </a>
      </div>
    </motion.aside>
  )
}

/* ─── Hero ───────────────────────────────────────────────────────────────────── */

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
          Cybersecurity student building thoughtful systems at the intersection of
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

        {/* Scrolling tape */}
        <motion.div className="hero__tape" variants={fadeUp} aria-hidden="true">
          <div className="tape__track" role="presentation">
            {tapeItems.map((item, i) => (
              <span key={`${item}-${i}`}>{item}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Identity card (parallax wrapper) */}
      <motion.div style={{ y: parallaxY }}>
        <IdentityCard />
      </motion.div>
    </section>
  )
}
