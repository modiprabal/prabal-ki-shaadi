"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 transition-all duration-700 ${
        scrolled ? "h-14 bg-[#0a0a0c]/90 backdrop-blur-xl" : "h-16 md:h-20 bg-transparent"
      }`}
    >
      {/* Monogram */}
      <Link href="/" className="relative z-50">
        <motion.span
          className="font-display font-light text-xl tracking-[0.15em]"
          style={{ color: "#b8965a" }}
          whileHover={{ opacity: 0.7 }}
        >
          P&S
        </motion.span>
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-10">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            onClick={(e) => handleNavClick(e, link)}
            className="relative py-2 text-[10px] font-sans font-medium uppercase tracking-[0.2em] transition-colors duration-300"
            style={{ color: isActive(link) ? "#b8965a" : "rgba(245,240,232,0.35)" }}
          >
            <span className="hover:text-cream-muted transition-colors duration-300">
              {link.name}
            </span>
            {isActive(link) && (
              <motion.div
                layoutId="nav-dot"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ background: "#b8965a" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        ))}

      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative z-50 p-2"
        aria-label="Menu"
      >
        <div className="flex flex-col gap-1.5 w-6">
          <motion.div
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-[1.5px] w-full origin-center"
            style={{ background: "#b8965a" }}
          />
          <motion.div
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="h-[1.5px] w-full"
            style={{ background: "#b8965a" }}
          />
          <motion.div
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-[1.5px] w-full origin-center"
            style={{ background: "#b8965a" }}
          />
        </div>
      </button>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="fixed top-0 right-0 z-40 w-72 h-full flex flex-col pt-24 px-8 gap-8 md:hidden"
              style={{ background: "#0d0d10" }}
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link)}
                    className="font-display font-light text-2xl tracking-[0.1em] transition-colors duration-300 block"
                    style={{ color: isActive(link) ? "#b8965a" : "rgba(245,240,232,0.4)" }}
                  >
                    {link.name}
                    {isActive(link) && (
                      <div className="w-6 h-[1px] mt-2" style={{ background: "#b8965a" }} />
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
