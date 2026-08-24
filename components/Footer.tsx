"use client";

import React from "react";
import Link from "next/link";
import { LinkedInIcon } from "./Icons";
import { BarChart3, ArrowUp, Mail } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand + Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <BarChart3 className="w-3.5 h-3.5" />
            </div>
            <span className="font-display font-bold text-sm text-[var(--text-primary)]">
              Isnan Rizqi Kurniawan
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] font-mono">
            Senior Data Analyst • Strategic Intelligence & BI Engineering
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-secondary)]">
          <a
            href="https://www.linkedin.com/in/rizisnan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <span>•</span>
          <a
            href="/api/contact-click"
            className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
        </div>

        {/* Right: Back to Top & Copyright */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-[var(--text-muted)] font-mono">
            © {new Date().getFullYear()} isnan.data
          </span>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] hover:border-teal-500/40 text-[var(--text-secondary)] hover:text-teal-600 dark:hover:text-teal-400 transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
