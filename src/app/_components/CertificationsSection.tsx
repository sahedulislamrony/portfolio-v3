"use client";

import { certifications } from "../_lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

export function CertificationsSection() {
  const [expanded, setExpanded] = useState(false);

  // Show first 3 initially
  const displayedCerts = expanded ? certifications : certifications.slice(0, 3);

  return (
    <section
      id="certifications"
      className="py-24 w-full bg-background border-t border-border"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 tracking-tighter"
        >
          LICENSES & CERTIFICATIONS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayedCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border border-border p-6 hover:border-primary transition-colors bg-card group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {cert.name}
                  </h3>
                  <p className="text-muted-foreground mb-1 font-medium">
                    {cert.issuer}
                  </p>
                  <p className="text-sm text-muted-foreground/60 mb-4 font-mono uppercase tracking-wider">
                    Issued {cert.issued}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <a
                    href={cert.link}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
                  >
                    Show Credential <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {certifications.length > 3 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 px-8 py-3 border border-input hover:bg-secondary hover:text-secondary-foreground transition-all uppercase tracking-widest font-bold text-sm"
            >
              {expanded ? "Show Less" : "Show More"}
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
