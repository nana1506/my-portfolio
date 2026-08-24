"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiteContent } from "@/lib/types";
import {
  Brain,
  CheckCircle2,
  Database,
  LineChart,
  PieChart,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";

interface AboutSectionProps {
  content: SiteContent;
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
          <Terminal className="w-4 h-4" />
          <span>01 // About Me</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight">
          Bridging Engineering Precision with Executive Storytelling
        </h2>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Profile Card & Avatar Placeholder (4 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden border border-[var(--border-subtle)]">
              {/* Profile Photo Avatar Graphic */}
              <div className="relative mx-auto w-48 h-48 rounded-2xl bg-gradient-to-tr from-teal-500/20 via-cyan-500/10 to-teal-500/30 border-2 border-teal-500/30 flex items-center justify-center p-2 group shadow-inner">
                {/* Visual Avatar Pattern */}
                <div className="w-full h-full rounded-xl bg-[var(--bg-surface-elevated)] flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-dot-matrix opacity-40" />
                  <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-2 shadow-xs">
                    <LineChart className="w-8 h-8" />
                  </div>
                  <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                    Isnan Rizqi Kurniawan
                  </span>
                  <span className="text-[11px] text-teal-600 dark:text-teal-400 font-mono">
                    @rizisnan
                  </span>
                </div>

                {/* Floating pill badge */}
                <div className="absolute -bottom-2.5 right-2 px-3 py-1 rounded-full bg-teal-600 dark:bg-teal-500 text-white dark:text-zinc-950 text-[10px] font-mono font-bold shadow-md">
                  6+ YOE
                </div>
              </div>

              {/* Bio summary card snippet */}
              <div className="mt-6 text-center">
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  Senior Data Analyst
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">
                  Jakarta, Indonesia • Remote / Hybrid
                </p>
                <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] flex justify-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/rizisnan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                  >
                    LinkedIn Profile ↗
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Long Bio & Core Competencies (8 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 space-y-6"
          >
            <div className="glass-card rounded-2xl p-7 border border-[var(--border-subtle)]">
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Brain className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                Analytical Philosophy & Background
              </h3>

              <div className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed space-y-4 whitespace-pre-line">
                {content.aboutLongBio}
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-semibold mb-3">
                  Key Focus Areas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.aboutHighlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[var(--bg-surface-elevated)]/60 text-xs font-medium text-[var(--text-primary)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
