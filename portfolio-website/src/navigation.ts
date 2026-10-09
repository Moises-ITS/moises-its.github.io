import { useState, useEffect } from 'react'

const SECTION_IDS = ['top', 'work', 'contact']

export function scrollToSection(href: string) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  } else if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

/** Tracks which section is in view (e.g. '#work') and whether the page has scrolled at all. */
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('#top')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)

      // The last section is too short to ever reach the trigger line,
      // so getting near the bottom of the page counts as being on it.
      // Generous slack: with display scaling / browser zoom the max scroll
      // position can land a few pixels short of the true bottom.
      const distanceFromBottom =
        document.documentElement.scrollHeight - (window.innerHeight + window.scrollY)
      const atBottom = distanceFromBottom <= 48
      if (atBottom) {
        setActiveSection(`#${SECTION_IDS[SECTION_IDS.length - 1]}`)
        return
      }

      const scrollY = window.scrollY + window.innerHeight / 3

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i])
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(`#${SECTION_IDS[i]}`)
          return
        }
      }
      setActiveSection('#top')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { activeSection, scrolled }
}
