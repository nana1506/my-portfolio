"use client";

import React, { useEffect } from "react";
import { ProjectItem } from "@/lib/types";
import { X, ExternalLink, Layers, Target, UserCheck, TrendingUp, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getTechIcon } from "./Icons";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-orange-600 dark:text-orange-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Case Study Details</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[var(--text-primary)]">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close project modal"
                className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-5 space-y-6 overflow-y-auto pr-1">
              {/* Tech Stack Pills */}
              <div>
                <div className="text-xs font-mono uppercase font-bold text-[var(--text-muted)] mb-2">
                  Technologies & Tools
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs font-mono font-bold text-[var(--text-primary)] shadow-3xs"
                    >
                      <span className="text-blue-600 dark:text-blue-400">
                        {getTechIcon(tech, "w-3.5 h-3.5")}
                      </span>
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics Highlights if available */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-orange-100/80 dark:bg-orange-500/15 border border-orange-300 dark:border-orange-500/30 text-center shadow-3xs"
                    >
                      <span className="text-xs font-mono font-extrabold text-orange-950 dark:text-orange-200 block">
                        {metric}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Problem / Context */}
              {project.problem && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mb-1.5">
                    <Target className="w-4 h-4 text-orange-500" />
                    <span>The Problem & Context</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-surface-elevated)]/60 p-4 rounded-xl border border-[var(--border-subtle)] font-normal">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* Role & Engineering */}
              {project.role && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mb-1.5">
                    <UserCheck className="w-4 h-4 text-orange-500" />
                    <span>My Role & Engineering Execution</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-surface-elevated)]/60 p-4 rounded-xl border border-[var(--border-subtle)] font-normal">
                    {project.role}
                  </p>
                </div>
              )}

              {/* Impact / Outcome */}
              {project.outcome && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mb-1.5">
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <span>Measured Impact & Business Outcome</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-surface-elevated)]/60 p-4 rounded-xl border border-[var(--border-subtle)] font-normal">
                    {project.outcome}
                  </p>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-bold hover:bg-[var(--bg-surface-elevated)] transition-colors cursor-pointer"
              >
                Close Deep-Dive
              </button>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-500 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <span>Explore Live Asset</span>
                  <ExternalLink className="w-3.5 h-3.5 text-orange-200" />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
