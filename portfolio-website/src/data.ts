import type { PersonalInfo, Project, ResearchItem, SkillGroup, Milestone } from './types'

export const personal: PersonalInfo = {
  name: 'Moises Zuniga',
  firstName: 'Moises',
  lastName: 'Zuniga',
  titleLine: 'CS + AI Student · NJIT · Builder',
  location: 'Nutley, New Jersey',
  email: 'mz397@njit.edu',
  github: 'https://github.com/Moises-ITS',
  githubHandle: 'github.com/Moises-ITS',
  linkedin: 'https://www.linkedin.com/in/moises-zuniga',
  linkedinHandle: 'linkedin.com/in/moises-zuniga',
  status: 'Open to internships',
  institution: 'NJIT · CS + AI Minor · Class of \'28',
  bio: 'Computer Science student at NJIT with a minor in AI. I build things — full-stack apps, ML pipelines, and DevOps systems. Currently researching LLM security and privacy under Prof. Nathan Malkin.',
  tape: [
    'React Native',
    'TypeScript',
    'Python',
    'AWS',
    'DevOps',
    'AI Research',
    'Full-Stack',
    'Java',
    'PostgreSQL',
    'CI/CD',
    'Docker',
    'Github Actions',
  ],
}

export const projects: Project[] = [
  {
    id: 'shpe-app',
    number: '01',
    title: 'NJIT SHPE App',
    category: 'Full-Stack · Mobile',
    year: '2026',
    summary:
      'A production-level student engagement platform for NJIT\'s SHPE chapter with posts, events, and leaderboards — used by real students every day.',
    challenge:
      'Building scalable, real-time features that hold up in production for a growing student community.',
    contribution:
      'Designed scalable frontend components and backend integrations, implemented CI/CD pipelines, and collaborated in an agile team to enhance system architecture.',
    impact:
      'Improved deployment consistency and reduced manual release overhead through automated CI/CD. Active production app used by NJIT SHPE members.',
    stack: ['React Native', 'TypeScript', 'Expo', 'Supabase', 'GitHub Actions'],
    accent: 'cyan',
    buildNote:
      'This was my first time shipping a mobile app to real users. Production is a completely different problem than local dev — I learned that fast.',
  },
  {
    id: 'jithub',
    number: '02',
    title: 'JitHub — Bank of America Hackathon',
    category: 'Full-Stack · AI',
    year: '2026',
    summary:
      'A full-stack platform built at the Bank of America Code-A-Thon that uses graph data structures to model relationships between students, companies, and opportunities.',
    challenge:
      'Modeling complex many-to-many relationships between users and opportunities in a way that enables fast, relevant querying.',
    contribution:
      'Engineered backend APIs with Node.js/Express, integrated PostgreSQL + Neo4j for hybrid relational/graph queries, implemented Clerk auth, and built interactive D3-style visualizations in React.',
    impact:
      'Delivered a working platform in a timed hackathon. Graph-based data model enabled connection traversal that traditional relational queries couldn\'t express.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Neo4j', 'FastAPI', 'Clerk'],
    accent: 'violet',
    buildNote:
      'Graph databases unlock query patterns that SQL just can\'t do elegantly. Neo4j made the relationship traversal obvious — the hard part was the hybrid schema.',
  },
  {
    id: 'ml-packet',
    number: '03',
    title: 'Machine Learning Packet Analyzer',
    category: 'Applied ML · Security',
    year: '2026',
    summary:
      'An end-to-end ML pipeline for network traffic classification — detecting malicious events across hundreds of thousands of packet logs with high precision.',
    challenge:
      'Avoiding data leakage and class imbalance while building a model trustworthy enough for security decisions.',
    contribution:
      'Built the full preprocessing pipeline, engineered discriminative features, tuned XGBoost with stratified cross-validation, and reduced false positives through feature engineering.',
    impact:
      'Detected 30,600+ malicious events across 257,000+ logs. Reduced false positives by ~9% through feature engineering and model tuning.',
    stack: ['Python', 'Scikit-Learn', 'XGBoost', 'Pandas', 'NumPy'],
    repo: 'https://github.com/Moises-ITS/Machine-Learning-Packet-Inspector-V2',
    accent: 'blue',
    buildNote:
      'Good models fail silently. I prioritized evaluation discipline over raw accuracy — every metric had to be explainable before I called it done.',
  },
  {
    id: 'cloud-devsecops',
    number: '04',
    title: 'Cloud DevOps Platform',
    category: 'DevOps · Cloud Security',
    year: '2026',
    summary:
      'An end-to-end DevSecOps pipeline with automated SAST/SCA/IaC scanning, real-time cloud misconfig remediation, and secret detection — blocking vulnerabilities before they reach production.',
    challenge:
      'Building security gates tight enough to catch real vulnerabilities without slowing down the development loop.',
    contribution:
      'Authored Terraform modules, configured GitHub Actions with CodeQL/Snyk/Trivy/Checkov, built an event-driven AWS Config + Lambda system for S3 auto-remediation, and integrated Truffle Hog + Git-Guardian for secret detection.',
    impact:
      'Blocked 100% of high-severity vulnerabilities pre-deployment. Reduced remediation costs by 40x. Enforced compliance within seconds of detecting misconfigs.',
    stack: ['Python', 'AWS', 'Terraform', 'GitHub Actions', 'Docker', 'Lambda', 'IAM'],
    repo: 'https://github.com/Moises-ITS/CloudSecurity',
    accent: 'red',
    buildNote:
      'Automation defaults matter more than automation options. I designed every gate assuming engineers would take the path of least resistance.',
  },
]

