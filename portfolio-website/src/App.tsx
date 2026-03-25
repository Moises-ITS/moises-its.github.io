import './index.css'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Research } from './components/Research'
import { Resume } from './components/Resume'
import { Contact } from './components/Contact'

export default function App() {
  return (
    <>
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
          <div className="container">
            <Hero />
          </div>

          <div className="container">
            <Projects />
          </div>

          <div className="container">
            <Research />
          </div>

          <div className="container">
            <Resume />
          </div>

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
    </>
  )
}
