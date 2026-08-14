"use client";

import { getFirestore, type Firestore } from "firebase/firestore";
import { getFirebaseClientApp } from "./client";

export const collections = {
  jobs: "jobs", exams: "exams", results: "results", admitCards: "admitCards", answerKeys: "answerKeys", universities: "universities", organizations: "organizations", categories: "categories", states: "states", admins: "admins", auditLogs: "auditLogs", siteSettings: "siteSettings",
} as const;

export function getDb(): Firestore { return getFirestore(getFirebaseClientApp()); }
