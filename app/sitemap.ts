import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/content";
export const dynamic = "force-static";
import { siteConfig } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap { const base = siteConfig.url || "https://example.github.io"; return [{ url: `${base}/`, lastModified: new Date() }, { url: `${base}/projects/`, lastModified: new Date() }, { url: `${base}/about/`, lastModified: new Date() }, ...getAllProjects().map((p) => ({ url: `${base}/projects/${p.slug}/`, lastModified: p.date ? new Date(p.date) : new Date() }))]; }
