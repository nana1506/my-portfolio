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
import { trackCvDownload, trackSectionNav } from "@/lib/analytics";

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

  const profileImg = normalizeImageUrl(content.profilePhoto) || "/profile.png";

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
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Side-by-Side Unified Grid: Left Hero (5 cols) | Right About Showcase (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* Left Column: Hero & Value Proposition (5 cols on large screens) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-400/80 dark:border-orange-500/50 bg-orange-100/90 dark:bg-orange-950/70 text-[var(--text-primary)] text-xs font-mono font-extrabold mb-5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping inline-block" />
                <Zap className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                <span className="text-[var(--text-primary)] font-extrabold">Open for Analytics Initiatives & Roles</span>
              </div>

              {/* Headline with Electric Blue & Sunset Orange Gradient */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.15]">
                {content.heroHeadline}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 dark:from-blue-400 dark:via-indigo-300 dark:to-orange-400 mt-2 font-black">
                  {content.heroSubheadline}
                </span>
              </h1>

              {/* Value Summary */}
              <p className="mt-5 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
                {content.heroShortBio}
              </p>
            </div>

            {/* Action CTAs */}
            <div className="mt-8 pt-4 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                onClick={() => trackSectionNav("contact", "hero_cta")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/25 hover:shadow-orange-500/25 active:scale-95 cursor-pointer"
              >
                <span>Let&apos;s Collaborate</span>
                <ArrowUpRight className="w-4 h-4 text-orange-200" />
              </a>

              <a
                href="/Isnan_Rizqi_Kurniawan_CV.pdf"
                download="Isnan_Rizqi_Kurniawan_CV.pdf"
                onClick={() => trackCvDownload("hero_section")}
                className="inline-flex items-center gap-2 px-4.5 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-bold text-xs sm:text-sm transition-all hover:border-blue-500/50 active:scale-95 shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Download CV</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: About Card with Seamless Portrait Overlay & Bio (7 cols on large screens) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="glass-card rounded-3xl p-5 sm:p-7 border border-[var(--border-subtle)] h-full flex flex-col justify-between relative overflow-hidden shadow-lg hover:border-blue-500/40">
              {/* Soft Radiant Backdrop Aura */}
              <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-500/15 via-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Header: Name + Location + Dynamic YOE Pill aligned */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-[var(--text-primary)] tracking-tight">
                      Isnan Rizqi Kurniawan
                    </h2>
                    <p className="text-xs text-orange-600 dark:text-orange-400 font-mono font-bold mt-0.5">
                      Jakarta, Indonesia • Telkom Indonesia
                    </p>
                  </div>

                  {/* YOE Pill Badge */}
                  <span className="px-3.5 py-1.5 rounded-full bg-orange-100/90 dark:bg-orange-950/70 text-[var(--text-primary)] border border-orange-400/80 dark:border-orange-500/50 text-xs font-mono font-black shadow-xs shrink-0 self-center">
                    {yoeDisplay}
                  </span>
                </div>

                {/* Internal Layout: Full-Height Seamless Photo on Left & Bio Narrative on Right */}
                <div className="flex-1 my-5 relative min-h-[300px] sm:min-h-[360px] flex items-center">
                  {/* Larger photo shifted to the left with seamless transparent gradient fading into the text */}
                  <div className="absolute inset-y-0 -left-2 sm:-left-6 lg:-left-8 w-full sm:w-[62%] lg:w-[58%] pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center sm:justify-start">
                    {!imgError ? (
                      <div className="relative w-full h-full flex items-center justify-center sm:justify-start">
                        <img
                          src={profileImg}
                          alt="Isnan Rizqi Kurniawan"
                          onError={() => setImgError(true)}
                          className="w-auto h-full max-h-[380px] sm:max-h-[420px] scale-105 sm:scale-115 object-contain object-center sm:object-left -translate-x-2 sm:-translate-x-4 opacity-35 sm:opacity-95 dark:opacity-90 transition-all duration-700 hover:scale-120 filter grayscale contrast-105 drop-shadow-md origin-left"
                          style={{
                            maskImage:
                              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 12%, rgba(0,0,0,0.9) 25%, rgba(0,0,0,0.76) 40%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.32) 70%, rgba(0,0,0,0.12) 85%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0.8) 100%)",
                            WebkitMaskImage:
                              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 12%, rgba(0,0,0,0.9) 25%, rgba(0,0,0,0.76) 40%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.32) 70%, rgba(0,0,0,0.12) 85%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0.8) 100%)",
                            maskComposite: "intersect",
                            WebkitMaskComposite: "destination-in",
                          }}
                        />
                        {/* Subtle luminous halo behind the portrait */}
                        <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-56 h-56 bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-15">
                        <LineChart className="w-28 h-28 text-blue-500" />
                      </div>
                    )}
                  </div>

                  {/* 12-col Grid for Bio Text Alignment */}
                  <div className="w-full grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center">
                    {/* Photo clearance space on tablet/desktop */}
                    <div className="hidden sm:block sm:col-span-5 lg:col-span-5 pointer-events-none" />

                    {/* Bio Narrative on the Right */}
                    <div className="sm:col-span-7 lg:col-span-7 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed space-y-3 whitespace-pre-line font-normal relative z-10">
                      {content.aboutLongBio}
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Analytical Capabilities Capsules */}
              <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] relative z-10">
                <div className="text-[11px] font-mono uppercase tracking-wider text-blue-900 dark:text-blue-300 font-extrabold mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                  <span>Core Analytical Capabilities</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {coreSkillPills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-primary)] hover:border-blue-500/50 hover:text-blue-600 transition-colors shadow-2xs"
                    >
                      <span className="w-2 h-2 rounded-full bg-orange-500 inline-block shrink-0" />
                      <span className="text-[var(--text-primary)] font-bold">{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Metrics Row Directly Under Hero/About */}
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
