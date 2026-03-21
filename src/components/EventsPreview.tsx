"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";

export default function EventsPreview() {
  const { events } = weddingConfig;

  return (
    <section id="events" className="relative py-28 md:py-36 px-6 md:px-12" style={{ background: "#08080a" }}>
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <p className="text-[9px] font-sans uppercase tracking-[0.5em] mb-4" style={{ color: "#555" }}>
          The Celebrations
        </p>
        <h2
          className="font-display font-light"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#f5f0e8" }}
        >
          Two Days of Celebration
        </h2>
        <div
          className="w-120 h-[1px] mx-auto mt-6"
          style={{ background: "linear-gradient(to right, transparent, #b8965a, transparent)" }}
        />
      </motion.div>

      {/* Events list — clean horizontal strips */}
      <div className="max-w-4xl mx-auto">
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
          >
            {/* Divider line */}
            {idx === 0 && (
              <div className="h-[1px] mb-0" style={{ background: "rgba(245,240,232,0.06)" }} />
            )}

            <div className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 py-8 md:py-10 cursor-default">
              {/* Number */}
              <div className="sm:w-16 flex-shrink-0">
                <span
                  className="font-display font-light text-2xl md:text-3xl"
                  style={{ color: "rgba(184,150,90,0.6)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title */}
              <div className="sm:flex-1">
                <h3
                  className="font-display font-light text-xl md:text-2xl tracking-wide group-hover:text-gold transition-colors duration-500"
                  style={{ color: "#f5f0e8" }}
                >
                  {event.title}
                </h3>
                <p className="text-xs md:text-sm mt-1.5 font-sans leading-relaxed max-w-md" style={{ color: "#555" }}>
                  {event.description}
                </p>
              </div>

              {/* Date + Time — right aligned */}
              <div className="sm:text-right flex-shrink-0 sm:ml-8">
                <p className="text-xs font-sans uppercase tracking-[0.15em]" style={{ color: "rgba(245,240,232,0.6)" }}>
                  {event.date}
                </p>
                <p className="text-[10px] font-sans uppercase tracking-[0.2em] mt-1" style={{ color: "rgba(184,150,90,0.65)" }}>
                  {event.time}
                </p>
              </div>
            </div>

            {/* Divider line */}
            <div className="h-[1px]" style={{ background: "rgba(245,240,232,0.06)" }} />
          </motion.div>
        ))}
      </div>

      {/* Subtle link to /events */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mt-12"
      >
        <a
          href="/events"
          className="text-[9px] font-sans uppercase tracking-[0.3em] transition-colors duration-300 hover:text-gold"
          style={{ color: "#444" }}
        >
          View All Events →
        </a>
      </motion.div>

    </section>
  );
}
