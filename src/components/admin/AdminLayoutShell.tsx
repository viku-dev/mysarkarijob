"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/common/Button";
import { AuthProvider, useAuth } from "@/lib/auth/AuthContext";
import { hasPermission } from "@/lib/auth/permissions";
import { logout } from "@/lib/firebase/auth";
import { writeAuditLog } from "@/lib/firebase/audit";
import { AdminGuard } from "./AdminGuard";

const nav = [
  { label: "Dashboard", href: "/admin" },
  { label: "Jobs", href: "/admin/jobs" },
  { label: "Exams", href: "/admin/coming-soon?section=exams" },
  { label: "Results", href: "/admin/coming-soon?section=results" },
  { label: "Admit Cards", href: "/admin/coming-soon?section=admit-cards" },
  { label: "Answer Keys", href: "/admin/coming-soon?section=answer-keys" },
  { label: "Universities", href: "/admin/coming-soon?section=universities" },
  { label: "Organizations", href: "/admin/coming-soon?section=organizations" },
  { label: "Categories", href: "/admin/coming-soon?section=categories" },
  { label: "States", href: "/admin/coming-soon?section=states" },
  { label: "Ads", href: "/admin/coming-soon?section=ads" },
  { label: "Site Settings", href: "/admin/coming-soon?section=site-settings" },
  { label: "Audit Logs", href: "/admin/coming-soon?section=audit-logs" },
];

function ProtectedShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { admin } = useAuth();
  async function handleLogout() {
    if (admin) await writeAuditLog({ adminId: admin.uid, action: "LOGOUT", entityType: "AUTH", entityId: admin.uid, metadata: { email: admin.email } }).catch(() => undefined);
    await logout();
  }
  if (pathname === "/admin/login") return <>{children}</>;
  return <AdminGuard><div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[280px_1fr]"><aside className="border-r border-slate-200 bg-white p-5"><Link href="/" className="font-bold text-blue-800">Government Career Portal</Link><nav className="mt-6 grid gap-1" aria-label="Admin navigation">{nav.map((item) => <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50">{item.label}</Link>)}</nav></aside><div><header className="flex items-center justify-between border-b border-slate-200 bg-white p-4"><div><p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Admin</p><p className="text-sm text-slate-600">{admin?.email} · {admin?.role}</p></div><Button variant="outline" onClick={handleLogout}>Logout</Button></header><main className="p-4 sm:p-6 lg:p-8">{children}</main></div></div></AdminGuard>;
}

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  return <AuthProvider><ProtectedShell>{children}</ProtectedShell></AuthProvider>;
}

export function PermissionNote({ permission }: { permission: Parameters<typeof hasPermission>[1] }) {
  const { admin } = useAuth();
  return hasPermission(admin?.role, permission) ? null : <p className="text-sm text-amber-700">Your role has read-only access for this action.</p>;
}
