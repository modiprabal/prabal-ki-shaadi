"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";

export default function RsvpCTA() {
  const { dates } = weddingConfig;

  return (
    <section id="rsvp-section" className="relative py-32 md:py-44 px-6 overflow-hidden" style={{ background: "var(--theme-bg-alt2)" }}>
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ background: `radial-gradient(circle, var(--theme-glow-bg), transparent 60%)` }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <p className="text-[18px] font-sans uppercase tracking-[0.5em] mb-8" style={{ color: "var(--theme-text-muted)" }}>
          Your Presence Matters
        </p>

        <h2
          className="font-display font-light italic leading-[1.15] mb-6"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: "var(--theme-text)" }}
        >
          Will You Be There?
        </h2>

        <div
          className="w-60 h-[1px] mx-auto mb-8"
          style={{ background: `linear-gradient(to right, transparent, var(--theme-accent), transparent)` }}
        />

        <p className="font-sans text-m leading-[1.8] mb-3" style={{ color: "var(--theme-text-body2)" }}>
          We would be honoured to have you celebrate with us.
        </p>

        <p className="text-[12px] font-sans uppercase tracking-[0.3em] mb-12" style={{ color: "var(--theme-accent-deadline)" }}>
          Kindly respond by {dates.rsvpDeadline}
        </p>

        {/* CTA */}
        <a
          href="/rsvp"
          className="group relative inline-flex items-center justify-center px-14 py-4 rounded-full font-sans text-[11px] font-medium tracking-[0.2em] uppercase overflow-hidden transition-all duration-500"
          style={{
            background: "var(--theme-accent)",
            color: "var(--theme-btn-text)",
          }}
        >
          <span className="relative z-10">Confirm Attendance</span>
          {/* Shimmer sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </a>
      </motion.div>
    </section>
  );
}
