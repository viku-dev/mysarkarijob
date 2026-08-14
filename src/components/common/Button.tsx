import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "outline"; };
type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: "primary" | "secondary" | "outline"; };
const styles = { primary: "bg-blue-700 text-white hover:bg-blue-800", secondary: "bg-slate-100 text-slate-950 hover:bg-slate-200", outline: "border border-blue-200 bg-white text-blue-800 hover:bg-blue-50" };
const base = "inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
export function Button({ className, variant = "primary", ...props }: ButtonProps) { return <button className={cn(base, styles[variant], className)} {...props} />; }
export function ButtonLink({ className, variant = "primary", href, children, ...props }: ButtonLinkProps) { return <Link href={href} className={cn(base, styles[variant], className)} {...props}>{children}</Link>; }
