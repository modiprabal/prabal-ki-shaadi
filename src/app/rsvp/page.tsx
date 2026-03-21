"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function RsvpPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use mock delay
    setTimeout(() => setSubmitted(true), 800);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center">
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 md:p-12 shadow-xl max-w-xl w-full"
      >
        <h1 className="font-serif text-3xl md:text-4xl text-text-main mb-2 text-center">RSVP</h1>
        <p className="text-text-muted text-center mb-10">Kindly respond by October 15, 2026</p>

        {submitted ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center text-center py-10"
          >
            <div className="w-16 h-16 bg-brand-mint text-text-main rounded-full flex items-center justify-center mb-6 text-2xl">
              ✓
            </div>
            <h2 className="font-serif text-2xl text-text-main mb-2">Thank you!</h2>
            <p className="text-text-muted">Your response has been recorded. We can&apos;t wait to celebrate with you!</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm uppercase tracking-widest text-text-muted mb-2">Full Name</label>
              <input required type="text" className="w-full bg-white/50 disabled focus:bg-white border-none rounded-xl p-4 text-text-main outline-none ring-1 ring-brand-sage/30 focus:ring-brand-sage transition-all" placeholder="Enter your name..." />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-widest text-text-muted mb-2">Will you attend?</label>
              <select className="w-full bg-white/50 focus:bg-white border-none rounded-xl p-4 text-text-main outline-none ring-1 ring-brand-sage/30 focus:ring-brand-sage transition-all appearance-none cursor-pointer">
                <option value="yes">Joyfully Accepts</option>
                <option value="no">Regretfully Declines</option>
              </select>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-widest text-text-muted mb-2">Number of Guests</label>
              <input type="number" min="1" max="10" defaultValue="1" className="w-full bg-white/50 border-none rounded-xl p-4 text-text-main outline-none ring-1 ring-brand-sage/30 focus:ring-brand-sage transition-all" />
            </div>

            <button type="submit" className="mt-4 w-full py-4 bg-text-main text-white rounded-xl text-sm uppercase tracking-widest font-medium hover:bg-black transition-colors">
              Send RSVP
            </button>
          </form>
        )}
      </motion.div>
    </main>
  );
}
