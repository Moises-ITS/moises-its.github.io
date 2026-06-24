import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './icons'
import { projects } from '../data'
import type { Project } from '../types'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      className={`portfolio-card glass-card portfolio-card--${project.accent}`}
      variants={cardVariant}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      aria-label={`${project.title} — view on GitHub`}
    >
      <div className="portfolio-card__thumb">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            className="portfolio-card__thumb-img"
            loading="lazy"
          />
        ) : (
          <div className="portfolio-card__thumb-inner">
            <span className="portfolio-card__thumb-label">{project.category}</span>
          </div>
        )}
        <div className="portfolio-card__hover" aria-hidden="true">
          <ExternalLink className="portfolio-card__hover-icon" />
          <span>View on GitHub</span>
        </div>
      </div>

      <div className="portfolio-card__body">
        <h3 className="portfolio-card__title">{project.title}</h3>
        <p className="portfolio-card__desc">{project.summary}</p>
        <div className="portfolio-card__tags">
          {project.stack.slice(0, 4).map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

export function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-heading">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title" id="projects-heading">
          My <span className="accent-text">Portfolio</span>
        </h2>
        <p className="section-subtitle">A collection of my recent projects</p>
      </motion.div>

      <motion.div
        className="portfolio-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        <motion.a
          href="https://github.com/Moises-ITS?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-card glass-card portfolio-card--gold"
          variants={cardVariant}
          whileHover={{ y: -6, transition: { duration: 0.25 } }}
          aria-label="View all repositories on GitHub"
        >
          <div className="portfolio-card__thumb">
            <div className="portfolio-card__thumb-inner">
              <GithubIcon size={32} />
            </div>
            <div className="portfolio-card__hover" aria-hidden="true">
              <ExternalLink className="portfolio-card__hover-icon" />
              <span>View on GitHub</span>
            </div>
          </div>
          <div className="portfolio-card__body">
            <h3 className="portfolio-card__title">More Projects</h3>
            <p className="portfolio-card__desc">
              Explore all my repositories — side projects, experiments, and open-source work.
            </p>
          </div>
        </motion.a>
      </motion.div>
    </section>
  )
}
