"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { useAuth } from "@/lib/auth/AuthContext";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { status, adminStatus, admin, error } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin/login") router.replace("/admin/login");
  }, [status, pathname, router]);

  if (status === "loading" || adminStatus === "checking") {
    return <div className="grid min-h-screen place-items-center bg-slate-100 p-4"><Card>Checking admin access…</Card></div>;
  }
  if (adminStatus === "inactive") {
    return <div className="grid min-h-screen place-items-center bg-slate-100 p-4"><Card><h1 className="text-xl font-bold">Inactive admin account</h1><p className="mt-2 text-sm text-slate-600">Your admin account is inactive. Please contact the administrator.</p></Card></div>;
  }
  if (!admin || adminStatus === "missing") {
    return <div className="grid min-h-screen place-items-center bg-slate-100 p-4"><Card><h1 className="text-xl font-bold">Admin access required</h1><p className="mt-2 text-sm text-slate-600">Please sign in with an active administrator account.</p><Button className="mt-4" onClick={() => router.replace("/admin/login")}>Go to login</Button></Card></div>;
  }
  if (adminStatus === "error") {
    return <div className="grid min-h-screen place-items-center bg-slate-100 p-4"><Card><h1 className="text-xl font-bold">Unable to verify access</h1><p className="mt-2 text-sm text-slate-600">{error || "Please try again."}</p></Card></div>;
  }
  return <>{children}</>;
}
