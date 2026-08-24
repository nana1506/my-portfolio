import React from "react";
import {
  getSiteContent,
  getProjects,
  getSkills,
  getExperience,
  getRecommendations,
} from "@/lib/notion";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { DataBackground } from "@/components/DataBackground";

// ISR: Revalidate every 60 seconds so Notion changes populate automatically
export const revalidate = 60;

export default async function HomePage() {
  // Fetch all Notion data in parallel on the server
  const [siteContent, projects, skills, experience, recommendations] =
    await Promise.all([
      getSiteContent(),
      getProjects(),
      getSkills(),
      getExperience(),
      getRecommendations(),
    ]);

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-teal-500/20 selection:text-teal-600 dark:selection:text-teal-300">
      {/* Decorative Data-themed Background Canvas & Grid */}
      <DataBackground />

      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Main Single Page Scroll Content */}
      <main className="flex-1 w-full relative z-10">
        {/* 1. Hero */}
        <HeroSection content={siteContent} />

        {/* 2. About */}
        <AboutSection content={siteContent} />

        {/* 3. Work / Project Showcase */}
        <ProjectsSection projects={projects} />

        {/* 4. Skills */}
        <SkillsSection skills={skills} />

        {/* 5. Experience */}
        <ExperienceSection experience={experience} />

        {/* 6. Social Proof / Recommendations */}
        <SocialProofSection recommendations={recommendations} />

        {/* 7. Contact (Hits /api/contact-click -> Notion -> mailto) */}
        <ContactSection content={siteContent} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
