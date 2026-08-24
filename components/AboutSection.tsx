"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiteContent } from "@/lib/types";
import {
  Sparkles,
  Terminal,
  LineChart,
  User,
  ArrowUpRight,
  Download,
} from "lucide-react";

interface AboutSectionProps {
  content: SiteContent;
}

export function AboutSection({ content }: AboutSectionProps) {
  const yoeDisplay = content.stats?.[0]?.value
    ? content.stats[0].value.includes("YOE")
      ? content.stats[0].value
      : `${content.stats[0].value} YOE`
    : "5+ YOE";

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">
          <User className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <span>01 // About Me</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
          {/* Left Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--text-primary)] tracking-tight">
              Bridging Rigorous Data Engineering & Executive Strategy
            </h2>

            <div className="whitespace-pre-line space-y-4">
              {content.aboutLongBio}
            </div>

            {/* Core Capability Capsules */}
            <div className="pt-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                <span>Core Analytical Focus Areas</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {content.coreSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] hover:border-blue-500/50 shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual & Dynamic Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-[var(--border-subtle)] shadow-md">
              <div className="relative mx-auto w-32 h-32 rounded-2xl bg-gradient-to-tr from-blue-500/20 via-orange-500/20 to-blue-500/30 border-2 border-blue-500 flex items-center justify-center text-center p-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <LineChart className="w-8 h-8" />
                  </div>
                  <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                    Isnan Rizqi Kurniawan
                  </span>
                  <span className="text-[11px] text-orange-600 dark:text-orange-400 font-mono font-bold">
                    Telkom Indonesia
                  </span>
                </div>

                {/* Dynamic Floating pill badge */}
                <div className="absolute -bottom-2.5 right-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/80 text-[var(--text-primary)] border border-orange-400/80 text-[10px] font-mono font-black shadow-md">
                  {yoeDisplay}
                </div>
              </div>

              {/* Bio summary card snippet */}
              <div className="mt-6 text-center">
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  {content.heroHeadline || "Senior Data Analyst"}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 font-mono font-medium">
                  Jakarta, Indonesia • Telkom Indonesia
                </p>
                <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] flex justify-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/rizisnan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 hover:text-orange-500 transition-colors flex items-center gap-1"
                  >
                    LinkedIn Profile ↗
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
