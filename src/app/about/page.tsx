import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config/site";
export default function AboutPage() { return <Container className="py-10"><h1 className="text-3xl font-bold">About {siteConfig.name}</h1><p className="mt-4 max-w-3xl leading-7 text-slate-700">{siteConfig.name} is being built as an independent information portal for structured jobs, exams, results, admit cards, answer keys and university updates. This foundation page is intentionally concise and can be updated before launch.</p></Container>; }
