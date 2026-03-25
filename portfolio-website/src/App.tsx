import './index.css'
import { MotionConfig } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Background } from './components/Background'
import { Research } from './components/Research'
import { Tools } from './components/Tools'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion={process.env.NODE_ENV === "production" ? "user" : "never"}>
      {/* Fixed ambient background */}
      <div className="ambient" aria-hidden="true">
        <div className="ambient__orb ambient__orb--a" />
        <div className="ambient__orb ambient__orb--b" />
        <div className="ambient__orb ambient__orb--c" />
        <div className="ambient__grain" />
        <div className="ambient__grid" />
      </div>

      <div className="shell">
        <Navbar />

        <main>
          {/* 1 — Intro */}
          <div className="container">
            <Hero />
          </div>

          {/* 2 — Timelines */}
          <div className="container">
            <Background />
          </div>

          {/* 3 — Technical Skills + Certifications */}
          <div className="container">
            <Tools />
          </div>

          {/* 4 — Currently Developing */}
          <div className="container">
            <Research />
          </div>

          {/* 5 — Finished Projects */}
          <div className="container">
            <Projects />
          </div>

          {/* 6 — Contact */}
          <div className="container">
            <Contact />
          </div>
        </main>

        <footer className="container">
          <div className="footer">
            <span className="footer__copy">© 2025 Moises Zuniga. All rights reserved.</span>
            <span className="footer__mono">mz397@njit.edu</span>
          </div>
        </footer>
      </div>
    </MotionConfig>
  )
}
