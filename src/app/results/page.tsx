import { Breadcrumb } from "@/components/common/Breadcrumb";
import { EmptyState } from "@/components/common/StateViews";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
export default function Page() { return <Container className="py-8"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Results" }]} /><div className="mt-6"><SectionHeading title="Results" description="Published result notifications will appear here after Firestore integration." /><EmptyState /></div></Container>; }
