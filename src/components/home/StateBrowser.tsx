import Link from "next/link";
const states = ["Rajasthan", "Uttar Pradesh", "Madhya Pradesh", "Haryana", "Delhi", "Maharashtra", "Bihar", "Gujarat", "Punjab", "Karnataka"];
function slugify(value: string) { return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
export function StateBrowser() { return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{states.map((state) => <Link key={state} href={`/states/${slugify(state)}/jobs`} className="rounded-xl border border-slate-200 bg-white p-4 text-center text-sm font-semibold text-blue-800 hover:bg-blue-50">{state}</Link>)}</div>; }
