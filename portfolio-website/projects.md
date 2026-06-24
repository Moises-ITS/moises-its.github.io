# Projects

## Castboard — AI-Powered Podcast Management Platform (Pre-Launch)

**What it is:** Castboard is an all-in-one web app for podcast hosts. It handles analytics, AI content generation, transcription, and episode summaries in a single dashboard. Think of it as the backend brain a solo podcast host wishes they had.

**Why I built it:** I saw that podcast creators were stitching together 4-5 separate tools — one for transcription, one for show notes, one for analytics, one for social clips. Castboard collapses that into one product with an opinionated workflow.

**Stack:** Next.js 14+ (App Router), TypeScript, Clerk (auth), Supabase (Postgres + Storage + Realtime), Prisma, BullMQ + Redis (job queues), OpenAI Whisper API (transcription), GPT-4o (content generation), Stripe (billing), Railway (infra)

**Key architectural decisions I made:**

- **Lazy user sync:** Instead of syncing Clerk users to my DB on every auth event, I sync on first meaningful action. Reduces cold-start DB writes and keeps the auth layer clean.
- **Direct-to-Supabase-Storage uploads:** Audio files go straight from the browser to Supabase Storage using signed URLs — never touch my server. This keeps the API route lightweight and avoids memory issues with large audio files.
- **Supabase Realtime for job status:** Transcription and AI generation jobs run in BullMQ workers on Railway. The frontend subscribes to a Supabase Realtime channel keyed to the job ID — when the worker finishes, it updates a DB row and the client gets pushed the result instantly. No polling.
- **Queue-first for all heavy work:** Nothing that takes more than ~200ms runs synchronously in an API route. Everything goes through BullMQ.

**What I'd do differently:** I'd invest earlier in a proper job monitoring dashboard (like Bull Board) — debugging queued jobs without visibility into their state is painful.

**What I'm most proud of:** The architecture is genuinely production-grade for a solo project. The upload → queue → realtime feedback loop feels smooth as a user experience.

---

## SHPE NJIT Mobile App

**What it is:** The official mobile app for SHPE NJIT (Society of Hispanic Professional Engineers), serving 200+ members with ~70 daily active users. Handles event discovery, announcements, member resources, and org updates.

**Why I built it:** The chapter was coordinating everything through GroupMe and email. Members were missing events, announcements were getting buried, and there was no central place for the org's digital presence.

**Stack:** React Native, Expo, TypeScript

**My role:** Webmaster and former Dev Team member. I didn't just build it — I built the team that builds it. I ran a structured interview process for UI/UX designers and engineers, set up Figma for design and separate Notion workspaces for each sub-team, implemented a phased access model (designers get Figma access first, engineers get repo access after onboarding), and own all major architectural decisions.

**What I've learned:** Shipping a product with a team of volunteers who have varying skill levels and availability is a fundamentally different challenge than solo projects. You have to design your systems so that a contributor who disappears for two weeks doesn't create a blocker. Documentation and clear interfaces between modules matter more than elegance.

---

## JitHub — Bank of America Code-A-Thon

**What it is:** A developer networking platform that maps professional connections using a dual-database architecture — PostgreSQL for structured user/project data and Neo4j for the social graph layer. Built a D3.js force-directed graph visualization for exploring connections.

**Why it won:** Most hackathon projects pick one technology and demo it. We built something that genuinely needed two databases for different reasons, and we could articulate exactly why. The judges responded to the architectural reasoning, not just the demo.

**Stack:** PostgreSQL, Neo4j, D3.js, Node.js

**Team:** Moises, Alex Iglesias, Alejandro Perdomo, Kaylee Zepeda. Advisor: Dina Anello.

**What I built specifically:** The Neo4j graph layer and the D3.js force graph visualization. I had to learn both in about 36 hours, which forced me to get good at reading documentation under pressure.

**What I'd do differently:** The graph queries got slow at scale — I'd add indexing on node properties earlier and think more carefully about the traversal depth limits for the visualization.

---

## ReachStack — AI Startup Discovery & Outreach Engine

**What it is:** An AI SaaS tool that scrapes the YC company directory using Playwright, stores company embeddings in pgvector, and uses a RAG pipeline to generate personalized cold outreach messages for job seekers targeting YC startups.

**Why I built it:** I was doing this manually — reading YC company pages, figuring out what they were building, and writing personalized cold emails. ReachStack automates the research layer so you can focus on the actual outreach.

**Stack:** Next.js, Node.js, Playwright (scraping), pgvector (vector search), BullMQ (job queue), PostgreSQL, OpenAI embeddings + GPT-4o

**Key technical piece:** The Startup Discovery Engine uses Playwright to crawl YC's directory, extracts structured company data, generates embeddings, and stores them in pgvector. When a user inputs their background and target role, the system does a similarity search to surface the most relevant companies, then uses RAG to pull company context into a GPT-4o prompt that writes the outreach copy.

**What I learned:** Playwright scraping at scale requires rate limiting, retry logic, and careful session management — the naive implementation gets blocked fast. Also learned that RAG quality is almost entirely a function of chunking strategy and embedding model choice, not the generation step.

---

## Neural Adapt — HackPrinceton (Placed)

**What it is:** A Chrome extension that uses MediaPipe FaceMesh and Kalman filtering to detect attention/focus levels in real time via webcam, then dynamically adjusts reading accessibility settings (font size, line spacing, contrast) based on detected cognitive load.

**Why it placed:** The combination of computer vision + accessibility + real-time adaptation was technically interesting and solved a real problem. We were the only team doing on-device ML inference in a browser extension.

**Stack:** MediaPipe FaceMesh, Kalman filtering, Chrome Extension APIs, JavaScript

**What I built:** The Kalman filter layer for smoothing the raw FaceMesh landmark data (raw output is too noisy to make decisions on) and the accessibility adjustment logic in the extension.

**What I'm most proud of:** Getting real-time ML inference running smoothly in a browser extension with no backend — everything is on-device, which means no latency and no privacy concerns.

---

## InternAI — Miro x Kiro Hackathon

**What it is:** A personalized cold outreach platform built for the Miro x Kiro Hackathon. Generates tailored internship outreach messages based on the user's background and the target company's profile.

**Stack:** Built within the Miro/Kiro ecosystem

---

## ConvoSim — AI Conversation Practice Platform

**What it is:** An AI-powered platform for practicing professional conversations — interviews, networking, cold calls — with real-time feedback. Built partly because I've personally dealt with social anxiety around high-stakes professional conversations and wanted a tool that made practice feel lower-stakes.

**Stack:** Node.js, TypeScript, PostgreSQL, Redis, BullMQ, FastAPI, OpenAI Whisper, MediaPipe

---

## Earlier Work (Context)

Before pivoting fully into software engineering and AI, I built a SIEM SOC monitoring platform, a cloud DevSecOps pipeline (AWS, Terraform, Docker), and an ML packet analyzer as part of an early interest in cybersecurity. Those projects gave me a strong foundation in infrastructure and systems thinking that still shows up in how I architect things today.
