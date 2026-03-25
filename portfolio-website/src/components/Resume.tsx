import { motion, useReducedMotion } from 'framer-motion'
import { Download } from 'lucide-react'
import { education, experience, certifications } from '../data'
import type { TimelineEntry } from '../types'

/* ─── Reveal helper ──────────────────────────────────────────────────────────── */

function useReveal(delay = 0, reduced = false) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 } as const,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : delay },
  }
}

/* ─── Vertical Timeline ──────────────────────────────────────────────────────── */

function Timeline({ entries, reduced }: { entries: TimelineEntry[]; reduced: boolean }) {
  return (
    <div className="vtl">
      {entries.map((entry, i) => (
        <motion.div
          key={entry.title}
          className="vtl__item"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : i * 0.1 }}
        >
          <div className="vtl__rail">
            <div className="vtl__dot" />
            {i < entries.length - 1 && <div className="vtl__line" />}
          </div>
          <div className="vtl__body">
            <span className="vtl__range">{entry.range}</span>
            <p className="vtl__title">{entry.title}</p>
            <p className="vtl__org">{entry.org}</p>
            <p className="vtl__detail">{entry.detail}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Resume Section ─────────────────────────────────────────────────────────── */

export function Resume() {
  const reduced = useReducedMotion() ?? false

  return (
    <section className="resume section" id="resume" aria-labelledby="resume-heading">
      <div className="resume__head">
        <div>
          <div style={{ marginBottom: '1.1rem' }}>
            <span className="section-label">Resume</span>
          </div>
          <h2 className="section-head__h2" id="resume-heading">
            Background & credentials
          </h2>
          <p className="section-head__sub">
            How coursework, labs, and real-world projects connect end to end.
          </p>
        </div>
        <a
          className="resume__download"
          href="Zuniga, Moises NJIT Spring 2026 Resume.pdf"
          download
          aria-label="Download full resume PDF"
        >
          <Download size={15} aria-hidden="true" />
          Download resume
        </a>
      </div>

      {/* Timeline row — full width, side by side */}
      <div className="resume-timeline-row">
        <motion.section
          className="resume-card card"
          aria-labelledby="edu-heading"
          {...useReveal(0, reduced)}
        >
          <h3 className="resume-card__title" id="edu-heading">Education</h3>
          <Timeline entries={education} reduced={reduced} />
        </motion.section>

        <motion.section
          className="resume-card card"
          aria-labelledby="exp-heading"
          {...useReveal(0.08, reduced)}
        >
          <h3 className="resume-card__title" id="exp-heading">Experience</h3>
          <Timeline entries={experience} reduced={reduced} />
        </motion.section>
      </div>

      {/* Certifications row */}
      <motion.section
        className="resume-card card resume-certs-card"
        aria-labelledby="certs-heading"
        {...useReveal(0.14, reduced)}
      >
        <h3 className="resume-card__title" id="certs-heading">Certifications</h3>
        <div className="certs-row">
          {certifications.map((cert) => (
            <div key={cert.label} className="cert-entry">
              <span
                className={`cert-entry__dot cert-entry__dot--${cert.status === 'Earned' ? 'earned' : 'progress'}`}
                aria-hidden="true"
              />
              <span className="cert-entry__label">{cert.label}</span>
              <span className="cert-entry__status">{cert.status}</span>
            </div>
          ))}
        </div>
      </motion.section>
    </section>
  )
}
