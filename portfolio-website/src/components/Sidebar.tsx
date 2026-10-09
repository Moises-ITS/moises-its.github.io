import { motion, useReducedMotion } from 'framer-motion'
import { FileText, House, LayoutGrid, Mail } from 'lucide-react'
import { scrollToSection, useActiveSection } from '../navigation'
import { ease } from '../motion'

const ITEMS = [
  { href: '#top', label: 'Home', icon: House },
  { href: '#work', label: 'Work', icon: LayoutGrid },
  { href: '#contact', label: 'Contact', icon: Mail },
]

/** Slim floating icon rail on the left edge; labels slide out on hover/focus. */
export function Sidebar() {
  const reduced = useReducedMotion() ?? false
  const { activeSection } = useActiveSection()

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToSection(href)
  }

  return (
    <motion.nav
      className="rail"
      aria-label="Sections"
      initial={reduced ? false : { opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.4 }}
    >
      <ul className="rail__list">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active = activeSection === href
          return (
            <li key={href}>
              <a
                href={href}
                onClick={handleClick(href)}
                className={`rail__item${active ? ' rail__item--active' : ''}`}
                aria-label={label}
                aria-current={active ? 'true' : undefined}
              >
                {active && !reduced && (
                  <motion.span
                    layoutId="rail-active"
                    className="rail__active-bg"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                {active && reduced && <span className="rail__active-bg" />}
                <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                <span className="rail__label" aria-hidden="true">{label}</span>
              </a>
            </li>
          )
        })}
        <li className="rail__divider" aria-hidden="true" />
        <li>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rail__item"
            aria-label="Resume (opens in new tab)"
          >
            <FileText size={19} strokeWidth={1.8} aria-hidden="true" />
            <span className="rail__label" aria-hidden="true">Resume</span>
          </a>
        </li>
      </ul>
    </motion.nav>
  )
}
