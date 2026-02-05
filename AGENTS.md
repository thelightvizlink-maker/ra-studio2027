# Repository Guidelines

## Project Overview
**RA Studio Portal** - A modern React web application for RA Studio, featuring multilingual support, contact forms, analytics, and neomorphic design aesthetics. Built with Vite + React 18 + TypeScript + Tailwind CSS.

## Project Structure & Module Organization
- `src/` contains all application code.
- Route-level pages live in `src/pages/` (for example, `src/pages/Contact.tsx`).
- Reusable UI is split between:
  - `src/components/sections/` for page sections.
  - `src/components/ui/` for shadcn-style primitives.
- Internationalization is in `src/i18n/` with translations under `src/i18n/translations/`.
- Static assets are in `src/assets/` and public files in `public/`.
- Documentation and runbooks live in `docs/`. Build output goes to `dist/` (do not edit).
- Cloudflare Worker code is in `worker/` for visitor tracking and reCAPTCHA validation.

## Build, Test, and Development Commands
- `npm i` — install dependencies.
- `npm run dev` — start the Vite dev server (runs on port 8080).
- `npm run lint` — run ESLint across `src/**/*.{ts,tsx}`.
- `npm run build` — create a production build in `dist/`.
- `npm run build:dev` — create development build.
- `npm run preview` — serve the production build locally.

## Tech Stack & Dependencies
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 7 with SWC plugin
- **Styling**: Tailwind CSS 3 with custom animations
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Routing**: React Router DOM 6
- **State Management**: TanStack React Query
- **Forms**: React Hook Form with Zod validation
- **Internationalization**: Custom React context with 15+ languages
- **Analytics**: Google Analytics 4 (GA4)
- **Contact**: EmailJS integration with Google reCAPTCHA
- **Deployment**: GitHub Pages (primary) and Vercel (in-progress)

## Coding Style & Naming Conventions
- Stack: Vite + React 18 + TypeScript + Tailwind CSS.
- Use the path alias `@/*` for imports from `src/` (for example, `@/components/Footer`).
- Components and pages use PascalCase filenames (for example, `LanguageSwitcher.tsx`).
- Functions, variables, and hooks use camelCase.
- Prefer functional components and React hooks; keep logic near the page/component that owns it.
- Styling should remain Tailwind-first; add CSS only when utilities are insufficient.
- Use custom CSS variables for theming defined in `tailwind.config.ts`.

## Internationalization (i18n)
- 15+ supported languages including RTL support for Arabic
- Language detection based on browser navigator.languages
- Language persistence via localStorage
- Custom aliases for language code normalization (e.g., 'de-de' → 'de-CH')
- Swiss German and Swiss French variants available
- Transform functions for locale-specific text processing

## Key Features & Patterns
- **Neomorphic Design**: Custom Tailwind classes for neomorphic effects (`neo`, `neo-hover`, `neo-inset`)
- **Custom Animations**: Extensive custom animations including fade, scale, slide, float, shimmer effects
- **Error Boundaries**: ErrorBoundary component wraps the main app
- **Cookie Consent**: React-cookie-consent for GDPR compliance
- **Custom Cursor**: Interactive cursor component
- **Visitor Tracking**: Cloudflare Worker for visitor counting with IP geolocation
- **Contact Form**: EmailJS with reCAPTCHA validation, form validation with Zod
- **Analytics**: Google Analytics 4 with GDPR-compliant IP anonymization

## Testing Guidelines
- There is no configured test runner yet.
- Minimum validation for changes:
  1) Run `npm run lint`.
  2) Run `npm run dev` and verify the affected pages.
  3) For release-sensitive changes, also run `npm run build && npm run preview`.
- If you add tests, use `*.test.ts(x)` naming and place them near the module under test.

## Deployment & Environment
- **Primary Deployment**: GitHub Pages (configured via GitHub Actions)
- **Alternative Deployment**: Vercel (vercel.json configured for SPA routing)
- **Environment Variables**: Uses `VITE_*` prefix for Vite environment variables
- **Cloudflare Worker**: Requires KV namespace and secrets (IPINFO_TOKEN, RECAPTCHA_SECRET)

## Commit & Pull Request Guidelines
- Follow the repo's existing style: short, imperative, descriptive commits (for example, `Add GDPR cookie banner`).
- Keep commits focused (separate documentation updates from refactors when possible).
- PRs should include:
  - What changed and why.
  - Manual test steps (commands + pages visited).
  - Screenshots or short clips for UI changes.

## Security & Configuration Tips
- Do not commit secrets. Prefer Vite env vars like `VITE_*` via `import.meta.env`.
- Review third-party endpoints and IDs in:
  - `src/lib/analytics.ts` - Google Analytics configuration
  - `src/pages/Contact.tsx` - EmailJS and reCAPTCHA configuration
  - `worker/` - Cloudflare Worker secrets and KV bindings
- Contact form includes anti-spam measures:
  - Minimum fill time (1500ms) to prevent bot submissions
  - Submit cooldown (15 seconds) between form submissions
  - reCAPTCHA validation required

## Important Gotchas
- **Language Detection**: Swiss German ('de-CH') is used as default for all 'de' variants
- **RTL Support**: Arabic requires special handling for text direction and CSS classes
- **Worker Dependencies**: Cloudflare Worker requires manual configuration of KV namespaces and secrets
- **Analytics Consent**: Google Analytics only runs after cookie consent is accepted
- **Form Validation**: Contact form uses Zod schema with custom error messages
- **Animation Performance**: Custom animations are GPU-optimized where possible