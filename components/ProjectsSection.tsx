"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ProjectItem } from "@/lib/types";
import { ProjectModal } from "./ProjectModal";
import { getTechIcon } from "./Icons";
import {
  BarChart3,
  Layers,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="work" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">
              <Layers className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>02 // Featured Work & Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--text-primary)] tracking-tight">
              Production Dashboards & Analytics Architectures
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md font-normal">
            Click any case study card to inspect the problem context, engineering pipeline, and measured revenue impact.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="glass-card group rounded-2xl p-6 sm:p-7 border border-[var(--border-subtle)] cursor-pointer flex flex-col justify-between relative overflow-hidden shadow-xs hover:border-blue-500/50"
            >
              {/* Subtle top corner gradient accent (Blue & Orange) */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-orange-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Header: Project Badge & Action Hint */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 group-hover:bg-orange-500/10 group-hover:text-orange-600 group-hover:border-orange-500/30 transition-all shrink-0">
                    {project.companyLogo ? (
                      <img
                        src={project.companyLogo}
                        alt={project.title}
                        className="w-6 h-6 object-contain rounded-sm"
                      />
                    ) : (
                      <BarChart3 className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all">
                    <span>Inspect Deep-Dive</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-extrabold text-[var(--text-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
                  {project.shortDescription}
                </p>
              </div>

              {/* Bottom: Tech Stack with Tool Icons & Metrics */}
              <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] space-y-3">
                {/* Tech Pills with Tool Vector Icons */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono font-bold text-[var(--text-primary)] hover:border-blue-500/40 transition-colors shadow-2xs"
                    >
                      <span className="text-blue-600 dark:text-blue-400 shrink-0">
                        {getTechIcon(tech, "w-3.5 h-3.5")}
                      </span>
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>

                {/* Key Metric highlight preview with Vibrant Orange contrast */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-orange-100/80 dark:bg-orange-500/15 border border-orange-300 dark:border-orange-500/30 text-xs font-mono text-orange-950 dark:text-orange-200 font-extrabold mt-1 shadow-3xs">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                    <span>Impact: {project.metrics[0]}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for Deep Dive */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
