"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SiteContent } from "@/lib/types";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  LineChart,
  Brain,
  Sparkles,
  Terminal,
  Layers,
  Users2,
  CheckCircle2,
  User,
} from "lucide-react";

interface HeroAboutSectionProps {
  content: SiteContent;
}

export function HeroAboutSection({ content }: HeroAboutSectionProps) {
  const [imgError, setImgError] = useState(false);

  const coreSkillPills = content.coreSkills?.length
    ? content.coreSkills
    : [
        "Data Modeling & Architecture",
        "Executive BI Dashboards",
        "Statistical Experimentation",
        "Revenue & Churn Analytics",
        "Cross-Functional Leadership",
      ];

  const profileImg = content.profilePhoto || "/profile.jpg";

  return (
    <section id="about" className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Unified Side-by-Side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Hero & Value Proposition (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              {/* High Contrast Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-300 dark:border-teal-500/30 bg-teal-100 dark:bg-teal-500/10 text-teal-950 dark:text-teal-200 text-xs font-mono font-bold mb-5 shadow-3xs">
                <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-ping inline-block" />
                <span>Open for Analytics Initiatives & Roles</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.15]">
                {content.heroHeadline}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-800 via-teal-700 to-cyan-700 dark:from-teal-400 dark:via-teal-300 dark:to-cyan-400 mt-1.5">
                  {content.heroSubheadline}
                </span>
              </h1>

              {/* Value Summary */}
              <p className="mt-5 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
                {content.heroShortBio}
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-4 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-teal-700/20 active:scale-95 cursor-pointer"
              >
                <span>Let&apos;s Collaborate</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="/Isnan_Rizqi_Kurniawan_CV.pdf"
                download="Isnan_Rizqi_Kurniawan_CV.pdf"
                className="inline-flex items-center gap-2 px-4.5 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-bold text-xs sm:text-sm transition-all hover:border-teal-600/50 active:scale-95 shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <span>Download CV</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: About Me Card & Photo & 5 Core Skill Capsules (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-7 border border-[var(--border-subtle)] h-full flex flex-col justify-between relative overflow-hidden shadow-xs">
              <div>
                {/* Header with Photo Avatar & Title */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-3.5">
                    {/* Profile Photo / Avatar Frame */}
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-tr from-teal-500/20 via-cyan-500/20 to-teal-500/30 border-2 border-teal-600/40 flex items-center justify-center shrink-0 shadow-sm group">
                      {!imgError ? (
                        <img
                          src={profileImg}
                          alt="Isnan Rizqi Kurniawan"
                          onError={() => setImgError(true)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-teal-800 dark:text-teal-300">
                          <LineChart className="w-7 h-7" />
                        </div>
                      )}
                    </div>

                    <div>
                      <h2 className="font-display text-lg font-extrabold text-[var(--text-primary)]">
                        Isnan Rizqi Kurniawan
                      </h2>
                      <p className="text-xs text-[var(--text-muted)] font-mono font-medium">
                        Senior Data Analyst • @rizisnan
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-500/15 text-teal-950 dark:text-teal-200 border border-teal-300 dark:border-teal-500/30 text-[11px] font-mono font-bold shadow-3xs">
                    6+ YOE
                  </span>
                </div>

                {/* Narrative Bio */}
                <div className="mt-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3 whitespace-pre-line font-normal">
                  {content.aboutLongBio}
                </div>
              </div>

              {/* 5 Core Analytical Capabilities Capsules */}
              <div className="mt-6 pt-5 border-t border-[var(--border-subtle)]">
                <div className="text-[11px] font-mono uppercase tracking-wider text-teal-900 dark:text-teal-300 font-extrabold mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  <span>Core Analytical Capabilities</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {coreSkillPills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] hover:border-teal-500/40 transition-colors shadow-2xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-700 dark:bg-teal-400 inline-block" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Metrics Row Placed Directly Under Hero/About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left"
        >
          {content.stats.map((stat, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs hover:border-teal-500/40 transition-colors"
            >
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-teal-800 dark:text-teal-400">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[var(--text-primary)] mt-0.5">
                {stat.label}
              </div>
              {stat.helper && (
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5 font-mono font-medium">
                  {stat.helper}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
