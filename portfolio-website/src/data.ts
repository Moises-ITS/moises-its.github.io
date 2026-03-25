import type { PersonalInfo, Project, ResearchItem, TimelineEntry, SkillGroup } from './types'

export const personal: PersonalInfo = {
  name: 'Moises Zuniga',
  firstName: 'Moises',
  lastName: 'Zuniga',
  titleLine: 'CS Student · NJIT · AI Minor',
  location: 'Nutley, New Jersey',
  email: 'mz397@njit.edu',
  github: 'https://github.com/Moises-ITS',
  githubHandle: 'github.com/Moises-ITS',
  linkedin: 'https://www.linkedin.com/in/moises-zuniga2034894/',
  linkedinHandle: 'linkedin.com/in/moises-zuniga2034894',
  status: 'Open to internships',
  institution: 'NJIT · CS + AI Minor · Class of \'28',
  bio: 'I build systems at the intersection of cybersecurity, machine learning, and software engineering. I care about work that is technically honest, clearly presented, and actually useful.',
  tape: [
    'cybersecurity',
    'machine learning',
    'software engineering',
    'DevSecOps',
    'security tooling',
    'technical problem-solving',
    'blue team',
    'detection engineering',
  ],
}

export const projects: Project[] = [
  {
    id: 'siem-soc',
    number: '01',
    title: 'SIEM SOC Monitoring Platform',
    category: 'Cyber Defense',
    year: '2025',
    summary:
      'A hands-on SOC-style monitoring stack that centralized telemetry from Windows and Kali endpoints through Wazuh and Kibana.',
    challenge:
      'Filtering noisy endpoint data into alerts that were actionable instead of overwhelming.',
    contribution:
      'Deployed the full stack, authored custom rules and decoders, and structured dashboards around real triage workflows.',
    impact:
      'Reduced event triage time by roughly 40% across 15+ detection scenarios.',
    stack: ['Wazuh', 'Kibana', 'Ubuntu', 'Windows', 'Kali Linux', 'Detection Rules'],
    repo: 'https://github.com/Moises-ITS/Home-SOC-Lab---Wazuh-Windows-Kali',
    accent: 'blue',
    buildNote:
      'This project forced me to think about signal quality before tooling. A dashboard is only as good as the rules behind it.',
  },
  {
    id: 'ml-packet',
    number: '02',
    title: 'Machine Learning Packet Analyzer',
    category: 'Applied AI',
    year: '2025',
    summary:
      'A threat-detection pipeline for network traffic using feature engineering, disciplined preprocessing, and reproducible model evaluation.',
    challenge:
      'Improving malicious packet detection without letting leakage or false positives undermine trust in the model.',
    contribution:
      'Designed preprocessing, tuned XGBoost, and evaluated results with controlled stratified experiments.',
    impact:
      'Detected 30,600+ malicious instances across 257,000+ logs while lowering false positives by ~9%.',
    stack: ['Python', 'XGBoost', 'Scikit-Learn', 'Pandas', 'NumPy', 'Feature Engineering'],
    repo: 'https://github.com/Moises-ITS/Machine-Learning-Packet-Inspector-V2',
    accent: 'violet',
    buildNote:
      'Good models fail silently in production. I focused on building something I could actually explain and trust.',
  },
  {
    id: 'password-manager',
    number: '03',
    title: 'Secure Password Manager',
    category: 'Software Security',
    year: '2025',
    summary:
      'A full-stack credential management app focused on layered authentication, account hardening, and secure user flows.',
    challenge:
      'Balancing usability with stronger controls against brute force, weak auth, and account takeover.',
    contribution:
      'Built backend auth logic, designed the multi-step flow, and enforced bcrypt, lockouts, and token verification.',
    impact:
      'Combined password auth, email verification, and TOTP into a meaningful three-layer MFA experience.',
    stack: ['Python', 'Flask', 'BCrypt', 'SQLite', 'Bootstrap', 'TOTP'],
    repo: 'https://github.com/Moises-ITS/Secure-Password-Manager',
    accent: 'cyan',
    buildNote:
      'Security defaults matter more than security options. I designed every flow assuming the user would take the path of least resistance.',
  },
  {
    id: 'recon-toolkit',
    number: '04',
    title: 'Recon and Scanning Toolkit',
    category: 'Security Tooling',
    year: '2025–2026',
    summary:
      'A set of practical utilities for network reconnaissance, service discovery, and public-surface mapping through structured reporting.',
    challenge:
      'Making command-line heavy workflows easier to review without stripping away technical depth.',
    contribution:
      'Built a Flask-backed scanner, automated crt.sh subdomain enumeration, and structured outputs for repeatable investigation.',
    impact:
      'Cut scan runtime by ~40% and made results easier to share through JSON and HTML reports.',
    stack: ['Nmap', 'Flask', 'REST APIs', 'Python', 'JSON Reporting', 'OSINT'],
    repo: 'https://github.com/Moises-ITS/Network-Scanner',
    accent: 'red',
    buildNote:
      'Recon tools are only useful if the output is readable. I prioritized report clarity as a first-class feature.',
  },
]

