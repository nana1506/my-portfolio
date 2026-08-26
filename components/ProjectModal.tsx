"use client";

import React, { useEffect, useState } from "react";
import { ProjectItem } from "@/lib/types";
import {
  X,
  ExternalLink,
  Target,
  UserCheck,
  TrendingUp,
  Sparkles,
  BarChart3,
  MonitorCheck,
  Maximize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getTechIcon } from "./Icons";
import { normalizeImageUrl } from "@/lib/notion";
import { trackProjectLinkClick } from "@/lib/analytics";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      setImgError(false);
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  const dashboardImg = project?.dashboardImage
    ? normalizeImageUrl(project.dashboardImage)
    : undefined;

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
          />

          {/* Wide Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-5xl xl:max-w-6xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-3xl shadow-2xl p-5 sm:p-7 lg:p-8 z-10 my-4 lg:my-6 overflow-hidden max-h-[92vh] flex flex-col hover:border-blue-500/40 transition-colors"
          >
            {/* Header: Title + Tag + Close Button */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--border-subtle)] shrink-0">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/90 dark:bg-orange-950/70 border border-orange-400/80 dark:border-orange-500/50 text-xs font-mono font-bold text-orange-700 dark:text-orange-300 mb-1.5 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                  <span>Production Analytics Case Study</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-[var(--text-primary)] tracking-tight">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close project modal"
                className="p-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Side-by-Side Responsive Layout */}
            <div className="mt-6 overflow-y-auto pr-1 flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Left Column: Large Dashboard / Result Showcase & Key Metrics (7 cols on desktop) */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Dashboard Preview Browser/Window Chrome Frame */}
                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] overflow-hidden shadow-lg group relative">
                    {/* Window Titlebar */}
                    <div className="px-4 py-2.5 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-subtle)] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
                      </div>
                      <div className="text-[11px] font-mono font-bold text-[var(--text-muted)] truncate flex items-center gap-1.5">
                        <MonitorCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Interactive Dashboard Result Preview</span>
                      </div>
                      <div className="w-8 flex justify-end">
                        <Maximize2 className="w-3.5 h-3.5 text-[var(--text-muted)] opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Image / Visual Container */}
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                      {dashboardImg && !imgError ? (
                        <img
                          src={dashboardImg}
                          alt={`${project.title} dashboard result`}
                          onError={() => setImgError(true)}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[var(--bg-surface-elevated)] to-[var(--bg-surface)] text-blue-600 dark:text-blue-400">
                          <BarChart3 className="w-16 h-16 mb-2 opacity-80" />
                          <h4 className="font-display font-bold text-base text-[var(--text-primary)]">
                            {project.title}
                          </h4>
                          <p className="text-xs text-[var(--text-muted)] max-w-sm mt-1">
                            Live telemetry and production BI architecture verified in production environment.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metrics Highlights Cards under Dashboard */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div>
                      <div className="text-xs font-mono uppercase font-bold text-[var(--text-muted)] mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                        <span>Measured Performance Metrics</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {project.metrics.map((metric, i) => (
                          <div
                            key={i}
                            className="p-3.5 rounded-xl bg-orange-100/90 dark:bg-orange-950/60 border border-orange-400/70 dark:border-orange-500/40 text-center shadow-xs hover:border-orange-500 transition-colors"
                          >
                            <span className="text-xs sm:text-sm font-mono font-black text-orange-950 dark:text-orange-200 block">
                              {metric}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div>
                    <div className="text-xs font-mono uppercase font-bold text-[var(--text-muted)] mb-2">
                      Engineered With
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono font-bold text-[var(--text-primary)] shadow-2xs hover:border-blue-500/50 transition-colors"
                        >
                          <span className="text-blue-600 dark:text-blue-400">
                            {getTechIcon(tech, "w-3.5 h-3.5")}
                          </span>
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Deep Dive Narrative & Business Context (5 cols on desktop) */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Overview Brief */}
                  <div className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal bg-[var(--bg-surface-elevated)]/50 p-4 rounded-xl border border-[var(--border-subtle)]">
                    {project.shortDescription}
                  </div>

                  {/* Problem / Context */}
                  {project.problem && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 dark:text-blue-400">
                        <Target className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span>The Problem & Context</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-surface-elevated)]/80 p-4 rounded-xl border border-[var(--border-subtle)] font-normal">
                        {project.problem}
                      </p>
                    </div>
                  )}

                  {/* Role & Engineering Execution */}
                  {project.role && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 dark:text-blue-400">
                        <UserCheck className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span>My Role & Engineering Execution</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-surface-elevated)]/80 p-4 rounded-xl border border-[var(--border-subtle)] font-normal">
                        {project.role}
                      </p>
                    </div>
                  )}

                  {/* Impact / Outcome */}
                  {project.outcome && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 dark:text-blue-400">
                        <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span>Measured Impact & Business Outcome</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-surface-elevated)]/80 p-4 rounded-xl border border-[var(--border-subtle)] font-normal">
                        {project.outcome}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between shrink-0">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-xs font-bold text-[var(--text-primary)] transition-all cursor-pointer active:scale-95 shadow-xs"
              >
                Close Deep-Dive
              </button>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackProjectLinkClick(project.title, project.link || "", "case_study_live_asset")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-blue-600/25 hover:shadow-orange-500/25 active:scale-95 cursor-pointer"
                >
                  <span>Explore Live Asset</span>
                  <ExternalLink className="w-4 h-4 text-orange-200" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
