"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: 'Events', path: '/events' },
    { name: 'Travel', path: '/travel' },
    { name: 'RSVP', path: '/rsvp' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-lg border-b border-white/20 px-6 py-5 flex items-center justify-between shadow-sm">
      <Link href="/" className="font-serif text-2xl font-bold tracking-widest text-text-main z-50 relative">
        P <span className="text-brand-sage">&</span> S
      </Link>
      
      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 font-sans text-sm tracking-widest uppercase text-text-muted">
        {links.map(link => (
          <Link key={link.name} href={link.path} className="hover:text-text-main transition-colors">{link.name}</Link>
        ))}
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
            className="absolute top-0 left-0 w-full h-screen bg-brand-peach/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {links.map(link => (
              <Link 
                key={link.name} 
                href={link.path} 
                onClick={toggleMenu}
                className="font-serif text-4xl text-text-main tracking-widest hover:text-brand-sage transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
