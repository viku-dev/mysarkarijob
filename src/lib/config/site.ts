export const siteConfig = {
  name: "Government Career Portal",
  shortName: "Career Portal",
  tagline: "Structured government jobs, exams, results and admission updates.",
  description:
    "An independent information portal for government jobs, exams, results, admit cards, answer keys, universities and admission updates.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  contactEmail: "contact@example.com",
  disclaimer:
    "This is an independent information portal. Users should always verify recruitment, examination and admission information from the official notification and official website of the concerned organization.",
} as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Latest Jobs", href: "/jobs" },
  { label: "Exams", href: "/exams" },
  { label: "Results", href: "/results" },
  { label: "Admit Card", href: "/admit-card" },
  { label: "Answer Key", href: "/answer-key" },
  { label: "Universities", href: "/universities" },
  { label: "States", href: "/states" },
  { label: "Search", href: "/search" },
] as const;
