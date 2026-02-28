"use client";

import { experiences } from "../_lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<number>(experiences[0]?.id);

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

        {/* Accordion Cards */}
        <div className="max-w-4xl flex flex-col gap-4">
          {experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;

            return (
              <div
                key={exp.id}
                className={`rounded-sm border overflow-hidden transition-all duration-200 ${
                  isExpanded
                    ? "border-primary/25 bg-card shadow-lg shadow-primary/5"
                    : "border-foreground/5 bg-card hover:border-foreground/10"
                }`}
              >
                {/* Header - always visible */}
                <button
                  onClick={() => setExpandedId(isExpanded ? -1 : exp.id)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                      {/* Active dot */}
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-150 ${
                          isExpanded ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                      />
                      <h3 className="text-lg font-bold">{exp.role}</h3>
                      <span className="text-primary font-medium text-sm">
                        @ {exp.company}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden md:block text-xs text-muted-foreground font-medium">
                      {exp.duration}
                    </span>
                    <motion.svg
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-4 h-4 text-muted-foreground shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </div>
                </button>

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-6 pt-0">
                        {/* Divider */}
                        <div className="w-full h-px bg-foreground/5 mb-5" />

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5 md:hidden">
                            <svg
                              className="w-3.5 h-3.5 opacity-50"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {exp.duration}
                          </span>
                          {/* @ts-ignore */}
                          {exp.location && (
                            <span className="flex items-center gap-1.5">
                              <svg
                                className="w-3.5 h-3.5 opacity-50"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              {/* @ts-ignore */}
                              {exp.location}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed mb-5 text-[15px]">
                          {exp.description}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-sm bg-primary/8 text-primary/90 text-xs font-medium border border-primary/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
