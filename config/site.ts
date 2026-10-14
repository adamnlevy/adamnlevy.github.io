export const siteConfig = {
  name: "Adam Levy",
  shortName: "ANL",
  title: "Adam Levy — Maker & Product Builder",
  description: "A visual field guide to thoughtful objects, prototypes, and practical experiments by Adam Levy.",
  tagline: "Making useful things, one careful iteration at a time.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "",
  linkedIn: "https://www.linkedin.com/in/adam-levy-957573373/",
  github: "https://github.com/",
  email: "adamnlevy@gmail.com",
  resumePath: "/documents/resume.pdf",
  aboutPath: "/about/",
  defaultOgImage: "/branding/og-image.svg",
} as const;

export const navItems = [
  { label: "Projects", href: "/projects/" },
  { label: "About", href: "/about/" },
] as const;
