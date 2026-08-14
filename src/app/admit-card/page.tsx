import { Breadcrumb } from "@/components/common/Breadcrumb";
import { EmptyState } from "@/components/common/StateViews";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
export default function Page() { return <Container className="py-8"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Admit Cards" }]} /><div className="mt-6"><SectionHeading title="Admit Cards" description="Published admit card notifications will appear here after Firestore integration." /><EmptyState /></div></Container>; }
