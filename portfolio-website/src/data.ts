import type { PersonalInfo, Project, SkillGroup } from './types'

export const personal: PersonalInfo = {
  name: 'Moises Zuniga',
  firstName: 'Moises',
  lastName: 'Zuniga',
  titleLine: 'CS + AI Student · NJIT',
  roles: ['Software Engineer', 'AI Engineer', 'Founding President'],
  location: 'Nutley, New Jersey',
  email: 'mz397@njit.edu',
  emailMailto: 'mailto:mz397@njit.edu',
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
    title: 'SHPE NJIT',
    category: 'iOS App',
    year: '2026',
    summary: 'The official app for NJIT\'s SHPE chapter. Live on the App Store.',
    description:
      'The official mobile app for NJIT’s chapter of the Society of Hispanic Professional Engineers — events, announcements, and member resources for 200+ members. As Webmaster I own the architecture, and I built the team that ships it.',
    stack: ['React Native', 'TypeScript', 'Expo', 'Supabase', 'GitHub Actions'],
    repo: 'https://apps.apple.com/cl/app/shpe-njit/id6757627370',
    image: '/projects/shpe_app.jpg',
  },
  {
    id: 'jithub',
    number: '02',
    title: 'JitHub',
    category: 'Bank of America Code-A-Thon',
    year: '2026',
    summary: 'A graph of students, companies, and opportunities.',
    description:
      'A developer networking platform built at the Bank of America Code-A-Thon. PostgreSQL holds the structured data while Neo4j models the social graph, explored through a D3.js force-directed visualization. I built the graph layer and the visualization.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Neo4j', 'FastAPI', 'Clerk'],
    repo: 'https://jit-hub.com/',
    image: '/projects/jithub.jpg',
  },
  {
    id: 'iris',
    number: '03',
    title: 'Iris',
    category: 'HackPrinceton',
    year: '2026',
    summary: 'Pages that adapt to how you read.',
    description:
      'A Chrome extension that reads attention through your webcam with MediaPipe Face Mesh, then adapts font size, spacing, and contrast in real time — entirely on-device, with no backend. I built the Kalman filter that smooths the raw landmarks and the adjustment logic.',
    stack: ['JavaScript', 'MediaPipe Face Mesh', 'Computer Vision', 'Eye-tracking'],
    repo: 'https://github.com/anshul-kumar1/NeuralAdaptive',
    // Photo: v2osk on Unsplash (Unsplash License) — unsplash.com/photos/In4XVKhYaiI
    image: '/projects/iris-eye.jpg',
  },
  {
    id: 'miroxkiro',
    number: '04',
    title: 'MOAT',
    category: 'Miro × Kiro Hackathon',
    year: '2026',
    summary: 'Finds startups near you. Then reaches out.',
    description:
      'An AI agent built at the Miro × Kiro Hackathon that finds startup opportunities near you, then drafts and sends personalized outreach on your behalf.',
    stack: ['Miro', 'Kiro', 'TypeScript', 'React', 'Anthropic API'],
    repo: 'https://github.com/Moises-ITS/MOAT',
    image: '/projects/miroxkiro.PNG',
  },
  {
    id: 'landline',
    number: '05',
    title: 'Landline',
    category: 'Travel & Hospitality Hackathon',
    year: '2026',
    summary: 'A voice concierge in every hotel room.',
    description:
      'A voice AI concierge connected to your hotel room. It answers guest questions from the hotel’s own knowledge base and hands off requests and actions to staff in the hotel’s system.',
    stack: ['React', 'TypeScript', 'ElevenLabs', 'Anthropic API'],
    repo: 'https://github.com/Moises-ITS/Landline',
    // Photo: Kristin Snippe on Unsplash (Unsplash License) — unsplash.com/photos/f2zV4ssYaJ4
    image: '/projects/landline-hotel.jpg',
  },
  {
    id: 'marketpipeline',
    number: '06',
    title: 'Market Pipeline',
    category: 'Real-Time Data · Backend',
    year: '2026',
    summary: 'Live crypto trades in. 5 ms reads out.',
    description:
      'Ingests a live Coinbase trade feed and serves it through an async FastAPI — Redis for the hot path and live WebSocket fan-out, TimescaleDB for durable history. Benchmarked at ~5 ms p50 and up to 4,187 requests per second.',
    stack: ['Python', 'FastAPI', 'Redis', 'TimescaleDB', 'WebSockets', 'Docker'],
    repo: 'https://github.com/Moises-ITS/marketpipeline',
    // Photo: Arturo Añez on Unsplash (Unsplash License) — unsplash.com/photos/aChQ2cYg1ys
    image: '/projects/marketpipeline.jpg',
  },
  {
    id: 'sofi-it',
    number: '07',
    title: 'SoFi It',
    category: 'SoFi Externship',
    year: '2026',
    summary: 'Snap what you want. Get a plan to save for it.',
    description:
      'Built in the SoFi Externship and presented to SoFi banking executives. Snap a photo of something you want; a vision model identifies and prices it, then builds a Vault savings plan. It falls back to a demo product, so a live pitch never breaks.',
    stack: ['React', 'TypeScript', 'Vite', 'Claude Vision', 'OpenAI', 'Vercel'],
    repo: 'https://sofidemo.vercel.app',
    // Photo: Fabian Blank on Unsplash (Unsplash License) — unsplash.com/photos/pElSkGRA2NU
    image: '/projects/sofi.jpg',
  },
  {
    id: 'options-engine',
    number: '08',
    title: 'Options Pricing Engine',
    category: 'Quant · C++20 · In progress',
    year: '2026',
    summary: 'Black-Scholes and Monte Carlo, built from scratch.',
    description:
      'A from-scratch C++20 pricing library — Black-Scholes-Merton with analytic Greeks, an implied-volatility solver, and multithreaded Monte Carlo. The numerical foundations are done and verified with ~2M assertions; the pricing models are in progress.',
    stack: ['C++20', 'CMake', 'Monte Carlo', 'Black-Scholes', 'Python'],
    repo: 'https://github.com/Moises-ITS/Options-Pricing-Engine',
    // Photo: Tyler Prahm on Unsplash (Unsplash License) — unsplash.com/photos/lmV3gJSAgbo
    image: '/projects/options-engine.jpg',
  },
  {
    id: 'cuda-monte-carlo',
    number: '09',
    title: 'CUDA Monte Carlo Pricer',
    category: 'GPU · CUDA · Benchmarks pending',
    year: '2026',
    summary: 'Option pricing across thousands of GPU threads.',
    description:
      'Prices European options on the GPU and checks every run against the exact Black-Scholes price. Five versions, from a single-threaded CPU baseline to an optimized kernel with warp-shuffle reductions, profiled in Nsight Compute. Benchmarks pending.',
    stack: ['CUDA', 'C++17', 'OpenMP', 'CMake', 'Nsight Compute'],
    repo: 'https://github.com/Moises-ITS/cuda-monte-carlo',
    // Photo: Christian Wiediger on Unsplash (Unsplash License) — unsplash.com/photos/3GUW88tRmv8
    image: '/projects/cuda-mc.jpg',
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
