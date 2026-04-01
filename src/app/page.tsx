"use client";

import Link from "next/link";
import { weddingConfig } from "@/config/weddingConfig";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  const { groom, bride, dates, location } = weddingConfig;

  return (
    <>
      <main className="bg-[#FCFAF8] min-h-screen text-[#2C1E16] font-body relative selection:bg-[#E8DCC4] selection:text-[#8A252C]">
        
        {/* Global Delicate Grid Overlay for Minimalist framing */}
        <div className="fixed inset-0 pointer-events-none z-0 hidden lg:block">
          <div className="absolute left-12 top-0 bottom-0 w-px bg-[#E8DCC4]/50"></div>
          <div className="absolute right-12 top-0 bottom-0 w-px bg-[#E8DCC4]/50"></div>
          <div className="absolute top-12 left-0 right-0 h-px bg-[#E8DCC4]/50"></div>
          <div className="absolute bottom-12 left-0 right-0 h-px bg-[#E8DCC4]/50"></div>
        </div>

        {/* 1. MINIMALIST HERO SECTION */}
        <section 
          className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden z-10 pt-20"
          id="hero"
        >
          {/* Subtle line-art sunburst or mandala corner accents (Fixed positions) */}
          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="0" r="80" stroke="#8F4E00" strokeWidth="0.5"/>
              <circle cx="100" cy="0" r="90" stroke="#8F4E00" strokeWidth="0.5" strokeDasharray="2 4"/>
              <circle cx="100" cy="0" r="100" stroke="#8F4E00" strokeWidth="0.5"/>
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 p-8 opacity-20 pointer-events-none transform rotate-180">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="0" r="80" stroke="#8F4E00" strokeWidth="0.5"/>
              <circle cx="100" cy="0" r="90" stroke="#8F4E00" strokeWidth="0.5" strokeDasharray="2 4"/>
              <circle cx="100" cy="0" r="100" stroke="#8F4E00" strokeWidth="0.5"/>
            </svg>
          </div>

          <div className="relative text-center px-6 max-w-4xl mx-auto w-full flex flex-col items-center">
            
            {/* Minimalist Top Badge */}
            <div className="inline-block mb-10 pb-1 border-b border-[#E8DCC4] text-[#8F4E00] text-xs tracking-[0.4em] font-plus-jakarta uppercase">
              Save The Date
            </div>

            {/* Names (High Contrast Serif) */}
            <h1 className="font-noto-serif text-6xl md:text-8xl lg:text-[10rem] text-[#8A252C] tracking-tight mb-8 leading-[0.9] flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
              <span className="font-normal">{groom.firstName}</span>
              <span className="text-[#8F4E00] italic font-light text-5xl md:text-7xl lg:text-8xl weight-300">&amp;</span>
              <span className="font-normal">{bride.firstName}</span>
            </h1>

            <p className="font-noto-serif italic text-xl md:text-3xl text-[#2C1E16]/70 mb-16 max-w-2xl mx-auto leading-relaxed">
              Join us as we begin our forever.
            </p>

            {/* When & Where details in clean typography without heavy blocks */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24 relative">
              {/* Delicate vertical divider line for desktop */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#E8DCC4] -translate-x-1/2"></div>
              
              <div className="text-center md:pr-12 md:text-right">
                <span className="block text-xs font-plus-jakarta text-[#8F4E00] uppercase tracking-[0.3em] mb-3">When</span>
                <span className="block font-noto-serif text-2xl text-[#2C1E16]">{dates.mainWeddingDate}</span>
              </div>
              
              {/* Horizontal divider line for mobile */}
              <div className="md:hidden w-16 h-px bg-[#E8DCC4]"></div>
              
              <div className="text-center md:pl-12 md:text-left">
                <span className="block text-xs font-plus-jakarta text-[#8F4E00] uppercase tracking-[0.3em] mb-3">Where</span>
                <span className="block font-noto-serif text-2xl text-[#2C1E16]">{location.city}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Delicate divider */}
        <div className="flex justify-center py-10 opacity-60">
            <span className="material-symbols-outlined text-[#8A252C] text-sm" style={{ fontVariationSettings: "'wght' 100" }}>filter_vintage</span>
            <div className="w-16 mx-4 relative top-2 border-t border-[#E8DCC4]"></div>
            <span className="material-symbols-outlined text-[#8F4E00] text-sm" style={{ fontVariationSettings: "'wght' 100" }}>filter_vintage</span>
            <div className="w-16 mx-4 relative top-2 border-t border-[#E8DCC4]"></div>
             <span className="material-symbols-outlined text-[#8A252C] text-sm" style={{ fontVariationSettings: "'wght' 100" }}>filter_vintage</span>
        </div>

        {/* 2. INVITATION STORY SECTION (Minimalist Layout) */}
        <section className="py-24 px-6 md:px-12 relative z-10">
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Clean Arch-Framed Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Thin bordering frame offset */}
              <div className="absolute inset-0 border border-[#E8DCC4] rounded-t-full transform -translate-x-4 translate-y-4 -z-10"></div>
              
              <div className="aspect-[3/4] w-full max-w-sm rounded-[10rem] lg:rounded-t-[20rem] overflow-hidden bg-[#F5EFE6] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  alt="Couple Details" 
                  className="w-full h-full object-cover object-center grayscale-[0.2] contrast-[1.1]" 
                  src="/couple.jpg"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <h2 className="font-noto-serif text-4xl md:text-5xl text-[#8A252C] mb-8 leading-[1.2] tracking-tight">
                Together with our families, we invite you to celebrate our union.
              </h2>
              <div className="space-y-6 text-lg text-[#2C1E16]/80 font-plus-jakarta font-light leading-[1.8] max-w-xl">
                <p>It began as a quiet conversation and grew into a lifelong promise. We found in each other a companion, a best friend, and a partner for all our future adventures.</p>
                <p>As we take this sacred step in the historic city of {location.city.split(',')[0]}, your presence would add to the joy of our celebrations. We look forward to creating memories that will be cherished for generations.</p>
              </div>
              
              <div className="mt-16 flex items-center gap-6">
                <div className="h-px w-16 bg-[#E8DCC4]"></div>
                <span className="font-noto-serif italic text-3xl text-[#8F4E00] opacity-90">{groom.firstName} &amp; {bride.firstName}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. THE JOURNEY AWAITS - Clean Line-Art Navigation */}
        <section className="py-32 px-6 relative z-10 bg-[#FCFAF8]">
          <div className="max-w-screen-xl mx-auto border-t border-[#E8DCC4] pt-24">
            
            <div className="text-center mb-20">
              <span className="text-[#8F4E00] font-plus-jakarta text-xs uppercase tracking-[0.4em] block mb-4">Discover More</span>
              <h3 className="text-4xl md:text-5xl font-noto-serif text-[#8A252C] tracking-tight">The Celebration Details</h3>
            </div>

            {/* Clean Grid of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              
              {/* Events Card */}
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

              {/* Travel Card */}
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

              {/* RSVP Card */}
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
