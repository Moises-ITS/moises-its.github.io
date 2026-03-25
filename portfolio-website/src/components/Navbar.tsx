import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'

const NAV_LINKS = [
  { label: 'Timeline',   href: '#background' },
  { label: 'Skills',     href: '#tools' },
  { label: 'Developing', href: '#research' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navVariants = {
    hidden: { opacity: 0, y: -16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  }

  const mobileMenu = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
    exit:   { opacity: 0, height: 0,    transition: { duration: 0.2, ease: [0.55, 0, 0.8, 0.45] as const } },
  } as const

  return (
    <motion.header
      className={`nav${scrolled ? ' scrolled' : ''}`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      role="banner"
    >
      <div className="container">
        <nav className="nav__inner">
          <a className="nav__wordmark" href="#top" aria-label="Moises Zuniga — home">
            Moises Zuniga
          </a>

          <ul className="nav__links" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          <div className="nav__actions">
            <div className="nav__socials" aria-label="Social links">
              <a href="mailto:mz397@njit.edu" aria-label="Email Moises">
                <Mail size={16} />
              </a>
              <a href="https://github.com/Moises-ITS" target="_blank" rel="noreferrer" aria-label="GitHub profile">
                <GithubIcon size={16} />
              </a>
              <a href="https://www.linkedin.com/in/moises-zuniga2034894/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                <LinkedinIcon size={16} />
              </a>
            </div>
            <a
              className="nav__cta"
              href="Zuniga, Moises NJIT Spring 2026 Resume.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="View resume PDF in a new tab"
            >
              <Eye size={14} />
              View Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="nav__mobile-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            style={{
              display: 'none',
              width: 38,
              height: 38,
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text-2)',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 5,
              padding: '9px 10px',
            }}
          >
            <span style={{ display: 'block', width: '100%', height: 1.5, background: 'currentColor', borderRadius: 2 }} />
            <span style={{ display: 'block', width: '70%', height: 1.5, background: 'currentColor', borderRadius: 2, alignSelf: 'flex-start' }} />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav__mobile"
            variants={mobileMenu}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              borderTop: '1px solid var(--border)',
              background: 'rgba(7, 13, 20, 0.96)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="container" style={{ padding: '1rem 0' }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid var(--border)',
                    color: 'var(--text-2)',
                    fontSize: '0.95rem',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
