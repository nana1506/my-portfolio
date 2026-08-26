"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { trackThemeToggle } from "@/lib/analytics";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-zinc-500 opacity-60"
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  const handleToggle = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    trackThemeToggle(nextTheme);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="relative p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] hover:border-teal-500/40 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200 cursor-pointer group"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-teal-400 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-teal-600 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
