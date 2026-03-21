"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Travel', path: '/travel' },
    { name: 'RSVP', path: '/rsvp' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-lg border-b border-white/20 pr-6 pl-0 h-20 md:h-24 flex items-center justify-between shadow-sm">
      {/* Branding */}
      <Link href="/" className="z-50 relative hover:opacity-80 transition-opacity h-full aspect-square flex items-center justify-center overflow-hidden">
        <Image src="/logo.png" alt="Prabal & Shreya Logo" fill sizes="(max-width: 768px) 80px, 96px" className="object-contain mix-blend-multiply p-2 scale-130 transform-gpu" priority />
      </Link>
      
      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 font-sans text-sm tracking-widest uppercase text-text-muted">
        {links.map(link => {
          const isActive = pathname === link.path;
          return (
            <Link 
              key={link.name} 
              href={link.path} 
              className={`transition-colors ${isActive ? 'text-brand-gold font-bold scale-105 transform' : 'hover:text-text-main'}`}
            >
              {link.name}
              {isActive && (
                 <motion.div layoutId="navbar-indicator" className="h-[2px] w-full bg-brand-gold mt-1 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={toggleMenu} className="md:hidden text-text-main z-50 relative p-2 -mr-2" aria-label="Toggle Menu">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 w-full h-screen bg-[#FAF8F5]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {links.map(link => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  href={link.path} 
                  onClick={toggleMenu}
                  className={`font-serif text-4xl tracking-widest transition-colors flex flex-col items-center ${isActive ? 'text-brand-gold font-bold' : 'text-text-main hover:text-brand-sage'}`}
                >
                  {link.name}
                  {isActive && (
                     <motion.div layoutId="mobile-navbar-indicator" className="h-[2px] w-12 bg-brand-gold mt-3 rounded-full" />
                  )}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
