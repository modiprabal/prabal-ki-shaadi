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

      <div className="max-w-3xl w-full grid gap-8">
        {events.map((event, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="bg-white/50 backdrop-blur-md rounded-2xl p-8 border border-white/40 shadow-sm flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="flex-1">
              <span className="text-brand-emerald font-bold tracking-widest uppercase text-xs">
                {event.date} • {event.time}
              </span>
              <h2 className="font-serif text-2xl text-text-main mt-2 mb-3">{event.title}</h2>
              <p className="text-text-muted">{event.description}</p>
            </div>
            <div className="md:w-1/3 bg-brand-peach/50 rounded-xl p-4 text-center border border-brand-sage/20 self-stretch flex items-center justify-center">
              <span className="text-text-main font-medium">{event.venue}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
