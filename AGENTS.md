<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Overview

An admin dashboard for managing users, posts, and analytics, with authenticated admin pages and reusable dashboard UI.

**Stack:** Next.js App Router · React 19 · TypeScript · Tailwind CSS · Better Auth · Drizzle ORM · PostgreSQL · npm

## Setup & Development Commands

Use the repo's actual scripts. Do not substitute alternatives.

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Run linter: `npm run lint`

Before declaring a task complete, **`npm run lint` and `npm run build` must both pass.** This repo has no `type-check` or `test` script — do not claim either check passed, and do not run ad-hoc alternatives.

## Code Style & Conventions

- Framework: Next.js App Router only. Do not use `getServerSideProps` or `getStaticProps`.
- Language: TypeScript strict mode. No `any` without an inline comment explaining why a narrower type is not possible.
- Styling: Tailwind CSS. Compose existing UI primitives from `components/ui/*` instead of editing them directly.
- Components: Server Components by default. Add `"use client"` only when a file needs hooks, browser APIs, or event handlers.
- Data access: fetch in Server Components or server-side actions; avoid `useEffect + fetch` for initial data loading.
- Auth/db: keep authentication and database logic in `lib/`, following the existing Better Auth and Drizzle patterns.
- Server Actions: declare `"use server"` and validate inputs before processing.
- Imports: use the `@/` alias; avoid relative imports that climb more than one level (`../../`).
- Logging: no `console.log` in committed code.
- Secrets: never hardcode secrets; keep values in `.env.local` or environment variables. Never prefix client secrets with `NEXT_PUBLIC_`.

## Project Structure

- `app/` — route pages, layouts, route handlers, and server actions
- `app/api/` — API route handlers such as auth
- `components/` — shared dashboard UI and feature-level components
- `components/ui/` — reusable UI primitives; wrap rather than edit directly
- `lib/` — shared utilities, auth config, database helpers, and schema
- `public/` — static assets

## Guardrails

- **Ask before:** adding a dependency, changing the Drizzle schema, running migrations, or modifying Better Auth config, admin roles, or auth middleware.
- **Do not replace** Better Auth with NextAuth/Clerk/Auth.js, Drizzle with Prisma, or Tailwind with another CSS system. Extend what exists.
- **Do not edit** `components/ui/*` primitives or generated Drizzle migration files directly.
- **Never commit** `.env`, `.env.local`, or files matched by `.gitignore`.
- **Stop and report** if a command fails 3 times, or if fixing one file breaks 3+ other files. Do not cascade-fix blindly.
- Admin pages under `app/admin/*` must use existing dashboard layout and UI patterns — no ad hoc page layouts or unrelated business logic.

## Gotchas

- Better Auth routes and config live in `app/api/auth/[...all]/route.ts` and `lib/auth.ts`; keep them in sync.
- Changing the auth/user schema usually requires regenerating the Drizzle schema and re-running `npx drizzle-kit generate`.