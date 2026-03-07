"use client";

import { experiences } from "../_lib/data";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-28 w-full bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase mb-3 block">
            Where I&apos;ve worked
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Experience
          </h2>
        </motion.div>

        {/* Experience Cards */}
        <div className="max-w-5xl flex flex-col gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-sm bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Top accent gradient line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              {/* Bottom border */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/5 group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-primary/30 group-hover:to-transparent transition-all duration-500" />
              {/* Side borders */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/5 group-hover:bg-primary/10 transition-colors duration-500" />
              <div className="absolute right-0 top-0 bottom-0 w-px bg-foreground/5 group-hover:bg-primary/10 transition-colors duration-500" />

              {/* Watermark company name */}
              <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-[5rem] md:text-[7rem] font-black text-foreground/[0.02] group-hover:text-primary/[0.04] select-none pointer-events-none transition-colors duration-500 leading-none tracking-tighter whitespace-nowrap">
                {(() => {
                  const n = exp.company.split(" ")[0];
                  return n === "CV" ? "CVLabz" : n;
                })()}
              </div>

              {/* Content */}
              <div className="relative p-6 md:p-8">
                {/* Top Row: Role + Meta */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-6 mb-5">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <p className="text-primary/80 font-semibold text-base mt-1">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground bg-foreground/5 px-3 py-1.5 rounded-full border border-foreground/5">
                      <Calendar className="w-3.5 h-3.5 opacity-60" />
                      {exp.duration}
                    </span>
                    {/* @ts-ignore */}
                    {exp.location && (
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground bg-foreground/5 px-3 py-1.5 rounded-full border border-foreground/5">
                        <MapPin className="w-3.5 h-3.5 opacity-60" />
                        {/* @ts-ignore */}
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base mb-6 max-w-3xl">
                  {exp.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-full bg-primary/5 text-primary/90 text-xs font-medium border border-primary/10 group-hover:border-primary/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
