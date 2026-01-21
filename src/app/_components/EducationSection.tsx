"use client";

import { education } from "../_lib/data";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../_utils/cn";

export function EducationSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="education"
      className="py-24 w-full bg-background border-t border-border"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 tracking-tighter"
        >
          EDUCATION
        </motion.h2>

        <div className="flex flex-col max-w-4xl">
          {education.map((edu, index) => {
            const isActive =
              (hoveredIndex === null && index === 0) || hoveredIndex === index;

            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-l-2 border-border pl-8 relative group pb-12 last:pb-0"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={cn(
                    "absolute -left-[9px] top-0 w-4 h-4 border-2 border-primary transition-colors duration-300 rounded-none transform rotate-45",
                    isActive ? "bg-primary" : "bg-background",
                  )}
                />

                <div className="mb-2 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <h3 className="text-2xl font-bold">{edu.degree}</h3>
                </div>

                <p className="text-xl text-muted-foreground font-medium mb-3">
                  {edu.school}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 text-sm font-mono text-muted-foreground uppercase tracking-wider">
                  <span>{edu.duration}</span>
                  {/* @ts-ignore */}
                  {edu.grade && (
                    <>
                      <span className="hidden sm:inline">·</span>
                      {/* @ts-ignore */}
                      <span>{edu.grade}</span>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
