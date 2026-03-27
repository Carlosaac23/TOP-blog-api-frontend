# Repository Guidelines

## Project Structure & Module Organization

This is a Vite + React + TypeScript frontend for the blog API.

- `src/pages/`: route-level pages (`src/pages/private/` for authenticated screens).
- `src/layouts/`: shared route wrappers (`PublicLayout`, `PrivateLayout`).
- `src/components/`: reusable UI and forms; low-level primitives live in `src/components/ui/`.
- `src/context/`: global providers (auth state is managed in `AuthProvider`).
- `src/hooks/`: feature hooks such as `useSignIn` and `useSignUp`.
- `src/config/`: shared config (Axios client).
- `src/schemas/`: Zod validation schemas.
- `src/types/`: shared TypeScript types.
- `public/`: static assets.

## Build, Test, and Development Commands

Use `pnpm` for consistency with the lockfile.

- `pnpm dev`: start local dev server with HMR.
- `pnpm build`: type-check and create production build (`tsc -b && vite build`).
- `pnpm preview`: serve the production build locally.
- `pnpm lint`: run Oxc linter.
- `pnpm lint:fix`: auto-fix lint issues where possible.
- `pnpm fmt`: format code with Oxc formatter.
- `pnpm fmt:check`: verify formatting in CI/pre-PR checks.
- `pnpm -s tsc --noEmit`: ad-hoc strict type check.

## Coding Style & Naming Conventions

- Language: TypeScript (`.ts/.tsx`), ES modules.
- Formatting/linting: `oxfmt` + `oxlint` (run before opening a PR).
- Indentation: 2 spaces; keep imports grouped and use alias paths (`@/`).
- Components/layouts/pages: PascalCase file names (`Header.tsx`, `PrivateLayout.tsx`).
- Hooks: `useXxx` camelCase (`useSignIn.tsx`).
- Keep route and auth logic in layouts/context, not in presentational UI components.

## Testing Guidelines

There is currently no dedicated test framework configured. Until one is added:

- Treat `pnpm build`, `pnpm lint`, and `pnpm fmt:check` as required quality gates.
- For auth/routing changes, manually verify sign-in, sign-out, redirects, and header state updates.
- When adding tests in the future, colocate as `*.test.ts(x)` near the feature or under `src/__tests__/`.

## Commit & Pull Request Guidelines

Follow the existing Conventional Commit style seen in history:

- Examples: `feat: create private layout`, `chore: improve form validation`.
- Keep subject lines imperative and concise.
- PRs should include: summary, scope of changed files, manual test steps, and screenshots/GIFs for UI changes.
- Link related issues/tasks and call out breaking behavior changes explicitly.
