import Link from "next/link";
import { weddingConfig } from "@/config/weddingConfig";

export default function Footer() {
  const { groom, bride, dates, location } = weddingConfig;

  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface text-foreground transition-colors duration-700">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.03]">
        <div className="absolute left-[-2rem] top-8 h-24 w-24 rounded-full border border-accent md:left-10 md:top-10 md:h-40 md:w-40"></div>
        <div className="absolute right-[-3rem] top-[-2rem] h-52 w-52 rounded-full border border-accent"></div>
        <div className="absolute bottom-[-3rem] left-1/2 h-28 w-28 -translate-x-1/2 rounded-full border border-accent md:bottom-[-4rem] md:h-44 md:w-44"></div>
      </div>

      <div className="relative mx-auto max-w-screen-xl px-6 py-12 md:px-10 md:py-20">
        <div className="flex items-center justify-center gap-3 text-highlight md:gap-4">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-highlight/70 md:w-12" />
          <span className="font-plus-jakarta text-[10px] uppercase tracking-[0.3em] md:text-[11px] md:tracking-[0.38em]">
            With Love & Blessings
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-highlight/70 md:w-12" />
        </div>

        <div className="mt-6 text-center md:mt-8">
          <h3 className="font-noto-serif text-[2.2rem] tracking-[-0.04em] text-foreground md:text-6xl">
            {groom.firstName} <span className="px-2 text-highlight">&amp;</span> {bride.firstName}
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-foreground/72 md:mt-4 md:max-w-2xl md:text-lg md:leading-8">
            Thank you for being part of our celebration. We cannot wait to welcome
            you to {location.city} for a wedding filled with family, music,
            rituals, and unforgettable memories.
          </p>
        </div>

        <div className="mt-8 grid gap-5 border-y border-border/20 py-7 md:mt-12 md:gap-8 md:py-10 md:grid-cols-3">
          <div className="text-center md:text-left">
            <p className="font-plus-jakarta text-[9px] uppercase tracking-[0.26em] text-highlight md:text-[10px] md:tracking-[0.32em]">
              Date
            </p>
            <p className="mt-2 font-noto-serif text-xl text-foreground md:mt-3 md:text-2xl">
              {dates.mainWeddingDate}
            </p>
          </div>

          <div className="text-center">
            <p className="font-plus-jakarta text-[9px] uppercase tracking-[0.26em] text-highlight md:text-[10px] md:tracking-[0.32em]">
              Venue
            </p>
            <p className="mt-2 font-noto-serif text-xl text-foreground md:mt-3 md:text-2xl">
              {location.weddingVenue}
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="font-plus-jakarta text-[9px] uppercase tracking-[0.26em] text-highlight md:text-[10px] md:tracking-[0.32em]">
              RSVP By
            </p>
            <p className="mt-2 font-noto-serif text-xl text-foreground md:mt-3 md:text-2xl">
              {dates.rsvpDeadline}
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-col items-center justify-between gap-5 md:mt-10 md:gap-8 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 font-plus-jakarta text-[10px] uppercase tracking-[0.22em] text-foreground/72 md:justify-start md:gap-6 md:text-[11px] md:tracking-[0.28em]">
            <Link href="/" className="transition-colors hover:text-highlight">
              Home
            </Link>
            <Link href="/events" className="transition-colors hover:text-highlight">
              Events
            </Link>
            <Link href="/travel" className="transition-colors hover:text-highlight">
              Travel
            </Link>
            <Link href="/rsvp" className="transition-colors hover:text-highlight">
              RSVP
            </Link>
          </div>

          <Link
            href="/rsvp"
            className="inline-flex items-center gap-2.5 rounded-full border border-highlight/35 bg-accent text-background px-6 py-3 font-plus-jakarta text-[10px] font-semibold uppercase tracking-[0.24em] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 md:gap-3 md:px-7 md:py-3.5 md:text-[11px] md:tracking-[0.28em]"
          >
            Confirm Presence
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'wght' 200" }}
            >
              arrow_outward
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
