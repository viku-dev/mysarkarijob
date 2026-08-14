import type { Job, OfficialLink, VacancyDetail } from "@/types/content";

export function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function isValidSlug(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export function isValidUrl(value: string): boolean {
  try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol); } catch { return false; }
}

export function isNonNegative(value: number | undefined): boolean {
  return value === undefined || (Number.isFinite(value) && value >= 0);
}

export function validateVacancyRows(rows: VacancyDetail[] = []): string[] {
  const errors: string[] = [];
  rows.forEach((row, index) => {
    if (!row.postName.trim()) errors.push(`Vacancy row ${index + 1}: post name is required.`);
    ["total", "ur", "obc", "sc", "st", "ews"].forEach((key) => {
      const value = row[key as keyof VacancyDetail];
      if (typeof value === "number" && !isNonNegative(value)) errors.push(`Vacancy row ${index + 1}: ${key.toUpperCase()} must be non-negative.`);
    });
  });
  return errors;
}

export function validateOfficialLinks(links: OfficialLink[] = [], publishing = false): string[] {
  const errors: string[] = [];
  links.forEach((link, index) => {
    if (!link.label.trim()) errors.push(`Official link ${index + 1}: label is required.`);
    if (!isValidUrl(link.url)) errors.push(`Official link ${index + 1}: enter a valid URL.`);
  });
  if (publishing && !links.some((link) => link.active && link.type === "OFFICIAL_NOTIFICATION" && isValidUrl(link.url))) {
    errors.push("Official Notification link is required before publishing.");
  }
  return errors;
}

export function validateJobDraft(job: Partial<Job>): string[] {
  const errors: string[] = [];
  if (!job.title?.trim()) errors.push("Job title is required.");
  if (job.slug && !isValidSlug(job.slug)) errors.push("Slug must be lowercase and URL-safe.");
  if (job.vacancy !== undefined && !isNonNegative(job.vacancy)) errors.push("Total vacancy must be non-negative.");
  errors.push(...validateVacancyRows(job.vacancyDetails));
  errors.push(...validateOfficialLinks(job.officialLinks));
  const start = job.importantDates?.applicationStart;
  const last = job.importantDates?.applicationLast;
  if (start && last && last < start) errors.push("Last Date cannot be earlier than Application Start Date.");
  if (job.seoTitle && job.seoTitle.length > 70) errors.push("SEO title should be 70 characters or fewer.");
  if (job.seoDescription && job.seoDescription.length > 160) errors.push("SEO description should be 160 characters or fewer.");
  return errors;
}

export function validateJobForPublish(job: Partial<Job>): string[] {
  const errors = validateJobDraft(job);
  if (!job.organizationId?.trim()) errors.push("Organization is required before publishing.");
  if (!job.categoryId?.trim()) errors.push("Category is required before publishing.");
  if (!job.slug?.trim()) errors.push("Slug is required before publishing.");
  if (!job.description?.trim()) errors.push("Short description is required before publishing.");
  if (!job.qualification?.summary?.trim()) errors.push("Qualification is required before publishing.");
  if (!job.seoTitle?.trim()) errors.push("SEO title is required before publishing.");
  if (!job.seoDescription?.trim()) errors.push("SEO description is required before publishing.");
  errors.push(...validateOfficialLinks(job.officialLinks, true));
  return errors;
}
