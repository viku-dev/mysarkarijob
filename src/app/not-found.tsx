import { ButtonLink } from "@/components/common/Button";
import { Container } from "@/components/layout/Container";
export default function NotFound() { return <Container className="py-16"><h1 className="text-3xl font-bold text-slate-950">Page not found</h1><p className="mt-3 max-w-2xl text-slate-600">This page may not exist yet or the content may not be published. No draft or unverified recruitment information is shown publicly.</p><ButtonLink className="mt-6" href="/">Go home</ButtonLink></Container>; }
