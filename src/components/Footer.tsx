"use client";

import Link from "next/link";
import { weddingConfig } from "@/config/weddingConfig";

export default function Footer() {
  const { groom, bride, dates, location } = weddingConfig;

  return (
    <footer className="relative py-16 px-6" style={{ background: "#050507" }}>
      {/* Top line */}
      <div className="h-[1px] max-w-4xl mx-auto mb-16" style={{ background: "rgba(245,240,232,0.04)" }} />

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-10">
        {/* Left — Names + Date */}
        <div className="text-center md:text-left">
          <p className="font-display font-light text-lg tracking-[0.1em]" style={{ color: "rgba(245,240,232,0.3)" }}>
            {groom.firstName} <span style={{ color: "rgba(184,150,90,0.3)" }}>&</span> {bride.firstName}
          </p>
          <p className="text-[9px] font-sans uppercase tracking-[0.3em] mt-2" style={{ color: "#333" }}>
            {dates.mainWeddingDate} &nbsp;·&nbsp; {location.city}
          </p>
        </div>

        {/* Center — Nav */}
        <nav className="flex gap-8">
          {[
            { name: "Events", href: "#events" },
            { name: "Travel", href: "/travel" },
            { name: "RSVP", href: "#rsvp-section" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[9px] font-sans uppercase tracking-[0.25em] transition-colors duration-300 hover:text-cream-muted"
              style={{ color: "#333" }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right — Hashtag */}
        <p className="text-[9px] font-sans uppercase tracking-[0.3em]" style={{ color: "#222" }}>
          #PrabalKiShaadi
        </p>
      </div>
    </footer>
  );
}