export const research: ResearchItem[] = [
  {
    id: 'llm-security',
    number: '01',
    title: 'LLM Security & Privacy Research',
    status: 'Active',
    summary:
      'Undergraduate research under Prof. Nathan Malkin at NJIT — simulating real-world attack scenarios on 30+ LLM-powered systems, evaluating agent autonomy vs. user control, and applying threat modeling to production-like data pipelines.',
    tags: ['LLMs', 'Privacy', 'Security', 'Threat Modeling', 'Agent Systems'],
  },
  {
    id: 'haccs-web',
    number: '02',
    title: 'HACCS Website — Webmaster',
    status: 'Building',
    summary:
      'Architecting and maintaining the Hispanic & Latin Association of College Computing Students website. Implementing responsive design, optimizing performance across devices, and supporting student engagement and event visibility.',
    tags: ['React', 'TypeScript', 'Web Performance', 'Responsive Design'],
  },
  {
    id: 'shpe-dev',
    number: '03',
    title: 'SHPE App — Ongoing Development',
    status: 'In Progress',
    summary:
      'Continued contribution to the NJIT SHPE student engagement platform. Developing new frontend components in React Native/TypeScript and collaborating on feature implementation and UI improvements.',
    tags: ['React Native', 'TypeScript', 'Expo', 'Supabase', 'Mobile'],
  },
  {
    id: 'security-plus',
    number: '04',
    title: 'Depth Draft',
    status: 'In Progress',
    summary:
      'Monocular depth estimation model trained with PyTorch that outputs a 3D point cloud from a single image — pairs perfectly with AR glasses hardware work.',
    tags: ['Pytorch', 'Computer Vision', 'AR/Embedded', 'Point Cloud'],
  },
]

export const milestones: Milestone[] = [
  {
    date: 'Sep 2024',
    title: 'Started B.S. Computer Science',
    org: 'New Jersey Institute of Technology',
    detail: 'Minor in Artificial Intelligence · Newark, NJ · GPA 3.5 · Expected May 2028',
    type: 'education',
  },
  {
    date: 'Sep 2024',
    title: 'IT Support Specialist',
    org: 'NJIT Civil Engineering',
    detail:
      'Resolved 25+ weekly technical issues across hardware, software, and networking for 50+ users. Reduced workstation deployment time by 30–40% through standardized configurations and automation. Managed 100+ IT assets.',
    type: 'work',
  },
  {
    date: 'Mar 2026',
    title: 'Undergraduate Research Assistant',
    org: 'Prof. Nathan Malkin · NJIT',
    detail:
      'Researching real-world security and privacy risks in LLM-powered autonomous agents. Simulating attack scenarios, analyzing system behavior, and building scalable testing frameworks.',
    type: 'work',
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

export const certifications = [
  { label: 'NJIT Cybersecurity Certificate', status: 'Earned' },
  { label: 'AWS Solutions Architect', status: 'Planned' },
]
