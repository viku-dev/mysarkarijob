import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { Container } from "./Container";
const footerLinks = [{ label: "About", href: "/about" }, { label: "Contact", href: "/contact" }, { label: "Privacy Policy", href: "/privacy-policy" }, { label: "Terms", href: "/terms" }, { label: "Disclaimer", href: "/disclaimer" }, { label: "Sitemap", href: "/sitemap.xml" }];
export function Footer() { return <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-white"><Container className="grid gap-8 py-10 md:grid-cols-[1.5fr_1fr]"><div><p className="text-lg font-bold">{siteConfig.name}</p><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{siteConfig.disclaimer}</p></div><nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm">{footerLinks.map((link) => <Link className="text-slate-300 hover:text-white" href={link.href} key={link.href}>{link.label}</Link>)}</nav></Container></footer>; }
