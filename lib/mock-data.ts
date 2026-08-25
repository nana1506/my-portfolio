import {
  SiteContent,
  ProjectItem,
  SkillItem,
  ExperienceItem,
  RecommendationItem,
  BlogPost,
} from "./types";

export const initialSiteContent: SiteContent = {
  heroHeadline: "Senior Data Analyst",
  heroSubheadline: "Turning Raw Data into Strategic Dashboards & Decisions",
  heroShortBio:
    "Specializing in architecting enterprise analytics pipelines, executive BI reporting, and predictive decision models. I bridge the gap between raw data and high-impact business strategy.",
  aboutLongBio:
    "With 6+ years of experience across high-growth tech, e-commerce, and enterprise analytics, I transform messy multi-source data warehouses into clean, actionable intelligence.\n\nMy analytical philosophy balances rigorous dimensional modeling with intuitive, visually compelling dashboards that drive billion-row decisions with speed and confidence.",
  aboutHighlights: [
    "Enterprise Data Modeling & Architecture",
    "Executive BI & Real-time KPI Dashboards",
    "Customer Segmentation & Cohort Retention Analytics",
    "A/B Testing Frameworks & Experimentation",
  ],
  coreSkills: [
    "Data Modeling & Architecture",
    "Executive BI Dashboards",
    "Statistical Experimentation",
    "Revenue & Churn Analytics",
    "Cross-Functional Leadership",
  ],
  stats: [
    { label: "Years Experience", value: "6+", helper: "Enterprise & Tech" },
    { label: "Data Pipelines & Models", value: "120+", helper: "Production dbt/SQL" },
    { label: "Dashboards Deployed", value: "45+", helper: "Used daily by C-Suite" },
    { label: "Measured Business Impact", value: "$4.2M+", helper: "Identified Cost/Rev Ops" },
  ],
  profilePhoto: "/profile.png",
  contactEmail: "isnan.rizqikurniawan@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/rizisnan",
  githubUrl: "https://github.com",
  resumeUrl: "/Isnan_Rizqi_Kurniawan_CV.pdf",
};

export const initialProjects: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Executive Revenue & Churn Intelligence Engine",
    shortDescription:
      "Unified multi-channel billing and product telemetry into a single real-time executive dashboard predicting customer churn risk.",
    techStack: ["SQL", "dbt", "Tableau", "Snowflake", "Python"],
    problem:
      "Enterprise churn signals were scattered across Stripe, Salesforce, and Postgres event logs, creating an average 3-week lag before CS teams detected high-risk account contractions.",
    role: "Lead Analytics Engineer & Data Architect: Designed dimensional star-schema models in Snowflake using dbt, integrated automated ML churn-scoring scripts in Python, and built real-time Tableau alerting dashboards.",
    outcome:
      "Reduced early churn detection latency from 21 days to under 4 hours. Enabled the Customer Success team to retain $1.8M in ARR within the first two quarters.",
    metrics: ["-32% Account Churn", "$1.8M ARR Saved", "<4hr Alert Latency"],
    link: "https://tableau.com",
    featured: true,
  },
  {
    id: "proj-2",
    title: "Omnichannel E-Commerce Marketing Attribution & LTV Modeler",
    shortDescription:
      "Algorithmic multi-touch attribution model and predictive Customer Lifetime Value (pLTV) cohort visualization platform.",
    techStack: ["BigQuery", "Looker", "Python", "dbt", "SQL"],
    problem:
      "Marketing spend of $400k/month across Meta, Google Ads, TikTok, and Affiliate channels suffered from last-click bias, leading to misallocated acquisition budgets and declining ROAS.",
    role: "Senior Data Analyst: Built Shapley-value and Markov-chain attribution models in Python/BigQuery, developed automated dbt ingestion for ad networks, and surfaced interactive Looker cohort drilldowns for growth leads.",
    outcome:
      "Optimized quarterly ad spend allocation by 28%, boosted blended ROAS from 2.1x to 3.4x, and established predictive 90-day LTV forecasts with 91% accuracy.",
    metrics: ["+62% Blended ROAS", "91% LTV Accuracy", "$400k/mo Optimized"],
    link: "https://looker.google.com",
    featured: true,
  },
  {
    id: "proj-3",
    title: "Supply Chain Warehouse Throughput & SLA Bottleneck Analysis",
    shortDescription:
      "Real-time operational monitoring dashboard mapping fulfillment station velocity, inventory aging, and dispatch bottlenecks.",
    techStack: ["PostgreSQL", "Power BI", "Python", "Docker", "Airflow"],
    problem:
      "Peak season order fulfillment times were failing SLA guarantees by 18% due to undetected batching delays across sorting conveyor hubs.",
    role: "Analytics Consultant: Profiled million-row IoT scanner events, engineered rolling queue-time metrics in PostgreSQL, and designed an operator-facing Power BI live wallboard with automated threshold triggers.",
    outcome:
      "Decreased order fulfillment cycle time by 24% and improved SLA compliance from 82% to 98.6% across 3 distribution hubs.",
    metrics: ["98.6% SLA Compliance", "-24% Order Cycle Time", "3 Hubs Live"],
    link: "https://powerbi.microsoft.com",
    featured: true,
  },
  {
    id: "proj-4",
    title: "Growth Funnel & A/B Experimentation Decision Platform",
    shortDescription:
      "Self-service experiment evaluation dashboard with Bayesian statistical significance calculators and automated anomaly detection.",
    techStack: ["SQL", "Metabase", "Python", "PostgreSQL"],
    problem:
      "Product managers were making inconsistent launch decisions on feature flags due to mismatched statistical significance formulas and sample ratio mismatches (SRM).",
    role: "Data Analyst & Tooling Developer: Standardized experiment sample size estimation, SRM validation checks, and Bayesian credible intervals into an automated reporting pipeline in Metabase & SQL.",
    outcome:
      "Empowered 8 product squads to run and evaluate over 50 experiments per quarter without dedicated analyst bandwidth, cutting experiment decision time by 70%.",
    metrics: ["50+ Experiments/Qtr", "70% Faster Decisions", "Zero SRM False Positives"],
    link: "https://metabase.com",
    featured: false,
  },
];

