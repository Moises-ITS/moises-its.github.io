import './index.css'

type Stat = { value: string; label: string }
type Project = {
  title: string
  summary: string
  tags: string[]
  links: { label: string; href: string }[]
}
type Experience = { role: string; company: string; period: string; bullets: string[] }

type SkillGroup = { label: string; items: string[] }

const stats: Stat[] = [
  { value: '4+', label: 'Years Engineering' },
  { value: '12+', label: 'Projects Shipped' },
  { value: '3', label: 'AI Systems in Progress' },
]

const projects: Project[] = [
  {
    title: 'Opportunity Intelligence Engine',
    summary: 'Ranking system that scores opportunities with relevance + behavior signals for better matching.',
    tags: ['Python', 'TypeScript', 'PostgreSQL', 'XGBoost'],
    links: [{ label: 'Code', href: 'https://github.com/Moises-ITS' }],
  },
  {
    title: 'LLM Evaluation Harness',
    summary: 'Regression-focused evaluation pipeline for prompt/model releases with reproducible quality gates.',
    tags: ['PyTorch', 'Hugging Face', 'CI/CD', 'Evaluation'],
    links: [{ label: 'Code', href: 'https://github.com/Moises-ITS' }],
  },
  {
    title: 'Artifact-to-Service Pipeline',
    summary: 'Automated deployment flow from model artifact to monitored inference endpoints with rollback policy.',
    tags: ['AWS', 'Docker', 'GitHub Actions', 'Terraform'],
    links: [{ label: 'Code', href: 'https://github.com/Moises-ITS' }],
  },
]

const skills: SkillGroup[] = [
  { label: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'SQL'] },
  { label: 'AI/ML', items: ['PyTorch', 'Scikit-Learn', 'RAG', 'Model Evaluation'] },
  { label: 'Backend', items: ['FastAPI', 'Node.js', 'PostgreSQL', 'Redis'] },
  { label: 'Infra', items: ['Docker', 'AWS', 'GitHub Actions', 'Terraform'] },
]

const experience: Experience[] = [
  {
    role: 'AI/ML Engineer (Independent)',
    company: 'Personal + Open Source',
    period: '2025 - Present',
    bullets: [
      'Built end-to-end AI systems with evaluation-first release workflow.',
      'Designed backend APIs for retrieval and model inference services.',
    ],
  },
  {
    role: 'Undergraduate Researcher',
    company: 'NJIT',
    period: '2026 - Present',
    bullets: [
      'Researching privacy and security behavior in LLM-powered agents.',
      'Developing structured testing methods for real-world agent workflows.',
    ],
  },
]

export default function App() {
  return (
    <div className="page" id="home">
      <header className="nav-wrap">
        <div className="container nav">
          <a className="logo" href="#home">
            MZ.
          </a>
          <nav>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="resume-btn" href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow">AI/ML Engineer • Backend Systems</p>
            <h1>Hi, I&apos;m Moises Zuniga</h1>
            <p>
              I build AI products with production-grade engineering: model quality checks, reliable APIs, and scalable deployment workflows.
            </p>
            <div className="cta-row">
              <a className="btn primary" href="mailto:mz397@njit.edu">
                Let&apos;s Connect
              </a>
              <a className="btn" href="https://github.com/Moises-ITS" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="btn" href="https://www.linkedin.com/in/moises-zuniga2034894/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
          <figure className="hero-image">
            <img src="/0Z0A6044.jpg" alt="Moises Zuniga at podium" />
          </figure>
        </section>

        <section id="about" className="section container">
          <p className="section-kicker">About</p>
          <h2>Security-first foundation, now focused on AI systems engineering.</h2>
          <p className="section-text">
            I combine ML development with backend rigor so models can move from experiments to real products.
          </p>
          <div className="stats-grid">
            {stats.map((item) => (
              <article key={item.label}>
                <p>{item.value}</p>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section container">
          <p className="section-kicker">Projects</p>
          <h2>Selected technical work.</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="link-row">
                  {project.links.map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section container">
          <p className="section-kicker">Skills</p>
          <h2>Core stack and tooling.</h2>
          <div className="skills-grid">
            {skills.map((group) => (
              <article key={group.label}>
                <h3>{group.label}</h3>
                <div className="tag-row">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section container">
          <p className="section-kicker">Experience</p>
          <h2>Recent journey.</h2>
          <div className="timeline">
            {experience.map((item) => (
              <article key={item.role}>
                <p className="period">{item.period}</p>
                <h3>{item.role}</h3>
                <p className="company">{item.company}</p>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <div className="container footer-inner">
          <div>
            <p className="section-kicker">Contact</p>
            <h2>Open to AI/ML internships and backend-focused SWE roles.</h2>
          </div>
          <div className="footer-links">
            <a href="mailto:mz397@njit.edu">mz397@njit.edu</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              View Resume
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}