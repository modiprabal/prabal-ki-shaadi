"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

// Soft subtle pattern for Indian aesthetic
const bgPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b4d4c6' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

// Floating Golden Dust Particles
function GoldenDust() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
       {[...Array(30)].map((_, i) => (
         <motion.div
           key={i}
           className="absolute w-1.5 h-1.5 bg-brand-gold rounded-full blur-[1px]"
           initial={{
             left: `${Math.random() * 100}vw`,
             top: `${100 + Math.random() * 20}vh`,
             opacity: 0,
             scale: Math.random() * 0.5 + 0.5
           }}
           animate={{
             top: `${-10 - Math.random() * 20}vh`,
             opacity: [0, Math.random() * 0.5 + 0.3, 0],
             x: [0, (Math.random() - 0.5) * 150]
           }}
           transition={{
             duration: Math.random() * 10 + 15,
             repeat: Infinity,
             ease: "linear",
             delay: Math.random() * 10
           }}
         />
       ))}
    </div>
  );
}

// Live Countdown Timer
function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(`${targetDate} 00:00:00`).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) return <div className="h-24 md:h-32" />;

  return (
    <div className="flex gap-4 md:gap-8 justify-center mt-10 w-full px-4">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds }
      ].map((item, idx) => (
        <motion.div 
          key={idx} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 + (idx * 0.15), ease: "easeOut" }}
          className="flex flex-col items-center bg-white/60 border border-brand-sage/40 p-4 md:p-6 rounded-3xl min-w-[75px] md:min-w-[100px] backdrop-blur-md shadow-sm relative overflow-hidden group hover:border-brand-gold/50 transition-colors duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/0 to-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="text-3xl md:text-5xl font-serif text-text-main mb-2 tabular-nums relative z-10">{item.value.toString().padStart(2, '0')}</span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-brand-emerald font-bold relative z-10">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const { groom, bride, dates, location } = weddingConfig;

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FAF8F5] selection:bg-brand-sage/40">
      
      {/* Background Indian Motif Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-60 mix-blend-multiply"
        style={{ backgroundImage: bgPattern, backgroundSize: '60px' }}
      ></div>

      {/* Massive Slowly Rotating Mandala Ring */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[90vw] md:h-[90vw] opacity-[0.03] pointer-events-none z-0 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="w-full h-full text-brand-emerald"
        >
          <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="250" cy="250" r="240" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10"/>
            <circle cx="250" cy="250" r="220" stroke="currentColor" strokeWidth="1" />
            <path d="M250 10 C300 100, 400 150, 490 250 C400 350, 300 400, 250 490 C200 400, 100 350, 10 250 C100 150, 200 100, 250 10 Z" stroke="currentColor" strokeWidth="2" />
            <path d="M250 50 C280 120, 350 150, 450 250 C350 350, 280 380, 250 450 C220 380, 150 350, 50 250 C150 150, 220 120, 250 50 Z" stroke="currentColor" strokeWidth="1" />
          </svg>
        </motion.div>
      </div>

      {/* Floating Golden Dust */}
      <GoldenDust />

      {/* Massive Soft Glowing Orbs */}
      <motion.div 
        animate={{ opacity: [0.5, 0.7, 0.5], scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(253,236,226,1)_0%,transparent_70%)] pointer-events-none z-0 mix-blend-multiply"
      />
      <motion.div 
        animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(244,232,209,1)_0%,transparent_70%)] pointer-events-none z-0 mix-blend-multiply"
      />

      {/* Main Glassmorphism Content Card */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 bg-white/30 backdrop-blur-2xl border border-white/60 rounded-[3rem] p-10 md:p-20 flex flex-col items-center text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] max-w-5xl mx-4 w-full mt-20 group hover:bg-white/50 transition-colors duration-700"
      >
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-brand-emerald uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-10 flex items-center gap-3"
        >
          <Sparkles className="w-4 h-4 text-brand-gold" />
          You are warmly invited to the wedding of
          <Sparkles className="w-4 h-4 text-brand-gold" />
        </motion.p>
        
        {/* Names Layout - Protected against wrapping but spans elegantly */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-10 w-full mb-10">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
            className="font-serif text-[4.5rem] sm:text-7xl md:text-8xl lg:text-[7rem] text-text-main whitespace-nowrap drop-shadow-sm"
          >
            {groom.firstName}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0, rotate: -45 }} 
            animate={{ opacity: 1, scale: 1, rotate: 0 }} 
            transition={{ duration: 1, delay: 1.5, type: "spring", stiffness: 100 }}
            className="text-brand-gold text-5xl md:text-7xl font-light italic"
          >
            &
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
            className="font-serif text-[4.5rem] sm:text-7xl md:text-8xl lg:text-[7rem] text-text-main whitespace-nowrap drop-shadow-sm"
          >
            {bride.firstName}
          </motion.h1>
        </div>

        {/* Elegant Soft Golden Divider */}
        <motion.div 
          initial={{ scaleX: 0 }} 
          animate={{ scaleX: 1 }} 
          transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
          className="w-full max-w-[250px] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent mb-10"
        />

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, delay: 2.2 }}
          className="text-text-main text-lg md:text-xl tracking-[0.2em] uppercase leading-loose"
        >
          {dates.mainWeddingDate} <br/> 
          <span className="text-sm tracking-widest text-brand-emerald mt-3 block font-bold">{location.city}</span>
        </motion.div>

        {/* Live Countdown */}
        <CountdownTimer targetDate={dates.mainWeddingDate} />

      </motion.div>
    </section>
  );
}
