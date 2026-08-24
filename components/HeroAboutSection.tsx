"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiteContent } from "@/lib/types";
import { normalizeImageUrl } from "@/lib/notion";
import {
  ArrowUpRight,
  Download,
  LineChart,
  Sparkles,
  Zap,
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

  const profileImg = normalizeImageUrl(content.profilePhoto) || "/profile.jpg";

  useEffect(() => {
    setImgError(false);
  }, [profileImg]);

  // Dynamic YOE calculation from live stats
  const yoeDisplay = content.stats?.[0]?.value
    ? content.stats[0].value.includes("YOE")
      ? content.stats[0].value
      : `${content.stats[0].value} YOE`
    : "4+ YOE";

  return (
    <section id="about" className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* 1. Top: Hero Headline & Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2"
        >
          <div className="max-w-3xl">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-400/80 dark:border-orange-500/50 bg-orange-100/90 dark:bg-orange-950/70 text-[var(--text-primary)] text-xs font-mono font-extrabold mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping inline-block" />
              <Zap className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              <span className="text-[var(--text-primary)] font-extrabold">Open for Analytics Initiatives & Roles</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.15]">
              {content.heroHeadline}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 dark:from-blue-400 dark:via-indigo-300 dark:to-orange-400 mt-1.5 font-black">
                {content.heroSubheadline}
              </span>
            </h1>

            {/* Value Summary */}
            <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
              {content.heroShortBio}
            </p>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/25 hover:shadow-orange-500/25 active:scale-95 cursor-pointer"
            >
              <span>Let&apos;s Collaborate</span>
              <ArrowUpRight className="w-4 h-4 text-orange-200" />
            </a>

            <a
              href="/Isnan_Rizqi_Kurniawan_CV.pdf"
              download="Isnan_Rizqi_Kurniawan_CV.pdf"
              className="inline-flex items-center gap-2 px-4.5 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-bold text-xs sm:text-sm transition-all hover:border-blue-500/50 active:scale-95 shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Download CV</span>
            </a>
          </div>
        </motion.div>

        {/* 2. Full-Width About Showcase Card (Matching Reference Layout) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="glass-card rounded-3xl border border-[var(--border-subtle)] p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden"
        >
          {/* Soft Radiant Aura Backdrop */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/15 via-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Large Portrait Frame with Concentric Accent */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-4/5 rounded-3xl overflow-hidden border-2 border-blue-500/40 dark:border-blue-400/50 bg-gradient-to-b from-blue-500/15 via-[var(--bg-surface-elevated)] to-[var(--bg-surface)] shadow-xl group flex items-center justify-center">
                {/* Decorative Concentric Dashed Ring */}
                <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full border border-dashed border-blue-400/40 dark:border-blue-500/30 pointer-events-none" />
                <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full border border-dashed border-orange-400/40 dark:border-orange-500/30 pointer-events-none" />

                {!imgError ? (
                  <img
                    src={profileImg}
                    alt="Isnan Rizqi Kurniawan"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-blue-600 dark:text-blue-400 p-6 text-center">
                    <LineChart className="w-20 h-20 mb-3" />
                    <span className="font-display font-extrabold text-base text-[var(--text-primary)]">
                      Isnan Rizqi Kurniawan
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono mt-1 font-bold">
                      Telkom Indonesia
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Title, YOE Badge, Bio, and Capability Pills */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* Header: Name + Dynamic YOE Pill Badge */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-[var(--text-primary)] tracking-tight">
                      Isnan Rizqi Kurniawan
                    </h2>
                    <p className="text-xs sm:text-sm text-orange-600 dark:text-orange-400 font-mono font-bold mt-1">
                      Jakarta, Indonesia • Telkom Indonesia
                    </p>
                  </div>

                  {/* YOE Pill Badge */}
                  <span className="px-4 py-1.5 rounded-full bg-orange-100/90 dark:bg-orange-950/70 text-[var(--text-primary)] border border-orange-400/80 dark:border-orange-500/50 text-xs sm:text-sm font-mono font-black shadow-xs shrink-0">
                    {yoeDisplay}
                  </span>
                </div>

                {/* Narrative Bio */}
                <div className="mt-5 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed space-y-3 whitespace-pre-line font-normal">
                  {content.aboutLongBio}
                </div>
              </div>

              {/* Core Analytical Capabilities Capsules */}
              <div className="pt-5 border-t border-[var(--border-subtle)]">
                <div className="text-xs font-mono uppercase tracking-wider text-blue-900 dark:text-blue-300 font-extrabold mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                  <span>Core Analytical Capabilities</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {coreSkillPills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs sm:text-sm font-bold text-[var(--text-primary)] hover:border-blue-500/50 hover:text-blue-600 transition-colors shadow-2xs"
                    >
                      <span className="w-2 h-2 rounded-full bg-orange-500 inline-block shrink-0" />
                      <span className="text-[var(--text-primary)] font-bold">{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. Dynamic Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-2 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left"
        >
          {content.stats.map((stat, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs hover:border-blue-500/40 transition-colors group"
            >
              <div className="font-display text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
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
