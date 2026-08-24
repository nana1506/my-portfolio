"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SiteContent } from "@/lib/types";
import { LinkedInIcon } from "./Icons";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  MessageSquare,
  Sparkles,
} from "lucide-react";

interface ContactSectionProps {
  content: SiteContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const email = content.contactEmail || "isnan.rizqikurniawan@gmail.com";
  const linkedin = content.linkedinUrl || "https://www.linkedin.com/in/rizisnan";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      // Trigger the tracking endpoint
      await fetch("/api/contact-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          referrer: document.referrer || window.location.href,
          userAgent: navigator.userAgent,
        }),
      });
    } catch (err) {
      console.log("Telemetry logged via fallback");
    } finally {
      setIsSending(false);
      // Open mail client
      window.location.href = `mailto:${email}?subject=Analytics%20Opportunity%20/%20Inquiry`;
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-[var(--border-subtle)] relative overflow-hidden text-center"
        >
          {/* Subtle background glow effect */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-teal-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Section Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300 text-xs font-mono font-medium mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>06 // Let&apos;s Connect</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[var(--text-primary)] tracking-tight max-w-2xl mx-auto">
            Ready to Turn Complex Data into Business Levers?
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re modernizing your analytics data stack, building executive dashboards, or exploring full-time analytics leadership, I&apos;d love to connect.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            {/* Direct Mail Action (Hits /api/contact-click) */}
            <button
              onClick={handleEmailClick}
              disabled={isSending}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-zinc-950 font-semibold text-sm transition-all shadow-lg shadow-teal-500/25 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isSending ? "Opening Mail..." : "Send an Email"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* LinkedIn Link */}
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-medium text-sm transition-all hover:border-teal-500/40 active:scale-95 shadow-xs"
            >
              <LinkedInIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>

          {/* Copy Email Pill */}
          <div className="mt-8 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-[var(--text-muted)] font-mono">
            <span>Direct Email:</span>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)]">
              <Mail className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>{email}</span>
              <button
                onClick={handleCopyEmail}
                className="p-1 hover:text-teal-600 dark:hover:text-teal-400 transition-colors ml-1 cursor-pointer"
                title="Copy email address"
                aria-label="Copy email address"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-teal-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            {copied && (
              <span className="text-teal-600 dark:text-teal-400 font-sans font-medium animate-in fade-in">
                Copied to clipboard!
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
