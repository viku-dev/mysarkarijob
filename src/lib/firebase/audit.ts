"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { AuditLog } from "@/types/content";
import { collections, getDb } from "./firestore";

type AuditInput = Omit<AuditLog, "id" | "timestamp">;
export async function writeAuditLog(input: AuditInput): Promise<void> {
  await addDoc(collection(getDb(), collections.auditLogs), { ...input, timestamp: serverTimestamp() });
}