export const research: ResearchItem[] = [
  {
    id: 'detection-engineering',
    number: '01',
    title: 'Detection engineering for noisy endpoint telemetry',
    status: 'Active',
    summary:
      'Studying how normalization, rule quality, and dashboard design affect signal quality in student-scale SOC environments.',
    tags: ['Wazuh', 'SIEM', 'Blue Team', 'Threat Hunting'],
  },
  {
    id: 'ml-anomaly',
    number: '02',
    title: 'ML-assisted packet and anomaly analysis',
    status: 'Building',
    summary:
      'Exploring how feature design and disciplined evaluation make anomaly models more trustworthy in practice.',
    tags: ['XGBoost', 'Python', 'Anomaly Detection', 'Network Security'],
  },
  {
    id: 'secure-arch',
    number: '03',
    title: 'Secure application architecture and auth hardening',
    status: 'Exploring',
    summary:
      'Focusing on MFA flows, secret handling, rate limiting, and secure defaults in full-stack systems.',
    tags: ['Flask', 'Auth', 'DevSecOps', 'Web Security'],
  },
  {
    id: 'cloud-infra',
    number: '04',
    title: 'Cloud and infrastructure security foundations',
    status: 'In Progress',
    summary:
      'Expanding into CI/CD, Linux infrastructure, and defensive engineering patterns that connect shipping code with protecting it.',
    tags: ['CI/CD', 'Linux', 'Infrastructure', 'Cloud Security'],
  },
]

export const education: TimelineEntry[] = [
  {
    range: 'Sep 2024 – May 2028',
    title: 'B.S. Computer Science',
    org: 'New Jersey Institute of Technology',
    detail: 'Minor in Artificial Intelligence · Newark, NJ · GPA 3.5',
  },
  {
    range: 'Jan 2025 – Dec 2025',
    title: 'Cybersecurity Bootcamp',
    org: 'NJIT Professional Certificate',
    detail:
      '400+ hours covering Bash, PowerShell, DevOps, blue team operations, penetration testing, OWASP, networking, and cryptography.',
  },
]

export const experience: TimelineEntry[] = [
  {
    range: 'Sep 2024 – Dec 2024',
    title: 'IT Assistant',
    org: 'NJIT Civil Engineering',
    detail:
      'Supported 50+ users, resolved 25+ weekly tickets, improved workstation setup flows, and managed campus IT assets.',
  },
  {
    range: 'Ongoing',
    title: 'Independent Security Builder',
    org: 'Projects, labs, and competitive practice',
    detail:
      'Building hands-on systems across SIEM engineering, network analysis, secure software, and technical problem-solving.',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    label: 'Security',
    items: ['Wazuh', 'Kibana', 'Wireshark', 'Nmap', 'OWASP', 'Network Security', 'Threat Detection'],
  },
  {
    label: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Bash', 'PowerShell'],
  },
  {
    label: 'Engineering',
    items: ['React', 'Flask', 'SQLite', 'Git / GitHub', 'REST APIs', 'Linux', 'Windows Server'],
  },
  {
    label: 'AI & Data',
    items: ['Scikit-Learn', 'XGBoost', 'Pandas', 'NumPy', 'Feature Engineering', 'Model Evaluation'],
  },
]

export const certifications = [
  { label: 'CompTIA Network+', status: 'Earned' },
  { label: 'NJIT Cybersecurity Certificate', status: 'Earned' },
  { label: 'CompTIA Security+', status: 'In Progress' },
]
