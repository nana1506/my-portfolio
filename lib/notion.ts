import {
  SiteContent,
  ProjectItem,
  SkillItem,
  ExperienceItem,
  RecommendationItem,
  BlogPost,
  ContactClickPayload,
} from "./types";
import {
  initialSiteContent,
  initialProjects,
  initialSkills,
  initialExperience,
  initialRecommendations,
  initialBlogPosts,
} from "./mock-data";

// Helper to sanitize Notion Database IDs
export function cleanDatabaseId(id?: string): string | null {
  if (!id || typeof id !== "string") return null;
  const trimmed = id.trim();
  if (
    !trimmed ||
    trimmed.startsWith("your_") ||
    trimmed.includes("placeholder")
  ) {
    return null;
  }

  const hexMatch = trimmed.match(/[a-fA-F0-9]{32}/);
  if (hexMatch) {
    return hexMatch[0];
  }

  const uuidMatch = trimmed.match(
    /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/
  );
  if (uuidMatch) {
    return uuidMatch[0].replace(/-/g, "");
  }

  return null;
}

// Helper to query Notion databases via standard REST API
async function queryDatabase(rawDbId?: string, filter?: any): Promise<any> {
  const dbId = cleanDatabaseId(rawDbId);
  const apiKey = process.env.NOTION_API_KEY?.trim();
  if (!apiKey || apiKey.startsWith("your_") || !dbId) return null;

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filter ? { filter } : {}),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.warn(`[Notion Notice] Could not fetch DB (${dbId}):`, err.message || res.statusText);
      return null;
    }

    return await res.json();
  } catch (error: any) {
    console.warn(`[Notion Notice] Fetch error for DB (${dbId}):`, error?.message || error);
    return null;
  }
}

// Helper to extract text from Notion rich_text or title properties
function getText(prop: any): string {
  if (!prop) return "";
  if (prop.title && Array.isArray(prop.title) && prop.title.length > 0) {
    return prop.title.map((t: any) => t.plain_text).join("");
  }
  if (prop.rich_text && Array.isArray(prop.rich_text) && prop.rich_text.length > 0) {
    return prop.rich_text.map((t: any) => t.plain_text).join("");
  }
  return "";
}

// Helper to extract select name
function getSelect(prop: any): string {
  if (!prop || !prop.select) return "";
  return prop.select.name || "";
}

// Helper to extract multi-select names
function getMultiSelect(prop: any): string[] {
  if (!prop || !prop.multi_select || !Array.isArray(prop.multi_select)) return [];
  return prop.multi_select.map((item: any) => item.name);
}

// Helper to extract file / image URL
function getFileUrl(prop: any): string | undefined {
  if (!prop) return undefined;
  if (prop.url) return prop.url;
  if (prop.files && Array.isArray(prop.files) && prop.files.length > 0) {
    const file = prop.files[0];
    return file.file?.url || file.external?.url || undefined;
  }
  return undefined;
}

// Helper to parse and format Notion Date or Rich Text date properties cleanly
function formatNotionDate(prop: any, isEnd: boolean = false): string {
  if (!prop) return isEnd ? "Present" : "";

  // 1. Notion Date Object type
  if (prop.type === "date" || prop.date) {
    const dateObj = prop.date || prop;
    const rawVal = isEnd ? (dateObj.end || dateObj.start) : dateObj.start;
    if (!rawVal) return isEnd ? "Present" : "";

    try {
      const parts = rawVal.split("-");
      if (parts.length >= 2) {
        const year = parts[0];
        const monthNum = parseInt(parts[1], 10);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthName = monthNames[monthNum - 1] || "";
        return monthName ? `${monthName} ${year}` : year;
      }
      return rawVal;
    } catch {
      return rawVal;
    }
  }

  // 2. Rich Text / Title date
  const text = getText(prop);
  if (text) return text;

  return isEnd ? "Present" : "";
}

// Helper to get numeric timestamp for sorting experience
function getTimestampForSort(prop: any): number {
  if (!prop) return 0;
  if (prop.date?.start) {
    return new Date(prop.date.start).getTime() || 0;
  }
  const text = getText(prop);
  if (text) {
    const match = text.match(/\d{4}/);
    if (match) return parseInt(match[0], 10) * 10000;
  }
  return 0;
}

