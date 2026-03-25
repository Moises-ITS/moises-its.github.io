import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Github, Linkedin, MapPin, ArrowUpRight } from 'lucide-react'
import { personal } from '../data'

/* ─── Contact Section ────────────────────────────────────────────────────────── */

export function Contact() {
  const reduced = useReducedMotion() ?? false

  const revealCard = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 } as const,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }

  const links = [
    {
      icon: <Mail size={18} aria-hidden="true" />,
      label: personal.email,
      href: `mailto:${personal.email}`,
      external: false,
    },
    {
      icon: <Github size={18} aria-hidden="true" />,
      label: personal.githubHandle,
      href: personal.github,
      external: true,
    },
    {
      icon: <Linkedin size={18} aria-hidden="true" />,
      label: personal.linkedinHandle,
      href: personal.linkedin,
      external: true,
    },
  ]

  return (
    <section className="contact section" id="contact" aria-labelledby="contact-heading">
      <div style={{ marginBottom: '1.1rem' }}>
        <span className="section-label">Contact</span>
      </div>

      <motion.div className="contact-card card" {...(reduced ? {} : revealCard)}>
        {/* Copy */}
        <div className="contact-card__copy">
          <h2 className="contact-card__h2" id="contact-heading">
            Open to the right opportunities
          </h2>
          <p className="contact-card__body">
            If you're hiring, building, or just want to compare notes on cybersecurity,
            AI, or systems work — I'd be glad to connect. I'm looking for internships
            where security and engineering craft both matter.
          </p>
        </div>

        {/* Links */}
        <div className="contact-links">
          {links.map((link) => (
            <a
              key={link.href}
              className="contact-link"
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              aria-label={link.label}
            >
              <span className="contact-link__icon">{link.icon}</span>
              <span className="contact-link__text">{link.label}</span>
              <ArrowUpRight size={15} className="contact-link__arrow" aria-hidden="true" />
            </a>
          ))}

          <div className="contact-location" aria-label={`Location: ${personal.location}`}>
            <span className="contact-location__icon">
              <MapPin size={16} aria-hidden="true" />
            </span>
            <span className="contact-location__text">{personal.location}</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
