"use client";

import { projects } from "../_lib/data";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="py-24 w-full bg-background border-t border-border"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 tracking-tighter text-right md:text-left"
        >
          FEATURED WORK
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group border border-border bg-card p-6 hover:border-primary transition-colors duration-300 flex flex-col justify-between h-[400px]"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl font-bold text-muted/20 group-hover:text-primary/20 transition-colors">
                    0{index + 1}
                  </span>
                  <Link
                    href={`/projects/${project.id}`}
                    className="p-2 border border-border rounded-full hover:bg-primary hover:text-primary-foreground transition-colors group-hover:border-primary"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono uppercase text-muted-foreground bg-secondary px-2 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs font-mono uppercase text-muted-foreground bg-secondary px-2 py-1">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-transparent hover:border-primary pb-1 transition-all"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
