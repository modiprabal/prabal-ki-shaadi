"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { weddingConfig } from "@/config/weddingConfig";

/**
 * RSVP Section — from stitch landing_page/code.html RSVP section
 */
export default function RsvpCTA() {
  const { dates } = weddingConfig;
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      if (res.ok) { setSubmitted(true); }
      else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch {
      alert("Failed to submit RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32 px-6 henna-pattern" id="rsvp">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="max-w-2xl mx-auto bg-surface-container-lowest p-12 md:p-20 rounded-xl editorial-shadow text-center"
      >
        {submitted ? (
          <div className="py-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary/30">
              <span className="text-3xl text-primary">✓</span>
            </div>
            <h3 className="font-headline text-3xl mb-4">Thank You!</h3>
            <p className="text-on-surface-variant">
              Your response has been recorded.<br />We can&apos;t wait to celebrate with you!
            </p>
          </div>
        ) : (
          <>
            <h3 className="font-headline text-4xl mb-4">Kindly RSVP</h3>
            <p className="text-secondary mb-12">
              Please let us know if you can join us by {dates.rsvpDeadline}.
            </p>
            <form onSubmit={handleSubmit} className="space-y-10 text-left">
              <div className="relative">
                <label className="block text-xs font-label text-tertiary uppercase tracking-widest mb-2">Your Full Name</label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-transparent border-0 border-b border-outline py-3 focus:ring-0 focus:border-secondary transition-colors font-body text-lg"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative">
                  <label className="block text-xs font-label text-tertiary uppercase tracking-widest mb-2">Number of Guests</label>
                  <select name="guests" className="w-full bg-transparent border-0 border-b border-outline py-3 focus:ring-0 focus:border-secondary transition-colors font-body text-lg appearance-none">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>Family (4+)</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="block text-xs font-label text-tertiary uppercase tracking-widest mb-2">Will you attend?</label>
                  <select name="attending" className="w-full bg-transparent border-0 border-b border-outline py-3 focus:ring-0 focus:border-secondary transition-colors font-body text-lg appearance-none">
                    <option value="yes">Yes, with pleasure</option>
                    <option value="no">Regretfully, no</option>
                  </select>
                </div>
              </div>
              <div className="relative">
                <label className="block text-xs font-label text-tertiary uppercase tracking-widest mb-2">Dietary Preferences / Notes</label>
                <textarea
                  name="requests"
                  rows={2}
                  placeholder="Tell us if you have any requirements..."
                  className="w-full bg-transparent border-0 border-b border-outline py-3 focus:ring-0 focus:border-secondary transition-colors font-body text-lg resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-gradient-to-br from-primary to-primary-container text-on-primary py-5 rounded-full font-headline text-xl editorial-shadow hover:scale-[0.98] transition-transform disabled:opacity-50"
              >
                {loading ? "Sending..." : "Confirm Attendance"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </section>
  );
}
