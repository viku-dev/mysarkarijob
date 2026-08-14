"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { LoadingState } from "@/components/common/StateViews";
import { JobDetail } from "@/components/jobs/JobDetail";
import { getPublishedJobBySlug } from "@/lib/firebase/jobs";
import type { Job } from "@/types/content";

export default function PublicJobPage() {
  const params = useParams<{ slug: string }>();
  const [job, setJob] = useState<Job | null>();
  useEffect(() => { getPublishedJobBySlug(params.slug).then(setJob).catch(() => setJob(null)); }, [params.slug]);
  if (job === undefined) return <Container className="py-8"><LoadingState /></Container>;
  if (job === null) notFound();
  return <Container className="py-8"><JobDetail job={job} /></Container>;
}
