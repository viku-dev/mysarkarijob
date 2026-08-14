"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ErrorState, LoadingState } from "@/components/common/StateViews";
import { JobForm } from "@/components/admin/JobForm";
import { getAdminJob } from "@/lib/firebase/jobs";
import type { Job } from "@/types/content";
export default function EditJobPage() { const params = useParams<{ id: string }>(); const [job, setJob] = useState<Job | null>(); useEffect(() => { getAdminJob(params.id).then(setJob).catch(() => setJob(null)); }, [params.id]); if (job === undefined) return <LoadingState />; if (job === null) return <ErrorState message="Unable to load this job." />; return <JobForm existingJob={job} />; }
