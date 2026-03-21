"use client";

import { motion } from "framer-motion";
import { Plane, TrainFront, Hotel, MapPin } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

export default function TravelPage() {
  const { location, dates } = weddingConfig;

  return (
    <main className="noise-overlay min-h-screen pt-28 pb-20 px-6 md:px-12" style={{ background: "var(--theme-bg)" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[9px] font-sans uppercase tracking-[0.5em] mb-4" style={{ color: "var(--theme-text-muted)" }}>
            Getting There
          </p>
          <h1 className="font-display font-light" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--theme-text)" }}>
            Travel & Stay
          </h1>
          <div className="w-12 h-[1px] mx-auto mt-6" style={{ background: `linear-gradient(to right, transparent, var(--theme-accent), transparent)` }} />
          <p className="font-sans text-sm mt-6 max-w-lg mx-auto leading-relaxed" style={{ color: "var(--theme-text-muted)" }}>
            Everything you need to plan your trip to {location.city} for the celebrations.
          </p>
        </motion.div>

        {/* ━━━ By Air ━━━ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: `1px solid var(--theme-accent-faint)` }}>
              <Plane className="w-3.5 h-3.5" style={{ color: "var(--theme-accent)" }} />
            </div>
            <h2 className="font-display font-light text-2xl" style={{ color: "var(--theme-text)" }}>By Air</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {location.airports.map((airport, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="rounded-2xl p-7 transition-all duration-500 group"
                style={{
                  background: "var(--theme-bg-card)",
                  border: "1px solid var(--theme-divider)",
                }}
              >
                <h3 className="font-display font-light text-lg mb-2 group-hover:text-gold-bright transition-colors duration-300" style={{ color: "var(--theme-text)" }}>
                  {airport.name}
                </h3>
                <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--theme-text-muted)" }}>
                  {airport.description}
                </p>

                {/* Trains */}
                <div className="mb-5">
                  <p className="text-[8px] uppercase tracking-[0.3em] mb-3" style={{ color: "var(--theme-accent-muted)" }}>
                    Connecting Trains
                  </p>
                  <ul className="space-y-1.5">
                    {airport.trains.map((train, i) => (
                      <li key={i} className="text-xs flex items-start gap-2" style={{ color: "var(--theme-text-body)" }}>
                        <span style={{ color: "var(--theme-accent-faint)", marginTop: 2, fontSize: 6 }}>◆</span>
                        {train}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Drive */}
                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] mb-2" style={{ color: "var(--theme-accent-muted)" }}>
                    By Road
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--theme-text-muted)" }}>{airport.drive}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ━━━ By Train ━━━ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: `1px solid var(--theme-accent-faint)` }}>
              <TrainFront className="w-3.5 h-3.5" style={{ color: "var(--theme-accent)" }} />
            </div>
            <h2 className="font-display font-light text-2xl" style={{ color: "var(--theme-text)" }}>By Train</h2>
          </div>

          <div
            className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8"
            style={{ background: "var(--theme-bg-card)", border: "1px solid var(--theme-divider)" }}
          >
            <div className="flex-1">
              <h3 className="font-display font-light text-2xl mb-3" style={{ color: "var(--theme-text)" }}>
                {location.trainStationName}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--theme-text-muted)" }}>
                Lalitpur Junction is a major hub with direct connectivity from New Delhi, Mumbai, Bhopal, and other major cities across India.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="text-[9px] uppercase tracking-[0.2em] px-4 py-2 rounded-full flex items-center gap-1.5" style={{ border: `1px solid var(--theme-accent-faint)`, color: "var(--theme-event-number)" }}>
                  <MapPin className="w-3 h-3" /> {location.trainStationDistance} to venue
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] px-4 py-2 rounded-full" style={{ border: "1px solid var(--theme-divider)", color: "var(--theme-text-muted)" }}>
                  Taxis readily available
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ━━━ Accommodation ━━━ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: `1px solid var(--theme-accent-faint)` }}>
              <Hotel className="w-3.5 h-3.5" style={{ color: "var(--theme-accent)" }} />
            </div>
            <h2 className="font-display font-light text-2xl" style={{ color: "var(--theme-text)" }}>Where to Stay</h2>
          </div>

          <div
            className="rounded-2xl p-8 md:p-10 text-center"
            style={{ background: "var(--theme-bg-card)", border: "1px solid var(--theme-divider)" }}
          >
            <p className="font-sans text-sm leading-relaxed max-w-2xl mx-auto mb-6" style={{ color: "var(--theme-text-muted)" }}>
              We are arranging comfortable stays across beautiful properties near the venue. We will reach out with your personalized hotel assignment closer to the date. Check-ins begin at {dates.checkInTime} on {dates.checkInDate}.
            </p>
            <span
              className="inline-block text-[10px] font-sans uppercase tracking-[0.2em] px-6 py-2.5 rounded-full"
              style={{ border: "1px solid var(--theme-divider)", color: "var(--theme-text-dim)" }}
            >
              Details Coming Soon
            </span>
          </div>
        </motion.div>

        {/* ━━━ Map ━━━ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: `1px solid var(--theme-accent-faint)` }}>
              <MapPin className="w-3.5 h-3.5" style={{ color: "var(--theme-accent)" }} />
            </div>
            <h2 className="font-display font-light text-2xl" style={{ color: "var(--theme-text)" }}>{location.weddingVenue}</h2>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--theme-divider)", height: 400 }}
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
          </div>
        </motion.div>
      </div>
    </main>
  );
}
