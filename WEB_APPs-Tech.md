# Web App Tech Stacks (7–8 Tiers)

This is a compact reference of stack tiers, when to use them, their pros/cons, and the best-fit backend for each tier.

## Tier 1 — Static HTML (HyperText Markup Language) / CSS (Cascading Style Sheets) / JS (JavaScript) (Single Page)
- **Best for:** Landing page, single-page funnel, simple brochure.
- **Pros:** Cheapest, fastest, zero build chain.
- **Cons:** Manual updates, no CMS (Content Management System), limited interactivity.
- **Backend:** None (optional form provider like FlexSubmit/Formspree).

## Tier 2 — Static + Utility CSS (1–5 Pages)
- **Best for:** Company portfolio (5 pages), marketing site.
- **Pros:** Rapid build, consistent UI.
- **Cons:** Still static, limited data flows.
- **Backend:** None or serverless form endpoint.

## Tier 3 — SSG (Static Site Generation) — Astro 2025 Stack
- **Best for:** Content + speed with small interactive islands.
- **Typical stack:** Astro + Tailwind + MD/MDX + Vercel/Netlify/Cloudflare Pages.
- **Pros:** Fastest pages, great SEO (Search Engine Optimization), low cost.
- **Cons:** Not ideal for heavy app state.
- **Backend:** Serverless functions or edge workers.

## Tier 4 — SPA (Single Page Application) (Vite + React)
- **Best for:** App-like UX (User Experience) with dynamic UI.
- **Pros:** Great DX, rich UI, fast dev cycles.
- **Cons:** SEO needs care, client-heavy.
- **Backend:** API (Application Programming Interface)-first (serverless, REST (Representational State Transfer), or GraphQL (Graph Query Language)).

## Tier 5 — JAMstack (JavaScript, APIs, Markup)
- **Best for:** Content + interactivity + auth.
- **Pros:** Fast + dynamic, scalable.
- **Cons:** More moving parts (CMS + APIs).
- **Backend:** Headless CMS + serverless APIs.

## Tier 6 — SSR (Server-Side Rendering) / Hybrid (Next.js / SvelteKit)
- **Best for:** SEO + personalized pages + app logic.
- **Pros:** Best SEO + app capabilities.
- **Cons:** More complexity, higher ops.
- **Backend:** Built-in routes + managed DB (Database).

## Tier 7 — Full-stack SaaS (Software as a Service)
- **Best for:** SaaS product, multi-tenant dashboard.
- **Pros:** End-to-end control, real-time, billing.
- **Cons:** Highest build + maintenance cost.
- **Backend:** DB + auth + background jobs + queues.

## Tier 8 — Enterprise / Microservices
- **Best for:** Very large orgs, huge scale, strict isolation.
- **Pros:** Independent teams, high scalability.
- **Cons:** Expensive, complex ops.
- **Backend:** Services + event bus + dedicated infra.

---

## Stack by Budget (Monthly)
- **$0–$5:** Tier 1–3 (static/SSG) on Vercel, Netlify, or Cloudflare Pages.
- **$5–$20:** Tier 4 SPA + serverless (Vercel/Netlify + simple APIs).
- **$20–$100:** Tier 5–6 with managed DB (Supabase/Firebase/Neon).
- **$100–$500:** Tier 6–7 with auth, queues, analytics, and staging.
- **$500+:** Tier 8 with multiple services, observability, and SRE (Site Reliability Engineering) support.

---

## Top 3 Stack Combos per Tier

### Tier 1
1) HTML/CSS/JS + GitHub Pages  
2) HTML/Tailwind + Netlify  
3) HTML + Cloudflare Pages

### Tier 2
1) Vite + Tailwind + Netlify  
2) Astro (static only) + Vercel  
3) Eleventy + GitHub Pages

### Tier 3 (Astro 2025)
1) Astro + MDX (Markdown + JSX) + Tailwind + Vercel  
2) Astro + Content Collections + Cloudflare Pages  
3) Astro + MDX + Netlify

### Tier 4
1) Vite + React + TanStack Query + Vercel  
2) Vite + Vue + Pinia + Netlify  
3) Vite + Svelte + Cloudflare Pages

### Tier 5
1) Astro + Headless CMS (Sanity) + Vercel  
2) Next.js (SSG) + Contentful + Vercel  
3) Gatsby + GraphQL CMS + Netlify

### Tier 6
1) Next.js (SSR/ISR; ISR = Incremental Static Regeneration) + Postgres (Neon) + Vercel  
2) SvelteKit + Supabase + Cloudflare  
3) Remix + Prisma + Render

