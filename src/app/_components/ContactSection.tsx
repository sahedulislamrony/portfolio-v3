"use client";

import { personalInfo } from "../_lib/data";
import { motion } from "framer-motion";
import { Copy, Mail, ArrowUpRight } from "lucide-react";
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
    <section id="contact" className="py-28 w-full bg-background mt-auto">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header - centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase mb-3 block">
            Get in touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Have a project in mind or want to collaborate? I&apos;m always open
            to discussing new ideas and opportunities.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {/* Email Card */}
          <div className="group rounded-sm bg-card border border-foreground/5 hover:border-primary/20 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 p-7 flex flex-col">
            <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-5">
              <Mail className="w-5 h-5 text-primary" />
            </div>

            <h3 className="text-xl font-bold mb-1.5">Email Me</h3>
            <p className="text-sm text-muted-foreground mb-6">
              For project inquiries or just to say hello.
            </p>

            {/* Email display + copy */}
            <div className="flex items-center gap-2 p-3 rounded-sm bg-foreground/[0.03] border border-foreground/5 mb-4">
              <span className="flex-1 text-sm font-mono truncate text-muted-foreground">
                {personalInfo.email}
              </span>
              <button
                onClick={copyEmail}
                className="p-1.5 rounded-sm hover:bg-foreground/5 transition-colors cursor-pointer"
                aria-label="Copy email"
              >
                <Copy
                  className={cn(
                    "w-3.5 h-3.5 transition-all",
                    copied
                      ? "text-green-500 scale-110"
                      : "text-muted-foreground",
                  )}
                />
              </button>
            </div>

            <a
              href={`mailto:${personalInfo.email}`}
              className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-sm bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity duration-150"
            >
              Send Email
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Upwork Card */}
          <div className="group rounded-sm bg-card border border-foreground/5 hover:border-[#14a800]/30 transition-all duration-200 hover:shadow-lg hover:shadow-[#14a800]/5 p-7 flex flex-col">
            <div className="w-12 h-12 rounded-sm bg-[#14a800]/10 flex items-center justify-center mb-5">
              <SiUpwork className="w-6 h-6 text-[#14a800]" />
            </div>

            <h3 className="text-xl font-bold mb-1.5">Hire on Upwork</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Secure contracts and detailed project tracking.
            </p>

            {/* Stats or trust signals */}
            <div className="flex items-center gap-4 mb-6 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#14a800]" />
                <span className="text-muted-foreground">Available Now</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#14a800] font-bold">100%</span>
                <span className="text-muted-foreground">Job Success</span>
              </div>
            </div>

            <a
              href={upworkUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-sm bg-[#14a800] text-white font-semibold text-sm hover:opacity-90 transition-opacity duration-150"
            >
              Visit Upwork Profile
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
