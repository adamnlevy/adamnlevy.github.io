import type { Metadata } from "next";
import { getAllProjects, getCategories } from "@/lib/content";
import { ProjectFilter } from "@/components/project-filter";
export const metadata: Metadata = { title: "Projects", description: "A field guide to Adam's fabrication, woodworking, and engineering projects." };
export default function ProjectsPage() { const projects = getAllProjects(); return <section className="site-container py-16 md:py-24"><div className="max-w-2xl"><p className="eyebrow text-accent">The archive</p><h1 className="mt-4 font-display text-5xl md:text-6xl">Projects, experiments, and useful objects.</h1><p className="mt-6 text-lg leading-8 text-muted">Browse the things I&apos;ve designed, fabricated, repaired, and learned from. Every project starts with a question.</p></div><div className="mt-16"><ProjectFilter projects={projects} categories={getCategories(projects)} /></div></section>; }
