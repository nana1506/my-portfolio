import React from "react";
import {
  Database,
  Code2,
  LineChart,
  PieChart,
  Layers,
  Cpu,
  BarChart,
  BarChart2,
  BarChart3,
  Server,
  Cloud,
  Boxes,
  FileCode,
  Sigma,
  Workflow,
  Sparkles,
} from "lucide-react";

export function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// Tool Specific SVG and Vector Icons
export function PythonIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.91 2C6.98 2 7.28 4.14 7.28 4.14L7.3 6.36H12V7.05H5.06S2 6.7 2 11.72c0 5.03 2.68 4.86 2.68 4.86h1.6v-2.28s-.09-2.68 2.64-2.68h4.59s2.55.04 2.55-2.48V4.57S16.53 2 11.91 2zM9.4 3.75a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" />
      <path d="M12.09 22c4.93 0 4.63-2.14 4.63-2.14l-.02-2.22H12v-.69h6.94s3.06.35 3.06-4.67c0-5.03-2.68-4.86-2.68-4.86h-1.6v2.28s.09 2.68-2.64 2.68h-4.59s-2.55-.04-2.55 2.48v4.56S7.47 22 12.09 22zm2.51-1.75a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" />
    </svg>
  );
}

export function SQLIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return <Database className={className} />;
}

export function TableauIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.2 2.5h1.6v4.6h-1.6V2.5zm-5.1 4.2h1.5v3.4H4.2V8.6h1.9v-1.9zm10.3 0h1.5v1.9H20v1.5h-3.6V6.7zm-6.8 3.5h2.8v2.8H9.6v-2.8zm5.2 0h2.8v2.8h-2.8v-2.8zm-7.6 2.8h2.4v2.4H7.2V13zm10 0h2.4v2.4h-2.4V13zM9.6 15.8h2.8v2.8H9.6v-2.8zm5.2 0h2.8v2.8h-2.8v-2.8zm-3.6 2.8h1.6v4.6h-1.6v-4.6z" />
    </svg>
  );
}

export function PowerBIIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return <BarChart3 className={className} />;
}

export function DbtIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7.2v9.6L12 22l10-5.2V7.2L12 2zm0 3.3l6.4 3.3L12 12 5.6 8.6 12 5.3zM4.4 10.3L11 13.8v6.7L4.4 17v-6.7zm8.6 6.7v-6.7l6.6-3.5v6.7L13 17z" />
    </svg>
  );
}

export function SnowflakeIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}

export function BigQueryIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return <Cloud className={className} />;
}

export function PostgresIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return <Database className={className} />;
}

export function LookerIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return <PieChart className={className} />;
}

export function MetabaseIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return <BarChart2 className={className} />;
}

export function DockerIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return <Boxes className={className} />;
}

export function AirflowIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return <Workflow className={className} />;
}

export function RIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return <Sigma className={className} />;
}

// Master Tech Icon Resolver
export function getTechIcon(techName: string, className = "w-3.5 h-3.5") {
  const normalized = techName.toLowerCase().trim();

  if (normalized.includes("sql") || normalized.includes("query") || normalized.includes("mysql")) {
    return <SQLIcon className={className} />;
  }
  if (normalized.includes("python") || normalized.includes("pandas") || normalized.includes("scipy") || normalized.includes("numpy")) {
    return <PythonIcon className={className} />;
  }
  if (normalized.includes("tableau")) {
    return <TableauIcon className={className} />;
  }
  if (normalized.includes("power bi") || normalized.includes("dax") || normalized.includes("powerbi")) {
    return <PowerBIIcon className={className} />;
  }
  if (normalized.includes("dbt")) {
    return <DbtIcon className={className} />;
  }
  if (normalized.includes("snowflake")) {
    return <SnowflakeIcon className={className} />;
  }
  if (normalized.includes("bigquery") || normalized.includes("gcp") || normalized.includes("google")) {
    return <BigQueryIcon className={className} />;
  }
  if (normalized.includes("postgres") || normalized.includes("supabase")) {
    return <PostgresIcon className={className} />;
  }
  if (normalized.includes("looker") || normalized.includes("lookml")) {
    return <LookerIcon className={className} />;
  }
  if (normalized.includes("metabase") || normalized.includes("redash")) {
    return <MetabaseIcon className={className} />;
  }
  if (normalized.includes("airflow")) {
    return <AirflowIcon className={className} />;
  }
  if (normalized.includes("docker")) {
    return <DockerIcon className={className} />;
  }
  if (normalized === "r" || normalized.includes("stats")) {
    return <RIcon className={className} />;
  }

  // Fallback
  return <Code2 className={className} />;
}
