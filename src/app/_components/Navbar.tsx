"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { personalInfo } from "../_lib/data";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-white/5"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter hover:text-primary transition-colors hover:scale-105 transform duration-200"
        >
          SR.
        </Link>

        <nav className="flex items-center gap-10">
          <div className="hidden md:flex gap-8">
            {["Experience", "Projects", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all uppercase tracking-widest hover:tracking-[0.2em] duration-300"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="pl-6 border-l border-white/10">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
