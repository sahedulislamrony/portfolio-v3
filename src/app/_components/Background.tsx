"use client";
import { motion } from "framer-motion";

export function Background() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-background overflow-hidden pointer-events-none">
      {/* Subtle Dot Grid with Radial Mask */}
      <div className="absolute inset-0 z-[1] opacity-40 dark:opacity-20 bg-[radial-gradient(#a1a1aa_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* Ambient Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] left-[20%] w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] z-0"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-[100px] z-0"
      />

      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[140px] z-0"
      />
    </div>
  );
}
