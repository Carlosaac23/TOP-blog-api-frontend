# Bloggering Frontend

A modern React frontend for the Bloggering API.

This app supports public browsing, authentication, role-based access (user/writer), post management, and comments through a Vite-powered SPA.

## Tech Stack

- React 19
- Vite 8
- React Router 7
- Tailwind CSS 4
- shadcn/ui + Radix UI primitives
- TanStack Form
- Zod
- Sonner (toast notifications)
- Oxc (`oxlint` + `oxfmt`)

## Features

- Public landing page
- Sign up and sign in flows
- Auth persistence with token-based session (`localStorage`)
- Protected private routes (`/home/*`)
- Post list and post detail cards
- Writer-only post creation, editing, and deletion
- Comment creation, update, and deletion
- Profile view + account deletion
- Responsive layout with shared public/private headers and footers

## Project Structure

```text
src/
  components/        Reusable components and form/UI building blocks
  components/ui/     Low-level UI primitives
  context/           Global providers (AuthProvider)
  helpers/           Utility helpers
  hooks/             Domain hooks (auth, posts, comments, ui)
  layouts/           Route wrappers (public/private)
  lib/               Shared API and data-fetching utilities
  pages/             Route-level pages
  schemas/           Zod validation schemas
public/              Static assets
```

## Routes

### Public

- `/` - landing page
- `/sign-up` - account creation
- `/sign-in` - login

### Private (requires auth)

- `/home` - dashboard with posts
- `/home/profile` - profile page
- `/home/create-post` - create post (writer role)
- `/home/edit-post/:postId` - edit post (writer role)

## API Integration

Auth behavior:

- Token key: `bloggering_token`
- Stored in `localStorage`
- Sent as `Authorization: Bearer <token>` by default

### Expected Core Endpoints

- `POST /api/` (sign in)
- `GET /api/` (profile)
- `POST /api/users` (user sign up)
- `POST /api/writers` (writer sign up)
- `DELETE /api/users/:id` / `DELETE /api/writers/:id` (delete account)
- `GET /api/posts`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`
- `GET /api/posts/:postId/comments`
- `POST /api/posts/:postId/comments`
- `PUT /api/comments/:id`
- `DELETE /api/comments/:id`

## Getting Started

### Prerequisites

- Node.js 20+
- npm (lockfile is `package-lock.json`)

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Default local URL: `http://localhost:5173`

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Quality Gates

Run these before opening a PR:

```bash
npm run lint
npm run fmt:check
npm run build
```

Optional autofix commands:

```bash
npm run lint:fix
npm run fmt
```

## Deployment

This project contains `vercel.json` and can be deployed on Vercel as a static Vite app.

Typical flow:

1. Build with `npm run build`
2. Deploy `dist/` (or connect repo to Vercel for automatic builds)

## Contributing

- Follow Conventional Commits (e.g., `feat: ...`, `fix: ...`, `chore: ...`)
- Keep route/auth logic in `layouts` and `context` layers
- Keep presentational components focused on UI
- Use `@/` alias for imports from `src`

## License

No license file is currently defined in this repository.
