"use client";

import { personalInfo } from "../_lib/data";
import { motion } from "framer-motion";
import { Copy, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "../_utils/cn";
import { SiUpwork } from "react-icons/si";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // @ts-ignore
  const upworkUrl = personalInfo.socials.upwork || "https://www.upwork.com/";

  return (
    <section
      id="contact"
      className="py-24 w-full bg-background border-t border-border mt-auto"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-16 tracking-tighter text-center"
        >
          LET'S WORK TOGETHER
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group p-8 border border-border bg-card relative overflow-hidden flex flex-col justify-between h-full min-h-[300px]"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              <div className="mb-6 inline-block p-3 bg-secondary rounded-full">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Email Me</h3>
              <p className="text-muted-foreground mb-4">
                For project inquiries or just to say hello.
              </p>
            </div>

            <div className="relative z-10 w-full">
              <div className="flex items-center gap-2 p-3 border border-border bg-background mb-4">
                <span className="flex-1 text-sm font-mono truncate">
                  {personalInfo.email}
                </span>
                <button
                  onClick={copyEmail}
                  className="p-2 hover:bg-secondary transition-colors"
                  aria-label="Copy email"
                >
                  <Copy
                    className={cn(
                      "w-4 h-4 transition-all",
                      copied ? "text-green-500 scale-110" : "",
                    )}
                  />
                </button>
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-full py-3 bg-secondary text-secondary-foreground font-medium text-center border border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 block uppercase text-sm tracking-widest"
              >
                Send Email
              </a>
            </div>
          </motion.div>

          {/* Upwork Card - Highlighted */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group p-8 border border-primary/50 bg-card relative overflow-hidden flex flex-col justify-between h-full min-h-[300px]"
          >
            <div className="absolute inset-0 bg-[#14a800]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              <div className="mb-6 inline-flex bg-black rounded-full p-3">
                <SiUpwork className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Hire on Upwork</h3>
              <p className="text-muted-foreground mb-4">
                Secure contracts and detailed project tracking.
              </p>
            </div>

            <div className="relative z-10 w-full">
              <a
                href={upworkUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-[#14a800] text-white font-bold text-center hover:bg-[#14a800]/90 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.02]"
              >
                Visit Upwork Profile <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
