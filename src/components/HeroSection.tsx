"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { weddingConfig } from "@/config/weddingConfig";

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
    <div className="flex items-center gap-4 md:gap-8">
      {pairs.map(([label, val], i) => (
        <div key={label} className="flex items-center gap-4 md:gap-8">
          <div className="flex flex-col items-center">
            <span className="font-headline text-2xl md:text-3xl tabular-nums leading-none text-on-surface">
              {val.toString().padStart(2, "0")}
            </span>
            <span className="text-[8px] uppercase tracking-[0.25em] mt-2 font-label text-tertiary">
              {label}
            </span>
          </div>
          {i < 3 && (
            <span className="text-lg font-light -mt-3 text-outline-variant">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const { groom, bride, dates, location } = weddingConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <>
      {/* ═══ Hero Section — from stitch landing_page/code.html ═══ */}
      <section
        ref={sectionRef}
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-10" />
          <motion.div style={{ scale: bgScale }} className="absolute inset-0 will-change-transform">
            <Image
              src="/couple-hero-light.jpeg"
              alt={`${groom.firstName} & ${bride.firstName}`}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-60"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Save The Date pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6 py-1 px-4 rounded-full border border-outline-variant/15 text-secondary text-sm tracking-widest font-label uppercase"
          >
            Save The Date
          </motion.div>

          {/* Names */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-headline text-6xl md:text-8xl lg:text-9xl text-on-surface tracking-tighter mb-8 leading-none"
          >
            {groom.firstName} <span className="italic text-primary">&amp;</span> {bride.firstName}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-body text-xl md:text-2xl text-secondary mb-12 max-w-lg mx-auto leading-relaxed"
          >
            Join us as we begin our forever.
          </motion.p>

          {/* When / Where */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-10"
          >
            <div className="text-center">
              <span className="block text-sm font-label text-tertiary uppercase tracking-[0.2em] mb-2">When</span>
              <span className="block font-headline text-2xl text-on-surface">{dates.mainWeddingDate}</span>
            </div>
            <div className="w-px h-12 bg-outline-variant/30 hidden md:block" />
            <div className="text-center">
              <span className="block text-sm font-label text-tertiary uppercase tracking-[0.2em] mb-2">Where</span>
              <span className="block font-headline text-2xl text-on-surface">{location.city}</span>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mb-10"
          >
            <Countdown targetDate={dates.mainWeddingDate} />
          </motion.div>
        </div>
      </section>

      {/* ═══ Invitation Story — from stitch landing_page/code.html ═══ */}
      <section className="py-32 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left — Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden editorial-shadow">
              <Image
                src="/couple-hero-light.jpeg"
                alt={`${groom.firstName} & ${bride.firstName}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-surface-container-highest p-4 rounded-xl editorial-shadow hidden md:block">
              <Image
                src="/mandala.png"
                alt="Decorative mandala"
                width={160}
                height={160}
                className="w-full h-full object-cover rounded-lg opacity-80"
              />
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="lg:col-span-7 lg:pl-16"
          >
            <h2 className="font-headline text-4xl md:text-5xl text-on-surface mb-8 leading-tight">
              Together with our families, we invite you to celebrate our union.
            </h2>
            <div className="space-y-6 text-lg text-on-surface-variant max-w-xl">
              <p>
                It began as a quiet conversation and grew into a lifelong promise.
                We found in each other a companion, a best friend, and a partner for
                all our future adventures.
              </p>
              <p>
                As we take this sacred step in the historic city of Lalitpur, your
                presence would add to the joy of our celebrations. We look forward to
                creating memories that will be cherished for generations.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-4">
              <div className="h-px w-12 bg-primary" />
              <span className="font-headline italic text-xl text-primary font-bold">
                {groom.firstName} &amp; {bride.firstName}
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
