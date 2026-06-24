import { useState, useEffect, useMemo } from 'react'
import { Home, Briefcase, Mail } from 'lucide-react'
import Dock from './Dock'

const SECTION_IDS = ['top', 'projects', 'contact']

function scrollTo(href: string) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  } else if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState('#top')

  useEffect(() => {
    const onScroll = () => {
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

  const items = useMemo(() => [
    {
      icon: <Home size={18} />,
      label: 'Home',
      onClick: () => scrollTo('#top'),
      className: activeSection === '#top' ? 'dock-item--active' : '',
    },
    {
      icon: <Briefcase size={18} />,
      label: 'Portfolio',
      onClick: () => scrollTo('#projects'),
      className: activeSection === '#projects' ? 'dock-item--active' : '',
    },
    {
      icon: <Mail size={18} />,
      label: 'Contact',
      onClick: () => scrollTo('#contact'),
      className: activeSection === '#contact' ? 'dock-item--active' : '',
    },
  ], [activeSection])

  return (
    <Dock
      items={items}
      baseItemSize={50}
      magnification={70}
    />
  )
}
