import { Breadcrumb } from "@/components/common/Breadcrumb";
import { EmptyState } from "@/components/common/StateViews";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
export default function Page() { return <Container className="py-8"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search" }]} /><div className="mt-6"><SectionHeading title="Search" description="Search by job, exam, organization, state, qualification and category after Firestore queries are connected." /><EmptyState /></div></Container>; }