// 1. Fetch Site Content (Hero, Bios, Meta)
export async function getSiteContent(): Promise<SiteContent> {
  const dbId = process.env.NOTION_SITE_CONTENT_DB_ID;
  if (!cleanDatabaseId(dbId)) {
    return initialSiteContent;
  }

  try {
    const response: any = await queryDatabase(dbId);

    if (!response || !response.results || response.results.length === 0) {
      return initialSiteContent;
    }

    const kv: Record<string, string> = {};
    for (const page of response.results) {
      const key = getText(page.properties.Key || page.properties.Name || page.properties.key);
      const value = getText(page.properties.Value || page.properties.Content || page.properties.value);
      if (key) kv[key.toLowerCase()] = value;
    }

    // Dynamic stats parsing if explicitly defined in Notion Site Content DB
    const stats = [
      {
        label: kv["stat_1_label"] || "Years Experience",
        value: kv["stat_1_val"] || kv["stats_years"] || initialSiteContent.stats[0].value,
        helper: kv["stat_1_help"] || "Enterprise & Tech",
      },
      {
        label: kv["stat_2_label"] || "Production Case Studies",
        value: kv["stat_2_val"] || kv["stats_pipelines"] || initialSiteContent.stats[1].value,
        helper: kv["stat_2_help"] || "Production Architectures",
      },
      {
        label: kv["stat_3_label"] || "Core Analytics Tools",
        value: kv["stat_3_val"] || kv["stats_dashboards"] || initialSiteContent.stats[2].value,
        helper: kv["stat_3_help"] || "Ranked by Proficiency",
      },
      {
        label: kv["stat_4_label"] || "Measured Business Impact",
        value: kv["stat_4_val"] || kv["stats_impact"] || initialSiteContent.stats[3].value,
        helper: kv["stat_4_help"] || "Identified Cost/Rev Ops",
      },
    ];

    const coreSkills = kv["core_skills"]
      ? kv["core_skills"].split("\n").map((s) => s.replace(/^[-*•]\s*/, "").trim()).filter(Boolean)
      : initialSiteContent.coreSkills;

    const profilePhoto =
      kv["profile_photo"] ||
      kv["avatar_url"] ||
      kv["photo"] ||
      initialSiteContent.profilePhoto;

    return {
      heroHeadline: kv["hero_headline"] || kv["headline"] || initialSiteContent.heroHeadline,
      heroSubheadline: kv["hero_subheadline"] || kv["subheadline"] || initialSiteContent.heroSubheadline,
      heroShortBio: kv["hero_short_bio"] || kv["short_bio"] || initialSiteContent.heroShortBio,
      aboutLongBio: kv["about_long_bio"] || kv["long_bio"] || initialSiteContent.aboutLongBio,
      aboutHighlights: kv["about_highlights"]
        ? kv["about_highlights"].split("\n").filter(Boolean)
        : initialSiteContent.aboutHighlights,
      coreSkills,
      stats,
      profilePhoto,
      contactEmail: kv["contact_email"] || initialSiteContent.contactEmail,
      linkedinUrl: kv["linkedin_url"] || initialSiteContent.linkedinUrl,
      githubUrl: kv["github_url"] || initialSiteContent.githubUrl,
      resumeUrl: kv["resume_url"] || initialSiteContent.resumeUrl,
    };
  } catch (error) {
    return initialSiteContent;
  }
}

// Dynamic Stat Calculator: Computes real-time numbers from your Notion databases
export function enrichSiteStats(
  siteContent: SiteContent,
  projects: ProjectItem[],
  skills: SkillItem[],
  experience: ExperienceItem[],
  recommendations: RecommendationItem[]
): SiteContent {
  // 1. Calculate dynamic Years of Experience from the earliest career start date
  let dynamicYOE = "6+";
  if (experience.length > 0) {
    const years = experience
      .map((e) => {
        const match = e.startDate.match(/\d{4}/);
        return match ? parseInt(match[0], 10) : null;
      })
      .filter((y): y is number => y !== null);
    if (years.length > 0) {
      const earliest = Math.min(...years);
      const currentYear = new Date().getFullYear();
      const diff = Math.max(1, currentYear - earliest);
      dynamicYOE = `${diff}+`;
    }
  }

  // 2. Count live projects from Notion
  const projectCount = projects.length > 0 ? `${projects.length}` : "4+";

  // 3. Count live skills & tools from Notion
  const skillCount = skills.length > 0 ? `${skills.length}+` : "20+";

  const updatedStats = [
    {
      label: siteContent.stats[0]?.label || "Years Experience",
      value:
        siteContent.stats[0]?.value &&
        siteContent.stats[0]?.value !== initialSiteContent.stats[0].value
          ? siteContent.stats[0].value
          : dynamicYOE,
      helper: siteContent.stats[0]?.helper || "Enterprise & Tech",
    },
    {
      label: siteContent.stats[1]?.label || "Production Case Studies",
      value:
        siteContent.stats[1]?.value &&
        siteContent.stats[1]?.value !== initialSiteContent.stats[1].value
          ? siteContent.stats[1].value
          : projectCount,
      helper: siteContent.stats[1]?.helper || "Production Architectures",
    },
    {
      label: siteContent.stats[2]?.label || "Core Analytics Tools",
      value:
        siteContent.stats[2]?.value &&
        siteContent.stats[2]?.value !== initialSiteContent.stats[2].value
          ? siteContent.stats[2].value
          : skillCount,
      helper: siteContent.stats[2]?.helper || "Ranked by Proficiency",
    },
    {
      label: siteContent.stats[3]?.label || "Measured Business Impact",
      value: siteContent.stats[3]?.value || "$4.2M+",
      helper: siteContent.stats[3]?.helper || "Identified Cost/Rev Ops",
    },
  ];

  return {
    ...siteContent,
    stats: updatedStats,
  };
}

