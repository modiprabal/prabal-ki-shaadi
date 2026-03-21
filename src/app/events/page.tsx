"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";

export default function EventsPage() {
  const { events } = weddingConfig;
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center">
      <h1 className="font-serif text-4xl md:text-5xl text-text-main mb-16 text-center">
        The Itinerary
      </h1>

      <div className="max-w-3xl w-full grid gap-6">
        {events.map((event, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/60 shadow-sm flex flex-col md:flex-row gap-6 items-start hover:border-brand-gold/40 transition-colors"
          >
            <div className="flex-1">
              <span className="text-brand-gold font-bold tracking-widest uppercase text-xs">
                {event.date} • {event.time}
              </span>
              <h2 className="font-serif text-2xl text-text-main mt-2 mb-2">{event.title}</h2>
              <p className="text-sm text-text-muted leading-relaxed">{event.description}</p>
            </div>
            <div className="md:w-1/3 bg-white/70 border border-brand-gold/20 rounded-2xl p-4 text-center self-stretch flex items-center justify-center shadow-inner">
              <span className="text-text-main font-medium text-sm">{event.venue}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