export const initialSkills: SkillItem[] = [
  // Technical Skills
  { id: "sk-1", name: "SQL (Advanced & Optimization)", category: "Technical Skills", level: "Expert" },
  { id: "sk-2", name: "Python (Pandas, NumPy, SciPy)", category: "Technical Skills", level: "Expert" },
  { id: "sk-3", name: "dbt (Data Build Tool)", category: "Technical Skills", level: "Expert" },
  { id: "sk-4", name: "PostgreSQL & MySQL", category: "Technical Skills", level: "Expert" },
  { id: "sk-5", name: "Snowflake & BigQuery", category: "Technical Skills", level: "Advanced" },
  { id: "sk-6", name: "Git & CI/CD Pipelines", category: "Technical Skills", level: "Advanced" },
  { id: "sk-7", name: "R & Statistical Modeling", category: "Technical Skills", level: "Proficient" },

  // BI & Visualization
  { id: "sk-8", name: "Tableau Desktop & Server", category: "BI & Visualization", level: "Expert" },
  { id: "sk-9", name: "Power BI & DAX", category: "BI & Visualization", level: "Expert" },
  { id: "sk-10", name: "Metabase & Redash", category: "BI & Visualization", level: "Expert" },
  { id: "sk-11", name: "Data Storytelling & UX Design", category: "BI & Visualization", level: "Expert" },
  { id: "sk-12", name: "Looker & LookML", category: "BI & Visualization", level: "Advanced" },

  // Core Competencies
  { id: "sk-13", name: "Data Modeling & Star Schema", category: "Core Competencies", level: "Expert" },
  { id: "sk-14", name: "A/B Testing & Experimentation", category: "Core Competencies", level: "Expert" },
  { id: "sk-15", name: "Cohort & Retention Dynamics", category: "Core Competencies", level: "Expert" },
  { id: "sk-16", name: "Revenue & Funnel Analytics", category: "Core Competencies", level: "Expert" },
  { id: "sk-17", name: "Customer LTV & CAC Modeler", category: "Core Competencies", level: "Advanced" },
  { id: "sk-18", name: "Predictive Churn & Forecasting", category: "Core Competencies", level: "Advanced" },

  // Professional Skills
  { id: "sk-19", name: "Executive Stakeholder Management", category: "Professional Skills", level: "Expert" },
  { id: "sk-20", name: "Cross-Functional Leadership", category: "Professional Skills", level: "Expert" },
  { id: "sk-21", name: "Agile Analytics Delivery", category: "Professional Skills", level: "Advanced" },
  { id: "sk-22", name: "Data Governance & Quality SLA", category: "Professional Skills", level: "Advanced" },
  { id: "sk-23", name: "Team Mentorship & Technical Training", category: "Professional Skills", level: "Advanced" },
];

