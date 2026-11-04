# Admin Dashboard

A modern, responsive admin dashboard built with **Next.js**, **React**, **Tailwind CSS**, and **shadcn/ui**. It provides a clean interface for managing content.

## Preview

![Admin Dashboard](./public/dashboard-light.png)

## Tech Stack

- [Next.js](https://nextjs.org/) and [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/)
- [Better Auth](https://www.better-auth.com/) for authentication
- [Drizzle ORM](https://orm.drizzle.team/) and PostgreSQL
- [Lucide](https://lucide.dev/) icons

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root and set your database connection:

   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — start the production server
- `npm run lint` — run ESLint

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Deploying Next.js](https://nextjs.org/docs/app/building/your-application/deploying)
