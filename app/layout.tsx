import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/config/site";
import { withBasePath } from "@/lib/utils";

export const metadata: Metadata = { metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined, title: { default: siteConfig.title, template: `%s · ${siteConfig.name}` }, description: siteConfig.description, openGraph: { type: "website", title: siteConfig.title, description: siteConfig.description, images: [withBasePath(siteConfig.defaultOgImage)] }, icons: { icon: "/branding/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SiteHeader /><main>{children}</main><SiteFooter /></body></html>; }
