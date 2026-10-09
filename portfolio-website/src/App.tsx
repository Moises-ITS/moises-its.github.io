import { Navbar } from './components/Navbar'
import { Sidebar } from './components/Sidebar'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>
      <Analytics />
    </>
  )
}
