"use client";

import React from "react";
import { motion } from "framer-motion";
import { SkillItem } from "@/lib/types";
import {
  Code2,
  PieChart,
  Target,
  Users2,
  Cpu,
  Check,
  Award,
} from "lucide-react";

interface SkillsSectionProps {
  skills: SkillItem[];
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
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
          <Cpu className="w-4 h-4" />
          <span>03 // Skills & Toolkit</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight">
          Modern Analytics Stack & Domain Expertise
        </h2>
        <p className="mt-3 text-sm text-[var(--text-secondary)] max-w-xl">
          A battle-tested technical and strategic toolset refined through enterprise data projects and fast-paced tech environments.
        </p>

        {/* Categories Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const categorySkills = skills.filter((s) => s.category === cat.name);

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
                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
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
                      categorySkills.map((skill) => (
                        <div
                          key={skill.id || skill.name}
                          className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-teal-500/40 transition-colors text-xs font-medium text-[var(--text-primary)]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                          <span>{skill.name}</span>
                          {skill.level && (
                            <span className="text-[10px] text-teal-600 dark:text-teal-400 font-mono opacity-80 group-hover:opacity-100">
                              • {skill.level}
                            </span>
                          )}
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-[var(--text-muted)] italic">
                        Loading skill items...
                      </span>
                    )}
                  </div>
                </div>

                {/* Sub-indicator */}
                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span>{categorySkills.length} Core Tools</span>
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">
                    Production Verified
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
