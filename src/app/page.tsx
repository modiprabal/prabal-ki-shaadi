"use client";

import Link from "next/link";
import { weddingConfig } from "@/config/weddingConfig";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
          <div className="flex flex-col items-center w-12 md:w-14 lg:w-20">
            <span className="font-noto-serif font-light text-xl md:text-2xl lg:text-4xl tabular-nums leading-none text-[#2C1E16]">
              {val.toString().padStart(2, "0")}
            </span>
            <span className="text-[6px] md:text-[7px] lg:text-[9px] uppercase tracking-[0.25em] mt-1 lg:mt-2 font-plus-jakarta text-[#8A252C]/50">
              {label}
            </span>
          </div>
          {i < 3 && (
            <span className="text-sm lg:text-xl font-light -mt-2.5 text-[#E8DCC4]">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO — Split layout (exact main branch)
   Desktop: Photo left (48%) | Text right (flex-1)
   Mobile:  Names → Photo → Details (stacked, centered)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HeroSection() {
  const { groom, bride, dates, location } = weddingConfig;

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden bg-[#FCFAF8]"
    >
      {/* Thin arch — barely visible */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] max-w-[450px] h-auto pointer-events-none z-0"
        viewBox="0 0 700 900"
        fill="none"
        style={{ opacity: 0.02 }}
      >
        <path
          d="M100,900 L100,350 Q100,80 350,60 Q600,80 600,350 L600,900"
          stroke="#8A252C"
          strokeWidth="1"
        />
      </svg>

      {/* Desktop: side-by-side */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row items-center">

        {/* LEFT: Photo (hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="hidden lg:block relative w-[48%] h-full flex-shrink-0 overflow-hidden"
        >
          <div className="absolute inset-0 will-change-transform">
            <Image
              src="/couple-hero-light.jpg"
              alt={`${groom.firstName} & ${bride.firstName}`}
              fill
              priority
              sizes="48vw"
              className="object-cover object-center"
            />
          </div>
          {/* Right edge fade */}
          <div
            className="absolute top-0 right-0 w-[30%] h-full pointer-events-none"
            style={{ background: "linear-gradient(to left, #FCFAF8, transparent)" }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[15%] pointer-events-none"
            style={{ background: "linear-gradient(to top, #FCFAF8, transparent)" }}
          />
          {/* Top fade */}
          <div
            className="absolute top-0 left-0 right-0 h-[10%] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #FCFAF8, transparent)" }}
          />
        </motion.div>

        {/* RIGHT: Text */}
        <div className="flex-1 flex flex-col items-center justify-center h-full px-6 md:px-8">

          {/* ॐ with flanking lines */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="flex items-center gap-4 mb-3"
          >
            <div className="w-10 lg:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#8A252C]/50" />
            <span className="text-[#8F4E00] text-3xl md:text-4xl lg:text-5xl" style={{ textShadow: "0 1px 8px rgba(143,78,0,0.15)" }}>ॐ</span>
            <div className="w-10 lg:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#8A252C]/50" />
          </motion.div>

          {/* शुभ विवाह */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-sm md:text-base tracking-[0.45em] mb-6 text-center uppercase font-plus-jakarta text-[#8F4E00]"
          >
            शुभ विवाह
          </motion.p>

          {/* Groom name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="font-noto-serif font-light leading-[0.85] tracking-[0.01em] select-none text-[#2C1E16]"
            style={{ fontSize: "clamp(4rem, 11vw, 8.5rem)" }}
          >
            {groom.firstName}
          </motion.h1>

          {/* WEDS */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1, type: "spring", stiffness: 80 }}
            className="flex items-center gap-3 my-2"
          >
            <div className="w-10 lg:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#8A252C]/60" />
            <span className="font-noto-serif italic text-base lg:text-xl tracking-[0.25em] text-[#8A252C]">WEDS</span>
            <div className="w-10 lg:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#8A252C]/60" />
          </motion.div>

          {/* Bride name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="font-noto-serif font-light leading-[0.85] tracking-[0.01em] select-none text-[#2C1E16]"
            style={{ fontSize: "clamp(4rem, 11vw, 8.5rem)" }}
          >
            {bride.firstName}
          </motion.h1>

          {/* Mobile-only photo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0 }}
            className="lg:hidden relative w-full max-w-[380px] h-[28vh] min-h-[180px] my-4 rounded-lg overflow-hidden self-center"
          >
            <Image
              src="/couple-hero-light.jpg"
              alt={`${groom.firstName} & ${bride.firstName}`}
              fill
              priority
              sizes="90vw"
              className="object-cover object-center"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 40px 20px #FCFAF8" }}
            />
          </motion.div>

          {/* Gold divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
            className="w-60 max-w-[80vw] h-[1px] mt-6 lg:mt-8 mb-5 bg-gradient-to-r from-transparent via-[#8F4E00] to-transparent"
          />

          {/* Date + Venue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col items-center"
          >
            <p className="font-noto-serif font-light tracking-[0.25em] text-base md:text-lg lg:text-2xl uppercase text-[#2C1E16]">
              {dates.mainWeddingDate}
            </p>
            <p className="text-[9px] md:text-[10px] lg:text-xs font-plus-jakarta uppercase tracking-[0.3em] mt-2 mb-6 text-[#8F4E00]">
              {location.weddingVenue}&nbsp;·&nbsp;{location.city}
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
              className="group relative px-10 lg:px-14 py-3 lg:py-4 rounded-full font-plus-jakarta text-[10px] lg:text-xs font-medium tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 border border-[#8A252C]/30 text-[#8A252C]"
            >
              <span className="relative z-10 group-hover:text-[#FCFAF8] transition-colors duration-500">
                Celebrate With Us
              </span>
              <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-[#8A252C]" />
            </a>
          </motion.div>

        </div>
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
          className="w-[1px] h-5 bg-gradient-to-b from-[#8A252C]/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

export default function Home() {
  const { groom, bride, dates, location } = weddingConfig;

  return (
    <>
      <main className="bg-[#FCFAF8] min-h-screen text-[#2C1E16] font-body relative selection:bg-[#E8DCC4] selection:text-[#8A252C] overflow-hidden">

        {/* Global Delicate Grid Overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 hidden lg:block">
          <div className="absolute left-12 top-0 bottom-0 w-px bg-[#E8DCC4]/50"></div>
          <div className="absolute right-12 top-0 bottom-0 w-px bg-[#E8DCC4]/50"></div>
          <div className="absolute top-12 left-0 right-0 h-px bg-[#E8DCC4]/50"></div>
          <div className="absolute bottom-12 left-0 right-0 h-px bg-[#E8DCC4]/50"></div>
        </div>

        <HeroSection />

        {/* Delicate divider */}
        <div className="flex justify-center py-10 opacity-60 relative z-10">
          <span className="material-symbols-outlined text-[#8A252C] text-sm" style={{ fontVariationSettings: "'wght' 100" }}>filter_vintage</span>
          <div className="w-16 mx-4 relative top-2 border-t border-[#E8DCC4]"></div>
          <span className="material-symbols-outlined text-[#8F4E00] text-sm" style={{ fontVariationSettings: "'wght' 100" }}>filter_vintage</span>
          <div className="w-16 mx-4 relative top-2 border-t border-[#E8DCC4]"></div>
          <span className="material-symbols-outlined text-[#8A252C] text-sm" style={{ fontVariationSettings: "'wght' 100" }}>filter_vintage</span>
        </div>

        {/* Invitation Story Section */}
        <section className="py-24 px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto border border-[#E8DCC4] bg-[#F9F4EC] px-8 py-14 md:px-16 md:py-20 text-center relative overflow-hidden">
            <div className="absolute top-6 left-6 w-10 h-10 border-l border-t border-[#E8DCC4] opacity-70"></div>
            <div className="absolute top-6 right-6 w-10 h-10 border-r border-t border-[#E8DCC4] opacity-70"></div>
            <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b border-[#E8DCC4] opacity-70"></div>
            <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b border-[#E8DCC4] opacity-70"></div>
            <div className="relative">
              <p className="font-plus-jakarta text-xs uppercase tracking-[0.35em] text-[#8F4E00] mb-6">Invitation Note</p>
              <h2 className="font-noto-serif text-4xl md:text-5xl text-[#8A252C] mb-8 leading-[1.2] tracking-tight">
                Together with our families, we invite you to celebrate our union.
              </h2>
              <div className="space-y-6 text-lg text-[#2C1E16]/80 font-plus-jakarta font-light leading-[1.8] max-w-2xl mx-auto">
                <p>It began as a quiet conversation and grew into a lifelong promise. We found in each other a companion, a best friend, and a partner for all our future adventures.</p>
                <p>As we take this sacred step in the historic city of {location.city.split(",")[0]}, your presence would add to the joy of our celebrations. We look forward to creating memories that will be cherished for generations.</p>
              </div>
              <div className="mt-16 flex items-center justify-center gap-6">
                <div className="h-px w-16 bg-[#E8DCC4]"></div>
                <span className="font-noto-serif italic text-3xl text-[#8F4E00] opacity-90">{groom.firstName} &amp; {bride.firstName}</span>
                <div className="h-px w-16 bg-[#E8DCC4]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* The Celebration Details */}
        <section className="py-32 px-6 relative z-10 bg-[#FCFAF8]">
          <div className="max-w-screen-xl mx-auto border-t border-[#E8DCC4] pt-24">
            <div className="text-center mb-20">
              <span className="text-[#8F4E00] font-plus-jakarta text-xs uppercase tracking-[0.4em] block mb-4">Discover More</span>
              <h3 className="text-4xl md:text-5xl font-noto-serif text-[#8A252C] tracking-tight">The Celebration Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <Link href="/events" className="group block">
                <div className="h-full bg-transparent border border-[#E8DCC4] p-10 flex flex-col items-center text-center transition-colors duration-500 hover:bg-[#F5EFE6]">
                  <div className="mb-8 text-[#8F4E00] transform transition-transform duration-500 group-hover:-translate-y-2">
                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 100" }}>celebration</span>
                  </div>
                  <h4 className="text-2xl font-noto-serif text-[#2C1E16] mb-4">The Festivities</h4>
                  <p className="font-plus-jakarta text-[#2C1E16]/60 font-light leading-relaxed mb-8 flex-grow text-sm">
                    Explore the magical events we have planned, from the Haldi morning to the Grand Reception.
                  </p>
                  <div className="text-[#8A252C] font-plus-jakarta text-xs tracking-[0.2em] uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
                    VIEW TIMELINE <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                  </div>
                </div>
              </Link>

              <Link href="/travel" className="group block">
                <div className="h-full bg-transparent border border-[#E8DCC4] p-10 flex flex-col items-center text-center transition-colors duration-500 hover:bg-[#F5EFE6]">
                  <div className="mb-8 text-[#8F4E00] transform transition-transform duration-500 group-hover:-translate-y-2">
                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 100" }}>flight_takeoff</span>
                  </div>
                  <h4 className="text-2xl font-noto-serif text-[#2C1E16] mb-4">Journey &amp; Stay</h4>
                  <p className="font-plus-jakarta text-[#2C1E16]/60 font-light leading-relaxed mb-8 flex-grow text-sm">
                    Find out how to reach Lalitpur and details regarding your stay during the celebration.
                  </p>
                  <div className="text-[#8A252C] font-plus-jakarta text-xs tracking-[0.2em] uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
                    GET DIRECTIONS <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                  </div>
                </div>
              </Link>

              <Link href="/rsvp" className="group block">
                <div className="h-full bg-transparent border border-[#E8DCC4] p-10 flex flex-col items-center text-center transition-colors duration-500 hover:bg-[#F5EFE6]">
                  <div className="mb-8 text-[#8F4E00] transform transition-transform duration-500 group-hover:-translate-y-2">
                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'wght' 100" }}>drafts</span>
                  </div>
                  <h4 className="text-2xl font-noto-serif text-[#2C1E16] mb-4">Your RSVP</h4>
                  <p className="font-plus-jakarta text-[#2C1E16]/60 font-light leading-relaxed mb-8 flex-grow text-sm">
                    Kindly let us know if you can join us. Please respond by {dates.rsvpDeadline}.
                  </p>
                  <div className="text-[#8A252C] font-plus-jakarta text-xs tracking-[0.2em] uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
                    CONFIRM PRESENCE <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
