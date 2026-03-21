# System Patterns

## Architecture
- **Framework**: Next.js App Router.
- **Rendering Strategy**: Mixed. Mostly Client Components (`use client`) for the highly interactive dashboard and RSVP forms. Static pages for the public invite where possible.

## Key Technical Decisions
- **State Management**: `zustand` is used for global state. `authStore.ts` handles the mock authentication session and Role-Based Access Control (RBAC).
- **Styling**: Tailwind CSS with custom thematic configurations (Brand colors: Emerald, Gold, Sage, Mint) configured in `tailwind.config.ts`.
- **Animations**: `framer-motion` for complex Page Transitions, scroll reveals, and the luxury hero section.

## Design Patterns
- **Role-Based Access Control (RBAC)**: Implemented via a `hasRole` helper in the auth store. Dashboard components conditionally render management tools (like "Add Expense" or "Delegate Task") based on the active user's role (`COUPLE`, `ADMIN`, `COORDINATOR`, `GUEST`).
- **Mock Data Layer**: Currently relying heavily on `src/lib/mockData.ts` to populate the application state. Phase 6 (Live DB) is postponed.
- **Centralized Configuration**: All wedding specifics (Dates, Locations, Names) are pulled from `src/config/weddingConfig.ts` to ensure consistency.
