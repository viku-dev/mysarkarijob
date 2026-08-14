"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "firebase/auth";
import type { AdminUser } from "@/types/content";
import { getAdminByUid } from "@/lib/firebase/admin";
import { logout, subscribeToAuthState } from "@/lib/firebase/auth";

type AuthStatus = "loading" | "unauthenticated" | "authenticated";
type AdminStatus = "checking" | "active" | "inactive" | "missing" | "error";

type AuthContextValue = {
  status: AuthStatus;
  adminStatus: AdminStatus;
  user: User | null;
  admin: AdminUser | null;
  error: string | null;
  refreshAdmin: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [adminStatus, setAdminStatus] = useState<AdminStatus>("checking");
  const [error, setError] = useState<string | null>(null);

  async function verifyAdmin(nextUser: User | null) {
    if (!nextUser) {
      setAdmin(null);
      setAdminStatus("missing");
      return;
    }
    setAdminStatus("checking");
    try {
      const adminRecord = await getAdminByUid(nextUser.uid);
      if (!adminRecord) {
        setAdmin(null);
        setAdminStatus("missing");
        await logout();
        return;
      }
      if (adminRecord.active !== true) {
        setAdmin(null);
        setAdminStatus("inactive");
        await logout();
        return;
      }
      setAdmin(adminRecord);
      setAdminStatus("active");
    } catch {
      setAdmin(null);
      setAdminStatus("error");
      setError("Unable to verify admin access. Please try again.");
    }
  }

  useEffect(() => {
    let mounted = true;
    try {
      return subscribeToAuthState(async (nextUser) => {
        if (!mounted) return;
        setUser(nextUser);
        setStatus(nextUser ? "authenticated" : "unauthenticated");
        await verifyAdmin(nextUser);
      });
    } catch {
      setStatus("unauthenticated");
      setAdminStatus("error");
      setError("Firebase is not configured. Please set the required environment variables.");
    }
    return () => { mounted = false; };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({ status, adminStatus, user, admin, error, refreshAdmin: () => verifyAdmin(user) }), [status, adminStatus, user, admin, error]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
