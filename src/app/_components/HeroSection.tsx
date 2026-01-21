"use client";

import { motion } from "framer-motion";
import { Background } from "./Background";
import { personalInfo } from "../_lib/data";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <Background />

      <div className="z-10 container mx-auto px-4 relative flex flex-col items-start justify-center h-full pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl pointer-events-auto"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 text-primary">
            {personalInfo.name}
          </h1>
          <h2 className="text-2xl md:text-4xl text-muted-foreground font-light mb-8">
            {personalInfo.title}
          </h2>
          <p className="text-lg md:text-xl max-w-2xl text-muted-foreground mb-10 leading-relaxed">
            {personalInfo.about}
          </p>

          <div className="flex gap-4">
            <Link
              href="#contact"
              className="px-8 py-3 bg-primary text-primary-foreground font-medium text-lg border border-primary hover:bg-transparent hover:text-primary transition-all duration-300 rounded-none transform active:scale-95"
            >
              Contact Me
            </Link>
            <Link
              href="#projects"
              className="px-8 py-3 bg-transparent text-primary font-medium text-lg border border-input hover:border-primary hover:bg-accent hover:text-accent-foreground transition-all duration-300 rounded-none"
            >
              View Work
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-0 w-full flex justify-center animate-bounce pointer-events-none">
        <span className="text-muted-foreground text-sm tracking-widest uppercase">
          Scroll Down
        </span>
      </div>
    </section>
  );
}
