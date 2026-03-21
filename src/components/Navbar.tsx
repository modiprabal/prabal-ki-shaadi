"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuthStore();

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Travel', path: '/travel' },
    { name: 'RSVP', path: '/rsvp' },
  ];

  if (isAuthenticated) {
    links.push({ name: 'Dashboard', path: '/dashboard' });
  } else {
    links.push({ name: 'Member Login', path: '/login' });
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-lg border-b border-white/20 pr-6 pl-0 h-20 md:h-24 flex items-center justify-between shadow-sm">
      {/* Branding */}
      <Link href="/" className="z-50 relative hover:opacity-80 transition-opacity h-full aspect-square flex items-center justify-center overflow-hidden">
        <Image src="/logo.png" alt="Prabal & Shreya Logo" fill sizes="(max-width: 768px) 80px, 96px" className="object-contain mix-blend-multiply p-2 scale-130 transform-gpu" priority />
      </Link>
      
      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-text-muted">
        {links.map(link => {
          const isActive = pathname === link.path;
          return (
            <Link 
              key={link.name} 
              href={link.path} 
              className={`transition-all relative py-2 ${isActive ? 'text-brand-gold' : 'hover:text-text-main'}`}
            >
              {link.name}
              {isActive && (
                 <motion.div layoutId="navbar-indicator" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-gold rounded-full" />
              )}
            </Link>
          );
        })}
        {isAuthenticated && (
          <button 
            onClick={() => logout()}
            className="bg-brand-peach/30 border border-brand-gold/20 px-4 py-2 rounded-full text-brand-gold hover:bg-brand-peach/50 transition-colors"
          >
            Logout
          </button>
        )}
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
                  className={`font-serif text-4xl tracking-widest transition-colors flex flex-col items-center ${isActive ? 'text-brand-gold font-bold underline underline-offset-8' : 'text-text-main hover:text-brand-sage'}`}
                >
                  {link.name}
                </Link>
              );
            })}
            {isAuthenticated && (
              <button 
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="font-serif text-2xl text-brand-gold border-2 border-brand-gold px-8 py-3 rounded-full hover:bg-brand-gold hover:text-white transition-all uppercase tracking-widest"
              >
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
