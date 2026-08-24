"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExperienceItem } from "@/lib/types";
import {
  Briefcase,
  Calendar,
  Download,
  Building,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
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
          <span>04 // Career Journey</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--text-primary)] tracking-tight">
              Work Experience & Impact
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] font-normal max-w-xl">
              A track record of translating data complexity into business outcomes across high-growth teams.
            </p>
          </div>

          <a
            href="/Isnan_Rizqi_Kurniawan_CV.pdf"
            download="Isnan_Rizqi_Kurniawan_CV.pdf"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-bold text-xs transition-all hover:border-blue-500/50 shadow-2xs self-start md:self-auto cursor-pointer"
          >
            <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Download Full Resume</span>
          </a>
        </div>

        {/* Clean Interactive Split Experience Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Interactive Milestone Navigation (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {experience.map((item, idx) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id || idx}
                  onClick={() => setActiveId(item.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative flex items-center justify-between gap-4 ${
                    isActive
                      ? "bg-[var(--bg-surface)] border-blue-600 dark:border-blue-500 shadow-md ring-2 ring-blue-500/20"
                      : "bg-[var(--bg-surface-elevated)]/70 border-[var(--border-subtle)] hover:border-blue-400/40 hover:bg-[var(--bg-surface)] opacity-85 hover:opacity-100"
                  }`}
                >
                  {/* Active Left Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-gradient-to-b from-blue-600 to-orange-500 rounded-r-full" />
                  )}

                  <div className="flex items-center gap-3.5 pl-1.5">
                    {/* Company Logo or Icon */}
                    <div
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center font-bold text-sm shrink-0 transition-transform ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-950/60 border-blue-400 text-blue-900 dark:text-blue-200 shadow-2xs scale-105"
                          : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)]"
                      }`}
                    >
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.company}
                          className="w-6 h-6 object-contain rounded"
                        />
                      ) : (
                        <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>

                    <div>
                      <h3 className={`font-display font-bold text-sm sm:text-base leading-snug ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-primary)]"}`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs font-mono font-bold mt-0.5 ${isActive ? "text-orange-600 dark:text-orange-400" : "text-[var(--text-muted)]"}`}>
                        {item.company}
                      </p>
                    </div>
                  </div>

                  {/* Date Badge */}
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold border ${
                        isActive
                          ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600 shadow-2xs"
                          : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)]"
                      }`}
                    >
                      {item.startDate} — {item.endDate}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected Role Detail Card (7 cols) */}
          <div className="lg:col-span-7">
            {activeExp && (
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl p-6 sm:p-8 border border-[var(--border-subtle)] shadow-md relative overflow-hidden"
              >
                {/* Top Subtle Gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-500" />

                {/* Role Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[var(--border-subtle)]">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[var(--text-primary)]">
                      {activeExp.title}
                    </h3>
                    <p className="text-sm font-mono font-bold text-orange-600 dark:text-orange-400 mt-0.5">
                      {activeExp.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)] bg-[var(--bg-surface-elevated)] px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{activeExp.startDate} — {activeExp.endDate}</span>
                  </div>
                </div>

                {/* Bullets & Responsibilities */}
                <div className="mt-6 space-y-3.5">
                  <div className="text-xs font-mono uppercase font-bold text-[var(--text-muted)] tracking-wider flex items-center gap-1.5 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                    <span>Key Deliverables & Responsibilities</span>
                  </div>

                  {activeExp.bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-[var(--bg-surface-elevated)]/60 border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                    >
                      <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                      <span className="font-medium text-[var(--text-primary)]">{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
