"use client";

import { projects } from "../_lib/data";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function FeaturedProjects() {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-28 w-full bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase mb-3 block">
            Selected Projects
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Featured Work
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <div
                key={project.id}
                className={
                  index === 0 ||
                  (index === displayedProjects.length - 1 &&
                    displayedProjects.length % 2 === 0)
                    ? "md:col-span-2"
                    : ""
                }
              >
                <Link
                  href={`/projects/${project.id}`}
                  className={`group relative block rounded-sm bg-card border border-foreground/5 hover:border-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/5 overflow-hidden ${
                    index === 0 ? "p-8 md:p-10" : "p-6 md:p-8"
                  }`}
                >
                  <span className="absolute top-4 right-6 text-[80px] md:text-[120px] font-black leading-none text-foreground/[0.02] select-none pointer-events-none group-hover:text-primary/[0.05] transition-colors duration-300">
                    0{index + 1}
                  </span>

                  <div className="relative z-10">
                    <span className="inline-block text-xs font-medium text-primary/60 mb-4 tracking-widest uppercase">
                      Project 0{index + 1}
                    </span>

                    <h3
                      className={`font-bold mb-3 group-hover:text-primary transition-colors duration-150 ${
                        index === 0
                          ? "text-2xl md:text-3xl"
                          : "text-xl md:text-2xl"
                      }`}
                    >
                      {project.name}
                    </h3>

                    <p
                      className={`text-muted-foreground leading-relaxed mb-6 ${
                        index === 0 ? "text-base max-w-2xl" : "text-sm max-w-lg"
                      }`}
                    >
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2.5 py-1 rounded-sm bg-primary/8 text-primary/80 font-medium border border-primary/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="w-10 h-10 rounded-sm border border-foreground/10 flex items-center justify-center shrink-0 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-200">
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors duration-150" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* See More Button */}
        {projects.length > 3 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/10 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-pointer"
            >
              {showAll ? "Show Less" : `See More (${projects.length - 3})`}
              {showAll ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
