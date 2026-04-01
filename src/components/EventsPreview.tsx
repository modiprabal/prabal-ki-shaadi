"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";

/**
 * Events Preview — Bento Grid from stitch landing_page/code.html "Schedule Bento Grid"
 */
export default function EventsPreview() {
  const { events, location } = weddingConfig;

  const sangeet = events.find((e) => e.title === "Sangeet Night") || events[2];
  const wedding = events.find((e) => e.title === "Baarat") || events[3];
  const reception = events.find((e) => e.title === "Grand Reception") || events[5];

  return (
    <section className="py-32 px-6 bg-surface" id="events">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-headline italic text-2xl block mb-2">The Celebrations</span>
          <h3 className="text-5xl font-headline tracking-tight">Events Schedule</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Event 1 — Sangeet (wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 bg-surface-container-lowest p-10 rounded-xl editorial-shadow group hover:bg-surface-container transition-colors duration-500"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 h-full">
              <div>
                <span className="text-secondary font-label text-sm uppercase tracking-widest">Day One</span>
                <h4 className="text-4xl font-headline mt-2 mb-4">{sangeet.title}</h4>
                <p className="text-on-surface-variant max-w-sm">{sangeet.description}</p>
              </div>
              <div className="text-right">
                <span className="block text-primary font-headline text-2xl">{sangeet.date}</span>
                <span className="text-on-surface-variant">{sangeet.time}</span>
              </div>
            </div>
          </motion.div>

          {/* Event 2 — Wedding Ceremony (crimson bg) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-primary text-on-primary p-10 rounded-xl editorial-shadow relative overflow-hidden"
          >
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-primary-fixed font-label text-sm uppercase tracking-widest">The Big Day</span>
                <h4 className="text-4xl font-headline mt-2 mb-4">Wedding Ceremony</h4>
              </div>
              <div className="mt-8">
                <span className="block font-headline text-2xl">{wedding.date}</span>
                <span className="opacity-80">{wedding.time}</span>
                <p className="mt-4 text-sm font-label opacity-90">{location.weddingVenue}</p>
              </div>
            </div>
            {/* Decorative icon */}
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <svg className="w-24 h-24" viewBox="0 0 48 48" fill="currentColor" style={{ fontVariationSettings: "'wght' 200" }}>
                <path d="M24 4C20 4 16 8 16 12c0 2 1 4 2 5.5C14 19 12 22 12 25c0 5 4 9 8 10v9h8v-9c4-1 8-5 8-10 0-3-2-6-6-7.5 1-1.5 2-3.5 2-5.5 0-4-4-8-8-8z"/>
              </svg>
            </div>
          </motion.div>

          {/* Event 3 — Reception */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface-container-high p-10 rounded-xl editorial-shadow"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="text-secondary font-label text-sm uppercase tracking-widest">The Grand Finale</span>
                <h4 className="text-3xl font-headline mt-2 mb-4">{reception.title}</h4>
              </div>
              <div className="mt-6">
                <span className="block text-primary font-headline text-xl">{reception.date}</span>
                <span className="text-on-surface-variant">{reception.time}</span>
              </div>
            </div>
          </motion.div>

          {/* Location Map (wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 relative rounded-xl overflow-hidden editorial-shadow group h-64 md:h-auto"
            id="travel"
          >
            <div className="absolute inset-0 bg-on-surface/20 group-hover:bg-on-surface/10 transition-colors z-10" />
            <iframe
              src={location.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 256 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue Map"
            />
            <div className="absolute bottom-6 left-6 z-20 text-white">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-primary-fixed" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="font-headline text-xl">{location.city}</span>
              </div>
              <p className="text-sm opacity-90 max-w-xs font-label">
                The city of temples and rich Bundelkhandi heritage welcomes you.
              </p>
            </div>
          </motion.div>
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <a
            href="/events"
            className="inline-flex items-center gap-2 text-primary font-label font-bold tracking-wider group"
          >
            VIEW ALL EVENTS
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
