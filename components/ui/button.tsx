import Link from "next/link";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const styles = "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={cn(styles, "bg-ink text-paper hover:bg-accent-dark", className)} {...props} />; }
export function ButtonLink({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) { return <Link className={cn(styles, "bg-ink text-paper hover:bg-accent-dark", className)} {...props} />; }
export function TextLink({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) { return <Link className={cn("font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-accent-dark", className)} {...props} />; }
