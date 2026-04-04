"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Travel", path: "/travel" },
  { name: "RSVP", path: "/rsvp" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-700 ${
          scrolled ? "h-14 bg-background/90 backdrop-blur-xl border-b border-border/40" : "h-16 md:h-20 bg-transparent"
        }`}
      >
        {/* Logo — edge-bled on the left */}
        <Link href="/" className="relative z-50 -ml-6 md:-ml-10">
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20"
            style={{
              backgroundColor: "var(--accent)",
              maskImage: "url('/logo-transparent.png')",
              WebkitMaskImage: "url('/logo-transparent.png')",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center left",
              WebkitMaskPosition: "center left",
            }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        {/* Desktop nav — right aligned */}
        <div className="hidden md:flex items-center gap-10 ml-auto mr-6">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className="relative py-2 text-xs font-plus-jakarta font-medium uppercase tracking-[0.15em] transition-colors duration-300"
                style={{ color: active ? "var(--accent)" : "var(--highlight)" }}
              >
                {link.name}
                {active && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4 z-50 relative">
          <ThemeToggle />
          <Link href="/rsvp">
            <button className="bg-accent text-background px-8 py-2.5 rounded-full font-plus-jakarta font-semibold text-[10px] tracking-[0.2em] uppercase hover:opacity-90 active:scale-95 transition-all duration-300">
              RSVP Now
            </button>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-4 md:hidden z-50 relative">
          <ThemeToggle />
          <button
            className="p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="h-[1.5px] w-full origin-center bg-accent"
              />
              <motion.div
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="h-[1.5px] w-full bg-accent"
              />
              <motion.div
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="h-[1.5px] w-full origin-center bg-accent"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden bg-background"
          >
            {/* Subtle dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: "radial-gradient(var(--highlight) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
            />

            <div className="flex flex-col items-center gap-8 relative z-10 w-full px-8">
              {NAV_LINKS.map((link, i) => {
                const active = pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-noto-serif font-light text-4xl tracking-[0.05em] transition-colors duration-300 block text-center"
                      style={{ color: active ? "var(--accent)" : "var(--foreground)" }}
                    >
                      {link.name}
                      {active && (
                        <div className="w-8 h-[1px] mx-auto mt-3 bg-accent" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-8 pt-8 border-t border-border w-full flex justify-center"
              >
                <Link href="/rsvp" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="bg-accent text-background px-12 py-4 rounded-full font-plus-jakarta font-semibold tracking-wider text-lg hover:opacity-90 active:scale-95 transition-all">
                    RSVP NOW
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