// 2. Fetch Projects
export async function getProjects(): Promise<ProjectItem[]> {
  const dbId = process.env.NOTION_PROJECTS_DB_ID;
  if (!cleanDatabaseId(dbId)) {
    return initialProjects;
  }

  try {
    const response: any = await queryDatabase(dbId);

    if (!response || !response.results || response.results.length === 0) {
      return initialProjects;
    }

    return response.results.map((page: any, index: number): ProjectItem => {
      const p = page.properties;
      const title = getText(p.Title || p.Name || p.title) || `Project ${index + 1}`;
      const shortDesc = getText(p.Short_Description || p.Description || p.short_description);
      const techStack = getMultiSelect(p.Tech_Stack || p.tech_stack || p.Tags || p.tags);
      const logo = getFileUrl(p.Company_Logo || p.company_logo || p.Logo || p.logo || p.Image);
      const problem = getText(p.Problem || p.problem);
      const role = getText(p.Role || p.role);
      const outcome = getText(p.Outcome || p.outcome);
      const link = p.Link?.url || p.URL?.url || p.link?.url || undefined;
      const featured = p.Featured?.checkbox || false;

      return {
        id: page.id,
        title,
        shortDescription: shortDesc || "Project case study overview.",
        techStack: techStack.length > 0 ? techStack : ["Data Analytics", "SQL"],
        companyLogo: logo,
        problem: problem || undefined,
        role: role || undefined,
        outcome: outcome || undefined,
        link,
        featured,
      };
    });
  } catch (error) {
    return initialProjects;
  }
}

// 3. Fetch Skills
export async function getSkills(): Promise<SkillItem[]> {
  const dbId = process.env.NOTION_SKILLS_DB_ID;
  if (!cleanDatabaseId(dbId)) {
    return initialSkills;
  }

  try {
    const response: any = await queryDatabase(dbId);

    if (!response || !response.results || response.results.length === 0) {
      return initialSkills;
    }

    return response.results.map((page: any): SkillItem => {
      const p = page.properties;
      const name = getText(p.Name || p.Skill || p.name);
      const category = getSelect(p.Category || p.category) || "Technical Skills";
      const level = (getSelect(p.Level || p.level) as any) || "Expert";

      return {
        id: page.id,
        name: name || "Analytics Skill",
        category,
        level,
      };
    });
  } catch (error) {
    return initialSkills;
  }
}

// 4. Fetch Experience (Accurate Date Parsing & Chronological Sorting)
export async function getExperience(): Promise<ExperienceItem[]> {
  const dbId = process.env.NOTION_EXPERIENCE_DB_ID;
  if (!cleanDatabaseId(dbId)) {
    return initialExperience;
  }

  try {
    const response: any = await queryDatabase(dbId);

    if (!response || !response.results || response.results.length === 0) {
      return initialExperience;
    }

    const items: { item: ExperienceItem; sortScore: number }[] = response.results.map((page: any): { item: ExperienceItem; sortScore: number } => {
      const p = page.properties;
      const company = getText(p.Company || p.company || p.Name);
      const title = getText(p.Title || p.title || p.Role);
      
      const startProp = p.start_date || p.Start_Date || p.Date || p.Start || p.start;
      const endProp = p.end_date || p.End_Date || p.End || p.end;

      const startDate = formatNotionDate(startProp, false) || "2022";
      const endDate = formatNotionDate(endProp, true) || "Present";

      const bulletsRaw = getText(p.Bullets || p.bullets || p.Description || p.description);
      const bullets = bulletsRaw
        ? bulletsRaw.split("\n").map((b: string) => b.replace(/^[-*•]\s*/, "").trim()).filter(Boolean)
        : [];
      const logo = getFileUrl(p.company_logo || p.Company_Logo || p.Logo || p.logo);

      const sortScore = getTimestampForSort(startProp) + (endDate === "Present" ? 10000000000000 : 0);

      return {
        item: {
          id: page.id,
          company: company || "Organization",
          title: title || "Data Analyst",
          startDate,
          endDate,
          bullets: bullets.length > 0 ? bullets : ["Led analytics initiatives and metric modeling."],
          logo,
        },
        sortScore,
      };
    });

    // Sort chronologically: newest/current first (e.g. Data Analyst 2022 -> HR Ops 2021 -> Head of Talent 2020)
    return items.sort((a, b) => b.sortScore - a.sortScore).map((wrapper) => wrapper.item);
  } catch (error) {
    return initialExperience;
  }
}

