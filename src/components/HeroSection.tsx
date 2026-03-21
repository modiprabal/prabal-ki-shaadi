"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { weddingConfig } from "@/config/weddingConfig";

/* ━━━ Countdown ━━━ */
function Countdown({ targetDate }: { targetDate: string }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const target = new Date(`${targetDate} 00:00:00`).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!ready) return <div className="h-10" />;

  const pairs: [string, number][] = [
    ["Days", t.d], ["Hrs", t.h], ["Min", t.m], ["Sec", t.s],
  ];

  return (
    <div className="flex items-center gap-0.5">
      {pairs.map(([label, val], i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center w-12 md:w-14">
            <span className="font-display font-light text-xl md:text-2xl tabular-nums leading-none" style={{ color: "#f5f0e8" }}>
              {val.toString().padStart(2, "0")}
            </span>
            <span className="text-[6px] md:text-[7px] uppercase tracking-[0.25em] mt-1 font-sans" style={{ color: "#444" }}>
              {label}
            </span>
          </div>
          {i < 3 && (
            <span className="text-sm font-light -mt-2.5" style={{ color: "rgba(184,150,90,0.25)" }}>:</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO — Split layout
   Desktop: Photo left (45%) | Text right (55%)
   Mobile:  Names → Photo → Details (stacked, centered)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function HeroSection() {
  const { groom, bride, dates, location } = weddingConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="noise-overlay relative w-full h-screen overflow-hidden"
      style={{ background: "#0a0a0c" }}
    >
      {/* Thin arch — barely visible */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] max-w-[450px] h-auto pointer-events-none z-0"
        viewBox="0 0 700 900" fill="none" style={{ opacity: 0.02 }}
      >
        <path d="M100,900 L100,350 Q100,80 350,60 Q600,80 600,350 L600,900" stroke="#b8965a" strokeWidth="1" />
      </svg>

      {/* ━━━ Desktop: side-by-side ━━━ */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row items-center">

        {/* ── LEFT: Photo (hidden on mobile, shown on lg+) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="hidden lg:block relative w-[48%] h-full flex-shrink-0 overflow-hidden"
        >
          <motion.div style={{ scale: photoScale }} className="absolute inset-0 will-change-transform">
            <Image
              src="/couple-hero.jpg"
              alt={`${groom.firstName} & ${bride.firstName}`}
              fill
              priority
              sizes="48vw"
              className="object-cover object-center"
            />
          </motion.div>
          {/* Right edge fade — gentle blend into text area */}
          <div
            className="absolute top-0 right-0 w-[30%] h-full pointer-events-none"
            style={{ background: "linear-gradient(to left, #0a0a0c, transparent)" }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[15%] pointer-events-none"
            style={{ background: "linear-gradient(to top, #0a0a0c, transparent)" }}
          />
          {/* Top fade */}
          <div
            className="absolute top-0 left-0 right-0 h-[10%] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #0a0a0c, transparent)" }}
          />
        </motion.div>

        {/* ── RIGHT: Text content (centered on mobile, right-aligned on desktop) ── */}
        <motion.div
          style={{ y: textY }}
          className="flex-1 flex flex-col items-center justify-center h-full px-6 md:px-8 will-change-transform"
        >
          {/* शुभ विवाह */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="font-hindi text-base md:text-lg tracking-[0.2em] mb-4"
            style={{ color: "rgba(184,150,90,0.7)" }}
          >
            शुभ विवाह
          </motion.p>

          {/* Names */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display font-light leading-[0.85] tracking-[0.02em] select-none"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              color: "#f5f0e8",
            }}
          >
            {groom.firstName}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1, type: "spring", stiffness: 80 }}
            className="flex items-center gap-3 my-1"
          >
            <div className="w-8 lg:w-12 h-[1px]" style={{ background: "linear-gradient(to right, transparent, rgba(184,150,90,0.3))" }} />
            <span className="font-display italic text-2xl lg:text-3xl" style={{ color: "#b8965a" }}>&amp;</span>
            <div className="w-8 lg:w-12 h-[1px]" style={{ background: "linear-gradient(to left, transparent, rgba(184,150,90,0.3))" }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display font-light leading-[0.85] tracking-[0.02em] select-none"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              color: "#f5f0e8",
            }}
          >
            {bride.firstName}
          </motion.h1>

          {/* ── Mobile-only photo (between names and details) ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0 }}
            className="lg:hidden relative w-full max-w-[380px] h-[28vh] min-h-[180px] my-4 rounded-lg overflow-hidden self-center"
          >
            <Image
              src="/couple-hero.jpg"
              alt={`${groom.firstName} & ${bride.firstName}`}
              fill
              priority
              sizes="90vw"
              className="object-cover object-center"
            />
            {/* Soft edges */}
            <div className="absolute inset-0 pointer-events-none" style={{
              boxShadow: "inset 0 0 40px 20px #0a0a0c",
            }} />
          </motion.div>

          {/* Gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
            className="w-60 lg:w-60 max-w-[80vw] h-[1px] mt-6 lg:mt-8 mb-5"
            style={{ background: "linear-gradient(to right, transparent, #b8965a, transparent)" }}
          />

          {/* Date + Venue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col items-center"
          >
            <p className="font-display font-light tracking-[0.25em] text-base md:text-lg uppercase" style={{ color: "#f5f0e8" }}>
              {dates.mainWeddingDate}
            </p>
            <p className="text-[9px] md:text-[10px] font-sans uppercase tracking-[0.3em] mt-2 mb-6" style={{ color: "rgba(184,150,90,0.8)" }}>
              {location.weddingVenue} &nbsp;·&nbsp; {location.city}
            </p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mb-8"
          >
            <Countdown targetDate={dates.mainWeddingDate} />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.8 }}
          >
            <a
              href="/rsvp"
              className="group relative px-10 py-3 rounded-full font-sans text-[10px] font-medium tracking-[0.2em] uppercase overflow-hidden transition-all duration-500"
              style={{ border: "1px solid rgba(184,150,90,0.35)", color: "#b8965a" }}
            >
              <span className="relative z-10 group-hover:text-[#0a0a0c] transition-colors duration-500">
                Celebrate With Us
              </span>
              <div
                className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                style={{ background: "#b8965a" }}
              />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-5"
          style={{ background: "linear-gradient(to bottom, rgba(184,150,90,0.25), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
