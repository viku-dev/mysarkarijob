"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Alert } from "@/components/common/Alert";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Input } from "@/components/common/Input";
import { useAuth } from "@/lib/auth/AuthContext";
import { loginWithEmail, logout } from "@/lib/firebase/auth";
import { writeAuditLog } from "@/lib/firebase/audit";

export default function AdminLoginPage() {
  const router = useRouter();
  const { status, adminStatus, admin, user, error: authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && adminStatus === "active") router.replace("/admin");
  }, [status, adminStatus, router]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const result = await loginWithEmail(email, password);
      await writeAuditLog({ adminId: result.user.uid, action: "LOGIN", entityType: "AUTH", entityId: result.user.uid, metadata: { email: result.user.email || email } }).catch(() => undefined);
    } catch {
      setMessage("Unable to sign in. Check your email, password and Firebase configuration.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    if (admin || user) await writeAuditLog({ adminId: admin?.uid || user?.uid || "unknown", action: "LOGOUT", entityType: "AUTH", entityId: admin?.uid || user?.uid || "unknown", metadata: { email: admin?.email || user?.email || null } }).catch(() => undefined);
    await logout();
    setMessage("Signed out successfully.");
  }

  return <div className="grid min-h-[80vh] place-items-center bg-slate-100 p-4"><Card className="w-full max-w-md"><h1 className="text-2xl font-bold text-slate-950">Admin Login</h1><p className="mt-2 text-sm text-slate-600">Sign in with Firebase Authentication. Access also requires an active record in admins/{'{uid}'}.</p>{authError ? <Alert>{authError}</Alert> : null}{adminStatus === "inactive" ? <Alert>Your admin account is inactive. Please contact the administrator.</Alert> : null}{adminStatus === "missing" && status === "authenticated" ? <Alert>No active admin record was found for this account.</Alert> : null}{message ? <Alert>{message}</Alert> : null}<form className="mt-5 grid gap-4" onSubmit={handleLogin}><label className="grid gap-2 text-sm font-semibold">Email <span className="text-red-600">*</span><Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label><label className="grid gap-2 text-sm font-semibold">Password <span className="text-red-600">*</span><Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label><Button disabled={loading} type="submit">{loading ? "Signing in…" : "Login"}</Button>{status === "authenticated" ? <Button type="button" variant="outline" onClick={handleLogout}>Logout</Button> : null}</form></Card></div>;
}
