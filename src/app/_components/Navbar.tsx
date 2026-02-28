"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = ["Experience", "Projects", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.toLowerCase());
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
        { rootMargin: "-40% 0px -55% 0px" },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-2xl shadow-lg shadow-black/5 border border-foreground/10 rounded-md"
            : "bg-transparent border border-transparent"
        }`}
      >
        <div className="px-6 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-1">
            <span className="text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
              SR
            </span>
            <span className="text-xl font-black text-primary">.</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * (i + 1) }}
                >
                  <Link
                    href={`/#${item.toLowerCase()}`}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-sm hover:bg-foreground/5 group ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item}
                    <span
                      className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] bg-primary rounded-full transition-all duration-300 ${
                        isActive ? "w-4" : "w-0 group-hover:w-4"
                      }`}
                    />
                  </Link>
                </motion.div>
              );
            })}

            {/* Divider */}
            <div className="w-px h-5 bg-foreground/10 mx-2" />

            {/* Theme Toggle */}
            <ThemeToggle />
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-9 h-9 flex items-center justify-center rounded-sm hover:bg-foreground/5 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col items-end gap-1.5">
                <motion.span
                  animate={
                    mobileOpen
                      ? { rotate: 45, y: 5, width: 18 }
                      : { rotate: 0, y: 0, width: 18 }
                  }
                  className="block h-[2px] bg-foreground rounded-full origin-center"
                  style={{ width: 18 }}
                />
                <motion.span
                  animate={
                    mobileOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }
                  }
                  className="block h-[2px] bg-foreground rounded-full"
                  style={{ width: 12 }}
                />
                <motion.span
                  animate={
                    mobileOpen
                      ? { rotate: -45, y: -7, width: 18 }
                      : { rotate: 0, y: 0, width: 18 }
                  }
                  className="block h-[2px] bg-foreground rounded-full origin-center"
                  style={{ width: 18 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={
          mobileOpen
            ? { opacity: 1, pointerEvents: "auto" as const }
            : { opacity: 0, pointerEvents: "none" as const }
        }
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-background/90 backdrop-blur-xl md:hidden"
        onClick={() => setMobileOpen(false)}
      >
        <motion.nav
          initial={false}
          animate={mobileOpen ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center h-full gap-8"
          onClick={(e) => e.stopPropagation()}
        >
          {navItems.map((item, i) => (
            <motion.div
              key={item}
              initial={false}
              animate={
                mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.3,
                delay: mobileOpen ? 0.1 * (i + 1) : 0,
              }}
            >
              <Link
                href={`/#${item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className={`text-3xl font-bold transition-colors duration-200 ${
                  activeSection === item.toLowerCase()
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </motion.div>
    </>
  );
}
