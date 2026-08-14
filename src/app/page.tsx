import { AdSlot } from "@/components/common/AdSlot";
import { EmptyState } from "@/components/common/StateViews";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Hero } from "@/components/home/Hero";
import { NotificationList } from "@/components/home/NotificationList";
import { QuickCategories } from "@/components/home/QuickCategories";
import { StateBrowser } from "@/components/home/StateBrowser";
import { Container } from "@/components/layout/Container";

export default function HomePage() { return <Container className="py-8"><Hero /><AdSlot placement="top" className="mt-6" /><section className="mt-10"><SectionHeading title="Quick Categories" description="Browse common recruitment and examination categories. These links are placeholders until Firestore-backed content is connected." /><QuickCategories /></section><section className="mt-10"><SectionHeading title="Latest Jobs" description="No fake recruitment data is shown. Published jobs will appear here after the CMS and Firestore queries are implemented." /><EmptyState title="No job notifications available yet." description="Phase 2 establishes the UI foundation without inventing government job data." /></section><section className="mt-10"><SectionHeading title="Latest Exams" /><EmptyState title="No exam notifications available yet." /></section><section className="mt-10 grid gap-5 lg:grid-cols-3"><NotificationList title="Latest Results" /><NotificationList title="Latest Admit Cards" /><NotificationList title="Latest Answer Keys" /></section><section className="mt-10"><SectionHeading title="State-wise Jobs" description="The state architecture is ready to expand to all Indian states and Union Territories without hardcoded recruitment data." /><StateBrowser /></section><AdSlot placement="bottom" className="mt-10" /></Container>; }
