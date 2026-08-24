"use client";

import React from "react";
import { motion } from "framer-motion";
import { RecommendationItem } from "@/lib/types";
import { LinkedInIcon } from "./Icons";
import { Quote, MessageSquareQuote, Sparkles } from "lucide-react";

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
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
          <MessageSquareQuote className="w-4 h-4" />
          <span>05 // Social Proof & Testimonials</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] tracking-tight">
          What Colleagues & Leaders Say
        </h2>
        <p className="mt-3 text-sm text-[var(--text-secondary)] max-w-xl">
          Direct feedback and endorsements from engineering directors, VP of products, and marketing leads.
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
              className="glass-card rounded-2xl p-6 sm:p-7 border border-[var(--border-subtle)] flex flex-col justify-between relative group"
            >
              <div>
                {/* Quotation Icon Motif */}
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-5">
                  <Quote className="w-4 h-4" />
                </div>

                {/* Quote Text */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
                  &ldquo;{rec.quote}&rdquo;
                </p>
              </div>

              {/* Author Attribution */}
              <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-sm text-[var(--text-primary)]">
                    {rec.authorName}
                  </h3>
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                    {rec.authorTitle}
                  </p>
                  {rec.authorCompany && (
                    <p className="text-[11px] text-[var(--text-muted)] font-mono">
                      {rec.authorCompany}
                    </p>
                  )}
                </div>
                <div className="text-teal-600 dark:text-teal-400 opacity-60 group-hover:opacity-100 transition-opacity">
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
