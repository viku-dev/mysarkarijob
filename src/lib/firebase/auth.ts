"use client";

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, type Auth, type User } from "firebase/auth";
import { getFirebaseClientApp } from "./client";

export function getFirebaseAuth(): Auth { return getAuth(getFirebaseClientApp()); }
export function subscribeToAuthState(callback: (user: User | null) => void): () => void { return onAuthStateChanged(getFirebaseAuth(), callback); }
export function loginWithEmail(email: string, password: string) { return signInWithEmailAndPassword(getFirebaseAuth(), email, password); }
export function logout() { return signOut(getFirebaseAuth()); }
