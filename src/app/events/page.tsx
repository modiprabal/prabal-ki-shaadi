"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { MapPin } from "lucide-react";

export default function EventsPage() {
  const { events } = weddingConfig;

  return (
    <main className="noise-overlay min-h-screen pt-28 pb-20 px-6 md:px-12" style={{ background: "#0a0a0c" }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[9px] font-sans uppercase tracking-[0.5em] mb-4" style={{ color: "#555" }}>
            The Celebrations
          </p>
          <h1 className="font-display font-light" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#f5f0e8" }}>
            The Itinerary
          </h1>
          <div className="w-32 h-[1px] mx-auto mt-6" style={{ background: "linear-gradient(to right, transparent, #b8965a, transparent)" }} />
        </motion.div>

        {/* Events list */}
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
          >
            {idx === 0 && (
              <div className="h-[1px]" style={{ background: "rgba(245,240,232,0.06)" }} />
            )}

            <div className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 py-8 md:py-10">
              {/* Number */}
              <div className="sm:w-16 flex-shrink-0">
                <span className="font-display font-light text-2xl md:text-3xl" style={{ color: "rgba(184,150,90,0.6)" }}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title + Description */}
              <div className="sm:flex-1">
                <h2 className="font-display font-light text-xl md:text-2xl tracking-wide group-hover:text-gold transition-colors duration-500" style={{ color: "#f5f0e8" }}>
                  {event.title}
                </h2>
                <p className="text-xs md:text-sm mt-1.5 font-sans leading-relaxed max-w-md" style={{ color: "#555" }}>
                  {event.description}
                </p>
              </div>

              {/* Date + Time + Venue */}
              <div className="sm:text-right flex-shrink-0 sm:ml-8 flex flex-col items-start sm:items-end gap-2">
                <div>
                  <p className="text-xs font-sans uppercase tracking-[0.15em]" style={{ color: "rgba(245,240,232,0.6)" }}>
                    {event.date}
                  </p>
                  <p className="text-[10px] font-sans uppercase tracking-[0.2em] mt-1" style={{ color: "rgba(184,150,90,0.65)" }}>
                    {event.time}
                  </p>
                </div>
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[9px] font-sans uppercase tracking-[0.2em] transition-colors duration-300 hover:text-gold mt-1"
                  style={{ color: "#444" }}
                >
                  <MapPin className="w-3 h-3" />
                  {event.venue}
                </a>
              </div>
            </div>

            <div className="h-[1px]" style={{ background: "rgba(245,240,232,0.06)" }} />
          </motion.div>
        ))}
      </div>
    </main>
  );
}
