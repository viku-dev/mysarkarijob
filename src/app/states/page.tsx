import { Breadcrumb } from "@/components/common/Breadcrumb";
import { EmptyState } from "@/components/common/StateViews";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
export default function Page() { return <Container className="py-8"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "States" }]} /><div className="mt-6"><SectionHeading title="States" description="Browse state-wise jobs after state collection and listing queries are connected." /><EmptyState /></div></Container>; }
