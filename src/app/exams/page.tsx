import { Breadcrumb } from "@/components/common/Breadcrumb";
import { EmptyState } from "@/components/common/StateViews";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
export default function Page() { return <Container className="py-8"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Exams" }]} /><div className="mt-6"><SectionHeading title="Exams" description="Evergreen exam information pages will be connected in Phase 3." /><EmptyState /></div></Container>; }
