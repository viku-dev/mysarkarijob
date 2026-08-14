import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
const routes = ["", "/jobs", "/exams", "/results", "/admit-card", "/answer-key", "/universities", "/states", "/categories", "/organizations", "/search", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer"];
export default function sitemap(): MetadataRoute.Sitemap { return routes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date() })); }
