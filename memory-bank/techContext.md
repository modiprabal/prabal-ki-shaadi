# Tech Context

## Technologies Used
- **Core Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI & Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **Deployment**: Vercel

## Technical Constraints & Dependencies
- **Node Environment**: Configured via `pnpm` (package manager). 
- **Turbopack**: Project uses Turbopack for local development builds.
- **Client Directives**: Heavy reliance on `"use client"` directives at the top of interactive components (Dashboard, Budget, RSVP) due to Next.js App Router strictness on Server Components importing React state hooks.

## Infrastructure (Future)
- **Database (Postponed):** Supabase (PostgreSQL) is the planned backend architecture for replacing the current mock data layer.
