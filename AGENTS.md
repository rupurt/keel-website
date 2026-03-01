# Project Conventions (AGENTS)

## Purpose
- Keep this file as the source of truth for local project conventions, tooling, and workflow expectations.

## Project Stack
- React 19 + TypeScript
- TanStack Router + TanStack Start
- Vite
- Node.js 24 for package tooling and runtime

## Commands
- Setup dependencies:
  - `just setup`
- Install dependencies:
  - `just install`
- Start dev server:
  - `just dev` (runs on port `3000`)
- Production build:
  - `just build`
- Local preview of built output:
  - `just preview` (serves built assets correctly for SSR + client assets)
- Type check:
  - `just check`  
- Tests:
  - `just test`  
  - `npm run test` is equivalent

## Build/Runtime Conventions
- Build is done with `vite build`, producing:
  - `dist/server/` (server render entry)
  - `dist/client/` (static assets and client entry)
- Do not start preview by running `dist/server/server.js` directly for production-like runs.
- For local production testing, always use `just preview`.

## Development Conventions
- Keep route files under `src/routes/*`.
- Keep reusable UI under `src/components/*`.
- Keep route-level data logic under `src/data/*`.
- Keep app-wide/global CSS in `src/styles/*`.

## Code Style
- Prefer TypeScript with explicit typing where helpful.
- Use existing component naming style:
  - Components use `PascalCase`
  - Files use `kebab-case` for route/component groupings, matching existing file patterns
- Follow existing import ordering and aliasing (e.g. `~/*` path alias via `vite-tsconfig-paths`).

## Preview and Debugging Notes
- If a page loads but JS/CSS is missing, verify you are using `just preview` (not the server entry directly).
- If a new route or client asset is added, ensure build output is regenerated before testing production behavior.

## Git / Edit Conventions
- Make minimal, targeted changes.
- Keep command/tooling changes in `Justfile` and `package.json` only when command workflows change.
