import type { AdminRole, Permission } from "@/types/content";

const permissionsByRole: Record<AdminRole, Permission[]> = {
  SUPER_ADMIN: ["jobs:read", "jobs:create", "jobs:update", "jobs:publish", "jobs:unpublish", "jobs:archive", "admin:manage"],
  EDITOR: ["jobs:read", "jobs:create", "jobs:update", "jobs:publish", "jobs:unpublish", "jobs:archive"],
  CONTENT_MANAGER: ["jobs:read", "jobs:create", "jobs:update"],
  VIEWER: ["jobs:read"],
};

export function hasPermission(role: AdminRole | undefined, permission: Permission): boolean {
  return role ? permissionsByRole[role].includes(permission) : false;
}

export function canPublish(role: AdminRole | undefined): boolean {
  return hasPermission(role, "jobs:publish");
}
