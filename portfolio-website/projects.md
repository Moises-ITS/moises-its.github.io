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

## Market Pipeline — Real-Time Market Data Pipeline + Low-Latency API

**What it is:** A system that ingests a live crypto trade feed (Coinbase WebSocket), stores it across latency-appropriate tiers, and serves it through an async API — REST for point-in-time and historical reads, WebSocket for live push. Repo: github.com/Moises-ITS/marketpipeline

**Stack:** Python (asyncio), FastAPI + uvicorn, Redis (hash cache, Streams, Pub/Sub), TimescaleDB (hypertable + continuous aggregates), Docker Compose, Locust for load testing, pytest (54 tests).

**Architecture:** Two processes on purpose — an ingest worker and the API — because they fail differently: a burst of API traffic must not delay a tick, and a stalled database flush must not make health checks time out. Each tick is written to a Redis hash (hot cache for the latest price), a capped Redis Stream (recent history), Redis Pub/Sub (live fan-out to WebSocket clients), and batched `COPY` into TimescaleDB (durable history). OHLCV candles come from a TimescaleDB continuous aggregate instead of being computed per request — on 1.84M ticks a 24-hour range dropped from 112 ms to 0.78 ms.

**Results:** The latest-price endpoint serves at ~5 ms p50 with 100 concurrent users on 4 API workers, and reached 4,187 requests/sec at 200 users on 8 workers. The whole system runs from one `docker compose up`.

**What the benchmarks taught me:** The first benchmark was invalid — the load generator itself was the bottleneck, so I moved to a distributed Locust setup. An optimization the plan predicted (moving history reads to Redis Streams) didn't pay off the expected way under mixed load, and I documented that honestly rather than hiding it. The real bottleneck turned out to be the single Python API process; because the API is stateless, running 4 uvicorn workers lifted throughput 56% and cut hot-path p50 from 24 ms to 5 ms.

**Deliberately deferred:** Kafka (Redis Streams gives the same ordered-log shape at a fraction of the operational weight at this volume), multi-exchange aggregation, L2 order book depth, and auth.

---

## SoFi It — SoFi Externship (Presented to SoFi Banking Executives)

**What it is:** A mobile-first demo app built during the SoFi Externship program and presented to SoFi banking executives. You snap a photo of something you want, and an AI agent identifies the product, prices it, and builds a SoFi Vault savings plan to buy it. Live demo: sofidemo.vercel.app · Repo: github.com/Moises-ITS/sofidemo

**Stack:** React, TypeScript, Vite, a Node recognition server (deployed as a Vercel serverless function), Claude vision and OpenAI vision, optional SerpAPI for live Google Shopping prices.

**How it works:** The capture screen grabs a downscaled JPEG frame from the phone camera and posts it to a recognition endpoint. The server asks a vision model to identify the product using schema-constrained JSON output (label, emoji, search query, price, low/high price range), so the response always parses. It supports both Claude structured outputs and OpenAI strict JSON-schema mode, selectable by config. Pricing runs in two modes: an agent price estimate by default, or real retailer listings from Google Shopping (best price, sticker price, retailer count) when a SerpAPI key is set.

**Designed for a live pitch:** If the vision call fails for any reason (no key, offline, timeout), the app falls back to a canned demo product so the presentation flow never breaks. Camera access needs a secure context, so the demo runs on the HTTPS Vercel deployment and works from any phone.

---

## Options Pricing Engine (In Progress)

**What it is:** A from-scratch C++20 options pricing library: Black-Scholes-Merton closed form with analytic Greeks, an implied-volatility solver (Newton with a Brent fallback), and a multithreaded Monte Carlo engine for path-dependent payoffs (European, Asian, Barrier) — to be benchmarked against Python. Repo: github.com/Moises-ITS/Options-Pricing-Engine

**Status (be accurate about this):** In progress. The numerical foundations are done and tested — normal CDF/PDF and inverse CDF, a xoshiro256++ RNG with non-overlapping streams, and Welford online variance. The pricing models, variance reduction, Sobol quasi-Monte Carlo, threading, and the Python benchmark are still being built. No benchmark numbers exist yet; every number will be measured, not estimated.

