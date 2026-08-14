import { Breadcrumb } from "@/components/common/Breadcrumb";
import { EmptyState } from "@/components/common/StateViews";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
export default function Page() { return <Container className="py-8"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Categories" }]} /><div className="mt-6"><SectionHeading title="Categories" description="Browse jobs and exams by category after category data is connected." /><EmptyState /></div></Container>; }
