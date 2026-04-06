import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Background } from './components/Background'
import { Projects } from './components/Projects'
import { Research } from './components/Research'
import { Tools } from './components/Tools'
import { Contact } from './components/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="main-sections">
          <Background />
          <Projects />
          <Research />
          <Tools />
          <Contact />
        </div>
      </main>
    </>
  )
}