**Why I built it:** Two things are easy to claim and hard to fake — that you can write real C++, and that you understand what the code is computing. The project is built so both are checkable: numerics validated against closed-form references, benchmark methodology written down, and design decisions with reasons attached.

**Design decisions I made:** `norm_cdf` uses `erfc` instead of `erf`, because the textbook formula cancels catastrophically in the left tail where deep out-of-the-money options live (full precision verified down to Φ(−10) ≈ 7.6e-24). Normals come from inverse transform rather than Box-Muller, because Box-Muller silently destroys Sobol's low-discrepancy structure. Variance uses Welford rather than sum-of-squares, which can return a negative variance at 10⁷ paths, and Welford's merge rule lets each thread accumulate with no locking. RNG streams belong to path blocks, not threads, so results are identical on 1 thread or 12. No `-ffast-math`, since it would undo the tail accuracy and cancellation avoidance the project is built around.

**Testing:** ~2M assertions with no external test framework, so it builds from a bare compiler. Beyond reference values, the suite checks properties: put-call parity, Greeks against finite differences, RNG stream non-overlap, thread-count invariance, and Monte Carlo convergence to the closed form within three standard errors.

**Known limitations:** No American options (would need Longstaff-Schwartz), constant volatility and rates, continuous dividend yield only, and discrete barrier monitoring with a Broadie-Glasserman-Kou correction.

---

## CUDA Monte Carlo Pricer (Benchmarks Pending)

**What it is:** A CUDA Monte Carlo pricer for European options, benchmarked against CPU baselines and validated against the closed-form Black-Scholes price. Repo: github.com/Moises-ITS/cuda-monte-carlo

**Status (be accurate about this):** All five implementations are built, but the benchmark results table and profiling findings are still TBD — there are no measured speedup numbers yet. Don't quote any. Target hardware is an RTX 2060 6GB with a Ryzen 5 3600; it also runs on a Google Colab T4.

**Why GPUs:** Monte Carlo is close to the ideal GPU workload — every simulated path is independent and only the final average needs communication. The interesting engineering is in what's left: generating good random numbers in parallel, and reducing billions of payoffs without memory or atomics becoming the bottleneck.

**Correctness first:** It prices an option with a known closed-form answer (S=100, K=100, r=5%, σ=20%, T=1 → call 10.4506, put 5.5735). Every implementation must land within ~3 standard errors of the exact price; landing outside that is treated as evidence of a bug (correlated RNG, precision loss, a race), not bad luck. The harness also warns on implausible results like sub-0.1 ms kernels or >30B paths/sec. Because geometric Brownian motion has an exact solution, a European option can jump straight to maturity in one step with no discretization error.

**Five implementations:** `cpu_single` (textbook mt19937 baseline), `cpu_fast` (xoshiro256** + Box-Muller, isolating RNG cost), `cpu_omp` (all cores via OpenMP with independent jump-ahead RNG streams — the fair CPU comparison), `gpu_naive` (one thread per path, every payoff written to global memory then a Thrust reduction — deliberately unoptimized), and `gpu_opt` (Philox RNG, occupancy-sized grid-stride loop, register accumulation, warp-shuffle → shared memory → one atomicAdd per block, with no per-path DRAM traffic). Profiled with Nsight Compute: the contrast in DRAM throughput between the naive and optimized kernels is the whole story of the optimization.

**Roadmap:** Antithetic variates, a control variate on S_T, pathwise Greeks (delta, vega), an arithmetic Asian option with 252 steps, and an FP64 vs FP32 comparison.

---

## Earlier Work (Context)

Before pivoting fully into software engineering and AI, I built a SIEM SOC monitoring platform, a cloud DevSecOps pipeline (AWS, Terraform, Docker), and an ML packet analyzer as part of an early interest in cybersecurity. Those projects gave me a strong foundation in infrastructure and systems thinking that still shows up in how I architect things today.
