"use client";

import { education } from "../_lib/data";
import { motion } from "framer-motion";

export function EducationSection() {
  return (
    <section id="education" className="py-28 w-full bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase mb-3 block">
            Academic Background
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Education
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="group rounded-sm bg-card border border-foreground/5 p-6 md:p-7 hover:border-primary/20 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 flex flex-col justify-between"
            >
              {/* Top: Duration */}
              <div className="flex items-center gap-2 mb-5">
                <svg
                  className="w-4 h-4 text-primary/60"
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
                <span className="text-sm font-medium text-muted-foreground">
                  {edu.duration}
                </span>
              </div>

              {/* Middle: Degree & School */}
              <div className="flex-1 mb-5">
                <h3 className="text-xl font-bold mb-2 leading-snug group-hover:text-primary transition-colors duration-150">
                  {edu.degree}
                </h3>
                <p className="text-base text-muted-foreground">{edu.school}</p>
              </div>

              {/* Bottom: Grade */}
              {/* @ts-ignore */}
              {edu.grade && (
                <div className="flex items-center gap-2 pt-4 border-t border-foreground/5">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  {/* @ts-ignore */}
                  <span className="text-sm font-semibold text-primary">
                    {edu.grade}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
