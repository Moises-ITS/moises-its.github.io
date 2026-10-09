import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { scrollToSection, useActiveSection } from '../navigation'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const reduced = useReducedMotion() ?? false
  const { activeSection, scrolled } = useActiveSection()

  // reading progress: a thin line along the bottom of the bar
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToSection(href)
  }

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} aria-label="Primary">
      <div className="nav__inner">
        <a href="#top" className="nav__brand" onClick={handleClick('#top')} aria-label="Moises Zuniga — back to top">
          <span className="nav__name">NYC · NJ</span>
        </a>
        <ul className="nav__links">
          {LINKS.map(({ href, label }) => {
            const active = activeSection === href
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={handleClick(href)}
                  className={`nav__link${active ? ' nav__link--active' : ''}`}
                  aria-current={active ? 'true' : undefined}
                >
                  {/* pill that slides between links as the active section changes */}
                  {active && (
                    <motion.span
                      layoutId={reduced ? undefined : 'nav-active'}
                      className="nav__pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="nav__link-label">{label}</span>
                </a>
              </li>
            )
          })}
          <li>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav__link">
              <span className="nav__link-label">Resume</span>
            </a>
          </li>
        </ul>
      </div>
      <motion.span
        className="nav__progress"
        aria-hidden="true"
        style={{ scaleX: reduced ? scrollYProgress : progress }}
      />
    </nav>
  )
}
