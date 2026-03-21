"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";

export default function VenueSection() {
  const { location } = weddingConfig;

  return (
    <section id="venue" className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden" style={{ background: "#0a0a0c" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-[18px] font-sans uppercase tracking-[0.5em] mb-4" style={{ color: "#555" }}>
              The Venue
            </p>

            <h2
              className="font-display font-light leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#f5f0e8" }}
            >
              {location.weddingVenue}
            </h2>

            <div
              className="w-48 h-[1px] mb-8"
              style={{ background: "linear-gradient(to right, #b8965a, transparent)" }}
            />

            <p className="font-sans text-sm leading-[1.8] mb-8" style={{ color: "#666" }}>
              A lush resort nestled in the heart of Bundelkhand, offering manicured gardens,
              a grand mandap, and warm hospitality — the perfect setting for our celebrations.
            </p>

            <div className="flex gap-12 mb-10">
              {[
                { n: "4", l: "Events" },
                { n: "2", l: "Days" },
                { n: "24", l: "June" },
              ].map(({ n, l }) => (
                <div key={l}>
                  <span className="font-display font-light text-3xl md:text-4xl block" style={{ color: "#f5f0e8" }}>
                    {n}
                  </span>
                  <span className="text-[9px] font-sans uppercase tracking-[0.25em] mt-1 block" style={{ color: "#555" }}>
                    {l}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <p className="text-xs font-sans uppercase tracking-[0.2em]" style={{ color: "rgba(184,150,90,0.5)" }}>
                {location.city}
              </p>
              <a
                href={location.mapEmbedUrl.replace("output=embed", "output=html")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-sans uppercase tracking-[0.25em] transition-colors duration-300 hover:text-gold"
                style={{ color: "#555" }}
              >
                Get Directions →
              </a>
              <span className="text-[10px]" style={{ color: "#333" }}>|</span>
              <a
                href="/travel"
                className="text-[10px] font-sans uppercase tracking-[0.25em] transition-colors duration-300 hover:text-gold"
                style={{ color: "rgba(184,150,90,0.5)" }}
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
              border: "1px solid rgba(245,240,232,0.06)",
            }}
          >
            <iframe
              src={location.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "invert(0.92) hue-rotate(180deg) saturate(0.3) brightness(0.6)",
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
