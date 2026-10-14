"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { siteConfig, navItems } from "@/config/site";
import { cn, withBasePath } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/95 backdrop-blur">
    <div className="site-container flex h-20 items-center justify-between">
      <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-sm text-paper">A</span>
        <span className="font-display text-lg font-semibold tracking-tight">{siteConfig.name}</span>
      </Link>
      <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
        {navItems.map((item) => <Link key={item.href} href={item.href} className={cn("text-sm text-muted transition-colors hover:text-ink", pathname.startsWith(item.href) && "font-semibold text-ink")}>{item.label}</Link>)}
        <a href={siteConfig.linkedIn} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">LinkedIn <ArrowUpRight size={14} /></a>
        <a href={withBasePath(siteConfig.resumePath)} className="rounded-full border border-ink px-4 py-2 text-sm font-medium hover:bg-ink hover:text-paper">Résumé</a>
      </nav>
      <button className="rounded-full p-2 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="site-container border-t border-line py-5 md:hidden" aria-label="Mobile navigation">
      <div className="flex flex-col gap-4">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-lg">{item.label}</Link>)}<a href={siteConfig.linkedIn} target="_blank" rel="noreferrer" className="text-lg">LinkedIn ↗</a><a href={withBasePath(siteConfig.resumePath)} className="text-lg">Résumé ↓</a></div>
    </nav>}
  </header>;
}
