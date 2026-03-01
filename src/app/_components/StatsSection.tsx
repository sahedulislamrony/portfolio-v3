"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ChevronDown, TrendingUp } from "lucide-react";
import { skillProficiency } from "../_lib/data";
import type { GitHubStats } from "../_lib/github";

export function StatsSection() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setStats(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Available years from the data
  const years =
    stats?.yearlyContributions?.map((y) => y.year).sort((a, b) => b - a) ?? [];

  // Derived data based on selected year
  const monthlyData =
    selectedYear === "all"
      ? (stats?.monthlyActivity ?? [])
      : (stats?.yearlyMonthlyActivity?.[selectedYear] ?? []);

  const ringData =
    selectedYear === "all"
      ? {
          value: stats?.totalContributions ?? 0,
          label: "All Time",
        }
      : {
          value:
            stats?.yearlyContributions?.find((y) => y.year === selectedYear)
              ?.total ?? 0,
          label: `${selectedYear}`,
        };

  return (
    <section id="stats" className="py-28 w-full bg-background">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header with Year Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <span className="text-sm font-medium text-primary tracking-widest uppercase mb-3 block">
              By the numbers
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              GitHub Activity
            </h2>
          </div>
        </motion.div>

        {/* Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Skill Proficiency — left column */}
          <div className="lg:col-span-5">
            <SkillBarsCard />
          </div>

          {/* Right column — stacked */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <CodingActivityCard
              data={monthlyData}
              loading={loading}
              label={
                selectedYear === "all"
                  ? "Monthly activity over the last 12 months"
                  : `Monthly activity in ${selectedYear}`
              }
              years={years}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ContributionRingCard
                value={ringData.value}
                label={ringData.label}
                loading={loading}
              />
              <QuickStatsCard stats={stats} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Year Selector Dropdown ─── */
function YearSelector({
  years,
  selected,
  onChange,
}: {
  years: number[];
  selected: number | "all";
  onChange: (year: number | "all") => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const displayLabel = selected === "all" ? "All Time" : `${selected}`;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-sm bg-card border border-foreground/10 hover:border-primary/30 transition-all duration-200 text-sm font-medium cursor-pointer"
      >
        <span className="text-muted-foreground">Year:</span>
        <span className="text-foreground">{displayLabel}</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 z-50 min-w-[140px] bg-card border border-foreground/10 rounded-sm shadow-xl shadow-black/20 overflow-hidden"
          >
            <button
              onClick={() => {
                onChange("all");
                setOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 cursor-pointer ${
                selected === "all"
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-foreground/5"
              }`}
            >
              All Time
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => {
                  onChange(year);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 cursor-pointer ${
                  selected === year
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-foreground/5"
                }`}
              >
                {year}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Skeleton Pulse ─── */
function Skeleton({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`animate-pulse rounded-sm bg-foreground/5 ${className}`}
      style={style}
    />
  );
}

/* ─── Skill Proficiency Bars (static data) ─── */
function SkillBarsCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="h-full flex flex-col rounded-sm border border-foreground/5 bg-card p-6 md:p-8 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <h3 className="text-lg font-semibold mb-1">Skill Proficiency</h3>
      <p className="text-sm text-muted-foreground mb-8">
        Core technologies I work with daily
      </p>

      <div className="space-y-5">
        {skillProficiency.map((skill, i) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{skill.name}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.1 + 0.4, duration: 0.3 }}
                className="text-xs font-mono text-primary"
              >
                {skill.level}%
              </motion.span>
            </div>

            {/* Track */}
            <div className="relative h-2 w-full rounded-full bg-foreground/5 overflow-hidden">
              {/* Fill */}
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : {}}
                transition={{
                  delay: i * 0.1 + 0.2,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--primary), color-mix(in oklch, var(--primary) 70%, transparent))",
                }}
              />
              {/* Shimmer */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={isInView ? { x: "200%" } : {}}
                transition={{
                  delay: i * 0.1 + 0.6,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom summary */}
      <div className="mt-auto pt-6 border-t border-foreground/5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Average proficiency
          </span>
          <span className="text-sm font-mono font-semibold text-primary flex items-center justify-center gap-[6px] leading-none">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>
              {Math.round(
                skillProficiency.reduce((s, sk) => s + sk.level, 0) /
                  skillProficiency.length,
              )}
              %
            </span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground/50 mt-2">
          Continuously learning and adapting to new technologies
        </p>
      </div>
    </div>
  );
}

/* ─── Coding Activity Line Graph ─── */
function CodingActivityCard({
  data,
  loading,
  label,
  years,
  selectedYear,
  onYearChange,
}: {
  data: { month: string; commits: number }[];
  loading: boolean;
  label: string;
  years: number[];
  selectedYear: number | "all";
  onYearChange: (year: number | "all") => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxCommits = Math.max(...data.map((d) => d.commits), 1);

  // SVG dimensions
  const svgWidth = 600;
  const svgHeight = 160;
  const padLeft = 24;
  const padRight = 24;
  const padTop = 36;
  const padBottom = 0;
  const chartW = svgWidth - padLeft - padRight;
  const chartH = svgHeight - padTop - padBottom;

  // Build points
  const points = data.map((d, i) => ({
    x:
      padLeft +
      (data.length > 1 ? (i / (data.length - 1)) * chartW : chartW / 2),
    y: padTop + chartH - (d.commits / maxCommits) * chartH,
    value: d.commits,
    label: d.month,
  }));

  // Smooth cubic bezier path
  function buildSmoothPath(pts: { x: number; y: number }[]): string {
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const cp = (pts[i + 1].x - pts[i].x) * 0.4;
      d += ` C ${pts[i].x + cp},${pts[i].y} ${pts[i + 1].x - cp},${pts[i + 1].y} ${pts[i + 1].x},${pts[i + 1].y}`;
    }
    return d;
  }

  const linePath = buildSmoothPath(points);
  // Area path: line path + close to bottom
  const areaPath =
    points.length >= 2
      ? `${linePath} L ${points[points.length - 1].x},${padTop + chartH} L ${points[0].x},${padTop + chartH} Z`
      : "";

  // Grid lines (4 horizontal)
  const gridLines = [0.25, 0.5, 0.75, 1].map(
    (frac) => padTop + chartH - frac * chartH,
  );

  return (
    <div
      ref={ref}
      className="rounded-sm border border-foreground/5 bg-card p-6 md:p-8 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
            Contributions
            <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Live
            </span>
          </h3>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        <div className="flex flex-col sm:items-end gap-3">
          {!loading && years.length > 0 && (
            <YearSelector
              years={years}
              selected={selectedYear}
              onChange={onYearChange}
            />
          )}
          {/* <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            Contributions
          </div> */}
        </div>
      </div>

      {loading ? (
        <div className="h-48">
          <Skeleton className="w-full h-full" />
        </div>
      ) : data.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-sm text-muted-foreground/50">
          No contribution data available
        </div>
      ) : (
        <div className="relative">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight + 28}`}
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Area gradient */}
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity="0.25"
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity="0.02"
                />
              </linearGradient>
              {/* Line glow */}
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid lines */}
            {gridLines.map((y, i) => (
              <line
                key={i}
                x1={padLeft}
                y1={y}
                x2={svgWidth - padRight}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.06"
                strokeDasharray="4 4"
              />
            ))}

            {/* Area fill */}
            {areaPath && (
              <motion.path
                d={areaPath}
                fill="url(#areaGrad)"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              />
            )}

            {/* Line */}
            {linePath && (
              <motion.path
                d={linePath}
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#lineGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              />
            )}

            {/* Data points + hover areas */}
            {points.map((pt, i) => (
              <g key={i}>
                {/* Invisible hover target */}
                <rect
                  x={pt.x - chartW / data.length / 2}
                  y={padTop}
                  width={chartW / data.length}
                  height={chartH}
                  fill="transparent"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer"
                />

                {/* Vertical guide on hover */}
                {hoveredIndex === i && (
                  <line
                    x1={pt.x}
                    y1={padTop}
                    x2={pt.x}
                    y2={padTop + chartH}
                    stroke="var(--primary)"
                    strokeOpacity="0.2"
                    strokeDasharray="3 3"
                    pointerEvents="none"
                  />
                )}

                {/* Dot */}
                <motion.circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredIndex === i ? 6 : 3.5}
                  fill="var(--primary)"
                  stroke="var(--card)"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: i * 0.06 + 0.8, duration: 0.3 }}
                  style={{ transition: "r 0.15s ease" }}
                  pointerEvents="none"
                />

                {/* Tooltip */}
                {hoveredIndex === i && (
                  <g pointerEvents="none">
                    <rect
                      x={pt.x - 20}
                      y={pt.y - 28}
                      width="40"
                      height="20"
                      rx="4"
                      fill="var(--foreground)"
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 15}
                      textAnchor="middle"
                      fill="var(--background)"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {pt.value}
                    </text>
                  </g>
                )}
              </g>
            ))}

            {/* Month labels */}
            {points.map((pt, i) => (
              <text
                key={i}
                x={pt.x}
                y={svgHeight + 18}
                textAnchor="middle"
                fill="currentColor"
                fillOpacity="0.35"
                fontSize="10"
                fontFamily="monospace"
              >
                {data[i].month}
              </text>
            ))}
          </svg>
        </div>
      )}
    </div>
  );
}

/* ─── Contribution Ring ─── */
function ContributionRingCard({
  value,
  label,
  loading,
}: {
  value: number;
  label: string;
  loading: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Ring progress: use next round hundred as target
  const target = Math.max(Math.ceil(value / 100) * 100, 100);
  const percentage = Math.min(Math.round((value / target) * 100), 100);

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      ref={ref}
      className="rounded-sm border border-foreground/5 bg-card p-6 md:p-8 flex flex-col items-center justify-center hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      {loading ? (
        <>
          <Skeleton className="w-36 h-36 rounded-full" />
          <Skeleton className="w-28 h-4 mt-4" />
          <Skeleton className="w-20 h-3 mt-2" />
        </>
      ) : (
        <>
          {/* SVG Ring */}
          <div className="relative w-36 h-36">
            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 140 140"
              fill="none"
            >
              {/* Track */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                strokeWidth="8"
                className="stroke-foreground/5"
              />
              {/* Progress */}
              <motion.circle
                cx="70"
                cy="70"
                r={radius}
                strokeWidth="8"
                strokeLinecap="round"
                className="stroke-primary"
                style={{
                  strokeDasharray: circumference,
                }}
                initial={{ strokeDashoffset: circumference }}
                animate={isInView ? { strokeDashoffset: offset } : {}}
                transition={{
                  duration: 1.4,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </svg>

            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                key={value}
                className="text-2xl font-bold font-mono"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                {value.toLocaleString()}
              </motion.span>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm font-semibold">{label} Contributions</p>
            <p className="text-xs text-muted-foreground mt-1">
              {percentage}% of {target.toLocaleString()} goal
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Quick Stats ─── */
function QuickStatsCard({
  stats,
  loading,
}: {
  stats: GitHubStats | null;
  loading: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const items = [
    {
      label: "Total Contributions",
      value: stats?.totalContributions?.toLocaleString() ?? "—",
    },
    {
      label: "Public Repos",
      value: stats?.publicRepos?.toString() ?? "—",
    },
    {
      label: "Stars Earned",
      value: stats?.totalStars?.toString() ?? "—",
    },
    {
      label: "Followers",
      value: stats?.followers?.toString() ?? "—",
    },
  ];

  return (
    <div
      ref={ref}
      className="rounded-sm border border-foreground/5 bg-card p-6 md:p-8 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <h3 className="text-lg font-semibold mb-5">GitHub Stats</h3>
      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="w-16 h-6 mb-1" />
              <Skeleton className="w-20 h-3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {items.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
              className="group"
            >
              <span className="text-xl font-bold font-mono text-foreground group-hover:text-primary transition-colors duration-300 block">
                {stat.value}
              </span>
              <span className="text-[11px] text-muted-foreground/60 uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
