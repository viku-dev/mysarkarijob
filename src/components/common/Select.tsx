import { cn } from "@/lib/utils/cn";
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) { return <select {...props} className={cn("min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100", props.className)} />; }
