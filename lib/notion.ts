import { Client } from "@notionhq/client";
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

// Initialize Notion Client safely
const notion = process.env.NOTION_API_KEY
  ? new Client({ auth: process.env.NOTION_API_KEY })
  : null;

// Helper to query databases safely across client versions
async function queryDatabase(databaseId: string, filter?: any): Promise<any> {
  if (!notion) return null;
  const client = notion as any;
  if (typeof client.databases?.query === "function") {
    return client.databases.query({
      database_id: databaseId,
      ...(filter ? { filter } : {}),
    });
  }
  if (typeof client.request === "function") {
    return client.request({
      path: `databases/${databaseId}/query`,
      method: "POST",
      body: filter ? { filter } : {},
    });
  }
  return null;
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

// 1. Fetch Site Content (Hero, Bios, Meta)
export async function getSiteContent(): Promise<SiteContent> {
  const dbId = process.env.NOTION_SITE_CONTENT_DB_ID;
  if (!notion || !dbId) {
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

    return {
      heroHeadline: kv["hero_headline"] || kv["headline"] || initialSiteContent.heroHeadline,
      heroSubheadline: kv["hero_subheadline"] || kv["subheadline"] || initialSiteContent.heroSubheadline,
      heroShortBio: kv["hero_short_bio"] || kv["short_bio"] || initialSiteContent.heroShortBio,
      aboutLongBio: kv["about_long_bio"] || kv["long_bio"] || initialSiteContent.aboutLongBio,
      aboutHighlights: kv["about_highlights"]
        ? kv["about_highlights"].split("\n").filter(Boolean)
        : initialSiteContent.aboutHighlights,
      stats: initialSiteContent.stats,
      contactEmail: kv["contact_email"] || initialSiteContent.contactEmail,
      linkedinUrl: kv["linkedin_url"] || initialSiteContent.linkedinUrl,
      githubUrl: kv["github_url"] || initialSiteContent.githubUrl,
      resumeUrl: kv["resume_url"] || initialSiteContent.resumeUrl,
    };
  } catch (error) {
    console.error("Error fetching site content from Notion:", error);
    return initialSiteContent;
  }
}

// 2. Fetch Projects
export async function getProjects(): Promise<ProjectItem[]> {
  const dbId = process.env.NOTION_PROJECTS_DB_ID;
  if (!notion || !dbId) {
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
    console.error("Error fetching projects from Notion:", error);
    return initialProjects;
  }
}

// 3. Fetch Skills
export async function getSkills(): Promise<SkillItem[]> {
  const dbId = process.env.NOTION_SKILLS_DB_ID;
  if (!notion || !dbId) {
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
    console.error("Error fetching skills from Notion:", error);
    return initialSkills;
  }
}

// 4. Fetch Experience
export async function getExperience(): Promise<ExperienceItem[]> {
  const dbId = process.env.NOTION_EXPERIENCE_DB_ID;
  if (!notion || !dbId) {
    return initialExperience;
  }

  try {
    const response: any = await queryDatabase(dbId);

    if (!response || !response.results || response.results.length === 0) {
      return initialExperience;
    }

    return response.results.map((page: any): ExperienceItem => {
      const p = page.properties;
      const company = getText(p.Company || p.company || p.Name);
      const title = getText(p.Title || p.title || p.Role);
      const startDate = getText(p.Start_Date || p.start_date) || p.Date?.date?.start || "";
      const endDate = getText(p.End_Date || p.end_date) || p.Date?.date?.end || "Present";
      const bulletsRaw = getText(p.Bullets || p.bullets || p.Description || p.description);
      const bullets = bulletsRaw
        ? bulletsRaw.split("\n").map((b: string) => b.replace(/^[-*•]\s*/, "").trim()).filter(Boolean)
        : [];
      const logo = getFileUrl(p.Logo || p.logo || p.Company_Logo);

      return {
        id: page.id,
        company: company || "Organization",
        title: title || "Data Analyst",
        startDate: startDate || "2022",
        endDate: endDate || "Present",
        bullets: bullets.length > 0 ? bullets : ["Led analytics initiatives and metric modeling."],
        logo,
      };
    });
  } catch (error) {
    console.error("Error fetching experience from Notion:", error);
    return initialExperience;
  }
}

// 5. Fetch Recommendations
export async function getRecommendations(): Promise<RecommendationItem[]> {
  const dbId = process.env.NOTION_RECOMMENDATIONS_DB_ID;
  if (!notion || !dbId) {
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

      return {
        id: page.id,
        quote: quote || "Great collaborator and analytics professional.",
        authorName: authorName || "Colleague",
        authorTitle: authorTitle || "Leadership",
        authorCompany,
      };
    });
  } catch (error) {
    console.error("Error fetching recommendations from Notion:", error);
    return initialRecommendations;
  }
}

// 6. Fetch Blog Posts (Scaffolded)
export async function getBlogPosts(): Promise<BlogPost[]> {
  const dbId = process.env.NOTION_BLOG_DB_ID;
  if (!notion || !dbId) {
    return initialBlogPosts;
  }

  try {
    const response: any = await queryDatabase(dbId, {
      property: "Published",
      checkbox: {
        equals: true,
      },
    });

    if (!response || !response.results || response.results.length === 0) {
      return initialBlogPosts;
    }

    return response.results.map((page: any): BlogPost => {
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
    });
  } catch (error) {
    console.error("Error fetching blog posts from Notion:", error);
    return initialBlogPosts;
  }
}

// 7. Log Contact Click to Notion
export async function logContactClick(payload: ContactClickPayload): Promise<boolean> {
  const dbId = process.env.NOTION_CONTACT_LOG_DB_ID;
  if (!notion || !dbId) {
    console.log("[Notion Log Fallback] Contact click received:", payload);
    return false;
  }

  try {
    await (notion as any).pages.create({
      parent: { database_id: dbId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: `Contact Click - ${new Date().toISOString()}`,
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
                content: payload.referrer || "Direct / None",
              },
            },
          ],
        },
        User_Agent: {
          rich_text: [
            {
              text: {
                content: payload.userAgent ? payload.userAgent.substring(0, 2000) : "Unknown",
              },
            },
          ],
        },
      },
    });
    return true;
  } catch (error) {
    console.error("Error logging contact click to Notion:", error);
    return false;
  }
}
