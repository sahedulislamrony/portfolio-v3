"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaCogs, FaChartLine, FaGlobeAmericas } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiC,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiFirebase,
  SiSupabase,
  SiGit,
  SiGithub,
  SiVercel,
  SiNetlify,
  SiDigitalocean,
  SiHeroku,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { cn } from "../_utils/cn";

const categories = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "C", icon: SiC, color: "#A8B9CC" },
      { name: "Java", icon: FaJava, color: "#ED8B00" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#eeeeee" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer", icon: SiFramer, color: "#BB4B96" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#eeeeee" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Prisma", icon: SiPrisma, color: "#5A67D8" },
    ],
  },
  {
    title: "Cloud & Tools",
    skills: [
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "Vercel", icon: SiVercel, color: "#eeeeee" },
      { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
      { name: "DigitalOcean", icon: SiDigitalocean, color: "#0080FF" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#eeeeee" },
    ],
  },
];

const corePrinciples = [
  {
    icon: FaCogs,
    title: "Precision Engineering",
    description: "Building maintainable, well-architected systems",
  },
  {
    icon: FaChartLine,
    title: "Continuous Growth",
    description: "Mastering new paradigms through deliberate practice",
  },
  {
    icon: FaGlobeAmericas,
    title: "Impact-Driven",
    description: "Solutions that address real-world challenges",
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-28 w-full bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-medium text-primary tracking-widest uppercase mb-3 block">
            What I work with
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Technical Skills
          </h2>
        </motion.div>

        {/* Core Principles */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-5">
          {corePrinciples.map((item, index) => (
            <div
              key={index}
              className="group p-6 rounded-sm bg-card border border-foreground/5 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="text-base font-semibold mb-1.5">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <div key={category.title}>
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
                <div className="flex-1 h-px bg-foreground/5" />
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillChip
                    key={skill.name}
                    skill={skill}
                    delay={skillIndex * 0.04}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillChip({
  skill,
  delay,
}: {
  skill: {
    name: string;
    icon: React.ComponentType<{
      className?: string;
      style?: React.CSSProperties;
    }>;
    color: string;
  };
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-sm bg-card border cursor-pointer transition-all duration-150 hover:shadow-md hover:-translate-y-0.5"
      style={{
        borderColor: hovered ? `${skill.color}40` : undefined,
        boxShadow: hovered ? `0 4px 15px ${skill.color}15` : undefined,
      }}
    >
      <skill.icon
        className="transition-all duration-150"
        style={{
          fontSize: 18,
          width: 18,
          height: 18,
          color: hovered ? skill.color : undefined,
        }}
      />
      <span
        className="text-sm font-medium transition-colors duration-150"
        style={{
          color: hovered ? skill.color : undefined,
        }}
      >
        {skill.name}
      </span>
    </div>
  );
}
