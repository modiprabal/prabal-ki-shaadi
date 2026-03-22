"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { weddingConfig } from "@/config/weddingConfig";

export default function RsvpPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dates, groom, bride } = weddingConfig;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      attending: formData.get("attending"),
      guests: formData.get("guests"),
      requests: formData.get("requests"),
    };

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="noise-overlay min-h-screen flex items-center justify-center px-6 py-28" style={{ background: "var(--theme-bg)" }}>
      {/* Subtle glow */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: `radial-gradient(circle, var(--theme-glow-bg), transparent 60%)` }}
      />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[9px] font-sans uppercase tracking-[0.5em] mb-4" style={{ color: "var(--theme-text-muted)" }}>
            Your Response
          </p>
          <h1 className="font-display font-light" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "var(--theme-text)" }}>
            RSVP
          </h1>
          <div className="w-12 h-[1px] mx-auto mt-4 mb-4" style={{ background: `linear-gradient(to right, transparent, var(--theme-accent), transparent)` }} />
          <p className="text-m font-sans" style={{ color: "var(--theme-text-muted)" }}>
            Kindly respond by <span style={{ color: "var(--theme-event-number)" }}>{dates.rsvpDeadline}</span>
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12 rounded-2xl"
            style={{ background: "var(--theme-bg-card)", border: "1px solid var(--theme-divider)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ border: `1px solid var(--theme-accent-muted)`, color: "var(--theme-accent)" }}
            >
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="font-display font-light text-2xl mb-3" style={{ color: "var(--theme-text)" }}>
              Thank you!
            </h2>
            <p className="text-sm font-sans" style={{ color: "var(--theme-text-muted)" }}>
              Your response has been recorded.<br />
              We can&apos;t wait to celebrate with you!
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-2xl p-8"
            style={{ background: "var(--theme-bg-card)", border: "1px solid var(--theme-divider)" }}
          >
            {/* Name */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.3em] mb-2.5 font-sans" style={{ color: "var(--theme-text-muted)" }}>
                Full Name
              </label>
              <input
                required
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-xl px-4 py-3.5 text-sm font-sans outline-none transition-all duration-300 focus:ring-1"
                style={{
                  background: "var(--theme-divider)",
                  border: "1px solid var(--theme-divider)",
                  color: "var(--theme-text)",
                }}
              />
            </div>

            {/* Attendance */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.3em] mb-2.5 font-sans" style={{ color: "var(--theme-text-muted)" }}>
                Will you attend?
              </label>
              <select
                name="attending"
                className="w-full rounded-xl px-4 py-3.5 text-sm font-sans outline-none transition-all duration-300 appearance-none cursor-pointer"
                style={{
                  background: "var(--theme-divider)",
                  border: "1px solid var(--theme-divider)",
                  color: "var(--theme-text)",
                }}
              >
                <option value="yes" style={{ background: "var(--theme-bg-card)" }}>Joyfully Accepts</option>
                <option value="no" style={{ background: "var(--theme-bg-card)" }}>Regretfully Declines</option>
              </select>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.3em] mb-2.5 font-sans" style={{ color: "var(--theme-text-muted)" }}>
                Number of Guests
              </label>
              <input
                type="number"
                name="guests"
                min="1"
                max="10"
                defaultValue="1"
                className="w-full rounded-xl px-4 py-3.5 text-sm font-sans outline-none transition-all duration-300"
                style={{
                  background: "var(--theme-divider)",
                  border: "1px solid var(--theme-divider)",
                  color: "var(--theme-text)",
                }}
              />
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.3em] mb-2.5 font-sans" style={{ color: "var(--theme-text-muted)" }}>
                Special Requests
              </label>
              <textarea
                name="requests"
                rows={3}
                placeholder="Dietary needs, accessibility requirements, etc."
                className="w-full rounded-xl px-4 py-3.5 text-sm font-sans outline-none transition-all duration-300 resize-none"
                style={{
                  background: "var(--theme-divider)",
                  border: "1px solid var(--theme-divider)",
                  color: "var(--theme-text)",
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative mt-3 w-full py-4 rounded-full font-sans text-[11px] font-medium tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 disabled:opacity-50"
              style={{
                background: "var(--theme-accent)",
                color: "var(--theme-btn-text)",
              }}
            >
              <span className="relative z-10">{loading ? "Sending..." : "Send RSVP"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </form>
        )}

        {/* Footer */}
        <p className="text-center mt-8 text-[9px] font-sans uppercase tracking-[0.3em]" style={{ color: "var(--theme-text-dim)" }}>
          {groom.firstName} & {bride.firstName} · {dates.mainWeddingDate}
        </p>
      </motion.div>
    </main>
  );
}
