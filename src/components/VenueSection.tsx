"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";

export default function VenueSection() {
  const { location } = weddingConfig;

  return (
    <section id="venue" className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden" style={{ background: "var(--theme-bg)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-[18px] font-sans uppercase tracking-[0.5em] mb-4" style={{ color: "var(--theme-text-muted)" }}>
              The Venue
            </p>

            <h2
              className="font-display font-light leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--theme-text)" }}
            >
              {location.weddingVenue}
            </h2>

            <div
              className="w-48 h-[1px] mb-8"
              style={{ background: `linear-gradient(to right, var(--theme-accent), transparent)` }}
            />

            <p className="font-sans text-sm leading-[1.8] mb-8" style={{ color: "var(--theme-text-body)" }}>
              A lush resort nestled in the heart of Bundelkhand, offering manicured gardens,
              a grand mandap, and warm hospitality — the perfect setting for our celebrations.
            </p>

            <div className="flex gap-12 mb-10">
              {[
                { n: "6", l: "Events" },
                { n: "2", l: "Days" },
                { n: "23-24", l: "June" },
              ].map(({ n, l }) => (
                <div key={l}>
                  <span className="font-display font-light text-3xl md:text-4xl block" style={{ color: "var(--theme-text)" }}>
                    {n}
                  </span>
                  <span className="text-[9px] font-sans uppercase tracking-[0.25em] mt-1 block" style={{ color: "var(--theme-text-muted)" }}>
                    {l}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <p className="text-xs font-sans uppercase tracking-[0.2em]" style={{ color: "var(--theme-accent-muted)" }}>
                {location.city}
              </p>
              <a
                href={location.mapEmbedUrl.replace("output=embed", "output=html")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-sans uppercase tracking-[0.25em] transition-colors duration-300 hover:text-gold"
                style={{ color: "var(--theme-text-muted)" }}
              >
                Get Directions →
              </a>
              <span className="text-[10px]" style={{ color: "var(--theme-text-dim)" }}>|</span>
              <a
                href="/travel"
                className="text-[10px] font-sans uppercase tracking-[0.25em] transition-colors duration-300 hover:text-gold"
                style={{ color: "var(--theme-accent-muted)" }}
              >
                Travel Guide →
              </a>
            </div>
          </motion.div>

          {/* Right — Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              height: 420,
              border: "1px solid var(--theme-divider)",
            }}
          >
            <iframe
              src={location.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "var(--theme-map-filter)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
