"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ProjectItem } from "@/lib/types";
import { ProjectModal } from "./ProjectModal";
import {
  BarChart3,
  Layers,
  ArrowUpRight,
  Sparkles,
  Database,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Extract all unique tech tags for filter pills
  const allTags = ["All", "SQL", "Tableau", "Python", "dbt", "Power BI", "Looker"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) =>
          p.techStack.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
        );

  return (
    <section id="work" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
              <Layers className="w-4 h-4" />
              <span>02 // Featured Work & Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight">
              Production Dashboards & Analytics Architectures
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md">
            Click on any case study card to inspect the full business context, engineering pipeline, and measured revenue impact.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeFilter === tag
                  ? "bg-teal-600 dark:bg-teal-500 text-white dark:text-zinc-950 font-bold shadow-xs"
                  : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-teal-500/40"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="glass-card group rounded-2xl p-6 sm:p-7 border border-[var(--border-subtle)] cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle top corner gradient accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Header: Project Badge & Tech Stack */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
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
                  <div className="flex items-center gap-1.5 text-xs font-mono text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-[var(--text-primary)] group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>

              {/* Bottom: Tags and Metrics */}
              <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] space-y-3">
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Key Metric highlight preview if present */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex items-center gap-2 text-[11px] font-mono text-teal-600 dark:text-teal-400 font-semibold pt-1">
                    <Sparkles className="w-3.5 h-3.5" />
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
