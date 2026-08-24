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
      dot: "bg-blue-600 dark:bg-blue-400",
      pill: "border-blue-400/80 dark:border-blue-700 bg-blue-100 dark:bg-blue-950/70 text-blue-950 dark:text-blue-200",
      label: "Expert",
    };
  }
  if (normalized === "Advanced") {
    return {
      dot: "bg-orange-600 dark:bg-orange-400",
      pill: "border-orange-400/80 dark:border-orange-700 bg-orange-100 dark:bg-orange-950/70 text-orange-950 dark:text-orange-200",
      label: "Advanced",
    };
  }
  if (normalized === "Proficient" || normalized === "Intermediate") {
    return {
      dot: "bg-emerald-600 dark:bg-emerald-400",
      pill: "border-emerald-400/80 dark:border-emerald-700 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-200",
      label: "Proficient",
    };
  }
  return {
    dot: "bg-slate-600 dark:bg-slate-400",
    pill: "border-slate-400/80 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200",
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
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">
          <Cpu className="w-4 h-4 text-orange-600 dark:text-orange-400" />
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
                className="glass-card rounded-2xl p-6 sm:p-7 border border-[var(--border-subtle)] flex flex-col justify-between shadow-xs hover:border-blue-500/40"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
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

                  {/* Skills Pills with Distinct 3-Tier Colors */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {categorySkills.length > 0 ? (
                      categorySkills.map((skill) => {
                        const badge = getProficiencyBadge(skill.level);
                        return (
                          <div
                            key={skill.id || skill.name}
                            className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] transition-all text-xs font-bold text-[var(--text-primary)] shadow-2xs hover:border-blue-500/40"
                          >
                            <span className="text-blue-600 dark:text-blue-400 shrink-0">
                              {getTechIcon(skill.name, "w-3.5 h-3.5")}
                            </span>
                            <span className="text-[var(--text-primary)] font-bold">{skill.name}</span>
                            <span
                              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-extrabold border shadow-3xs ${badge.pill}`}
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
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
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
