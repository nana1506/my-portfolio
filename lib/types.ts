export interface SiteContent {
  heroHeadline: string;
  heroSubheadline: string;
  heroShortBio: string;
  aboutLongBio: string;
  aboutHighlights: string[];
  stats: { label: string; value: string; helper?: string }[];
  contactEmail: string;
  linkedinUrl: string;
  githubUrl?: string;
  resumeUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  companyLogo?: string;
  techStack: string[];
  problem?: string;
  role?: string;
  outcome?: string;
  metrics?: string[];
  link?: string;
  featured?: boolean;
}

export type SkillCategoryType =
  | "Technical Skills"
  | "BI & Visualization"
  | "Core Competencies"
  | "Professional Skills";

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategoryType | string;
  level?: "Expert" | "Advanced" | "Proficient";
  iconName?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  logo?: string;
  title: string;
  startDate: string;
  endDate: string;
  duration?: string;
  bullets: string[];
  location?: string;
}

export interface RecommendationItem {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorCompany?: string;
  avatarUrl?: string;
  linkedinUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  published: boolean;
  publishDate?: string;
  readTime?: string;
  tags?: string[];
}

export interface ContactClickPayload {
  timestamp: string;
  referrer: string;
  userAgent: string;
  ip?: string;
}
