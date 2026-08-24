import React from "react";
import Link from "next/link";
import { getBlogPosts } from "@/lib/notion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DataBackground } from "@/components/DataBackground";
import { BookOpen, ArrowLeft, Calendar, Clock, Tag, Sparkles } from "lucide-react";

export const revalidate = 60; // ISR revalidate every 60s

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      <DataBackground />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full relative z-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-teal-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Articles & Notes</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[var(--text-primary)] tracking-tight">
            Writing on Analytics & BI Strategy
          </h1>
          <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            Essays, case study writeups, and architectural blueprints on modern data stacks, executive dashboards, and analytics engineering.
          </p>
        </div>

        {/* Posts List */}
        {posts && posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="glass-card rounded-2xl p-6 sm:p-7 border border-[var(--border-subtle)] transition-all hover:border-teal-500/40"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-muted)] mb-3">
                  {post.publishDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishDate}
                    </span>
                  )}
                  {post.readTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)] hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border-subtle)]">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-[var(--bg-surface-elevated)] text-[11px] font-mono text-teal-700 dark:text-teal-300 border border-[var(--border-subtle)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          /* Empty / Scaffolded State */
          <div className="glass-card rounded-2xl p-12 text-center border border-[var(--border-subtle)]">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400 mx-auto mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
              Writing Section Ready
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-md mx-auto">
              This blog route is scaffolded and ready to stream articles from your Notion Blog Database. Publish articles in Notion with the `Published` checkbox checked.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
