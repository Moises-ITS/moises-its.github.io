import { motion, useReducedMotion } from 'framer-motion'
import { research } from '../data'
import type { ResearchItem } from '../types'

/* ─── Status Color Map ───────────────────────────────────────────────────────── */

const statusStyle: Record<ResearchItem['status'], { color: string; glow: string }> = {
  Active:       { color: 'var(--cyan)',   glow: 'rgba(94,245,208,0.22)' },
  Building:     { color: 'var(--blue)',   glow: 'rgba(91,173,255,0.22)' },
  Exploring:    { color: 'var(--violet)', glow: 'rgba(157,123,255,0.2)' },
  'In Progress':{ color: 'var(--gold)',   glow: 'rgba(240,192,96,0.2)' },
}

/* ─── Research Card ──────────────────────────────────────────────────────────── */

function ResearchCard({ item, index, reduced }: { item: ResearchItem; index: number; reduced: boolean }) {
  const style = statusStyle[item.status]

  return (
    <motion.article
      className="research-card card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: reduced ? 0 : index * 0.09 }}
      aria-labelledby={`research-title-${item.id}`}
    >
      <div className="research-card__top">
        <span
          className="research-card__status"
          style={{ color: style.color }}
          aria-label={`Status: ${item.status}`}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: style.color,
              boxShadow: `0 0 8px ${style.glow}`,
              marginRight: '0.45rem',
              verticalAlign: 'middle',
              animation: item.status === 'Active' ? 'pulse-dot 2.5s ease-in-out infinite' : undefined,
            }}
          />
          {item.status}
        </span>
        <span className="research-card__number">{item.number}</span>
      </div>

      <h3 className="research-card__title" id={`research-title-${item.id}`}>
        {item.title}
      </h3>

      <p className="research-card__body">{item.summary}</p>

      <div className="research-card__tags" aria-label="Tags">
        {item.tags.map((tag) => (
          <span key={tag} className="tag-badge">
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

/* ─── Research Section ───────────────────────────────────────────────────────── */

export function Research() {
  const reduced = useReducedMotion() ?? false

  return (
    <section className="research section" id="research" aria-labelledby="research-heading">
      <div className="research__head">
        <div>
          <div style={{ marginBottom: '1.1rem' }}>
            <span className="section-label">In Progress</span>
          </div>
          <h2 className="section-head__h2" id="research-heading">
            Currently developing
          </h2>
        </div>
        <p className="research__sub">
          Active builds, ongoing experiments, and areas I'm pushing deeper into right now.
        </p>
      </div>

      <div className="research-grid" role="list">
        {research.map((item, i) => (
          <div key={item.id} role="listitem">
            <ResearchCard item={item} index={i} reduced={reduced} />
          </div>
        ))}
      </div>
    </section>
  )
}
