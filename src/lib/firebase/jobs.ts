"use client";

import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, startAfter, updateDoc, where, type DocumentData, type QueryDocumentSnapshot } from "firebase/firestore";
import type { ContentStatus, Job } from "@/types/content";
import { collections, getDb } from "./firestore";

type PageCursor = QueryDocumentSnapshot<DocumentData> | null;
export type JobPage = { jobs: Job[]; cursor: PageCursor };

function fromDoc(snapshot: QueryDocumentSnapshot<DocumentData> | { id: string; data: () => DocumentData }): Job {
  return { id: snapshot.id, ...(snapshot.data() as Omit<Job, "id">) };
}

export async function createJobDraft(input: Partial<Job>, adminId: string): Promise<string> {
  const docRef = await addDoc(collection(getDb(), collections.jobs), { ...input, status: "DRAFT", published: false, featured: false, createdBy: adminId, updatedBy: adminId, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  return docRef.id;
}

export async function updateJob(jobId: string, input: Partial<Job>, adminId: string): Promise<void> {
  await updateDoc(doc(getDb(), collections.jobs, jobId), { ...input, updatedBy: adminId, updatedAt: serverTimestamp() });
}

export async function setJobStatus(jobId: string, status: ContentStatus, adminId: string): Promise<void> {
  await updateDoc(doc(getDb(), collections.jobs, jobId), { status, published: status === "PUBLISHED", updatedBy: adminId, updatedAt: serverTimestamp(), ...(status === "PUBLISHED" ? { publishedAt: serverTimestamp() } : {}), ...(status === "ARCHIVED" ? { archivedAt: serverTimestamp() } : {}) });
}

export async function getAdminJob(jobId: string): Promise<Job | null> {
  const snapshot = await getDoc(doc(getDb(), collections.jobs, jobId));
  return snapshot.exists() ? fromDoc(snapshot) : null;
}

export async function listAdminJobs(options: { status?: ContentStatus | "ALL"; search?: string; pageSize?: number; cursor?: PageCursor } = {}): Promise<JobPage> {
  const constraints = [orderBy("updatedAt", "desc"), limit(options.pageSize || 20)];
  if (options.status && options.status !== "ALL") constraints.unshift(where("status", "==", options.status));
  if (options.cursor) constraints.push(startAfter(options.cursor));
  const snapshot = await getDocs(query(collection(getDb(), collections.jobs), ...constraints));
  let jobs = snapshot.docs.map(fromDoc);
  if (options.search?.trim()) {
    const term = options.search.toLowerCase().trim();
    jobs = jobs.filter((job) => [job.title, job.organizationName, job.categoryName, job.slug].some((value) => value?.toLowerCase().includes(term)));
  }
  return { jobs, cursor: snapshot.docs.at(-1) || null };
}

export async function isPublishedSlugAvailable(slug: string, currentJobId?: string): Promise<boolean> {
  const snapshot = await getDocs(query(collection(getDb(), collections.jobs), where("slug", "==", slug), where("status", "==", "PUBLISHED"), where("published", "==", true), limit(1)));
  if (snapshot.empty) return true;
  return snapshot.docs[0].id === currentJobId;
}

export async function getPublishedJobBySlug(slug: string): Promise<Job | null> {
  const snapshot = await getDocs(query(collection(getDb(), collections.jobs), where("slug", "==", slug), where("status", "==", "PUBLISHED"), where("published", "==", true), limit(1)));
  return snapshot.empty ? null : fromDoc(snapshot.docs[0]);
}

export async function getLatestPublishedJobs(pageSize = 10, cursor?: PageCursor): Promise<JobPage> {
  const constraints = [where("status", "==", "PUBLISHED"), where("published", "==", true), orderBy("updatedAt", "desc"), limit(pageSize)];
  if (cursor) constraints.push(startAfter(cursor));
  const snapshot = await getDocs(query(collection(getDb(), collections.jobs), ...constraints));
  return { jobs: snapshot.docs.map(fromDoc), cursor: snapshot.docs.at(-1) || null };
}

export async function getFeaturedPublishedJobs(pageSize = 6): Promise<Job[]> {
  const snapshot = await getDocs(query(collection(getDb(), collections.jobs), where("status", "==", "PUBLISHED"), where("published", "==", true), where("featured", "==", true), orderBy("updatedAt", "desc"), limit(pageSize)));
  return snapshot.docs.map(fromDoc);
}

export async function getPublishedJobsByField(field: "categoryId" | "organizationId" | "stateIds", value: string, pageSize = 10): Promise<Job[]> {
  const fieldFilter = field === "stateIds" ? where(field, "array-contains", value) : where(field, "==", value);
  const snapshot = await getDocs(query(collection(getDb(), collections.jobs), where("status", "==", "PUBLISHED"), where("published", "==", true), fieldFilter, orderBy("updatedAt", "desc"), limit(pageSize)));
  return snapshot.docs.map(fromDoc);
}
