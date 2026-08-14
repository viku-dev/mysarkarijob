import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config/site";
export default function ContactPage() { return <Container className="py-10"><h1 className="text-3xl font-bold">Contact</h1><p className="mt-4 max-w-3xl leading-7 text-slate-700">For corrections, feedback or business inquiries, contact details can be configured before production launch. Placeholder email: {siteConfig.contactEmail}.</p></Container>; }
