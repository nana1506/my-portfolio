# Notion CMS Schema & Setup Guide

This portfolio website fetches live content directly from your Notion workspace using the Notion API. Any updates made in your Notion databases are automatically revalidated every 60 seconds.

---

## 1. Create a Notion Internal Integration
1. Go to [Notion Integrations](https://www.notion.so/my-integrations).
2. Click **+ New integration**.
3. Name it (e.g., `Portfolio CMS`), select your associated workspace, and grant **Read content**, **Update content**, and **Insert content** permissions.
4. Copy the **Internal Integration Secret** (starts with `secret_` or `ntn_`).
5. In your project, create a `.env.local` file (or copy `.env.example` to `.env.local`) and set:
   ```env
   NOTION_API_KEY=your_secret_key_here
   ```

---

## 2. Share Your Databases with the Integration
For **each** database created below:
1. Open the database in Notion.
2. Click the **`...`** (options) menu in the top-right corner.
3. Scroll to **Connections** > **Connect to** > select your integration name.
4. Copy the Database ID from the URL (e.g., in `https://notion.so/myworkspace/a8aec43acf71499... ?v=...`, the 32-character string before `?v=` is your database ID).

---

## 3. Database Schemas

### Database 1: Site Content (`NOTION_SITE_CONTENT_DB_ID`)
A key-value table storing high-level landing page text.
| Property Name | Type | Example Values |
|---|---|---|
| **Key** (or **Name**) | Title | `hero_headline`, `hero_subheadline`, `hero_short_bio`, `about_long_bio`, `about_highlights`, `contact_email`, `linkedin_url` |
| **Value** | Rich Text | Corresponding text content |

---

### Database 2: Projects (`NOTION_PROJECTS_DB_ID`)
Case studies and featured dashboards showcase.
| Property Name | Type | Description |
|---|---|---|
| **Title** (or **Name**) | Title | Name of the project/dashboard |
| **Short_Description** | Rich Text | 1-2 sentence overview for the card |
| **Tech_Stack** | Multi-Select | `SQL`, `Tableau`, `Python`, `dbt`, `Snowflake`, `Power BI`, etc. |
| **Company_Logo** | Files & media / URL | Logo or project thumbnail |
| **Problem** | Rich Text | Friction / challenge resolved |
| **Role** | Rich Text | Architecture and engineering approach |
| **Outcome** | Rich Text | Quantitative business metrics saved/gained |
| **Link** | URL | Live Tableau Public / Looker / GitHub URL |
| **Featured** | Checkbox | Featured on top |

---

### Database 3: Skills (`NOTION_SKILLS_DB_ID`)
Categorized technical and professional capabilities.
| Property Name | Type | Description / Options |
|---|---|---|
| **Name** | Title | Tool or skill (e.g. `dbt`, `SQL`, `Tableau`, `A/B Testing`) |
| **Category** | Select | `Technical Skills`, `BI & Visualization`, `Core Competencies`, `Professional Skills` |
| **Level** | Select | `Expert`, `Advanced`, `Proficient` |

---

### Database 4: Experience (`NOTION_EXPERIENCE_DB_ID`)
Career milestones and achievements timeline.
| Property Name | Type | Description |
|---|---|---|
| **Title** | Title | Role / Job title (e.g., `Senior Data Analyst`) |
| **Company** | Rich Text / Title | Company name |
| **Start_Date** | Rich Text / Date | e.g., `2022` or `Jan 2022` |
| **End_Date** | Rich Text / Date | e.g., `Present` or `Dec 2024` |
| **Bullets** | Rich Text | Bullet points separated by new lines |
| **Logo** | Files & media / URL | Company logo |

---

### Database 5: Recommendations (`NOTION_RECOMMENDATIONS_DB_ID`)
Endorsements and testimonials from colleagues and leadership.
| Property Name | Type | Description |
|---|---|---|
| **Quote** | Title / Rich Text | Endorsement snippet |
| **Author_Name** | Rich Text | Recommender's name |
| **Author_Title** | Rich Text | Role (e.g., `VP of Product & Growth`) |
| **Company** | Rich Text | Company name |

---

### Database 6: Blog (`NOTION_BLOG_DB_ID`) — *Scaffolded*
Ready for future article publishing.
| Property Name | Type | Description |
|---|---|---|
| **Title** | Title | Article title |
| **Slug** | Rich Text | URL slug (e.g., `executive-dashboards`) |
| **Excerpt** | Rich Text | Short preview summary |
| **Tags** | Multi-Select | `Data Viz`, `BI`, `dbt`, `SQL` |
| **Published** | Checkbox | Check to make visible on `/blog` |
| **Date** | Date | Publish date |

---

### Database 7: Contact Clicks (`NOTION_CONTACT_LOG_DB_ID`)
Automated log table receiving click events when visitors click "Get in Touch" / email links.
| Property Name | Type | Description |
|---|---|---|
| **Name** | Title | `Contact Click - <ISO timestamp>` (Auto-generated) |
| **Timestamp** | Rich Text | Exact click timestamp |
| **Referrer** | Rich Text | Web referrer URL |
| **User_Agent** | Rich Text | Browser / device user-agent string |
