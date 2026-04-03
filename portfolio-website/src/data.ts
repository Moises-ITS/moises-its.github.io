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
  linkedin: 'https://www.linkedin.com/in/moises-zuniga2034894/',
  linkedinHandle: 'linkedin.com/in/moises-zuniga2034894',
  status: 'Seeking AI/ML internships',
  institution: 'NJIT · CS + AI Minor · Class of \'28',
  bio: 'I build AI systems — from ML pipelines and fine-tuned language models to full-stack AI applications. Currently researching LLM privacy and security at NJIT under Prof. Nathan Malkin.',
  tape: [
    'Machine Learning',
    'AI Engineering',
    'LLMs',
    'MLOps',
    'Python',
    'Full-Stack',
    'Research',
    'PyTorch',
    'RAG',
    'Data Science',
  ],
}

export const projects: Project[] = [
  {
    id: 'ml-intrusion',
    number: '01',
    title: 'AI Network Intrusion Detection Engine',
    category: 'Applied ML',
    year: '2025',
    summary:
      'An end-to-end ML pipeline for network traffic classification — from raw packet logs to a production-ready threat detection model with rigorous evaluation.',
    challenge:
      'Improving malicious packet detection without letting data leakage or class imbalance undermine trust in the model.',
    contribution:
      'Designed the full preprocessing pipeline, engineered discriminative features, tuned XGBoost with stratified cross-validation, and built a reproducible evaluation harness.',
    impact:
      'Detected 30,600+ malicious instances across 257,000+ network flows while lowering false positives by ~9%.',
    stack: ['Python', 'XGBoost', 'Scikit-Learn', 'Pandas', 'NumPy', 'Feature Engineering'],
    repo: 'https://github.com/Moises-ITS/Machine-Learning-Packet-Inspector-V2',
    accent: 'violet',
    buildNote:
      'Good models fail silently in production. I focused on building something I could actually explain and trust — that meant prioritizing evaluation discipline over raw accuracy.',
  },
  {
    id: 'domain-llm',
    number: '02',
    title: 'Domain-Adapted LLM for Cyber Intelligence',
    category: 'Language Models',
    year: '2025',
    summary:
      'A 500M parameter transformer built from scratch and domain-adapted on cybersecurity corpora to reason over threat intelligence, CVEs, and security documentation.',
    challenge:
      'Adapting general-purpose language model architecture to a specialized domain with limited, high-signal training data.',
    contribution:
      'Implemented the transformer architecture in PyTorch, curated and preprocessed the domain corpus, and designed the training and evaluation regime.',
    impact:
      'Achieved coherent domain-specific generation and factual retrieval across security intelligence tasks.',
    stack: ['PyTorch', 'Transformers', 'Python', 'HuggingFace', 'CUDA', 'NLP'],
    accent: 'blue',
    buildNote:
      'Training a model from scratch forces you to understand every design decision. There is no black box to blame when things break.',
  },
  {
    id: 'jithub',
    number: '03',
    title: 'JitHub — ML-Powered Campus Platform',
    category: 'Full-Stack AI',
    year: '2025–2026',
    summary:
      'A large-scale campus opportunity aggregator for NJIT students that uses machine learning to surface relevant internships, research positions, and events with personalized ranking.',
    challenge:
      'Aggregating noisy, heterogeneous campus data sources and building an ML layer that surfaces genuinely useful results — not just recent ones.',
    contribution:
      'Architected the data ingestion pipeline, built the ML ranking model, and developed the full-stack application with React and TypeScript.',
    impact:
      'Centralizes fragmented campus opportunity data into a single ranked feed for NJIT students.',
    stack: ['Python', 'TypeScript', 'React', 'PostgreSQL', 'Scikit-Learn', 'REST APIs'],
    accent: 'cyan',
    buildNote:
      'Relevance ranking is a product problem as much as an ML problem. Getting the data pipeline right was 70% of the work.',
  },
  {
    id: 'devsecops-pipeline',
    number: '04',
    title: 'Automated DevSecOps Pipeline',
    category: 'MLOps & Engineering',
    year: '2025',
    summary:
      'A fully automated CI/CD pipeline with real-time cloud monitoring, infrastructure-as-code enforcement, and secrets management to prevent vulnerabilities before deployment.',
    challenge:
      'Building security gates that are tight enough to catch real issues without slowing down the development loop.',
    contribution:
      'Authored Terraform modules, configured GitHub Actions workflows, containerized services with Docker, and integrated automated vulnerability scanning.',
    impact:
      'Eliminated credential leaks and enforced continuous cloud compliance, significantly reducing remediation time at scale.',
    stack: ['Python', 'Terraform', 'GitHub Actions', 'Docker', 'AWS', 'CI/CD'],
    repo: 'https://github.com/Moises-ITS/CloudSecurity',
    accent: 'red',
    buildNote:
      'Automation defaults matter more than automation options. I designed every gate assuming engineers would take the path of least resistance.',
  },
]

