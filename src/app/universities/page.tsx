import { Breadcrumb } from "@/components/common/Breadcrumb";
import { EmptyState } from "@/components/common/StateViews";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
export default function Page() { return <Container className="py-8"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Universities" }]} /><div className="mt-6"><SectionHeading title="Universities" description="Government and private university information architecture is prepared for future content." /><EmptyState /></div></Container>; }
