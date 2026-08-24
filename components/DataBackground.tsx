"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function DataBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Node & Particle network for analytics data flow
    const numPoints = Math.min(Math.floor(width / 35), 45);
    const points: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      colorType: "blue" | "orange";
    }[] = [];

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1,
        colorType: i % 4 === 0 ? "orange" : "blue",
      });
    }

    const isDark = resolvedTheme === "dark";

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nodes with subtle data stream lines
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw connections
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * (isDark ? 0.15 : 0.08);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle =
              p1.colorType === "orange" || p2.colorType === "orange"
                ? `rgba(249, 115, 22, ${alpha})`
                : `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        if (p1.colorType === "orange") {
          ctx.fillStyle = isDark
            ? "rgba(251, 146, 60, 0.4)"
            : "rgba(234, 88, 12, 0.35)";
        } else {
          ctx.fillStyle = isDark
            ? "rgba(96, 165, 250, 0.35)"
            : "rgba(37, 99, 235, 0.3)";
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-data-grid opacity-60 dark:opacity-40" />

      {/* Vibrant Ambient Glow Spheres (Electric Blue Top + Sunset Orange Bottom Right) */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/15 via-indigo-500/10 to-transparent dark:from-blue-600/20 dark:via-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-gradient-to-bl from-orange-500/15 via-amber-500/10 to-transparent dark:from-orange-500/20 dark:via-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 via-orange-500/10 to-transparent rounded-full blur-3xl" />

      {/* Canvas for data node constellation */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
