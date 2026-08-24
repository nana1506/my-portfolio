"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SiteContent } from "@/lib/types";
import { LinkedInIcon } from "./Icons";
import confetti from "canvas-confetti";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  MessageSquare,
  Sparkles,
  User,
  Building,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

interface ContactSectionProps {
  content: SiteContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    collaborationType: "BI & Dashboard Architect",
    message: "",
  });

  const email = content.contactEmail || "isnan.rizqikurniawan@gmail.com";
  const linkedin = content.linkedinUrl || "https://www.linkedin.com/in/rizisnan";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/contact-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          collaborationType: formData.collaborationType,
          message: formData.message,
          timestamp: new Date().toISOString(),
          referrer: document.referrer || window.location.href,
          userAgent: navigator.userAgent,
        }),
      });

      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // confetti fallback
      }
    } catch (err) {
      console.error("Submission error:", err);
      // fallback to mailto
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        `Collaboration Inquiry: ${formData.collaborationType} from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`
      )}`;
    } finally {
      setIsSubmitting(false);
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
          className="glass-card rounded-3xl p-8 sm:p-12 border border-[var(--border-subtle)] relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-teal-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Section Indicator */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-600/30 bg-teal-500/10 text-teal-800 dark:text-teal-300 text-xs font-mono font-bold mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>06 // Let&apos;s Collaborate</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[var(--text-primary)] tracking-tight max-w-2xl mx-auto leading-tight">
              Let&apos;s Build Data-Driven Solutions Together
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed font-normal">
              Have an analytics initiative, leadership opportunity, or dashboard architecture in mind? Fill in the details below and I&apos;ll get back to you promptly.
            </p>
          </div>

          {/* Form / Submitted Confirmation State */}
          {submitted ? (
            <div className="text-center py-10 bg-[var(--bg-surface-elevated)]/70 rounded-2xl border border-teal-500/30 p-8">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/15 border border-teal-500/40 flex items-center justify-center text-teal-700 dark:text-teal-300 mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-[var(--text-primary)]">
                Collaboration Request Received!
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                Thank you for reaching out, <strong>{formData.name}</strong>. Your message and information have been logged, and I will review and reply to <strong>{formData.email}</strong> shortly.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <a
                  href={`mailto:${email}?subject=Follow-up:%20${encodeURIComponent(formData.collaborationType)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 dark:bg-teal-500 text-white dark:text-zinc-950 text-xs font-semibold hover:bg-teal-700 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Direct Email Follow-up</span>
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--border-subtle)] text-xs font-medium hover:bg-[var(--bg-surface-elevated)] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono font-semibold text-[var(--text-primary)] mb-1.5">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] focus:border-teal-500 focus:outline-hidden text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono font-semibold text-[var(--text-primary)] mb-1.5">
                    Your Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] focus:border-teal-500 focus:outline-hidden text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Organization / Company */}
                <div>
                  <label className="block text-xs font-mono font-semibold text-[var(--text-primary)] mb-1.5">
                    Organization / Company
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp / Tech Scaleup"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] focus:border-teal-500 focus:outline-hidden text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors"
                    />
                  </div>
                </div>

                {/* Collaboration Type with Exact Requested Options */}
                <div>
                  <label className="block text-xs font-mono font-semibold text-[var(--text-primary)] mb-1.5">
                    Collaboration Type
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formData.collaborationType}
                      onChange={(e) =>
                        setFormData({ ...formData, collaborationType: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] focus:border-teal-500 focus:outline-hidden text-sm text-[var(--text-primary)] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="BI & Dashboard Architect">BI & Dashboard Architect</option>
                      <option value="Full-Time Analytics Role">Full-Time Analytics Role</option>
                      <option value="Data Modeling">Data Modeling</option>
                      <option value="AdHoc Analysis or Presentation">AdHoc Analysis or Presentation</option>
                      <option value="Consulting & Advisory">Consulting & Advisory</option>
                      <option value="Others collaboration">Others collaboration</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[var(--text-primary)] mb-1.5">
                  Message / Project Goals *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share a brief overview of your analytics goals, timeline, or discussion topics..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] focus:border-teal-500 focus:outline-hidden text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-zinc-950 font-bold text-sm transition-all shadow-md shadow-teal-600/20 active:scale-95 cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Sending..." : "Submit Collaboration Message"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-medium text-xs transition-all hover:border-teal-500/40 active:scale-95 shadow-xs"
                >
                  <LinkedInIcon className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </form>
          )}

          {/* Copy Email Pill Footer */}
          <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-[var(--text-muted)] font-mono">
            <span>Direct Email:</span>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)]">
              <Mail className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
              <span>{email}</span>
              <button
                onClick={handleCopyEmail}
                type="button"
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
              <span className="text-teal-700 dark:text-teal-400 font-sans font-semibold animate-in fade-in">
                Copied to clipboard!
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
