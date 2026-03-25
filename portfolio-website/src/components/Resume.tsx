import { motion, useReducedMotion } from 'framer-motion'
import { Download } from 'lucide-react'
import { education, experience, skillGroups, certifications } from '../data'

/* ─── Reveal helper ──────────────────────────────────────────────────────────── */

function useReveal(delay = 0, reduced = false) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 } as const,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : delay },
  }
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
            Background & skills
          </h2>
          <p className="section-head__sub">
            A concise view of how coursework, labs, and hands-on projects connect.
          </p>
        </div>
        <a
          className="resume__download"
          href="Zuniga, Moises Fall 2025 - Spring 2025 Resume .pdf"
          download
          aria-label="Download full resume PDF"
        >
          <Download size={15} aria-hidden="true" />
          Download resume
        </a>
      </div>

      <div className="resume-grid">
        {/* Education */}
        <motion.section
          className="resume-card card"
          aria-labelledby="edu-heading"
          {...useReveal(0, reduced)}
        >
          <h3 className="resume-card__title" id="edu-heading">Education</h3>
          {education.map((entry) => (
            <div key={entry.title} className="timeline-entry">
              <span className="timeline-entry__range">{entry.range}</span>
              <p className="timeline-entry__title">{entry.title}</p>
              <p className="timeline-entry__org">{entry.org}</p>
              <p className="timeline-entry__detail">{entry.detail}</p>
            </div>
          ))}
        </motion.section>

        {/* Experience */}
        <motion.section
          className="resume-card card"
          aria-labelledby="exp-heading"
          {...useReveal(0.08, reduced)}
        >
          <h3 className="resume-card__title" id="exp-heading">Experience</h3>
          {experience.map((entry) => (
            <div key={entry.title} className="timeline-entry">
              <span className="timeline-entry__range">{entry.range}</span>
              <p className="timeline-entry__title">{entry.title}</p>
              <p className="timeline-entry__org">{entry.org}</p>
              <p className="timeline-entry__detail">{entry.detail}</p>
            </div>
          ))}
        </motion.section>

        {/* Skills */}
        <motion.section
          className="resume-card card"
          aria-labelledby="skills-heading"
          {...useReveal(0.14, reduced)}
        >
          <h3 className="resume-card__title" id="skills-heading">Technical Skills</h3>
          {skillGroups.map((group) => (
            <div key={group.label} className="skill-section">
              <span className="skill-section__label">{group.label}</span>
              <div className="skill-section__items">
                {group.items.map((item) => (
                  <span key={item} className="stack-badge">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.section>

        {/* Certifications */}
        <motion.section
          className="resume-card card"
          aria-labelledby="certs-heading"
          {...useReveal(0.2, reduced)}
        >
          <h3 className="resume-card__title" id="certs-heading">Certifications</h3>
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
        </motion.section>
      </div>
    </section>
  )
}
