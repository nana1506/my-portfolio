"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExperienceItem } from "@/lib/types";
import {
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  Building,
  MapPin,
  Sparkles,
} from "lucide-react";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const [selectedExpId, setSelectedExpId] = useState<string>(
    experience[0]?.id || "exp-1"
  );

  const selectedExp =
    experience.find((e) => e.id === selectedExpId) || experience[0];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-2">
          <Briefcase className="w-4 h-4" />
          <span>04 // Career Milestones</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--text-primary)] tracking-tight">
              Horizontal Career Trajectory & Impact
            </h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)] font-normal max-w-xl">
              Click through the horizontal milestone track to explore role achievements and company impact.
            </p>
          </div>
        </div>

        {/* Horizontal Milestone Track */}
        <div className="relative">
          {/* Connecting Track Line */}
          <div className="hidden md:block absolute top-7 left-8 right-8 h-0.5 bg-[var(--border-subtle)] z-0" />

          {/* Milestone Step Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            {experience.map((item, index) => {
              const isSelected = item.id === selectedExpId;
              return (
                <button
                  key={item.id || index}
                  onClick={() => setSelectedExpId(item.id)}
                  className={`text-left p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[var(--bg-surface)] border-teal-600 dark:border-teal-400 shadow-md ring-2 ring-teal-500/20"
                      : "bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] hover:border-teal-500/40 opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    {/* Company Logo Badge */}
                    <div
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-sm shrink-0 transition-transform ${
                        isSelected
                          ? "bg-teal-500/15 border-teal-500/50 text-teal-700 dark:text-teal-300 scale-105"
                          : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)]"
                      }`}
                    >
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.company}
                          className="w-7 h-7 object-contain rounded"
                        />
                      ) : (
                        <Building className="w-5 h-5" />
                      )}
                    </div>

                    {/* Active Step Indicator */}
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                        isSelected
                          ? "bg-teal-600 dark:bg-teal-500 text-white dark:text-zinc-950 border-transparent"
                          : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)]"
                      }`}
                    >
                      {item.startDate} — {item.endDate}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-[var(--text-primary)] leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-teal-700 dark:text-teal-400 font-semibold font-mono mt-1">
                      {item.company}
                    </p>
                    {item.location && (
                      <p className="text-[11px] text-[var(--text-muted)] mt-0.5 flex items-center gap-1 font-mono">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Experience Detail Card */}
        {selectedExp && (
          <motion.div
            key={selectedExp.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8 glass-card rounded-2xl p-6 sm:p-8 border border-[var(--border-subtle)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-teal-700 dark:text-teal-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Key Deliverables & Responsibilities</span>
                </div>
                <h3 className="text-2xl font-display font-extrabold text-[var(--text-primary)]">
                  {selectedExp.title} @ {selectedExp.company}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{selectedExp.startDate} — {selectedExp.endDate}</span>
                {selectedExp.duration && <span>({selectedExp.duration})</span>}
              </div>
            </div>

            {/* Bullets */}
            <div className="mt-6 space-y-3.5">
              {selectedExp.bullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-surface-elevated)]/40 p-3.5 rounded-xl border border-[var(--border-subtle)]/70"
                >
                  <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 shrink-0 mt-1.5" />
                  <span className="font-normal">{bullet}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA below experience */}
        <div className="mt-10 text-center">
          <div className="glass-card p-6 rounded-2xl border border-[var(--border-subtle)] inline-flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 max-w-2xl w-full text-left">
            <div>
              <div className="text-sm font-bold text-[var(--text-primary)]">
                Looking for complete career history and credentials?
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                Download verified resume with full project citations.
              </div>
            </div>
            <a
              href="/Isnan_Rizqi_Kurniawan_CV.pdf"
              download="Isnan_Rizqi_Kurniawan_CV.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-zinc-950 font-semibold text-xs transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
