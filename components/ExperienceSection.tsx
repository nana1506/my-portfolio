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
  CheckCircle2,
} from "lucide-react";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  // Track expanded state for each experience card (default first is open)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    [experience[0]?.id || "exp-1"]: true,
  });

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
          <Briefcase className="w-4 h-4" />
          <span>04 // Career History</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight">
          Professional Experience & Milestones
        </h2>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          A track record of building trusted analytics infrastructures, scaling business metrics, and leading cross-functional data programs.
        </p>

        {/* Experience Timeline */}
        <div className="mt-12 space-y-6">
          {experience.map((item, index) => {
            const isExpanded = !!expandedCards[item.id];
            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl border border-[var(--border-subtle)] p-6 sm:p-7 relative transition-all"
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleCard(item.id)}
                  className="flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0 mt-0.5">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.company}
                          className="w-7 h-7 object-contain rounded-sm"
                        />
                      ) : (
                        <Building className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-[var(--text-muted)] font-mono">
                        <span className="font-semibold text-teal-600 dark:text-teal-400">
                          {item.company}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.startDate} — {item.endDate}
                        </span>
                        {item.duration && <span>({item.duration})</span>}
                        {item.location && (
                          <>
                            <span>•</span>
                            <span>{item.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Toggle button */}
                  <button
                    aria-label={isExpanded ? "Collapse achievements" : "Expand achievements"}
                    className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Accomplishments Bullets */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] space-y-3">
                        {item.bullets.map((bullet, bIdx) => (
                          <div
                            key={bIdx}
                            className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-2" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapsed peek hint */}
                {!isExpanded && item.bullets.length > 0 && (
                  <div
                    onClick={() => toggleCard(item.id)}
                    className="mt-3 text-xs text-[var(--text-muted)] hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer font-mono flex items-center gap-1"
                  >
                    <span>Show {item.bullets.length} key achievements</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA below experience */}
        <div className="mt-10 text-center">
          <div className="glass-card p-6 rounded-2xl border border-[var(--border-subtle)] inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-left">
            <div>
              <div className="text-sm font-bold text-[var(--text-primary)]">
                Looking for detailed technical impact & certifications?
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                Download comprehensive resume with project references and credentials.
              </div>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-zinc-950 font-medium text-xs transition-all shadow-sm active:scale-95 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Full CV</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
