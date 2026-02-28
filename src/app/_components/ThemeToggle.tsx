"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "../_utils/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "relative w-9 h-9 flex items-center justify-center rounded-sm hover:bg-foreground/5 transition-all duration-200",
        className,
      )}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-muted-foreground hover:text-foreground" />
      <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-muted-foreground hover:text-foreground" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
