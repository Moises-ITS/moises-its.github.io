import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import { personal } from '../data'

/* ─── Animation helpers ─────────────────────────────────────────────────────────── */

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

/* ─── Contact card data ─────────────────────────────────────────────────────────── */

const contactLinks = [
  {
    type: 'email' as const,
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
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

/* ─── Contact Section ────────────────────────────────────────────────────────────── */

export function Contact() {
  const reduced = useReducedMotion() ?? false

  return (
    <section className="contact section" id="contact" aria-labelledby="contact-heading">

      {/* Header */}
      <motion.div
        className="contact__header"
        {...(reduced ? {} : fadeUp(0))}
      >
        <span className="section-label contact__eyebrow">Contact</span>
        <h2 className="contact__heading" id="contact-heading">
          Let&rsquo;s build something
          <br />
          <span className="grad">worth talking about.</span>
        </h2>
        <p className="contact__sub">
          Open to internships where security and engineering meet.
          If you&rsquo;re hiring, building, or just want to talk shop — reach out.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="contact__cards"
        variants={reduced ? undefined : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        aria-label="Contact links"
      >
        {contactLinks.map((link) => (
          <motion.a
            key={link.href}
            className={`contact__card contact__card--${link.type}`}
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            aria-label={`${link.label}: ${link.value}`}
            variants={reduced ? undefined : cardVariant}
            whileHover={reduced ? undefined : { y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {/* Glow blob */}
            <span className="contact__card-blob" aria-hidden="true" />

            {/* Icon */}
            <span className="contact__card-icon" aria-hidden="true">
              {link.icon}
            </span>

            {/* Label */}
            <span className="contact__card-label">{link.label}</span>

            {/* Value */}
            <span className="contact__card-value">{link.value}</span>

            {/* CTA row */}
            <span className="contact__card-cta" aria-hidden="true">
              {link.cta}
              <ArrowUpRight size={14} />
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Location */}
      <motion.div
        className="contact__location"
        aria-label={`Location: ${personal.location}`}
        {...(reduced ? {} : fadeUp(0.2))}
      >
        <MapPin size={15} aria-hidden="true" />
        <span>{personal.location}</span>
      </motion.div>

      {/* Footer strip */}
      <div className="contact__footer-strip">
        <p className="contact__footer-copy">
          &copy; {new Date().getFullYear()} Moises Zuniga — All rights reserved.
        </p>
        <span className="contact__footer-mark">MZ</span>
      </div>
    </section>
  )
}
