import { motion, useReducedMotion } from 'framer-motion'
import { FileText, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import { personal } from '../data'

// icons spring up one after another as the row comes into view
const row = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const icon = {
  hidden: { opacity: 0, y: 36, scale: 0.7 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 320, damping: 16, mass: 0.8 },
  },
}

const links = [
  { label: 'Email', href: personal.emailMailto, icon: <Mail size={22} aria-hidden="true" /> },
  { label: 'GitHub', href: personal.github, icon: <GithubIcon size={22} aria-hidden="true" /> },
  { label: 'LinkedIn', href: personal.linkedin, icon: <LinkedinIcon size={22} aria-hidden="true" /> },
  { label: 'Resume', href: '/resume.pdf', icon: <FileText size={22} aria-hidden="true" /> },
]

export function Contact() {
  const reduced = useReducedMotion() ?? false

  return (
    <>
      <section className="section contact" id="contact" aria-label="Contact">
        <div className="section__inner">
          <motion.ul
            className="contact__links"
            variants={row}
            initial={reduced ? false : 'hidden'}
            whileInView="visible"
            // start before the row is on screen: it sits right above the footer, so waiting
            // for it to be mostly visible left a blank gap at the bottom of the page
            viewport={{ once: true, amount: 'some', margin: '0px 0px 160px 0px' }}
          >
            {links.map(({ label, href, icon: glyph }) => (
              <motion.li key={label} variants={icon}>
                <a
                  href={href}
                  className="contact__link"
                  {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <span className="contact__link-icon">{glyph}</span>
                  {label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__inner">
          <span>Copyright © {new Date().getFullYear()} {personal.name}.</span>
          <span>{personal.location}</span>
        </div>
      </footer>
    </>
  )
}
