import './index.css'

const metrics = [
  '3 production-track AI systems',
  'PyTorch + LLM eval workflows',
  'Backend + MLOps ownership',
  'NJIT AI research track',
]

const projects = [
  {
    name: 'Opportunity Intelligence Engine',
    stack: 'Python, TypeScript, PostgreSQL, ranking models',
    impact: 'Relevance scoring over fragmented campus opportunity data.',
  },
  {
    name: 'LLM Evaluation Harness',
    stack: 'PyTorch, CI checks, regression datasets',
    impact: 'Versioned evals for prompt/model updates before deploy.',
  },
  {
    name: 'MLOps Deployment Pipeline',
    stack: 'AWS, Docker, GitHub Actions, Terraform',
    impact: 'Reliable release path from model artifact to monitored service.',
  },
]

const capabilities = [
  'Model evaluation and error analysis',
  'RAG and retrieval orchestration',
  'API design for inference services',
  'Data pipelines and feature engineering',
  'Experiment tracking and reproducibility',
  'Cloud deployment and observability',
]

const roadmap = [
  'Publish 2 deep AI case studies with architecture diagrams.',
  'Ship one measurable LLM product with eval dashboard.',
  'Package portfolio evidence for AI/ML + backend SWE recruiting.',
]

export default function App() {
  return (
    <div className="site" id="top">
      <div className="ambient" aria-hidden="true" />

      <header className="topbar container">
        <a href="#top" className="brand">
          MOISES ZUNIGA / AI SYSTEMS
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#plan">Plan</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero container">
          <p className="eyebrow reveal">AI/ML Engineer + Backend SWE</p>
          <h1 className="title reveal delay-1">I build AI systems that can be deployed, monitored, and trusted.</h1>
          <p className="lede reveal delay-2">
            Applied machine learning, LLM workflows, and production backend engineering. Focused on measurable impact over demo-only builds.
          </p>
          <div className="actions reveal delay-3">
            <a className="btn btn-primary" href="mailto:mz397@njit.edu">
              Hire Me
            </a>
            <a className="btn" href="https://github.com/Moises-ITS" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn" href="https://www.linkedin.com/in/moises-zuniga2034894/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>

          <div className="metric-row reveal delay-4">
            {metrics.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section id="work" className="section container">
          <div className="section-head">
            <p>Selected Work</p>
            <h2>Concise proof of technical ownership.</h2>
          </div>
          <div className="work-list">
            {projects.map((project) => (
              <article className="work-item" key={project.name}>
                <h3>{project.name}</h3>
                <p className="stack">{project.stack}</p>
                <p className="impact">{project.impact}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="capabilities" className="section container split">
          <div>
            <div className="section-head">
              <p>Capabilities</p>
              <h2>What I can execute end-to-end.</h2>
            </div>
            <div className="chip-cloud">
              {capabilities.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <aside id="plan" className="plan">
            <p className="plan-label">180 shift plan</p>
            <ol>
              {roadmap.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </aside>
        </section>
      </main>

      <footer id="contact" className="footer container">
        <p>Moises Zuniga · AI/ML Engineer Candidate</p>
        <div>
          <a href="mailto:mz397@njit.edu">mz397@njit.edu</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </footer>
    </div>
  )
}
