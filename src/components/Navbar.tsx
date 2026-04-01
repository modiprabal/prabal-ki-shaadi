"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Travel", path: "/travel" },
    { name: "RSVP", path: "/rsvp" },
  ];

  const getLinkClasses = (path: string) => {
    const isActive = pathname === path;
    const baseClasses = "transition-all duration-300 font-noto-serif text-lg tracking-wide hover:opacity-80";
    if (isActive) {
      return `${baseClasses} text-[#af101a] font-bold border-b-[3px] border-[#af101a] pb-1`;
    }
    return `${baseClasses} text-[#8f4e00] opacity-80`;
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 glass-nav bg-[#fff8ef]/80 shadow-[0_10px_30px_rgba(30,27,19,0.03)] border-b border-[#f5edde]">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-3 flex items-center justify-between">
          <Link href="/" className="z-50 relative focus:outline-none group">
            <div className="relative w-14 h-14 md:w-16 md:h-16 transform transition-transform duration-500 group-hover:scale-105">
              <div 
                  className="absolute inset-0 bg-[#af101a]"
                  style={{
                      WebkitMaskImage: "url(/logo-transparent.png)",
                      WebkitMaskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskImage: "url(/logo-transparent.png)",
                      maskSize: "contain",
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                  }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 lg:gap-14 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path} className={getLinkClasses(link.path)}>
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block z-50 relative">
            <Link href="/rsvp">
              <button 
                className="bg-[#af101a] text-[#ffffff] px-8 py-2.5 rounded-full font-plus-jakarta font-semibold tracking-wide hover:bg-[#930010] active:scale-95 transition-all duration-300 shadow-md"
              >
                RSVP Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 relative w-12 h-12 flex items-center justify-center text-[#af101a] active:scale-90 transition-transform focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
             <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'wght' 300" }}>
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay Menu */}
      <div 
        className={`fixed inset-0 bg-[#fff8ef] z-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-center items-center ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#8f4e00 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        <div className="flex flex-col items-center gap-8 relative z-10 w-full px-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-4xl font-noto-serif hover:text-[#af101a] transition-colors ${pathname === link.path ? "text-[#af101a] italic" : "text-[#1e1b13]"}`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${i * 50}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)'
              }}
            >
              {link.name}
            </Link>
          ))}
          
          <div 
            className="mt-8 pt-8 border-t border-[#af101a]/10 w-full flex justify-center"
            style={{
                transitionDelay: isMobileMenuOpen ? `${navLinks.length * 50}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)'
            }}
          >
              <Link href="/rsvp" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="bg-[#af101a] text-white px-12 py-4 rounded-full font-plus-jakarta font-semibold tracking-wider text-lg shadow-[0_10px_20px_rgba(175,16,26,0.3)] hover:bg-[#930010] active:scale-95 transition-all">
                  RSVP NOW
                </button>
              </Link>
          </div>
        </div>
      </div>
    </>
  );
}
