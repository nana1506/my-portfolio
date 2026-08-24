"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExperienceItem } from "@/lib/types";
import {
  Briefcase,
  Calendar,
  Download,
  Building,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

function ExperienceLogo({
  src,
  alt,
  size = "md",
}: {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
}) {
  const [error, setError] = useState(false);

  React.useEffect(() => {
    setError(false);
  }, [src]);

  const sizeClasses = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-10 h-10 rounded-xl",
    lg: "w-12 h-12 rounded-xl",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  if (!src || error) {
    return (
      <div
        className={`${sizeClasses[size]} bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0`}
      >
        <Building className={iconSizes[size]} />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs`}
    >
      <img
        src={src}
        alt={alt || "Company Logo"}
        onError={() => setError(true)}
        className="w-full h-full object-contain rounded"
      />
    </div>
  );
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  // Default to the first (most recent) experience
  const [activeId, setActiveId] = useState<string>(
    experience[0]?.id || "exp-1"
  );

  const activeExp =
    experience.find((e) => e.id === activeId) || experience[0];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">
          <Briefcase className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <span>04 // Career Milestones</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--text-primary)] tracking-tight">
              Horizontal Career Timeline
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] font-normal max-w-xl">
              Click any milestone along the timeline track to inspect achievements, responsibilities, and quantified impact.
            </p>
          </div>

          <a
            href="/Isnan_Rizqi_Kurniawan_CV.pdf"
            download="Isnan_Rizqi_Kurniawan_CV.pdf"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-bold text-xs transition-all hover:border-blue-500/50 shadow-2xs self-start md:self-auto cursor-pointer"
          >
            <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Horizontal Dashed Timeline Track */}
        <div className="relative pt-6 pb-2">
          {/* Dashed Connecting Track Line */}
          <div className="hidden md:block absolute top-[2.1rem] left-10 right-10 border-t-2 border-dashed border-blue-400/40 dark:border-blue-500/30 z-0 pointer-events-none" />

          {/* Milestone Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {experience.map((item, idx) => {
              const isActive = item.id === activeId;
              return (
                <div key={item.id || idx} className="flex flex-col">
                  {/* Top Node Indicator Resting on Dashed Line */}
                  <div className="hidden md:flex items-center mb-5 pl-5">
                    <button
                      onClick={() => setActiveId(item.id)}
                      aria-label={`Select ${item.title}`}
                      className={`w-6 h-6 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                        isActive
                          ? "bg-orange-500 ring-4 ring-orange-500/25 scale-110 shadow-sm"
                          : "bg-orange-500/80 hover:bg-orange-500 hover:scale-105 ring-2 ring-orange-500/20"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white" />
                    </button>
                  </div>

                  {/* Milestone Card */}
                  <button
                    onClick={() => setActiveId(item.id)}
                    className={`text-left p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-full relative overflow-hidden ${
                      isActive
                        ? "bg-[var(--bg-surface)] border-2 border-blue-600 dark:border-blue-500 shadow-lg ring-2 ring-blue-500/20 scale-[1.02]"
                        : "bg-[var(--bg-surface-elevated)]/80 border-[var(--border-subtle)] hover:border-blue-400/50 hover:bg-[var(--bg-surface)] opacity-90 hover:opacity-100"
                    }`}
                  >
                    {/* Top Glowing Accent Line for Active Card */}
                    {isActive && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-500" />
                    )}

                    <div>
                      {/* Top Row: Monospace Period + Company Logo */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
                          <span className="opacity-70">--</span>
                          <span>{item.startDate} — {item.endDate}</span>
                        </div>

                        <ExperienceLogo
                          src={item.logo}
                          alt={item.company}
                          size="sm"
                        />
                      </div>

                      {/* Job Title */}
                      <h3 className="font-display font-extrabold text-base sm:text-lg text-[var(--text-primary)] leading-snug">
                        {item.title}
                      </h3>

                      {/* Company Name */}
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium mt-1 leading-normal">
                        {item.company}
                      </p>
                    </div>

                    {/* Active State View Indicator */}
                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]/70 flex items-center justify-between text-[11px] font-mono">
                      <span className={isActive ? "text-blue-600 dark:text-blue-400 font-bold" : "text-[var(--text-muted)]"}>
                        {isActive ? "Currently Viewing" : "Click to Inspect"}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "text-orange-500 translate-x-1" : "text-[var(--text-muted)]"}`} />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Detail Sheet */}
        {activeExp && (
          <motion.div
            key={activeExp.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8 glass-card rounded-2xl p-6 sm:p-8 border border-[var(--border-subtle)] shadow-md relative overflow-hidden"
          >
            {/* Top Subtle Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-500" />

            {/* Role Header with Company Logo */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-3.5">
                <ExperienceLogo
                  src={activeExp.logo}
                  alt={activeExp.company}
                  size="lg"
                />

                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-orange-600 dark:text-orange-400 mb-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Key Deliverables & Responsibilities</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[var(--text-primary)]">
                    {activeExp.title} @ <span className="text-blue-600 dark:text-blue-400">{activeExp.company}</span>
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)] bg-[var(--bg-surface-elevated)] px-3.5 py-1.5 rounded-lg border border-[var(--border-subtle)] self-start sm:self-auto shrink-0">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{activeExp.startDate} — {activeExp.endDate}</span>
              </div>
            </div>

            {/* Bullets */}
            <div className="mt-6 space-y-3.5">
              {activeExp.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-surface-elevated)]/60 p-3.5 rounded-xl border border-[var(--border-subtle)]"
                >
                  <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                  <span className="font-medium text-[var(--text-primary)]">{bullet}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