// 5. Fetch Recommendations
export async function getRecommendations(): Promise<RecommendationItem[]> {
  const dbId = process.env.NOTION_RECOMMENDATIONS_DB_ID;
  if (!cleanDatabaseId(dbId)) {
    return initialRecommendations;
  }

  try {
    const response: any = await queryDatabase(dbId);

    if (!response || !response.results || response.results.length === 0) {
      return initialRecommendations;
    }

    return response.results.map((page: any): RecommendationItem => {
      const p = page.properties;
      const quote = getText(p.Quote || p.quote || p.Recommendation || p.recommendation);
      const authorName = getText(p.Author_Name || p.author_name || p.Name || p.name);
      const authorTitle = getText(p.Author_Title || p.author_title || p.Title || p.title);
      const authorCompany = getText(p.Company || p.company);
      const relationship = getText(p.Relationship || p.relationship || p.Context || p.context) || getSelect(p.Relationship);

      return {
        id: page.id,
        quote: quote || "Great collaborator and analytics professional.",
        authorName: authorName || "Colleague",
        authorTitle: authorTitle || "Leadership",
        authorCompany,
        relationship: relationship || undefined,
      };
    });
  } catch (error) {
    return initialRecommendations;
  }
}

// 6. Fetch Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const dbId = process.env.NOTION_BLOG_DB_ID;
  if (!cleanDatabaseId(dbId)) {
    return initialBlogPosts;
  }

  try {
    const response: any = await queryDatabase(dbId);

    if (!response || !response.results || response.results.length === 0) {
      return initialBlogPosts;
    }

    return response.results
      .map((page: any): BlogPost => {
        const p = page.properties;
        const title = getText(p.Title || p.Name || p.title);
        const slug = getText(p.Slug || p.slug) || page.id;
        const excerpt = getText(p.Excerpt || p.excerpt || p.Summary);
        const published = p.Published?.checkbox ?? true;
        const publishDate = p.Date?.date?.start || undefined;
        const tags = getMultiSelect(p.Tags || p.tags);

        return {
          id: page.id,
          title: title || "Analytics Article",
          slug,
          excerpt,
          published,
          publishDate,
          tags,
        };
      })
      .filter((post: BlogPost) => post.published);
  } catch (error) {
    return initialBlogPosts;
  }
}

// 7. Log Contact Click or Collaboration Submission to Notion
export async function logContactClick(payload: ContactClickPayload): Promise<boolean> {
  const rawDbId = process.env.NOTION_CONTACT_LOG_DB_ID;
  const dbId = cleanDatabaseId(rawDbId);
  const apiKey = process.env.NOTION_API_KEY?.trim();
  if (!apiKey || apiKey.startsWith("your_") || !dbId) {
    console.log("[Notion Log Fallback] Contact submission received:", payload);
    return false;
  }

  try {
    const titleText = payload.name
      ? `Collaboration Form: ${payload.name} (${payload.email || "No email"})`
      : `Contact Click - ${new Date().toISOString()}`;

    await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: dbId },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: titleText,
                },
              },
            ],
          },
          Timestamp: {
            rich_text: [
              {
                text: {
                  content: payload.timestamp,
                },
              },
            ],
          },
          Referrer: {
            rich_text: [
              {
                text: {
                  content: payload.referrer || "Direct / Form",
                },
              },
            ],
          },
          User_Agent: {
            rich_text: [
              {
                text: {
                  content: payload.message
                    ? `[Msg]: ${payload.message} | [Org]: ${payload.company || "N/A"} | [Type]: ${payload.collaborationType || "General"}`
                    : payload.userAgent ? payload.userAgent.substring(0, 2000) : "Unknown",
                },
              },
            ],
          },
        },
      }),
    });

    return true;
  } catch (error: any) {
    console.warn("[Notion Notice] Failed to log submission:", error?.message || error);
    return false;
  }
}
