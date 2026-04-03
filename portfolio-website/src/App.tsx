import './index.css'

const systems = [
  {
    title: 'Opportunity Intelligence Platform',
    stack: 'Python, TypeScript, PostgreSQL, ranking models',
    result: 'Unifies fragmented campus opportunities into a relevance-scored pipeline.',
    metric: 'Feed ranking tuned for precision-first matching',
  },
  {
    title: 'Production LLM Evaluation Harness',
    stack: 'PyTorch, prompt datasets, regression checks, CI',
    result: 'Turns prompt and model changes into measurable quality deltas.',
    metric: 'Versioned experiments + reproducible eval reports',
  },
  {
    title: 'MLOps Delivery Backbone',
    stack: 'AWS, Docker, GitHub Actions, Terraform',
    result: 'Automates model release paths from training artifacts to monitored services.',
    metric: 'Repeatable deployment flow with controlled rollback path',
  },
]

const proofSignals = [
  'System diagrams with data contracts and failure boundaries',
  'Experiment logs with baselines, ablations, and error slices',
  'Deployment docs with latency, drift, and rollback policies',
  'Repository quality: tests, linting, reproducible setup, clear READMEs',
]

const doctrine = [
  {
    title: 'Build for operation, not demos',
    body: 'Every project is designed as a running system with observability, not a one-off notebook.',
  },
  {
    title: 'Model quality is a product metric',
    body: 'I optimize for business signal, reliability, and explainability instead of leaderboard vanity.',
  },
  {
    title: 'Backend rigor behind AI experiences',
    body: 'I treat AI interfaces as distributed systems problems: data, serving, cost, and control.',
  },
]

const roadmap = [
  {
    phase: 'Phase 01',
    window: 'Now - June 2026',
    goal: 'Repositioning foundation',
    actions: 'Ship 2 public AI system case studies with architecture + benchmark notes.',
  },
  {
    phase: 'Phase 02',
    window: 'June - September 2026',
    goal: 'Depth and specialization',
    actions: 'Publish one end-to-end applied LLM system with evals, monitoring, and postmortem.',
  },
  {
    phase: 'Phase 03',
    window: 'September - December 2026',
    goal: 'Hiring conversion',
    actions: 'Package portfolio as recruiter-ready evidence packets for AI/ML + backend SWE roles.',
  },
]

export default function App() {
  return (
    <div className="site">
      <div className="bg-layer" aria-hidden="true" />

      <header className="topbar container">
        <a href="#top" className="mark">
          MZ / AI SYSTEMS
        </a>
        <nav className="topnav" aria-label="Primary">
          <a href="#systems">Systems</a>
          <a href="#doctrine">Approach</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <p className="kicker reveal">AI/ML Engineer + Backend Systems SWE</p>
          <h1 className="headline reveal delay-1">
            Building production-grade intelligence systems that are measurable, maintainable, and deployable.
          </h1>
          <p className="intro reveal delay-2">
            Moises Zuniga. I design and ship AI products end-to-end: data pipelines, modeling workflows, evaluation infrastructure, APIs,
            and operational guardrails.
          </p>
          <div className="hero-actions reveal delay-3">
            <a className="btn btn-solid" href="mailto:mz397@njit.edu">
              Start a conversation
            </a>
            <a className="btn btn-ghost" href="https://github.com/Moises-ITS" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn btn-ghost" href="https://www.linkedin.com/in/moises-zuniga2034894/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
          <div className="signal-grid reveal delay-4">
            <article>
              <h2>Current Focus</h2>
              <p>Applied LLM systems, ranking models, evaluation pipelines, and production MLOps.</p>
            </article>
            <article>
              <h2>Role Target</h2>
              <p>AI/ML Engineer or Backend SWE roles requiring model-to-production ownership.</p>
            </article>
            <article>
              <h2>Operating Style</h2>
              <p>Fast prototyping with strict engineering controls before deployment.</p>
            </article>
          </div>
        </section>

        <section id="systems" className="section container">
          <div className="section-head">
            <p className="section-tag">Selected Systems</p>
            <h2>Proof of engineering, not template projects.</h2>
          </div>
          <div className="systems-grid">
            {systems.map((item) => (
              <article className="system-card" key={item.title}>
                <p className="system-stack">{item.stack}</p>
                <h3>{item.title}</h3>
                <p>{item.result}</p>
                <span>{item.metric}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="doctrine" className="section container">
          <div className="section-head">
            <p className="section-tag">Execution Doctrine</p>
            <h2>How I differentiate from generic AI portfolios.</h2>
          </div>
          <div className="doctrine-grid">
            {doctrine.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <aside className="proof-box">
            <h3>Recruiter-facing evidence package</h3>
            <ul>
              {proofSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section id="roadmap" className="section container">
          <div className="section-head">
            <p className="section-tag">180 Career Shift Plan</p>
            <h2>A deliberate transition from security-led work to AI systems leadership.</h2>
          </div>
          <div className="roadmap">
            {roadmap.map((item) => (
              <article key={item.phase} className="roadmap-step">
                <p className="phase">{item.phase}</p>
                <p className="window">{item.window}</p>
                <h3>{item.goal}</h3>
                <p>{item.actions}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="footer container">
        <div>
          <p className="footer-title">Moises Zuniga</p>
          <p className="footer-copy">AI/ML Engineer Candidate - Systems, Backend, and Applied Intelligence</p>
        </div>
        <div className="footer-links">
          <a href="mailto:mz397@njit.edu">mz397@njit.edu</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </footer>
    </div>
  )
}
