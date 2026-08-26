import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Isnan Rizqi Kurniawan — Senior Data Analyst",
  description:
    "Senior Data Analyst specializing in end-to-end data pipelines, modern BI dashboards, and predictive decision frameworks. Turning raw data into strategic decisions.",
  keywords: [
    "Data Analyst",
    "Senior Data Analyst",
    "SQL",
    "dbt",
    "Tableau",
    "Power BI",
    "Looker",
    "Python",
    "Business Intelligence",
    "Data Storytelling",
  ],
  authors: [{ name: "Isnan Rizqi Kurniawan" }],
  openGraph: {
    title: "Isnan Rizqi Kurniawan — Senior Data Analyst",
    description:
      "Turning Raw Data into Strategic Dashboards & Decisions. Explore featured projects, BI architecture, and analytics engineering portfolio.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased flex flex-col selection:bg-teal-500/20 selection:text-teal-600 dark:selection:text-teal-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
