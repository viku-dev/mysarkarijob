import { cn } from "@/lib/utils/cn";
export function Badge({ className, children }: React.HTMLAttributes<HTMLSpanElement>) { return <span className={cn("inline-flex rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800", className)}>{children}</span>; }
