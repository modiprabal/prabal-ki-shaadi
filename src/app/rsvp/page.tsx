"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { weddingConfig } from "@/config/weddingConfig";

export default function RsvpPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dates, groom, bride } = weddingConfig;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <main className="noise-overlay min-h-screen flex items-center justify-center px-6 py-28" style={{ background: "#0a0a0c" }}>
      {/* Subtle glow */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(184,150,90,0.03), transparent 60%)" }}
      />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[9px] font-sans uppercase tracking-[0.5em] mb-4" style={{ color: "#555" }}>
            Your Response
          </p>
          <h1 className="font-display font-light" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#f5f0e8" }}>
            RSVP
          </h1>
          <div className="w-12 h-[1px] mx-auto mt-4 mb-4" style={{ background: "linear-gradient(to right, transparent, #b8965a, transparent)" }} />
          <p className="text-m font-sans" style={{ color: "#555" }}>
            Kindly respond by <span style={{ color: "rgba(184,150,90,0.6)" }}>{dates.rsvpDeadline}</span>
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12 rounded-2xl"
            style={{ background: "#111113", border: "1px solid rgba(245,240,232,0.05)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ border: "1px solid rgba(184,150,90,0.3)", color: "#b8965a" }}
            >
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="font-display font-light text-2xl mb-3" style={{ color: "#f5f0e8" }}>
              Thank you!
            </h2>
            <p className="text-sm font-sans" style={{ color: "#555" }}>
              Your response has been recorded.<br />
              We can&apos;t wait to celebrate with you!
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-2xl p-8"
            style={{ background: "#111113", border: "1px solid rgba(245,240,232,0.05)" }}
          >
            {/* Name */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.3em] mb-2.5 font-sans" style={{ color: "#555" }}>
                Full Name
              </label>
              <input
                required
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-xl px-4 py-3.5 text-sm font-sans outline-none transition-all duration-300 focus:ring-1"
                style={{
                  background: "rgba(245,240,232,0.03)",
                  border: "1px solid rgba(245,240,232,0.08)",
                  color: "#f5f0e8",
                }}
              />
            </div>

            {/* Attendance */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.3em] mb-2.5 font-sans" style={{ color: "#555" }}>
                Will you attend?
              </label>
              <select
                className="w-full rounded-xl px-4 py-3.5 text-sm font-sans outline-none transition-all duration-300 appearance-none cursor-pointer"
                style={{
                  background: "rgba(245,240,232,0.03)",
                  border: "1px solid rgba(245,240,232,0.08)",
                  color: "#f5f0e8",
                }}
              >
                <option value="yes" style={{ background: "#111113" }}>Joyfully Accepts</option>
                <option value="no" style={{ background: "#111113" }}>Regretfully Declines</option>
              </select>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.3em] mb-2.5 font-sans" style={{ color: "#555" }}>
                Number of Guests
              </label>
              <input
                type="number"
                min="1"
                max="10"
                defaultValue="1"
                className="w-full rounded-xl px-4 py-3.5 text-sm font-sans outline-none transition-all duration-300"
                style={{
                  background: "rgba(245,240,232,0.03)",
                  border: "1px solid rgba(245,240,232,0.08)",
                  color: "#f5f0e8",
                }}
              />
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.3em] mb-2.5 font-sans" style={{ color: "#555" }}>
                Special Requests
              </label>
              <textarea
                rows={3}
                placeholder="Dietary needs, accessibility requirements, etc."
                className="w-full rounded-xl px-4 py-3.5 text-sm font-sans outline-none transition-all duration-300 resize-none"
                style={{
                  background: "rgba(245,240,232,0.03)",
                  border: "1px solid rgba(245,240,232,0.08)",
                  color: "#f5f0e8",
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative mt-3 w-full py-4 rounded-full font-sans text-[11px] font-medium tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 disabled:opacity-50"
              style={{
                background: "#b8965a",
                color: "#0a0a0c",
              }}
            >
              <span className="relative z-10">{loading ? "Sending..." : "Send RSVP"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </form>
        )}

        {/* Footer */}
        <p className="text-center mt-8 text-[9px] font-sans uppercase tracking-[0.3em]" style={{ color: "#222" }}>
          {groom.firstName} & {bride.firstName} · {dates.mainWeddingDate}
        </p>
      </motion.div>
    </main>
  );
}
