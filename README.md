# Adam Levy — Maker Portfolio

A content-driven maker portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and Markdown. It exports to static HTML for GitHub Pages: no database, CMS, or server is required.

## Maintaining the portfolio (no coding required)

All routine updates happen in GitHub’s web interface. Open a file, choose the pencil icon, make a change, and choose **Commit changes**. GitHub Actions builds and publishes the site automatically.

### Add a project

1. Add photographs to `public/images/projects/<project-folder>/`. Use lowercase descriptive names such as `cover.jpg`, `detail-01.jpg`, and `installed.webp`. GitHub’s **Add file → Upload files** is fine.
2. Create `content/projects/<slug>.md` (**Add file → Create new file**). The filename should match the slug.
3. Copy this example and replace the values:

```md
---
title: "Compact Desk Organizer"
slug: "compact-desk-organizer"
description: "A modular organizer designed for a small workspace."
category: "3D Printing"
tags:
  - "CAD"
  - "FDM"
coverImage: "/images/projects/compact-desk-organizer/cover.jpg"
coverAlt: "Three printed organizer modules on a desk"
gallery:
  - src: "/images/projects/compact-desk-organizer/detail-01.jpg"
    alt: "Close-up of the modular compartments"
date: "2026-03-15"
featured: true
published: true
links:
  - label: "Download the model"
    url: "https://example.com"
---

## Overview

Explain the purpose and problem this project solves.

## Process

Describe your design decisions, materials, tools, and iterations.

## Results

Share what worked, what changed, and what you learned.
```

YAML indentation matters: use spaces, not tabs. Every image path must match a real file under `public/`. A project needs `title`, `slug`, `description`, `category`, `coverImage`, and `coverAlt`; everything else has sensible defaults. Slugs must be lowercase kebab-case (`my-new-project`). Slugs must be unique and must not be `projects`, `about`, or another route. A bad project stops the build with a filename and a useful error.

### Edit, publish, and order projects

- Edit an existing project by opening its Markdown file in `content/projects/`.
- Set `published: false` to keep a draft out of the public build. Drafts do not get a generated page.
- Set `featured: true` to show a project on the home page (the first three featured projects are shown).
- Gallery order is the order of the `gallery` list. The first image is not automatically the cover: set `coverImage` explicitly.
- Projects sort newest first by `date`, then alphabetically. Use `YYYY-MM-DD` dates.
- Categories and tags are plain text. Categories become filter buttons on the Projects page.
- Markdown supports headings, lists, links, images, blockquotes, and fenced code blocks.

### Images and documents

Use JPG or WebP for photographs (roughly 1600–2400px wide, ideally below 1 MB), PNG for diagrams/transparency, and descriptive filenames. Avoid uploading camera originals. Replace the résumé at `public/documents/resume.pdf` without changing any code. Replace `public/branding/favicon.svg` and `public/branding/og-image.svg` for branding/social previews. The logo mark in the header is intentionally typographic; change the owner name in `config/site.ts` if needed.

### Personal information and colors

- Edit `config/site.ts` to change the name, tagline, LinkedIn, GitHub, email, résumé path, and site description.
- Edit the biography in `app/about/page.tsx` (it is kept short and readable there).
- Change the theme variables at the top of `app/globals.css`: `--ink`, `--paper`, `--muted`, `--line`, and `--accent` are HSL color values.

### Check a deployment

After committing, open the repository’s **Actions** tab. The `Deploy portfolio to GitHub Pages` workflow must finish with a green check; the deployment URL is shown in the `deploy` job. A content error or failing test prevents publishing. If an update does not appear, check that the commit is on `main`, inspect the workflow log, hard-refresh the browser, and confirm the edited image path/capitalization.

## Maintaining the codebase

### Structure

- `app/` — App Router pages, layout, styles, sitemap, robots, and static routes.
- `components/` — small presentation components; `components/ui/` contains shadcn-style primitives.
- `content/projects/` — Markdown source of truth for projects.
- `lib/content.ts` — the only content loading/validation layer. It parses frontmatter, validates slugs and assets, filters drafts, and sorts projects.
- `config/site.ts` — centralized personal and site configuration.
- `public/` — replaceable images, branding, and résumé.
- `tests/` — content-layer tests.
- `.github/workflows/nextjs.yml` — CI and GitHub Pages artifact deployment.

The site uses server components by default. Only the project category filter is a client component. `next/image` is configured with `unoptimized: true` because GitHub Pages has no Next.js image server. `output: "export"` and `generateStaticParams` create one static page per published project.

### Base paths and GitHub Pages setup

For a repository project site (`username.github.io/repository-name`), create a repository variable named `NEXT_PUBLIC_BASE_PATH` with value `/repository-name`. For a user/organization site, leave it empty. Set `NEXT_PUBLIC_SITE_URL` to the public URL if you want canonical and sitemap URLs (for example `https://username.github.io/repository-name`). Internal Next links and local assets respect the base path through Next’s configuration.

One-time setup: in GitHub, open **Settings → Pages**, choose **GitHub Actions** as the source, and ensure Actions are allowed to write Pages/deployments. The workflow runs on `main` and can also be started manually. A custom domain can be configured in Pages settings; set `NEXT_PUBLIC_SITE_URL` to that domain.

### Local development and checks

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run test
npm run lint
npm run build      # generates ./out
```

The build is the best content validation check because it verifies every image reference and generates all routes. `out/` is generated output and should not be edited manually. Static export cannot provide server-side draft protection, so unpublished Markdown must never be included in the generated build (the content layer filters it before route generation).

### Design system and conventions

Tailwind theme colors map to CSS variables in `app/globals.css`. Keep recurring patterns in focused components and use Lucide icons for interface affordances. Avoid adding a dependency for a one-off interaction. Keep content decisions in Markdown/config and visual decisions in components/styles.

### Known limitations

GitHub Pages serves static files only: there is no runtime contact form, server-side search, image transformation, or authentication. Browser caches may delay image changes; changing a filename is a reliable cache-busting option. The sample résumé and illustration SVGs are placeholders—replace them with the owner’s real assets before sharing the site.
