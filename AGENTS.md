# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains all application code.
- Route-level pages live in `src/pages/` (for example, `src/pages/Contact.tsx`).
- Reusable UI is split between:
  - `src/components/sections/` for page sections.
  - `src/components/ui/` for shadcn-style primitives.
- Internationalization is in `src/i18n/` with translations under `src/i18n/translations/`.
- Static assets are in `src/assets/` and public files in `public/`.
- Documentation and runbooks live in `docs/`. Build output goes to `dist/` (do not edit).

## Build, Test, and Development Commands
- `npm i` — install dependencies.
- `npm run dev` — start the Vite dev server.
- `npm run lint` — run ESLint across `src/**/*.{ts,tsx}`.
- `npm run build` — create a production build in `dist/`.
- `npm run preview` — serve the production build locally.

## Coding Style & Naming Conventions
- Stack: Vite + React 18 + TypeScript + Tailwind CSS.
- Use the path alias `@/*` for imports from `src/` (for example, `@/components/Footer`).
- Components and pages use PascalCase filenames (for example, `LanguageSwitcher.tsx`).
- Functions, variables, and hooks use camelCase.
- Prefer functional components and React hooks; keep logic near the page/component that owns it.
- Styling should remain Tailwind-first; add CSS only when utilities are insufficient.

## Testing Guidelines
- There is no configured test runner yet.
- Minimum validation for changes:
  1) Run `npm run lint`.
  2) Run `npm run dev` and verify the affected pages.
  3) For release-sensitive changes, also run `npm run build && npm run preview`.
- If you add tests, use `*.test.ts(x)` naming and place them near the module under test.

## Commit & Pull Request Guidelines
- Follow the repo’s existing style: short, imperative, descriptive commits (for example, `Add GDPR cookie banner`).
- Keep commits focused (separate documentation updates from refactors when possible).
- PRs should include:
  - What changed and why.
  - Manual test steps (commands + pages visited).
  - Screenshots or short clips for UI changes.

## Security & Configuration Tips
- Do not commit secrets. Prefer Vite env vars like `VITE_*` via `import.meta.env`.
- Review third-party endpoints and IDs in:
  - `src/lib/analytics.ts`
  - `src/pages/Contact.tsx`
