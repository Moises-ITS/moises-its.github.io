import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import { personal } from '../data'

/* ─── Animation helpers ────────────────────────────────────────────────────── */

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 } as const,
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
})

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
}

/* ─── Contact card data ────────────────────────────────────────────────────── */

const contactLinks = [
  {
    type: 'email' as const,
    label: 'Email',
    value: personal.email,
    href: personal.emailMailto,
    cta: 'Send a message',
    icon: <Mail size={22} aria-hidden="true" />,
    external: false,
  },
  {
    type: 'github' as const,
    label: 'GitHub',
    value: personal.githubHandle,
    href: personal.github,
    cta: 'View my work',
    icon: <GithubIcon size={22} aria-hidden="true" />,
    external: true,
  },
  {
    type: 'linkedin' as const,
    label: 'LinkedIn',
    value: personal.linkedinHandle,
    href: personal.linkedin,
    cta: 'Connect with me',
    icon: <LinkedinIcon size={22} aria-hidden="true" />,
    external: true,
  },
]

/* ─── Contact Section ──────────────────────────────────────────────────────── */

export function Contact() {
  const reduced = useReducedMotion() ?? false

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-heading">
      {/* Header */}
      <motion.div
        className="section-header"
        {...(reduced ? {} : fadeUp(0))}
      >
        <h2 className="section-title" id="contact-heading">
          Get In <span className="accent-text">Touch</span>
        </h2>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="contact-cards"
        variants={reduced ? undefined : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        aria-label="Contact links"
      >
        {contactLinks.map((link) => (
          <motion.a
            key={link.href}
            className={`contact-card glass-card contact-card--${link.type} contact-card__link`}
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={`${link.label}: ${link.value}`}
            variants={reduced ? undefined : cardVariant}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="contact-card__icon">{link.icon}</span>
            <span className="contact-card__label">{link.label}</span>
            <span className="contact-card__value">{link.value}</span>
            <span className="contact-card__cta">
              {link.cta}
              <ArrowUpRight size={14} />
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Location */}
      <motion.div
        className="contact-location"
        aria-label={`Location: ${personal.location}`}
        {...(reduced ? {} : fadeUp(0.2))}
      >
        <MapPin size={15} aria-hidden="true" />
        <span>{personal.location}</span>
      </motion.div>

      {/* Footer */}
      <div className="contact-footer">
        <p className="contact-footer__copy">
          &copy; {new Date().getFullYear()} Moises Zuniga — All rights reserved.
        </p>
        <span className="contact-footer__mark">MZ</span>
      </div>
    </section>
  )
}
