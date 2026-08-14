"use client";

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirebaseConfig, isFirebaseConfigured } from "./config";

export function getFirebaseClientApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Add the NEXT_PUBLIC_FIREBASE_* values from .env.example.");
  }
  return getApps().length ? getApp() : initializeApp(getFirebaseConfig());
}
