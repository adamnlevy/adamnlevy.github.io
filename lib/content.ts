import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const projectsDirectory = path.join(process.cwd(), "content/projects");

const galleryItemSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(5, "gallery alt text should describe the image"),
});

export const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be lowercase kebab-case"),
  description: z.string().min(1).max(240),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().min(1),
  coverAlt: z.string().min(5),
  gallery: z.array(galleryItemSchema).default([]),
  date: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  links: z.array(z.object({ label: z.string().min(1), url: z.string().url() })).default([]),
});

export type Project = z.infer<typeof projectFrontmatterSchema> & { content: string; sourcePath: string };

function validateAsset(assetPath: string, sourcePath: string) {
  const clean = assetPath.replace(/^\//, "");
  const absolute = path.join(process.cwd(), "public", clean);
  if (!fs.existsSync(absolute)) throw new Error(`Missing image asset "${assetPath}" referenced by ${sourcePath}`);
}

export function parseProjectFile(fileName: string): Project {
  const sourcePath = path.join(projectsDirectory, fileName);
  const raw = fs.readFileSync(sourcePath, "utf8");
  const parsed = matter(raw);
  const result = projectFrontmatterSchema.safeParse(parsed.data);
  if (!result.success) {
    const issues = result.error.issues.map((issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`).join("; ");
    throw new Error(`Invalid project ${fileName}: ${issues}`);
  }
  const project = { ...result.data, content: parsed.content.trim(), sourcePath: fileName };
  validateAsset(project.coverImage, fileName);
  project.gallery.forEach((image) => validateAsset(image.src, fileName));
  return project;
}

export function getAllProjects(options: { includeUnpublished?: boolean } = {}): Project[] {
  const files = fs.readdirSync(projectsDirectory).filter((file) => file.endsWith(".md"));
  const projects = files.map(parseProjectFile);
  const slugs = new Set<string>();
  for (const project of projects) {
    if (slugs.has(project.slug)) throw new Error(`Duplicate project slug "${project.slug}" (found in ${project.sourcePath})`);
    slugs.add(project.slug);
  }
  return projects
    .filter((project) => options.includeUnpublished || project.published)
    .sort((a, b) => (b.date || "").localeCompare(a.date || "") || a.title.localeCompare(b.title));
}

export function getProjectBySlug(slug: string) {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getCategories(projects = getAllProjects()) {
  return [...new Set(projects.map((project) => project.category))].sort();
}
