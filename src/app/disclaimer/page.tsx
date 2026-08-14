import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config/site";
export default function DisclaimerPage() { return <Container className="py-10"><h1 className="text-3xl font-bold">Disclaimer</h1><p className="mt-4 max-w-3xl leading-7 text-slate-700">{siteConfig.disclaimer}</p><p className="mt-4 max-w-3xl leading-7 text-slate-700">This website does not claim to be an official government website.</p></Container>; }
