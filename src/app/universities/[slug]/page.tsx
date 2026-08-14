import { notFound } from "next/navigation";

export default function Page() {
  // Dynamic university detail pages will be backed by Firestore in Phase 3. Until then,
  // do not render placeholder recruitment facts for arbitrary slugs.
  notFound();
}
