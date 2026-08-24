"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { RecommendationItem } from "@/lib/types";
import { LinkedInIcon } from "./Icons";
import { Quote, MessageSquareQuote, UserCheck, ArrowUpRight } from "lucide-react";

interface SocialProofSectionProps {
  recommendations: RecommendationItem[];
}

const LINKEDIN_RECOMMENDATIONS_URL =
  "https://www.linkedin.com/in/rizisnan/details/recommendations/";

export function SocialProofSection({
  recommendations,
}: SocialProofSectionProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for seamless continuous looping marquee
  const marqueeItems = [
    ...recommendations,
    ...recommendations,
    ...recommendations,
    ...recommendations,
  ];

  return (
    <section id="recommendations" className="py-20 overflow-hidden relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Section Header with Clickable LinkedIn Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">
              <MessageSquareQuote className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>05 // Social Proof & Endorsements</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--text-primary)] tracking-tight">
              What Colleagues & Leaders Say
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] font-normal max-w-xl">
              Direct testimonials from managers, cross-functional stakeholders, and engineering partners.
            </p>
          </div>

          <a
            href={LINKEDIN_RECOMMENDATIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-bold text-xs transition-all hover:border-blue-500/50 shadow-2xs self-start md:self-auto cursor-pointer group"
          >
            <LinkedInIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Verify on LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Infinite Horizontal Running Marquee Track */}
      <div
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Gradient Fade Edges for Professional News-Ticker Feel */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{
            x: isPaused ? undefined : ["-50%", "0%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
          className="flex gap-6 w-max"
        >
          {marqueeItems.map((rec, index) => (
            <a
              key={`${rec.id || index}-${index}`}
              href={LINKEDIN_RECOMMENDATIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card w-[340px] sm:w-[420px] rounded-2xl p-6 sm:p-7 border border-[var(--border-subtle)] flex flex-col justify-between relative group shadow-xs hover:border-blue-500/50 hover:shadow-lg transition-all cursor-pointer select-none shrink-0"
            >
              <div>
                {/* Header with Quote Icon & Relationship Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Quote className="w-4 h-4" />
                  </div>

                  {/* Relationship Pill Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/90 dark:bg-orange-950/70 text-zinc-950 dark:text-orange-100 border border-orange-400/80 dark:border-orange-500/50 text-[11px] font-mono font-extrabold shadow-xs">
                    <UserCheck className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                    <span>{rec.relationship || "Direct Collaborator"}</span>
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic font-normal line-clamp-4">
                  &ldquo;{rec.quote}&rdquo;
                </p>
              </div>

              {/* Author Attribution with Verified LinkedIn Indicator */}
              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-sm text-[var(--text-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {rec.authorName}
                  </h3>
                  <p className="text-xs text-blue-700 dark:text-blue-400 font-bold">
                    {rec.authorTitle}
                  </p>
                  {rec.authorCompany && (
                    <p className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5">
                      {rec.authorCompany}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 opacity-80 group-hover:opacity-100 group-hover:text-orange-500 transition-all">
                  <LinkedInIcon className="w-4 h-4" />
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Marquee Hint */}
      <div className="text-center mt-4">
        <span className="text-[11px] font-mono text-[var(--text-muted)] font-medium">
          Hover to pause • Click any card to read full recommendations on LinkedIn
        </span>
      </div>
    </section>
  );
}
