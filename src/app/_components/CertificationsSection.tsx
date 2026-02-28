"use client";

import { certifications } from "../_lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Award } from "lucide-react";

export function CertificationsSection() {
  const [expanded, setExpanded] = useState(false);
  const displayedCerts = expanded ? certifications : certifications.slice(0, 6);

  return (
    <section id="certifications" className="py-28 w-full bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase mb-3 block">
            Credentials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Certifications
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {displayedCerts.map((cert, index) => (
              <div
                key={cert.id}
                className="group rounded-sm bg-card border border-foreground/5 p-5 hover:border-primary/20 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 flex flex-col"
              >
                {/* Top row: icon + issuer + date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {cert.issuer}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground/50">
                    {cert.issued}
                  </span>
                </div>

                {/* Cert name */}
                <h3 className="text-base font-bold mb-4 leading-snug group-hover:text-primary transition-colors duration-150 flex-1">
                  {cert.name}
                </h3>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-0.5 rounded-sm bg-foreground/5 text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 4 && (
                    <span className="text-xs px-2 py-0.5 rounded-sm bg-primary/8 text-primary/70">
                      +{cert.skills.length - 4}
                    </span>
                  )}
                </div>

                {/* Link */}
                <a
                  href={cert.link}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors duration-150 mt-auto"
                >
                  View Credential
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Less */}
        {certifications.length > 6 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/10 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-pointer"
            >
              {expanded ? "Show Less" : `Show All (${certifications.length})`}
              {expanded ? (
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
