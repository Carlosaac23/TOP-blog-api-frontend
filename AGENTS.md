# Repository Guidelines

## Project Structure & Module Organization

This is a Vite + React frontend for the blog API.

- `src/pages/`: route-level pages (`src/pages/private/` for authenticated screens).
- `src/layouts/`: shared route wrappers (`PublicLayout`, `PrivateLayout`).
- `src/components/`: reusable UI and forms; low-level primitives live in `src/components/ui/`.
- `src/context/`: global providers (auth state is managed in `AuthProvider`).
- `src/hooks/`: feature hooks grouped by domain (`auth`, `posts`, `comments`, `ui`).
- `src/helpers/`: shared helper utilities.
- `src/lib/`: shared library utilities.
- `src/schemas/`: Zod validation schemas.
- `public/`: static assets.

## Build, Test, and Development Commands

Use `npm` for consistency with the lockfile.

- `npm run dev`: start local dev server with HMR.
- `npm run build`: create production build (`vite build`).
- `npm run preview`: serve the production build locally.
- `npm run lint`: run Oxc linter.
- `npm run lint:fix`: auto-fix lint issues where possible.
- `npm run fmt`: format code with Oxc formatter.
- `npm run fmt:check`: verify formatting in CI/pre-PR checks.

## Coding Style & Naming Conventions

- Language: JavaScript (`.js/.jsx`), ES modules.
- Formatting/linting: `oxfmt` + `oxlint` (run before opening a PR).
- Indentation: 2 spaces; keep imports grouped and use alias paths (`@/`).
- Components/layouts/pages: PascalCase file names (`Header.jsx`, `PrivateLayout.jsx`).
- Hooks: `useXxx` camelCase (`useSignIn.js`).
- Keep route and auth logic in layouts/context, not in presentational UI components.

## Testing Guidelines

There is currently no dedicated test framework configured. Until one is added:

- Treat `npm run build`, `npm run lint`, and `npm run fmt:check` as required quality gates.
- For auth/routing changes, manually verify sign-in, sign-out, redirects, and header state updates.
- When adding tests in the future, colocate as `*.test.js(x)` near the feature or under `src/__tests__/`.

## Commit & Pull Request Guidelines

Follow the existing Conventional Commit style seen in history:

- Examples: `feat: create private layout`, `chore: improve form validation`.
- Keep subject lines imperative and concise.
- PRs should include: summary, scope of changed files, manual test steps, and screenshots/GIFs for UI changes.
- Link related issues/tasks and call out breaking behavior changes explicitly.
