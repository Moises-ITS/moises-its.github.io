import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data'
import type { Project } from '../types'

/* ─── Variants ───────────────────────────────────────────────────────────────── */

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const card = (reduced: boolean) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay: reduced ? 0 : 0 },
  },
})

/* ─── Project Card (compact) ─────────────────────────────────────────────────── */

function ProjectCard({ project, reduced }: { project: Project; reduced: boolean }) {
  const accentVar = `var(--${project.accent})`

  return (
    <motion.article
      className={`pcard pcard--${project.accent}`}
      variants={card(reduced)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      aria-labelledby={`proj-${project.id}`}
      style={{ '--accent': accentVar } as React.CSSProperties}
    >
      {/* Top meta row */}
      <div className="pcard__meta">
        <span className="pcard__num">{project.number}</span>
        <span className="pcard__sep" aria-hidden="true" />
        <span className="pcard__cat">{project.category}</span>
        <span className="pcard__year">{project.year}</span>
        {project.repo && (
          <a
            className="pcard__ext"
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${project.title} on GitHub`}
          >
            <ArrowUpRight size={13} />
          </a>
        )}
      </div>

      {/* Title */}
      <h3 className="pcard__title" id={`proj-${project.id}`}>{project.title}</h3>

      {/* Impact callout */}
      <p className="pcard__impact">{project.impact}</p>

      {/* Summary */}
      <p className="pcard__summary">{project.summary}</p>

      {/* Stack */}
      <div className="pcard__stack" aria-label="Stack">
        {project.stack.map((t) => (
          <span key={t} className="pcard__tag">{t}</span>
        ))}
      </div>
    </motion.article>
  )
}

/* ─── Projects Section ───────────────────────────────────────────────────────── */

export function Projects() {
  const reduced = useReducedMotion() ?? false

  return (
    <section className="projects" id="projects" aria-labelledby="projects-heading">
      <div className="projects__head">
        <div className="projects__head-left">
          <div className="section-head__label">
            <span className="section-label">Selected Work</span>
          </div>
          <h2 className="section-head__h2" id="projects-heading">
            Systems built with intent
          </h2>
          <p className="section-head__sub">
            Each project is a real tradeoff — not a tutorial clone. Click through to see the code.
          </p>
        </div>
        <span className="projects__count">{String(projects.length).padStart(2, '0')} projects</span>
      </div>

      <motion.div
        className="pcard-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} reduced={reduced} />
        ))}
      </motion.div>
    </section>
  )
}
