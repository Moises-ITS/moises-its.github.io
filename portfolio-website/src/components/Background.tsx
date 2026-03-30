import { motion, useReducedMotion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { milestones } from '../data'
import type { Milestone } from '../types'

/* ─── Unified timeline data (chronological) ─────────────────────────────────── */

const typeColors: Record<Milestone['type'], string> = {
  education: 'var(--blue)',
  work: 'var(--violet)',
  cert: 'var(--cyan)',
}

const typeLabels: Record<Milestone['type'], string> = {
  education: 'Education',
  work: 'Experience',
  cert: 'Certification',
}

/* ─── Single milestone node ─────────────────────────────────────────────────── */

function MilestoneNode({
  milestone,
  index,
  side,
  reduced,
}: {
  milestone: Milestone
  index: number
  side: 'left' | 'right'
  reduced: boolean
}) {
  const accent = typeColors[milestone.type]
  const glow = `color-mix(in srgb, ${accent} 14%, transparent)`

  return (
    <div className={`vtl__item vtl__item--${side}`}>
      {/* Dot on the line */}
      <div className="vtl__dot" style={{ background: accent, boxShadow: `0 0 12px ${accent}` }} />

      {/* Card */}
      <motion.div
        className="vtl__card card"
        initial={{ opacity: 0, x: side === 'left' ? -28 : 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: reduced ? 0 : index * 0.1 }}
      >
        {/* Accent bar */}
        <div className="vtl__card-bar" style={{ background: accent }} />

        <div className="vtl__card-head">
          <span className="vtl__card-date" style={{ color: accent, borderColor: `color-mix(in srgb, ${accent} 28%, transparent)`, background: glow }}>
            {milestone.date}
          </span>
          <span className="vtl__card-type" style={{ color: accent }}>
            {typeLabels[milestone.type]}
          </span>
        </div>

        <h3 className="vtl__card-title">{milestone.title}</h3>
        <p className="vtl__card-org" style={{ color: accent }}>{milestone.org}</p>
        <p className="vtl__card-detail">{milestone.detail}</p>
      </motion.div>
    </div>
  )
}

/* ─── Background Section ─────────────────────────────────────────────────────── */

export function Background() {
  const reduced = useReducedMotion() ?? false

  return (
    <section className="background section" id="background" aria-labelledby="bg-heading">
      {/* Header */}
      <div className="background__head">
        <div>
          <div style={{ marginBottom: '1.1rem' }}>
            <span className="section-label">Timeline</span>
          </div>
          <h2 className="section-head__h2" id="bg-heading">
            Education &amp; Experience
          </h2>
          <p className="section-head__sub">
            Where I've studied, what I've built, and the credentials I've earned along the way.
          </p>
        </div>
        <a
          className="resume__download"
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          aria-label="View full resume PDF"
        >
          <Eye size={15} aria-hidden="true" />
          View resume
        </a>
      </div>

      {/* Legend */}
      <div className="vtl__legend">
        {(['education', 'work', 'cert'] as const).map((type) => (
          <span key={type} className="vtl__legend-item">
            <span className="vtl__legend-dot" style={{ background: typeColors[type] }} />
            {typeLabels[type]}
          </span>
        ))}
      </div>

      {/* Vertical timeline */}
      <div className="vtl">
        {/* The center line */}
        <div className="vtl__line" aria-hidden="true" />

        {/* Starting point */}
        <div className="vtl__start">
          <span className="vtl__start-label">Sep 2024</span>
        </div>

        {/* Milestones */}
        {milestones.map((m, i) => (
          <MilestoneNode
            key={`${m.date}-${m.title}`}
            milestone={m}
            index={i}
            side={i % 2 === 0 ? 'left' : 'right'}
            reduced={reduced}
          />
        ))}

        {/* Present marker */}
        <div className="vtl__end">
          <span className="vtl__end-label">Present</span>
        </div>
      </div>
    </section>
  )
}
