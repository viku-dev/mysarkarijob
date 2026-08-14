import { Breadcrumb } from "@/components/common/Breadcrumb";
import { EmptyState } from "@/components/common/StateViews";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
export default function Page() { return <Container className="py-8"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Organizations" }]} /><div className="mt-6"><SectionHeading title="Organizations" description="Browse recruiting and examination organizations after organization data is connected." /><EmptyState /></div></Container>; }
