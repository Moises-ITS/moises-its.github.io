import type { PersonalInfo, Project, ResearchItem, SkillGroup, Milestone } from './types'

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
  institution: 'NJIT · CS + AI · Cybersecurity · Class of \'28',
  bio: 'I build systems at the intersection of cybersecurity, machine learning, and software engineering. I care about work that is technically honest, clearly presented, and actually useful.',
  tape: [
    'Cybersecurity',
    'Machine Learning',
    'Software Engineering',
    'DevSecOps',
    'CI/CD',
    'Defensive Security',
    'Detection Engineering',
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
    title: 'Cloud DevSecOps Platform',
    category: 'Software Security',
    year: '2025',
    summary:
      'Built an automated DevSecOps pipeline with real-time cloud monitoring to prevent vulnerabilities, enforce secure infrastructure, and eliminate credential leaks before deployment.',
    challenge:
      'Balancing usability with stronger controls against brute force, weak auth, and account takeover.',
    contribution:
      'Built backend auth logic, designed the multi-step flow, and enforced bcrypt, lockouts, and token verification.',
    impact:
      'Reduced security risk exposure and remediation effort significantly by stopping critical issues early and enforcing continuous cloud compliance at scale.',
    stack: ['Python', 'Terraform', 'Github Actions', 'Docker'],
    repo: 'https://github.com/Moises-ITS/CloudSecurity',
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
    title: 'Large Language Model - Cyber Defence',
    status: 'In Progress',
    summary:
      'Building a 500M parameter large language model from scratch, specialized on cybersecurity intelligence',
    tags: ['Machine Learning', 'Artifical Intelligence', 'Cyber Defence', 'PyTorch'],
  },
  {
    id: 'ml-anomaly',
    number: '02',
    title: 'JitHub - Large-Scale Campus Opportunity Aggregator',
    status: 'In Progress',
    summary:
      'Aggregation platform of NJIT campus data utilizing current opportunities and machine learning for predictions; student opportunities.',
    tags: ['Python', 'Typescript', 'React', 'Machine Learning'],
  },
  {
    id: 'AWS - Security Engineering',
    number: '03',
    title: 'AWS - Security Engineering',
    status: 'In Progress',
    summary:
      'Secure application hardening and monitoring of production AWS environments including IAM, S3, EC2, CloudTrail & Lambda',
    tags: ['Securing Engineering', 'AWS', 'Python', 'IAM'],
  },
  {
    id: 'cloud-infra',
    number: '04',
    title: 'Security-First DevSecOps IDE Extension',
    status: 'In Progress',
    summary:
      'A security-first developer assistant that integrates into VS Code to perform context-aware vulnerability detection, secrets scanning, simulated PR analysis, continuous monitoring, and AI-powered remediation guidance for real-world codebases.',
    tags: ['DevSecOps', 'Software Development', 'LLM', 'SAST']
  },
]
export const milestones: Milestone[] = [
  {
    date: 'Sep 2024',
    title: 'Started B.S. Computer Science',
    org: 'New Jersey Institute of Technology',
    detail: 'Minor in Artificial Intelligence · Newark, NJ · GPA 3.5',
    type: 'education',
  },
  {
    date: 'Sep 2024',
    title: 'IT Support Specialist',
    org: 'NJIT Civil Engineering',
    detail:
      'Provided IT support for a department of users by troubleshooting technical issues, streamlining workstation setup processes, and managing campus technology assets to ensure smooth day-to-day operations.',
    type: 'work',
  },
  {
    date: 'Jan 2025',
    title: 'Started Cybersecurity Bootcamp',
    org: 'NJIT Professional Certificate',
    detail:
      '400+ hours covering Bash, PowerShell, DevOps, blue team operations, penetration testing, OWASP, networking, and cryptography.',
    type: 'cert',
  },
  {
    date: 'Mar 2026',
    title: 'Undergraduate Researcher',
    org: 'Professor Nathan Malkin',
    detail:
      'Evaluate the real-world security and privacy risks of LLM-powered web agents by uncovering failures in automated decision-making and user consent handling, while developing structured testing methods and applying threat modeling to identify vulnerabilities in how user data is managed.',
    type: 'work',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    label: 'Security',
    items: ['AWS', 'Wazuh', 'Kibana', 'OWASP', 'Network Security', 'Threat Detection'],
  },
  {
    label: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Bash', 'PowerShell'],
  },
  {
    label: 'Engineering',
    items: ['React', 'Flask', 'PostgreSQL', 'Git / GitHub', 'REST APIs', 'Linux', 'Windows Server', 'Clerk'],
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
  { label: 'IBM Cybersecurity Fluency', status: 'In Progress' }
]
