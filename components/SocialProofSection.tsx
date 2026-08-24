"use client";

import React from "react";
import { motion } from "framer-motion";
import { RecommendationItem } from "@/lib/types";
import { LinkedInIcon } from "./Icons";
import { Quote, MessageSquareQuote, UserCheck, Sparkles } from "lucide-react";

interface SocialProofSectionProps {
  recommendations: RecommendationItem[];
}

export function SocialProofSection({
  recommendations,
}: SocialProofSectionProps) {
  return (
    <section id="recommendations" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400 mb-2">
          <MessageSquareQuote className="w-4 h-4" />
          <span>05 // Social Proof & Endorsements</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--text-primary)] tracking-tight">
          What Colleagues & Leaders Say
        </h2>
        <p className="mt-3 text-sm text-[var(--text-secondary)] max-w-xl font-normal">
          Direct endorsements highlighting cross-functional leadership, data rigor, and strategic impact.
        </p>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card rounded-2xl p-6 sm:p-7 border border-[var(--border-subtle)] flex flex-col justify-between relative group shadow-xs hover:border-teal-600/40"
            >
              <div>
                {/* Header with Quote Icon & Relationship Badge (High Contrast) */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-800 dark:text-teal-400 shrink-0">
                    <Quote className="w-4 h-4" />
                  </div>

                  {/* High Contrast Relationship Pill Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-500/15 text-teal-950 dark:text-teal-200 border border-teal-300 dark:border-teal-500/30 text-[11px] font-mono font-bold shadow-2xs">
                    <UserCheck className="w-3.5 h-3.5 text-teal-800 dark:text-teal-400" />
                    <span>{rec.relationship || "Direct Collaborator"}</span>
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic font-normal">
                  &ldquo;{rec.quote}&rdquo;
                </p>
              </div>

              {/* Author Attribution */}
              <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-sm text-[var(--text-primary)]">
                    {rec.authorName}
                  </h3>
                  <p className="text-xs text-teal-900 dark:text-teal-300 font-bold">
                    {rec.authorTitle}
                  </p>
                  {rec.authorCompany && (
                    <p className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5">
                      {rec.authorCompany}
                    </p>
                  )}
                </div>
                <div className="text-teal-800 dark:text-teal-400 opacity-70 group-hover:opacity-100 transition-opacity">
                  <LinkedInIcon className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
