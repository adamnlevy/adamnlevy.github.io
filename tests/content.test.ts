import { describe, expect, it } from "vitest";
import { getAllProjects, getCategories, getProjectBySlug, projectFrontmatterSchema } from "@/lib/content";

describe("project content layer", () => {
  it("loads only published projects by default and sorts by date", () => {
    const projects = getAllProjects();
    expect(projects.length).toBeGreaterThanOrEqual(2);
    expect(projects.every((project) => project.published)).toBe(true);
    expect(projects[0].date! >= projects[1].date!).toBe(true);
  });
  it("finds a project by its explicit slug", () => {
    expect(getProjectBySlug("compact-desk-organizer")?.title).toBe("Compact Desk Organizer");
    expect(getProjectBySlug("missing-project")).toBeUndefined();
  });
  it("returns unique categories", () => {
    const categories = getCategories();
    expect(new Set(categories).size).toBe(categories.length);
  });
  it("rejects invalid slugs and missing required metadata", () => {
    expect(projectFrontmatterSchema.safeParse({ title: "No slug" }).success).toBe(false);
    expect(projectFrontmatterSchema.safeParse({ title: "A", slug: "Not Valid", description: "D", category: "C", coverImage: "/x", coverAlt: "valid image alt" }).success).toBe(false);
  });
});
