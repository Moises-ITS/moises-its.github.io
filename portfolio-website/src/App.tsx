import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import Aurora from './components/Aurora'
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="app-layout">
      <div className="aurora-bg">
        <Aurora
          colorStops={['#00b4ff', '#7c3aed', '#00e5ff']}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <Navbar />
      <main className="main-content">
        <Hero />
        <Projects />
        <Contact />
      </main>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.1 }}
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
      <Analytics />
    </div>
  )
}