export const initialExperience: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Enterprise Tech Solutions",
    title: "Senior Data Analyst",
    startDate: "2022",
    endDate: "Present",
    duration: "2+ yrs",
    location: "Jakarta / Hybrid",
    bullets: [
      "Architected enterprise-wide dbt semantic layers and transformed raw clickstream and transactional datasets into automated Snowflake marts serving 300+ daily internal users.",
      "Designed and deployed executive C-Suite command dashboards in Tableau tracking ARR, NDR, customer health scores, and quarterly financial forecasts.",
      "Spearheaded company-wide A/B experimentation standards, reducing decision cycle time by 40% and preventing revenue-degrading launches.",
      "Mentored junior analytics team members on advanced SQL optimization, lowering Snowflake monthly query costs by 22%.",
    ],
  },
  {
    id: "exp-2",
    company: "E-Commerce Scaleup",
    title: "Lead BI & Analytics Analyst",
    startDate: "2020",
    endDate: "2022",
    duration: "2 yrs",
    location: "Jakarta, Indonesia",
    bullets: [
      "Built multi-touch marketing attribution and algorithmic customer segmentation models across $5M+ annual advertising budgets.",
      "Standardized 20+ core business metrics into single-source-of-truth Looker dashboards used by Product, Marketing, and Operations leads.",
      "Conducted weekly cohort retention studies and churn root-cause investigations that contributed to a 14% improvement in 90-day re-order rates.",
    ],
  },
  {
    id: "exp-3",
    company: "Global Digital Agency",
    title: "Data Analyst",
    startDate: "2018",
    endDate: "2020",
    duration: "2 yrs",
    location: "Jakarta, Indonesia",
    bullets: [
      "Extracted, cleansed, and analyzed multi-client data feeds from Google Analytics, Meta Ads, and internal CRM systems using Python and SQL.",
      "Created automated weekly performance decks and interactive Power BI reports for FMCG and Fintech client stakeholders.",
      "Automated manual data extraction spreadsheets into Python ETL pipelines, saving 15+ analyst hours every week.",
    ],
  },
];

export const initialRecommendations: RecommendationItem[] = [
  {
    id: "rec-1",
    quote:
      "Isnan has an extraordinary ability to dissect chaotic data landscapes and translate them into crystal-clear strategic recommendations. His dashboards were the bedrock of our weekly leadership meetings.",
    authorName: "Rian Pratama",
    authorTitle: "VP of Product & Growth",
    authorCompany: "Enterprise Tech Solutions",
    relationship: "Direct Manager & VP",
  },
  {
    id: "rec-2",
    quote:
      "Working with Isnan transformed our marketing efficiency. He not only uncovered why our customer acquisition costs were climbing but built the predictive LTV model that allowed us to scale profitably.",
    authorName: "Sarah Chen",
    authorTitle: "Head of Performance Marketing",
    authorCompany: "E-Commerce Scaleup",
    relationship: "Cross-Functional Stakeholder",
  },
  {
    id: "rec-3",
    quote:
      "A rare data professional who excels equally at complex SQL/dbt data engineering and polished executive storytelling. He raises the analytical rigor of every team he joins.",
    authorName: "Dimas Wicaksono",
    authorTitle: "Director of Engineering & Data",
    authorCompany: "Global Digital Agency",
    relationship: "Engineering Director",
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Art of the Executive Dashboard: Why Less is More in High-Stakes BI",
    slug: "executive-dashboard-design-principles",
    excerpt:
      "How to avoid metric overload and design command centers that executives actually use to make million-dollar decisions.",
    published: true,
    publishDate: "2026-08-15",
    readTime: "5 min read",
    tags: ["Data Viz", "BI", "Tableau"],
  },
  {
    id: "blog-2",
    title: "Bridging the Gap: How dbt Transformed Our Analytics Engineering Stack",
    slug: "dbt-modern-analytics-engineering",
    excerpt:
      "A practical case study on adopting semantic layers, version control, and data testing to eliminate metric discrepancy nightmares.",
    published: true,
    publishDate: "2026-07-28",
    readTime: "7 min read",
    tags: ["dbt", "SQL", "Data Modeling"],
  },
];
