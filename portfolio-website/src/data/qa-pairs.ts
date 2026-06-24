export interface QAPair {
  id: number;
  question: string;
  answer: string;
  keywords: string[];
}

export const FALLBACK_MESSAGE =
  "Sorry, I can't find that answer for you. Contact Moises to find out directly: [LinkedIn](https://linkedin.com/in/moiseszuniga)";

export const qaPairs: QAPair[] = [
  {
    id: 1,
    question: "Tell me about yourself",
    answer:
      "I'm Moises Zuniga, a Computer Science student at NJIT with a minor in Artificial Intelligence, graduating in May 2028. I'm currently an LLM Systems Researcher at NJIT's Department of Information Systems, where I build red-teaming harnesses and behavioral evaluation frameworks for AI agents. I've won 1st place at Bank of America's hackathon, built production mobile apps serving 200+ users, and co-founded MOAT — a startup using pgvector RAG and Claude API to cut outreach draft time by 90%. I'm passionate about building systems that scale, from full-stack apps to ML pipelines.",
    keywords: ["yourself", "about", "who", "introduce", "background", "summary"],
  },
  {
    id: 2,
    question: "What is your educational background?",
    answer:
      "I'm pursuing a B.S. in Computer Science with a minor in Artificial Intelligence at the New Jersey Institute of Technology (NJIT), expected graduation May 2028. I've also completed CodePath's Advanced Technical Interview Prep (TIP) program in June 2026, which covers data structures, algorithms, and system design at a competitive level.",
    keywords: ["education", "school", "university", "degree", "major", "college", "gpa", "studying"],
  },
  {
    id: 3,
    question: "What programming languages do you know?",
    answer:
      "My primary languages are Python, Java, JavaScript, and TypeScript. I use TypeScript/JavaScript across the full stack — React and React Native on the frontend, Node.js and Express on the backend. Python is my go-to for ML, data pipelines, and FastAPI services. Java I use for DSA and system-level work.",
    keywords: ["languages", "programming", "code", "python", "java", "javascript", "typescript"],
  },
  {
    id: 4,
    question: "What is your experience with AI and machine learning?",
    answer:
      "I work as an LLM Systems Researcher at NJIT, where I architect red-teaming harnesses for 30+ LLM-driven pipelines and design behavioral evaluation frameworks across Claude, Gemini, Perplexity, and OpenAI agents. At MOAT, I built a RAG pipeline using pgvector and Claude API that reduced outreach draft time by 90%. I've also built ML classification pipelines using Scikit-Learn and XGBoost for network traffic analysis. My AI minor gives me foundational depth in neural networks, NLP, and reinforcement learning.",
    keywords: ["ai", "artificial intelligence", "machine learning", "ml", "llm", "deep learning", "neural"],
  },
  {
    id: 5,
    question: "Tell me about your research experience",
    answer:
      "Since January 2026, I've been an LLM Systems Researcher at NJIT's Department of Information Systems. I architected a red-teaming harness that injects adversarial prompts into 30+ LLM-driven pipelines, exposing tool-call hijacking and context-window manipulation vulnerabilities. I also designed a behavioral evaluation framework using structured task sequences to measure autonomy-vs-deference tradeoffs across major AI agents (Claude, Gemini, Perplexity, OpenAI). I've mapped attack surfaces across AI-integrated pipelines — email, browser, and messaging — via systematic threat modeling.",
    keywords: ["research", "researcher", "academic", "lab", "paper", "study"],
  },
  {
    id: 6,
    question: "What is your most impressive project?",
    answer:
      "I'd highlight two: Campus Intelligence (JitHub), which won 1st place at the Bank of America hackathon — I built a dual-database backend (PostgreSQL + Neo4j) with a force-directed D3.js graph visualization rendering 1,000+ nodes at 60fps, plus a Redis-backed distributed rate limiter handling 500+ concurrent requests. And MOAT, where as founding engineer I built a full RAG pipeline that cut outreach draft time by 90% and kept LLM costs under $0.03 per draft using tiered Claude models, all at sub-200ms latency via a 7-worker BullMQ job queue.",
    keywords: ["impressive", "best", "proudest", "favorite", "top", "strongest"],
  },
  {
    id: 7,
    question: "Tell me about the Bank of America hackathon",
    answer:
      "I won 1st place at the Bank of America Code-A-Thon with Campus Intelligence (JitHub). I architected a dual-database backend pairing PostgreSQL for structured records with Neo4j for multi-hop relationship traversal across student, club, and company nodes. I wrote data ingestion scripts normalizing 300+ student records and auto-generating 1,500+ relationship edges with sub-100ms traversal. The frontend featured a force-directed D3.js visualization with 5 filterable graph modes rendering 1,000+ nodes at 60fps with Kalman-smoothed transitions. I also integrated a Redis-backed distributed rate limiter handling 500+ concurrent requests with zero data loss.",
    keywords: ["bank of america", "hackathon", "bofa", "campus intelligence", "jithub", "first place", "won"],
  },
  {
    id: 8,
    question: "What is MOAT?",
    answer:
      "MOAT is a startup where I serve as founding engineer. It's an AI-powered outreach platform that uses pgvector RAG retrieval, credential atoms, and LLM voice profiling to generate personalized outreach drafts. I reduced draft time by 90% per message, cut LLM costs to under $0.03 per draft by tiering Claude Haiku for extraction and Sonnet for final generation, and maintained sub-200ms response latency using a 7-worker BullMQ job queue. The stack is TypeScript, React, Node.js, Express, pgvector, Claude API, Stripe, Redis, and BullMQ.",
    keywords: ["moat", "startup", "founding", "outreach"],
  },
  {
    id: 9,
    question: "Tell me about the SHPE app",
    answer:
      "I founded and architected the full production mobile app for NJIT's SHPE chapter from zero — designed the data model, selected the stack (React Native, TypeScript, Expo, Supabase), and led a team through backend, frontend, and infrastructure delivery. The app ships real-time posts, event RSVPs, and push notifications serving 200+ active members (~70 DAU), driving a 35% increase in weekly active usage. I built the CI/CD pipeline via GitHub Actions and Expo EAS, reducing deployment time from 2+ hours to under 15 minutes with zero-downtime releases.",
    keywords: ["shpe", "app", "mobile", "njit shpe", "student organization"],
  },
  {
    id: 10,
    question: "What databases have you worked with?",
    answer:
      "I have hands-on production experience with PostgreSQL (relational data, used in the BofA hackathon and MOAT), Neo4j (graph database for multi-hop relationship traversal), Redis (caching, rate limiting, job queues via BullMQ), Supabase (PostgreSQL-based BaaS with real-time subscriptions, used in the SHPE app), and pgvector (vector embeddings for RAG/semantic search in MOAT). I'm comfortable with schema design, query optimization, and choosing the right database for the problem.",
    keywords: ["database", "databases", "sql", "postgresql", "neo4j", "redis", "supabase", "data"],
  },
  {
    id: 11,
    question: "What is your experience with cloud and DevOps?",
    answer:
      "I work with AWS (Lambda, IAM, CloudTrail), Docker for containerization, and GitHub Actions for CI/CD pipelines. For the SHPE app, I built the full CI/CD pipeline using GitHub Actions and Expo EAS, cutting deployment from 2+ hours to under 15 minutes. I've also built a DevSecOps pipeline with automated SAST/SCA/IaC scanning, real-time cloud misconfiguration remediation, and secret detection using Terraform, AWS Lambda, and GitHub Actions.",
    keywords: ["cloud", "devops", "aws", "docker", "cicd", "ci/cd", "deployment", "infrastructure"],
  },
  {
    id: 12,
    question: "Are you available for internships?",
    answer:
      "Yes, I'm actively open to internship opportunities! I'm a sophomore at NJIT (Class of 2028) studying Computer Science with an AI minor. I'm looking for software engineering, backend, full-stack, or AI/ML internship roles. Feel free to reach out via LinkedIn: linkedin.com/in/moiseszuniga or email: mz397@njit.edu.",
    keywords: ["internship", "available", "hiring", "job", "work", "opportunity", "apply", "position", "open to"],
  },
  {
    id: 13,
    question: "When do you graduate?",
    answer:
      "I'm expected to graduate in May 2028 with a B.S. in Computer Science and a minor in Artificial Intelligence from NJIT.",
    keywords: ["graduate", "graduation", "when", "finish", "class of"],
  },
  {
    id: 14,
    question: "Where are you located?",
    answer:
      "I'm based in Nutley, New Jersey and attend NJIT (New Jersey Institute of Technology) in Newark, NJ. I'm open to both local and remote opportunities, as well as relocation for the right role.",
    keywords: ["located", "location", "where", "live", "based", "city", "state", "remote"],
  },
  {
    id: 15,
    question: "What leadership experience do you have?",
    answer:
      "I serve as Webmaster for SHPE (Society of Hispanic Professional Engineers), leading web and mobile development across a 5-person engineering team for 200+ active members. I'm Tech Lead at HACCS (Hispanic & Latin Association of College Computing Students), where I organize hackathons and mentor 15+ CS students on full-stack development and system design. I'm also the incoming Founding President of ColorStack at NJIT for 2026-2027. At MOAT, I operate as a founding engineer, making key architectural decisions from day one.",
    keywords: ["leadership", "leader", "lead", "team", "manage", "president", "club", "organization"],
  },
  {
    id: 16,
    question: "What is your frontend experience?",
    answer:
      "I build with React and React Native (TypeScript) across web and mobile. For the BofA hackathon, I built a force-directed D3.js visualization rendering 1,000+ nodes at 60fps with Kalman-smoothed transitions. For the SHPE app, I built the full mobile frontend in React Native + Expo. At MOAT, I built the React web frontend. I'm comfortable with state management, component architecture, responsive design, and data visualization.",
    keywords: ["frontend", "front-end", "react", "ui", "interface", "web", "design", "css"],
  },
  {
    id: 17,
    question: "What is your backend experience?",
    answer:
      "I build backends with Node.js/Express and Python/FastAPI. At MOAT, I architected a full backend with pgvector RAG retrieval, Stripe integration, and a 7-worker BullMQ job queue maintaining sub-200ms latency. For the BofA hackathon, I built a dual-database backend (PostgreSQL + Neo4j) with a unified RESTful API and Redis-backed distributed rate limiter handling 500+ concurrent requests. I also work with WebSockets, async job queues, and REST API design.",
    keywords: ["backend", "back-end", "server", "api", "node", "express", "fastapi"],
  },
  {
    id: 18,
    question: "What is your experience with LLMs and AI APIs?",
    answer:
      "Extensive. As an LLM Systems Researcher at NJIT, I red-team 30+ LLM-driven pipelines and evaluate autonomy-vs-deference tradeoffs across Claude, Gemini, Perplexity, and OpenAI agents. At MOAT, I built a production RAG pipeline using pgvector + Claude API (Haiku for extraction, Sonnet for generation), keeping costs under $0.03/draft. I work with OpenAI and Anthropic APIs, embeddings, vector search, prompt engineering, and agent systems.",
    keywords: ["llm", "gpt", "claude", "openai", "anthropic", "chatgpt", "api", "prompt", "agent", "rag"],
  },
  {
    id: 19,
    question: "What are your strengths?",
    answer:
      "I'd say three things: First, I build fast and ship — I've gone from zero to production apps in hackathons and startup settings. Second, I think in systems — I design for scale, choosing the right database, queue, and caching layer for the problem. Third, I'm deeply curious about AI safety and agent behavior, which drives my research on LLM red-teaming and evaluation frameworks. I'm also highly collaborative and lead engineering teams in multiple organizations.",
    keywords: ["strengths", "strength", "good at", "best quality", "skills"],
  },
  {
    id: 20,
    question: "Why should we hire you?",
    answer:
      "I bring a rare combination of production engineering experience and AI research depth as a sophomore. I've shipped apps to 200+ real users, won a major hackathon, co-founded a startup as a founding engineer, and conduct cutting-edge LLM security research — all while leading multiple engineering teams. I don't just write code; I architect systems, make infrastructure decisions, and ship. I'm hungry to learn and build at scale.",
    keywords: ["hire", "why you", "candidate", "stand out", "unique", "different"],
  },
  {
    id: 21,
    question: "Do you have experience working on teams?",
    answer:
      "Absolutely. I lead a 5-person engineering team as SHPE Webmaster, coordinating feature delivery and technical roadmap. At MOAT, I work closely with co-founders on architecture decisions. At the BofA hackathon, I collaborated under a tight 24-hour deadline. Through HACCS, I mentor 15+ CS students. I'm comfortable with code reviews, sprint planning, git workflows, and cross-functional collaboration.",
    keywords: ["team", "teamwork", "collaborate", "collaboration", "group", "work with others"],
  },
  {
    id: 22,
    question: "What is your experience with mobile development?",
    answer:
      "I built the NJIT SHPE App from zero using React Native, TypeScript, Expo, and Supabase. It's a production app serving 200+ active members with ~70 DAU, featuring real-time posts, event RSVPs, and push notifications. I drove a 35% increase in weekly active usage and built the CI/CD pipeline with GitHub Actions and Expo EAS. I'm comfortable with both iOS and Android development through React Native.",
    keywords: ["mobile", "ios", "android", "react native", "app", "expo"],
  },
  {
    id: 23,
    question: "How do you handle tight deadlines?",
    answer:
      "I thrive under pressure. At the Bank of America hackathon, I architected and built a dual-database backend with graph visualization, rate limiting, and data ingestion — all in under 24 hours, winning 1st place. I break complex problems into phases, prioritize the critical path, and ship incrementally. My experience with CI/CD automation also helps — I've reduced deployment cycles from hours to minutes.",
    keywords: ["deadline", "pressure", "time", "fast", "urgent", "crunch"],
  },
  {
    id: 24,
    question: "What is your experience with CI/CD?",
    answer:
      "I built and own the CI/CD pipeline for the NJIT SHPE App using GitHub Actions and Expo EAS, reducing manual deployment from 2+ hours to under 15 minutes with zero-downtime releases. I've also built DevSecOps pipelines with automated SAST/SCA/IaC scanning and secret detection via GitHub Actions and Terraform. I'm comfortable with Docker, automated testing, and continuous deployment workflows.",
    keywords: ["ci/cd", "cicd", "continuous", "integration", "deployment", "pipeline", "github actions", "automation"],
  },
  {
    id: 25,
    question: "Tell me about a technical challenge you solved",
    answer:
      "At MOAT, we needed sub-200ms response latency while running expensive LLM calls. I solved this by decoupling all processing — embedding, retrieval, and generation — into a 7-worker BullMQ job queue with Redis. I also tiered the LLM calls: Claude Haiku for fast extraction and Sonnet only for final generation, cutting costs to under $0.03 per draft while maintaining quality. This architecture handled concurrent load without blocking the main thread.",
    keywords: ["challenge", "difficult", "problem", "solve", "hard", "obstacle", "struggle"],
  },
  {
    id: 26,
    question: "What is your experience with graph databases?",
    answer:
      "For the Bank of America hackathon (1st place), I used Neo4j for multi-hop relationship traversal across student, club, and company nodes. I wrote data ingestion scripts that normalized 300+ student records and auto-generated 1,500+ relationship edges, achieving sub-100ms traversal on multi-hop queries. I paired it with PostgreSQL for structured data, unified through a single RESTful API. I'm comfortable with Cypher queries, graph data modeling, and choosing when graph DBs are the right tool.",
    keywords: ["graph", "neo4j", "relationship", "traversal", "cypher", "nodes"],
  },
  {
    id: 27,
    question: "How do you stay current with technology?",
    answer:
      "My LLM research keeps me at the cutting edge of AI — I evaluate the latest models from OpenAI, Anthropic, and Google as part of my work. I compete in hackathons regularly (winning Bank of America's), complete advanced programs like CodePath TIP, and build with new tools in startup settings. Leading HACCS and SHPE also keeps me connected to the broader CS community and emerging trends.",
    keywords: ["current", "learn", "new technology", "keep up", "trends", "latest"],
  },
  {
    id: 28,
    question: "What are your career goals?",
    answer:
      "Short-term, I want to intern at a company where I can build production systems at scale and deepen my expertise in AI infrastructure. Long-term, I want to work at the intersection of AI systems and software engineering — building the infrastructure that makes AI agents reliable and safe. My research on LLM red-teaming and my startup experience at MOAT both push me toward AI platform engineering and AI safety.",
    keywords: ["goals", "career", "future", "plan", "aspiration", "want to do", "see yourself", "five years"],
  },
  {
    id: 29,
    question: "What do you know about our company?",
    answer:
      "I'd love to learn more about your company and the specific challenges you're solving! I always research companies thoroughly before interviewing — I look at the tech stack, product, engineering blog, and recent launches. Feel free to tell me more, or reach out directly so we can discuss how my skills align with your team's needs: linkedin.com/in/moiseszuniga.",
    keywords: ["company", "our company", "know about us", "why us", "why here"],
  },
  {
    id: 30,
    question: "How can I contact you?",
    answer:
      "You can reach me via email at mz397@njit.edu, connect on LinkedIn at linkedin.com/in/moiseszuniga, or check out my work on GitHub at github.com/Moises-ITS. I'm always happy to chat about opportunities, collaborations, or tech!",
    keywords: ["contact", "reach", "email", "linkedin", "github", "connect", "talk"],
  },
];