export const research: ResearchItem[] = [
  {
    id: 'llm-privacy',
    number: '01',
    title: 'LLM Privacy & Security Research',
    status: 'Active',
    summary:
      'Evaluating real-world privacy and security risks of LLM-powered web agents under Prof. Nathan Malkin — uncovering failures in automated decision-making, consent handling, and data exposure through structured threat modeling.',
    tags: ['LLMs', 'Privacy', 'Security', 'Threat Modeling', 'Research'],
  },
  {
    id: 'ai-dev-assistant',
    number: '02',
    title: 'AI-Powered Developer Assistant (VS Code)',
    status: 'Building',
    summary:
      'A context-aware AI assistant that integrates into VS Code to perform intelligent code review, vulnerability detection, secrets scanning, and LLM-powered remediation guidance for real-world codebases.',
    tags: ['LLMs', 'RAG', 'VS Code Extension', 'Python', 'LangChain'],
  },
  {
    id: 'aws-cloud-ml',
    number: '03',
    title: 'AWS Cloud Engineering & MLOps',
    status: 'In Progress',
    summary:
      'Building production-ready ML infrastructure on AWS — model deployment pipelines, IAM policy design, S3 data lakes, EC2/Lambda compute, and CloudTrail observability for AI workloads.',
    tags: ['AWS', 'MLOps', 'IAM', 'Python', 'Cloud Infrastructure'],
  },
  {
    id: 'feature-research',
    number: '04',
    title: 'ML Feature Engineering Research',
    status: 'Exploring',
    summary:
      'Investigating advanced feature engineering and representation learning techniques for structured tabular data — testing how domain-informed feature design affects gradient boosting and neural model performance.',
    tags: ['Feature Engineering', 'XGBoost', 'PyTorch', 'Tabular ML', 'Python'],
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
      'Managed systems infrastructure for a department of users — troubleshooting hardware and software issues, streamlining workstation provisioning, and maintaining campus technology assets.',
    type: 'work',
  },
  {
    date: 'Jan 2025',
    title: 'ML & AI Systems Development',
    org: 'Independent',
    detail:
      'Built the AI Network Intrusion Detection Engine and began domain LLM development — grounding ML theory in production-quality pipelines with real evaluation discipline.',
    type: 'cert',
  },
  {
    date: 'Sep 2025',
    title: 'CompTIA Network+ Certification',
    org: 'CompTIA',
    detail:
      'Validated foundational networking and systems knowledge — the substrate that makes ML applied to real infrastructure problems tractable.',
    type: 'cert',
  },
  {
    date: 'Mar 2026',
    title: 'Undergraduate Researcher',
    org: 'Professor Nathan Malkin · NJIT',
    detail:
      'Researching the real-world security and privacy risks of LLM-powered web agents — developing structured testing methods and threat models to evaluate how user data is managed by autonomous AI systems.',
    type: 'work',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    label: 'AI & Machine Learning',
    items: ['PyTorch', 'Scikit-Learn', 'XGBoost', 'HuggingFace', 'LangChain', 'Pandas', 'NumPy', 'Feature Engineering'],
  },
  {
    label: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'HTML/CSS', 'Bash'],
  },
  {
    label: 'Engineering',
    items: ['React', 'Flask', 'PostgreSQL', 'Git / GitHub', 'REST APIs', 'Docker', 'Linux'],
  },
  {
    label: 'Cloud & MLOps',
    items: ['AWS', 'Terraform', 'GitHub Actions', 'CI/CD', 'IAM', 'EC2 / Lambda'],
  },
]

export const certifications = [
  { label: 'CompTIA Network+', status: 'Earned' },
  { label: 'NJIT Cybersecurity Certificate', status: 'Earned' },
  { label: 'CompTIA Security+', status: 'In Progress' },
  { label: 'AWS Solutions Architect', status: 'Planned' },
]
