"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Download, ArrowRight } from "lucide-react";
import { Background } from "./Background";
import { personalInfo } from "../_lib/data";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-background">
      <Background />

      {/* Gradient mesh background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/8 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px]" />
      </div>

      {/* Main content */}
      <div className="z-10 container mx-auto px-6 md:px-12 lg:px-20 relative flex flex-col items-start justify-center pt-32 pb-52 md:pb-40">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-primary tracking-wide">
              Available for new projects
            </span>
          </div>
        </motion.div>

        {/* Name & Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl space-y-6"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground font-medium"
          >
            Hi, I&apos;m
          </motion.p>

          {/* Name with gradient */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-primary">
              {personalInfo.name.split(" ").slice(0, -1).join(" ")}
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/50">
              {personalInfo.name.split(" ").slice(-1)}
            </span>
          </h1>

          {/* Animated Role */}
          <div className="flex items-center gap-4 mt-2">
            <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-transparent" />
            <TypewriterText text={personalInfo.title} />
          </div>

          {/* Short bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-base md:text-lg text-muted-foreground/80 max-w-xl leading-relaxed"
          >
            {personalInfo.about}
          </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-start gap-4 mt-12"
        >
          <a
            href="/resume.pdf"
            download="Sahedul_Islam_Resume.pdf"
            className="group relative px-8 py-4 rounded-full bg-primary text-background font-semibold text-base overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            <span className="relative flex items-center gap-2">
              Download Resume
              <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </span>
          </a>
          <Link
            href="#projects"
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-transparent text-foreground font-semibold text-base border border-foreground/20 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300 backdrop-blur-sm"
          >
            View Selected Work
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-32 right-12 hidden md:flex flex-col items-center gap-3 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            className="w-5 h-5 text-muted-foreground/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/40 [writing-mode:vertical-lr]">
          Scroll
        </span>
      </motion.div>

      {/* Counter Section */}
      <div className="absolute bottom-0 left-0 w-full bg-background/60 backdrop-blur-xl border-t border-foreground/5 z-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-5 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12">
            <CounterItem value={20} label="Happy Clients" suffix="+" />
            <CounterItem value={120} label="Projects Completed" suffix="+" />
            <CounterItem value={5} label="Years Experience" suffix="+" />
            <CounterItem value={100} label="Satisfaction Rate" suffix="%" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Typewriter component
function TypewriterText({ text }: { text: string }) {
  const characters = Array.from(text);

  return (
    <h2 className="text-lg md:text-xl text-muted-foreground/80 font-light tracking-wide">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.08, delay: index * 0.04 + 0.5 }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
      />
    </h2>
  );
}

function CounterItem({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: 2,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsub = springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return unsub;
  }, [springValue]);

  return (
    <div ref={ref} className="flex flex-col items-start group cursor-default">
      <div className="flex items-baseline gap-0.5 mb-1">
        <span className="text-2xl md:text-4xl font-bold font-mono text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
          {displayValue}
        </span>
        <span className="text-xl md:text-3xl font-bold text-primary/70 group-hover:text-primary transition-colors duration-300">
          {suffix}
        </span>
      </div>
      <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-300">
        {label}
      </span>
    </div>
  );
}