### Tier 7
1) Next.js + Prisma + Postgres + Auth (Clerk)  
2) T3 Stack (TypeScript + tRPC (TypeScript Remote Procedure Call) + Tailwind; typically Next.js + Prisma)  
3) Laravel + Vue + MySQL (if PHP teams)

### Tier 8
1) Next.js + NestJS + Postgres + Redis  
2) Kubernetes + Microservices + Kafka + Postgres  
3) .NET (Microsoft .NET) + Azure + Service Bus + SQL Server

---

## Hosting by Tier (Recommended)
- **Tier 1–3:** Vercel, Netlify, Cloudflare Pages, GitHub Pages
- **Tier 4–5:** Vercel/Netlify + serverless functions
- **Tier 6:** Vercel/Render/Fly + managed DB (Neon/Supabase)
- **Tier 7:** Vercel + managed DB + background jobs (Railway/Render)
- **Tier 8:** AWS (Amazon Web Services) / GCP (Google Cloud Platform) / Azure with dedicated infrastructure

---

## Stack by Business Type
- **Single-page funnel:** Tier 1 (static) or Tier 2 (utility CSS).
- **Portfolio (3–5 pages):** Tier 2 or Tier 3 (Astro).
- **Blog / content site:** Tier 3 (Astro + MDX).
- **Marketing + light interactivity:** Tier 3–5.
- **Web app / dashboard:** Tier 4 (SPA) or Tier 6 (SSR).
- **SaaS product:** Tier 6–7 (SSR + DB + auth).
- **Enterprise internal tooling:** Tier 7–8.

---

## Local Dev Without Deploy (Checklist by Tier)

### Tier 1–2 (Static)
1. Edit files directly in your editor.
2. Open `index.html` in a browser.
3. Optional: `npx serve .` for a local server.

### Tier 3 (SSG)
1. Install deps (pnpm/bun recommended).
2. Run `dev` command (e.g., `astro dev`).
3. Preview with `astro preview` after build.

### Tier 4 (SPA)
1. Install deps (pnpm/bun).
2. Run `npm run dev` (Vite).
3. Local API calls can point to a mock or local server.

### Tier 5 (JAMstack)
1. Run the frontend dev server.
2. Use a CMS preview or mock content locally.
3. Use serverless emulator if available.

### Tier 6 (SSR/Hybrid)
1. Run the full framework dev server (Next/SvelteKit).
2. Use `.env.local` for DB + auth keys.
3. Run local DB (Docker) or managed test DB.

### Tier 7–8 (Full-stack / Enterprise)
1. Run services in Docker Compose (API, DB, queue).
2. Use local secrets and staging configs.
3. Use log aggregation (console + local dashboard).

---

## Security Baseline by Tier

### Tier 1–2
- HTTPS (Hypertext Transfer Protocol Secure) (default on modern hosts).
- Basic CSP (Content Security Policy) headers if possible.
- Form provider (spam filtering).

### Tier 3
- Same as Tier 1–2 plus:
- Cache-control and immutable assets.
- Access control for CMS.

### Tier 4
- Rate-limit APIs (serverless).
- Input validation on server.
- CSP + secure headers.

### Tier 5
- CMS role-based access.
- Webhooks signed/verified.
- Serverless rate limiting.

### Tier 6
- Auth (session/JWT (JSON Web Token)).
- Server-side validation.
- DB access policies.
- Audit logging for admin actions.

### Tier 7
- Full auth + RBAC (Role-Based Access Control).
- Background job isolation.
- Secrets vault + rotation.
- Monitoring + alerting.

### Tier 8
- Zero trust network policies.
- Dedicated observability stack.
- Per-service auth, SSO (Single Sign-On), compliance.

===

## Semester 2 (2nd Half) — Relay / Review

This section is a compact glossary for the abbreviations used above.

### Common Abbreviations (Quick Meanings)
- **CI** — Continuous Integration (automated build/test on each change).
- **CD** — Continuous Delivery/Deployment (automated release pipeline).
- **SPA** — Single Page Application.
- **SSG** — Static Site Generation.
- **SSR** — Server-Side Rendering.
- **ISR** — Incremental Static Regeneration.
- **API** — Application Programming Interface.
- **DB** — Database.
- **CDN** — Content Delivery Network.
- **DNS** — Domain Name System.
- **CSP** — Content Security Policy (security headers).
- **RBAC** — Role-Based Access Control.
- **SSO** — Single Sign-On.
- **JAMstack** — JavaScript, APIs, Markup (static-first architecture).
