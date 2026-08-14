"use client";

import { Card } from "@/components/common/Card";
import { useAuth } from "@/lib/auth/AuthContext";

export function AdminShell() {
  const { admin } = useAuth();
  return <div><header className="mb-6 rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Secure admin dashboard</p><h1 className="mt-1 text-2xl font-bold text-slate-950">Welcome{admin?.displayName ? `, ${admin.displayName}` : ""}</h1><p className="mt-2 text-sm text-slate-600">You are signed in as an active admin. Jobs are the only CMS module implemented in Phase 3.</p></header><div className="grid gap-4 md:grid-cols-3"><Card><p className="text-sm text-slate-500">Jobs module</p><p className="mt-2 text-3xl font-bold">Ready</p></Card><Card><p className="text-sm text-slate-500">Role</p><p className="mt-2 text-2xl font-bold">{admin?.role}</p></Card><Card><p className="text-sm text-slate-500">Security</p><p className="mt-2 text-2xl font-bold">Protected</p></Card></div></div>;
}
