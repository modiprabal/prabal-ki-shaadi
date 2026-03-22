"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const SECTIONS = [
  { name: "Home", path: "/", sectionId: "home" },
  { name: "Events", path: "/events", sectionId: "events" },
  { name: "Travel", path: "/travel", sectionId: "venue" },
  { name: "RSVP", path: "/rsvp", sectionId: "rsvp-section" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();

  // Scroll opacity + scroll spy
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver scroll spy (only on homepage)
  useEffect(() => {
    if (!isHome) return;

    const sectionIds = SECTIONS.map((s) => s.sectionId);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHome, pathname]);

  const links = [
    { name: "Home", path: "/", sectionId: "home" },
    { name: "Events", path: "/events", sectionId: "events" },
    { name: "Travel", path: "/travel", sectionId: "venue" },
    { name: "RSVP", path: "/rsvp", sectionId: "rsvp-section" },
  ];

  const handleNavClick = (e: React.MouseEvent, link: typeof links[0]) => {
    // On homepage, scroll to section instead of navigating
    if (isHome && link.sectionId) {
      e.preventDefault();
      const el = document.getElementById(link.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setIsOpen(false);
    }
  };

  const isActive = (link: typeof links[0]) => {
    if (isHome && link.sectionId) {
      return activeSection === link.sectionId;
    }
    return pathname === link.path;
  };

  return (
    <>
      <nav
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-700 ${
        scrolled ? "h-14 backdrop-blur-xl" : "h-16 md:h-20 bg-transparent"
      }`}
      style={{
        background: scrolled ? "color-mix(in srgb, var(--theme-bg) 90%, transparent)" : "transparent",
      }}
    >
      {/* Logo */}
      <Link href="/" className="relative z-50 -ml-6 md:-ml-10">
        <motion.div
          className="w-16 h-16 md:w-20 md:h-16"
          style={{
            backgroundColor: "var(--theme-accent)",
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
        />
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-10">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            onClick={(e) => handleNavClick(e, link)}
            className="relative py-2 text-[10px] font-sans font-medium uppercase tracking-[0.2em] transition-colors duration-300"
            style={{ color: isActive(link) ? "var(--theme-accent)" : "var(--theme-accent-nav)" }}
          >
            <span className="hover:text-cream-muted transition-colors duration-300">
              {link.name}
            </span>
            {isActive(link) && (
              <motion.div
                layoutId="nav-dot"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ background: "var(--theme-accent)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        ))}

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full transition-all duration-300 hover:opacity-70"
          aria-label="Toggle theme"
          style={{ color: "var(--theme-accent)" }}
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile: toggle + hamburger */}
      <div className="md:hidden flex items-center gap-3 relative z-50">
        {/* Theme toggle (mobile) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full transition-all duration-300"
          aria-label="Toggle theme"
          style={{ color: "var(--theme-accent)" }}
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2"
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <motion.div
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="h-[1.5px] w-full origin-center"
              style={{ background: "var(--theme-accent)" }}
            />
            <motion.div
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-[1.5px] w-full"
              style={{ background: "var(--theme-accent)" }}
            />
            <motion.div
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="h-[1.5px] w-full origin-center"
              style={{ background: "var(--theme-accent)" }}
            />
          </div>
        </button>
      </div>

      </nav>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden"
              style={{ backgroundColor: "var(--theme-bg)" }}
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link)}
                    className="font-display font-light text-3xl tracking-[0.1em] transition-colors duration-300 block text-center"
                    style={{ color: isActive(link) ? "var(--theme-accent)" : "var(--theme-accent-nav)" }}
                  >
                    {link.name}
                    {isActive(link) && (
                      <div className="w-8 h-[1px] mx-auto mt-3" style={{ background: "var(--theme-accent)" }} />
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
