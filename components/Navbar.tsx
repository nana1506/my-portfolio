"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, ArrowUpRight, BarChart3 } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#recommendations" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-xs py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo (Electric Blue & Sunset Orange Branding) */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-[var(--text-primary)] hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 group-hover:border-orange-500/50 transition-all">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-base leading-none text-[var(--text-primary)]">
              isnan<span className="text-orange-600 dark:text-orange-400 font-black">.data</span>
            </span>
            <span className="text-[10px] text-[var(--text-muted)] tracking-wider uppercase font-mono mt-0.5 font-bold">
              Senior Data Analyst
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[var(--bg-surface)]/80 backdrop-blur-sm border border-[var(--border-subtle)] px-3 py-1.5 rounded-full shadow-2xs">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-bold text-[var(--text-secondary)] hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1 rounded-full hover:bg-[var(--bg-surface-elevated)] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls (Theme Toggle + CTA) */}
        <div className="hidden sm:flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-600/20 hover:shadow-orange-500/20 active:scale-95 cursor-pointer"
          >
            <span>Let&apos;s Collaborate</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-orange-200" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/95 backdrop-blur-xl px-4 pt-3 pb-5 mt-2 space-y-2 animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-bold text-[var(--text-secondary)] hover:text-blue-600 dark:hover:text-blue-400 hover:bg-[var(--bg-surface-elevated)] rounded-md transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 text-sm font-bold bg-blue-600 dark:bg-blue-500 text-white py-2.5 rounded-xl shadow-md"
            >
              <span>Let&apos;s Collaborate</span>
              <ArrowUpRight className="w-4 h-4 text-orange-200" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
