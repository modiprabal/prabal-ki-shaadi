# Active Context

## Current Focus
We have just completed **Phase 5 (Auth, Roles & Feature Finalization using Mock Data)**. The platform is visually complete and functionally robust using local state. We have explicitly **postponed Phase 6 (Live Database Integration)** to the end of the project.

## Recent Changes
- Resolved Vercel deployment build errors by correctly adding `"use client"` directives to dashboard pages mapping interactive state.
- Fixed an issue where the RSVP deadline was misaligned with the wedding date. All dates in `src/config/weddingConfig.ts` and the UI are now accurately set for **December 14-15, 2026**.
- Implemented `useAuthStore` (Zustand) to manage mocked authentication and RBAC, protecting `/dashboard` routes with a `ProtectedRoute` wrapper.
- Built interactive "Add Expense", "Delegate Task", and "Add Guest" forms within the member portal.

## Next Steps
- The user has paused Phase 6. We are currently waiting for the user's next directive, which may involve further UI polish, adding new informational pages (e.g., Dress Code, Registry), or refining existing copy.

## Active Decisions
- Keep everything reliant on `mockData.ts` and `authStore.ts` for now. Do not introduce Supabase dependencies until explicitly requested to begin Phase 6.
- Maintain the strict visually luxurious standard: use Lucide-react icons, Framer Motion for any new entrances, and glassmorphic Tailwind classes (`bg-white/60 backdrop-blur-md`).
