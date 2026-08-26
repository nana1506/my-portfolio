export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Declare gtag on window for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set",
      targetIdOrAction: string | Date,
      params?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Log page view in Google Analytics
 */
export function pageview(url: string) {
  if (typeof window === "undefined" || !GA_TRACKING_ID || !window.gtag) return;
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export interface GtagEventParams {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Generic Google Analytics event dispatcher
 */
export function trackEvent(action: string, params: GtagEventParams = {}) {
  if (typeof window === "undefined" || !window.gtag) {
    if (process.env.NODE_ENV === "development") {
      console.log(`[GA Event Dev Log]: ${action}`, params);
    }
    return;
  }
  window.gtag("event", action, params);
}

/**
 * Track CV / Resume downloads
 */
export function trackCvDownload(source: string, fileName = "Isnan_Rizqi_Kurniawan_CV.pdf") {
  trackEvent("cv_download", {
    category: "engagement",
    label: `CV Download from ${source}`,
    file_name: fileName,
    file_extension: "pdf",
    download_source: source,
  });
}

/**
 * Track Project case study modal inspection
 */
export function trackProjectView(projectTitle: string, projectId?: string) {
  trackEvent("view_project_detail", {
    category: "projects",
    label: projectTitle,
    project_title: projectTitle,
    project_id: projectId,
  });
}

/**
 * Track clicking external live project / dashboard asset link
 */
export function trackProjectLinkClick(projectTitle: string, url: string, linkType = "live_asset") {
  trackEvent("click_project_link", {
    category: "projects",
    label: `${projectTitle} - ${linkType}`,
    project_title: projectTitle,
    destination_url: url,
    link_type: linkType,
  });
}

/**
 * Track general outbound link clicks (e.g. LinkedIn, GitHub)
 */
export function trackOutboundLink(url: string, label: string) {
  trackEvent("outbound_click", {
    category: "navigation",
    label: label || url,
    destination_url: url,
  });
}

/**
 * Track contact form submission
 */
export function trackContactFormSubmit(collaborationType: string, company?: string) {
  trackEvent("contact_form_submit", {
    category: "lead_generation",
    label: collaborationType,
    collaboration_type: collaborationType,
    has_company: Boolean(company && company.trim().length > 0),
  });
}

/**
 * Track email copy to clipboard
 */
export function trackEmailCopy(source = "contact_section") {
  trackEvent("copy_email", {
    category: "contact",
    label: `Email copied from ${source}`,
    source,
  });
}

/**
 * Track social profile link clicks
 */
export function trackSocialClick(platform: string, url: string) {
  trackEvent("social_click", {
    category: "social",
    label: platform,
    social_platform: platform,
    destination_url: url,
  });
}

/**
 * Track navigation across sections
 */
export function trackSectionNav(section: string, navSource = "navbar") {
  trackEvent("section_nav", {
    category: "navigation",
    label: section,
    section_name: section,
    nav_source: navSource,
  });
}

/**
 * Track career milestone timeline inspection
 */
export function trackMilestoneView(company: string, title: string) {
  trackEvent("view_milestone", {
    category: "experience",
    label: `${company} - ${title}`,
    company_name: company,
    job_title: title,
  });
}

/**
 * Track dark / light theme toggle
 */
export function trackThemeToggle(newTheme: string) {
  trackEvent("theme_toggle", {
    category: "ui_preference",
    label: `Switched to ${newTheme}`,
    theme: newTheme,
  });
}
