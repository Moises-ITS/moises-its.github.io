import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data'
import type { Project } from '../types'

/* ─── Variants ───────────────────────────────────────────────────────────────── */

const reveal = (delay = 0) => ({
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
  },
})

/* ─── Case Study Card ────────────────────────────────────────────────────────── */

function CaseStudy({ project, index, reduced }: { project: Project; index: number; reduced: boolean }) {
  const accentMap: Record<string, string> = {
    blue:   'var(--blue)',
    violet: 'var(--violet)',
    cyan:   'var(--cyan)',
    red:    'var(--red)',
  }
  const accent = accentMap[project.accent]

  return (
    <motion.article
      className={`case card case--${project.accent}`}
      variants={reveal(reduced ? 0 : index * 0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Header row */}
      <div className="case__header">
        <div className="case__header-left">
          <span className="case__number">{project.number}</span>
          <div className="case__divider" aria-hidden="true" />
          <span className="case__category">{project.category}</span>
        </div>
        <span className="case__year">{project.year}</span>
      </div>

      {/* Project title */}
      <h3 className="case__title" id={`project-title-${project.id}`}>
        {project.title}
      </h3>

      {/* Two-column body */}
      <div className="case__body">
        {/* Story column */}
        <div className="case__story">
          <p className="case__summary">{project.summary}</p>

          <div className="case__detail">
            <span className="case__detail-label">Challenge</span>
            <p className="case__detail-text">{project.challenge}</p>
          </div>

          <div className="case__detail">
            <span className="case__detail-label">Contribution</span>
            <p className="case__detail-text">{project.contribution}</p>
          </div>

          <div className="case__detail">
            <span className="case__detail-label">Impact</span>
            <p className="case__detail-text">{project.impact}</p>
          </div>
        </div>

        {/* Panel column */}
        <div className="case__panel">
          <div className="case__build-note">
            <span className="case__build-note-label">Build note</span>
            <p>{project.buildNote}</p>
          </div>

          <div className="case__stack" aria-label="Technologies used">
            {project.stack.map((tech) => (
              <span key={tech} className="stack-badge">
                {tech}
              </span>
            ))}
          </div>

          {project.repo && (
            <a
              className="case__link"
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} source code on GitHub`}
              style={{ '--accent': accent } as React.CSSProperties}
            >
              <ArrowUpRight size={15} aria-hidden="true" />
              View source
            </a>
          )}
        </div>
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
            These projects are less about "features" and more about how I reason through
            tradeoffs, debug hard things, and ship something worth showing.
          </p>
        </div>
        <span className="projects__count">{String(projects.length).padStart(2, '0')} projects</span>
      </div>

      <div className="project-stack" role="list">
        {projects.map((project, i) => (
          <div key={project.id} role="listitem">
            <CaseStudy project={project} index={i} reduced={reduced} />
          </div>
        ))}
      </div>
    </section>
  )
}
