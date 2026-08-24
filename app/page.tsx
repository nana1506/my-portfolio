import React from "react";
import {
  getSiteContent,
  getProjects,
  getSkills,
  getExperience,
  getRecommendations,
  enrichSiteStats,
} from "@/lib/notion";
import { Navbar } from "@/components/Navbar";
import { HeroAboutSection } from "@/components/HeroAboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { DataBackground } from "@/components/DataBackground";

// ISR: Revalidate every 60 seconds so Notion updates reflect automatically
export const revalidate = 60;

export default async function HomePage() {
  // Fetch all data from Notion (or seamless fallback) in parallel
  const [rawSiteContent, projects, skills, experience, recommendations] =
    await Promise.all([
      getSiteContent(),
      getProjects(),
      getSkills(),
      getExperience(),
      getRecommendations(),
    ]);

  // Compute live dynamic stats based on actual Notion databases + custom overrides
  const siteContent = enrichSiteStats(
    rawSiteContent,
    projects,
    skills,
    experience,
    recommendations
  );

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-blue-500/20 selection:text-blue-600 dark:selection:text-orange-300">
      {/* Decorative Data Grid & Sparklines Canvas */}
      <DataBackground />

      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Single Page Scroll Sections */}
      <main className="flex-1 w-full relative z-10">
        {/* 1 & 2. Unified Hero + About (Side-by-Side) with Dynamic Metrics under */}
        <HeroAboutSection content={siteContent} />

        {/* 3. Featured Work & Project Case Studies (with tool vector icons) */}
        <ProjectsSection projects={projects} />

        {/* 4. Skills & Ranked Proficiency */}
        <SkillsSection skills={skills} />

        {/* 5. Horizontal Career Milestones & Experience */}
        <ExperienceSection experience={experience} />

        {/* 6. Social Proof & Endorsements with Relationship Tags */}
        <SocialProofSection recommendations={recommendations} />

        {/* 7. Collaboration Contact Form */}
        <ContactSection content={siteContent} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
