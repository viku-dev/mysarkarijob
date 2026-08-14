"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/common/Badge";
import { Button, ButtonLink } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { EmptyState, ErrorState, LoadingState } from "@/components/common/StateViews";
import { hasPermission } from "@/lib/auth/permissions";
import { useAuth } from "@/lib/auth/AuthContext";
import { listAdminJobs } from "@/lib/firebase/jobs";
import type { ContentStatus, Job } from "@/types/content";
import { JobActions } from "./JobActions";

const statuses: Array<ContentStatus | "ALL"> = ["ALL", "DRAFT", "PUBLISHED", "UNPUBLISHED", "ARCHIVED"];
export function JobList() {
  const { admin } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [status, setStatus] = useState<ContentStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    listAdminJobs({ status, search, pageSize: 20 }).then((page) => { setJobs(page.jobs); setError(null); }).catch(() => setError("Unable to load jobs. Check Firebase configuration and admin permissions.")).finally(() => setLoading(false));
  }, [status, search]);

  return <div><div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 lg:flex-row lg:items-center"><div><h1 className="text-2xl font-bold text-slate-950">Jobs</h1><p className="mt-1 text-sm text-slate-600">Manage job drafts, previews, publishing, unpublishing and archiving.</p></div>{hasPermission(admin?.role, "jobs:create") ? <ButtonLink href="/admin/jobs/new">Create Job</ButtonLink> : null}</div><Card><div className="grid gap-3 md:grid-cols-5"><Input placeholder="Search title, slug, organization" value={search} onChange={(event) => setSearch(event.target.value)} /><Select value={status} onChange={(event) => setStatus(event.target.value as ContentStatus | "ALL")}><option value="ALL">All statuses</option>{statuses.filter((item) => item !== "ALL").map((item) => <option value={item} key={item}>{item}</option>)}</Select><Input placeholder="Category filter foundation" disabled /><Input placeholder="Organization filter foundation" disabled /><Input placeholder="State filter foundation" disabled /></div><div className="mt-5 overflow-x-auto">{loading ? <LoadingState /> : error ? <ErrorState message={error} /> : jobs.length === 0 ? <EmptyState title="No jobs found." /> : <table className="w-full min-w-[900px] text-left text-sm"><thead><tr className="border-b text-slate-600"><th className="p-3">Job Title</th><th className="p-3">Organization</th><th className="p-3">Category</th><th className="p-3">Vacancy</th><th className="p-3">Last Date</th><th className="p-3">Status</th><th className="p-3">Updated</th><th className="p-3">Actions</th></tr></thead><tbody>{jobs.map((job) => <tr key={job.id} className="border-b align-top"><td className="p-3 font-semibold">{job.title}</td><td className="p-3">{job.organizationName || job.organizationId || "—"}</td><td className="p-3">{job.categoryName || job.categoryId || "—"}</td><td className="p-3">{job.vacancy ?? "TBA"}</td><td className="p-3">{job.importantDates?.applicationLast || "To be announced"}</td><td className="p-3"><Badge>{job.status}</Badge></td><td className="p-3">{typeof job.updatedAt === "string" ? job.updatedAt : "Recently"}</td><td className="p-3"><JobActions jobId={job.id} status={job.status} /></td></tr>)}</tbody></table>}</div><div className="mt-4 flex justify-end"><Button type="button" variant="outline" disabled>Pagination cursor prepared</Button></div></Card></div>;
}
