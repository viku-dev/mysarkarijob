import { EmptyState } from "@/components/common/StateViews";
export function NotificationList({ title }: { title: string }) { return <section className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="text-lg font-bold text-slate-950">{title}</h3><div className="mt-4"><EmptyState /></div></section>; }
