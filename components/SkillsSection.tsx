"use client";

import React from "react";
import { motion } from "framer-motion";
import { SkillItem } from "@/lib/types";
import { getTechIcon } from "./Icons";
import {
  Code2,
  PieChart,
  Target,
  Users2,
  Cpu,
} from "lucide-react";

interface SkillsSectionProps {
  skills: SkillItem[];
}

const levelWeight: Record<string, number> = {
  Expert: 4,
  Advanced: 3,
  Proficient: 2,
  Intermediate: 2,
  Beginner: 1,
};

function getProficiencyBadge(level?: string) {
  const normalized = level || "Expert";
  if (normalized === "Expert") {
    return {
      dot: "bg-emerald-500",
      pill: "border-emerald-600/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
      label: "Expert",
    };
  }
  if (normalized === "Advanced") {
    return {
      dot: "bg-sky-500",
      pill: "border-sky-600/30 bg-sky-500/10 text-sky-800 dark:text-sky-300",
      label: "Advanced",
    };
  }
  if (normalized === "Proficient" || normalized === "Intermediate") {
    return {
      dot: "bg-amber-500",
      pill: "border-amber-600/30 bg-amber-500/10 text-amber-800 dark:text-amber-300",
      label: "Proficient",
    };
  }
  return {
    dot: "bg-slate-400",
    pill: "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300",
    label: "Beginner",
  };
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = [
    {
      name: "Technical Skills",
      icon: Code2,
      description: "Data modeling, transformation, querying, and pipelines",
    },
    {
      name: "BI & Visualization",
      icon: PieChart,
      description: "Executive dashboards, reporting UI, and visual storytelling",
    },
    {
      name: "Core Competencies",
      icon: Target,
      description: "Experimentation, cohort dynamics, and predictive modeling",
    },
    {
      name: "Professional Skills",
      icon: Users2,
      description: "Stakeholder alignment, data governance, and analytics leadership",
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header (without 'heatmap' in title or legend) */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-2">
          <Cpu className="w-4 h-4" />
          <span>03 // Skills & Toolkit</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--text-primary)] tracking-tight">
              Modern Analytics Stack & Domain Expertise
            </h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)] max-w-xl font-normal">
              Organized by category and ranked by proficiency, from high-throughput production tools to core analytics principles.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            // Filter and sort skills from highest level (Expert -> Advanced -> Proficient -> Beginner)
            const categorySkills = skills
              .filter((s) => s.category === cat.name)
              .sort(
                (a, b) =>
                  (levelWeight[b.level || "Expert"] || 0) -
                  (levelWeight[a.level || "Expert"] || 0)
              );

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-6 sm:p-7 border border-[var(--border-subtle)] flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-700 dark:text-teal-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-[var(--text-muted)] font-mono">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {categorySkills.length > 0 ? (
                      categorySkills.map((skill) => {
                        const badge = getProficiencyBadge(skill.level);
                        return (
                          <div
                            key={skill.id || skill.name}
                            className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] transition-all text-xs font-medium text-[var(--text-primary)] shadow-2xs hover:border-teal-500/40"
                          >
                            <span className="text-teal-700 dark:text-teal-400">
                              {getTechIcon(skill.name, "w-3.5 h-3.5")}
                            </span>
                            <span>{skill.name}</span>
                            <span
                              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${badge.pill}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                              <span>{badge.label}</span>
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <span className="text-xs text-[var(--text-muted)] italic">
                        Loading skills...
                      </span>
                    )}
                  </div>
                </div>

                {/* Sub-indicator */}
                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span>{categorySkills.length} Core Tools</span>
                  <span className="text-teal-700 dark:text-teal-400 font-bold">
                    Ranked by Proficiency
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
