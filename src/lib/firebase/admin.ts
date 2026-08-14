"use client";

import { doc, getDoc } from "firebase/firestore";
import type { AdminUser } from "@/types/content";
import { collections, getDb } from "./firestore";

export async function getAdminByUid(uid: string): Promise<AdminUser | null> {
  const snapshot = await getDoc(doc(getDb(), collections.admins, uid));
  if (!snapshot.exists()) return null;
  const data = snapshot.data() as Omit<AdminUser, "id">;
  return { ...data, id: snapshot.id };
}
