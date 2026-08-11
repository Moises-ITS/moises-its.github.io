import type { PersonalInfo, Project, SkillGroup } from './types'

export const personal: PersonalInfo = {
  name: 'Moises Zuniga',
  firstName: 'Moises',
  lastName: 'Zuniga',
  titleLine: 'CS + AI Student · NJIT',
  location: 'Nutley, New Jersey',
  email: 'mz397@njit.edu',
  github: 'https://github.com/Moises-ITS',
  githubHandle: 'github.com/Moises-ITS',
  linkedin: 'https://www.linkedin.com/in/moiseszuniga',
  linkedinHandle: 'linkedin.com/in/moiseszuniga',
  status: 'Open to internships',
  institution: 'NJIT · CS + AI · Class of \'28',
  bio: 'Computer Science student at NJIT with a minor in AI. I build things — full-stack apps, ML pipelines, and Large-Scale Systems',
}

export const projects: Project[] = [
  {
    id: 'shpe-app',
    number: '01',
    title: 'NJIT SHPE App',
    category: 'Full-Stack · Mobile',
    year: '2026',
    summary:
      'A production-level student engagement platform for NJIT\'s SHPE chapter with posts, events, and leaderboards',
    stack: ['React Native', 'TypeScript', 'Expo', 'Supabase', 'GitHub Actions'],
    repo: 'https://apps.apple.com/cl/app/shpe-njit/id6757627370',
    image: '/projects/shpe_app.jpg',
    accent: 'cyan',
  },
  {
    id: 'jithub',
    number: '02',
    title: 'JitHub - BofA Hackathon',
    category: 'Full-Stack · AI',
    year: '2026',
    summary:
      'A full-stack platform built at the Bank of America Code-A-Thon that uses graph data structures to model relationships between students, companies, and opportunities.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Neo4j', 'FastAPI', 'Clerk'],
    repo: 'https://jit-hub.com/',
    image: '/projects/jithub.jpg',
    accent: 'violet',
  },
  {
    id: 'iris',
    number: '03',
    title: 'Iris - HackPrinceton',
    category: 'Computer Vision · Chrome Extension',
    year: '2026',
    summary:
      'A google chrome extension that adapts pages, articles and blogs to YOUR needs',
    repo: 'https://github.com/anshul-kumar1/NeuralAdaptive',
    image: '/projects/iris.jpg',
    stack: ['JavaScript', 'MediaPipe Face Mesh', 'Computer Vision', 'Eye-tracking'],
    accent: 'blue',
  },
  {
    id: 'miroxkiro',
    number: '04',
    title: 'MOAT - MiroXKiro Hackathon',
    category: 'AI Agents · Automation',
    year: '2026',
    summary:
      'AI agent that finds startup opportunities in your area and drafts/sends outreach for you',
    stack: ['Miro', 'Kiro', 'TypeScript', 'React', 'Anthropic API'],
    repo: 'https://github.com/Moises-ITS/MOAT',
    image: '/projects/miroxkiro.PNG',
    accent: 'red',
  },
  {
    id: 'landline',
    number: '05',
    title: 'Landline - Travel & Hospitality Hackathon',
    category: 'AI Agents · Voice',
    year: '2026',
    summary:
      'AI agent connected to your hotel room that answers questions from hotel\'s RAG database and defers questions and actions to operators in hotel system',
    stack: ['React', 'TypeScript', 'ElevenLabs', 'Anthropic API'],
    // TODO: replace with the Landline repo URL when available
    repo: 'https://github.com/Moises-ITS',
    image: '/projects/landline.jpg',
    accent: 'cyan',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend',
    items: ['React', 'React Native', 'TypeScript', 'JavaScript', 'D3.js', 'HTML/CSS', 'Expo'],
  },
  {
    label: 'Backend & APIs',
    items: ['Node.js', 'Express', 'FastAPI', 'Flask', 'REST APIs', 'Python', 'SQL'],
  },
  {
    label: 'Databases',
    items: ['PostgreSQL', 'Neo4j', 'Supabase', 'Railway'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'IAM', 'CloudTrail', 'Lambda'],
  },
  {
    label: 'AI & Security',
    items: ['Scikit-Learn', 'XGBoost', 'Pandas', 'NumPy', 'LLM APIs', 'MCP', 'AI Agents', 'SAST/SCA'],
  },
  {
    label: 'Tools',
    items: ['Git', 'GitHub', 'Linux', 'Java', 'Bash', 'Machine Learning'],
  },
]
