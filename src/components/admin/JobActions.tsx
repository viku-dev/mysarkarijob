"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/common/Button";
import { useAuth } from "@/lib/auth/AuthContext";
import { hasPermission } from "@/lib/auth/permissions";
import { writeAuditLog } from "@/lib/firebase/audit";
import { setJobStatus } from "@/lib/firebase/jobs";
import type { ContentStatus } from "@/types/content";

export function JobActions({ jobId, status }: { jobId: string; status: ContentStatus }) {
  const { admin } = useAuth();
  const [busy, setBusy] = useState(false);
  async function changeStatus(nextStatus: ContentStatus) {
    if (!admin) return;
    setBusy(true);
    await setJobStatus(jobId, nextStatus, admin.uid);
    const action = nextStatus === "PUBLISHED" ? "JOB_PUBLISHED" : nextStatus === "UNPUBLISHED" ? "JOB_UNPUBLISHED" : "JOB_ARCHIVED";
    await writeAuditLog({ adminId: admin.uid, action, entityType: "JOB", entityId: jobId, metadata: { status: nextStatus } }).catch(() => undefined);
    window.location.reload();
  }
  return <div className="flex flex-wrap gap-2"><ButtonLink href={`/admin/jobs/${jobId}/edit`} variant="outline">Edit</ButtonLink><ButtonLink href={`/admin/jobs/${jobId}/preview`} variant="outline">Preview</ButtonLink>{hasPermission(admin?.role, "jobs:publish") && status !== "PUBLISHED" ? <Button disabled={busy} type="button" onClick={() => changeStatus("PUBLISHED")}>Publish</Button> : null}{hasPermission(admin?.role, "jobs:unpublish") && status === "PUBLISHED" ? <Button disabled={busy} type="button" variant="outline" onClick={() => changeStatus("UNPUBLISHED")}>Unpublish</Button> : null}{hasPermission(admin?.role, "jobs:archive") && status !== "ARCHIVED" ? <Button disabled={busy} type="button" variant="outline" onClick={() => changeStatus("ARCHIVED")}>Archive</Button> : null}</div>;
}
