"use client";

import React from "react";
import { motion } from "framer-motion";

export function DataBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle Coordinate Grid */}
      <div className="absolute inset-0 bg-data-grid opacity-60 dark:opacity-35" />

      {/* Radial soft gradient glow in hero region */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-teal-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-[60%] -left-40 w-[500px] h-[400px] bg-gradient-to-r from-sky-500/5 via-teal-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-[80%] -right-40 w-[500px] h-[400px] bg-gradient-to-l from-teal-500/5 via-emerald-500/5 to-transparent rounded-full blur-3xl" />

      {/* Subtle floating data-nodes / chart squiggles */}
      <svg
        className="absolute top-20 right-10 w-96 h-64 opacity-25 dark:opacity-20 hidden lg:block"
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M 10 180 Q 80 50 160 110 T 310 40 T 390 90"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="text-teal-600 dark:text-teal-400"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <circle cx="160" cy="110" r="3" className="fill-teal-500" />
        <circle cx="310" cy="40" r="3" className="fill-cyan-400" />
        <circle cx="390" cy="90" r="3" className="fill-teal-400" />
      </svg>

      {/* Subtle Scatter plot clusters in bottom left */}
      <svg
        className="absolute top-[50%] left-6 w-72 h-72 opacity-20 dark:opacity-15 hidden xl:block"
        viewBox="0 0 300 300"
        fill="none"
      >
        <circle cx="40" cy="220" r="2" className="fill-teal-500" />
        <circle cx="65" cy="190" r="2.5" className="fill-teal-400" />
        <circle cx="90" cy="170" r="2" className="fill-cyan-400" />
        <circle cx="130" cy="140" r="3" className="fill-teal-500" />
        <circle cx="170" cy="110" r="2" className="fill-teal-400" />
        <circle cx="210" cy="85" r="3.5" className="fill-cyan-500" />
        <circle cx="250" cy="50" r="2" className="fill-teal-300" />
        <line x1="20" y1="260" x2="280" y2="260" stroke="currentColor" strokeWidth="0.75" className="text-zinc-400 dark:text-zinc-700" />
        <line x1="20" y1="20" x2="20" y2="260" stroke="currentColor" strokeWidth="0.75" className="text-zinc-400 dark:text-zinc-700" />
      </svg>
    </div>
  );
}
