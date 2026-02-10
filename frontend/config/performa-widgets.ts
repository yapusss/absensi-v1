import type { ComponentType } from "react";

import EmployeeAttendance from "@/components/widgets/EmployeeAttendance";
import HrAttendance from "@/components/widgets/HrAttendance";
import OwnerAttendance from "@/components/widgets/OwnerAttendance";
import { ROLE_IDS, type RoleIdOrDefault } from "@/lib/role";

export type PerformaSectionDef = {
  key: string;
  Component: ComponentType<unknown>;
  props?: Record<string, unknown>;
  slot?: string;
  layout?: { className?: string };
};

export const performaSectionsByRole: Record<RoleIdOrDefault, PerformaSectionDef[]> = {
  [ROLE_IDS.PlatformOwner]: [
    { key: "performa-employee", Component: EmployeeAttendance, props: {} },
  ],
  [ROLE_IDS.PlatformStaff]: [
    { key: "performa-employee", Component: EmployeeAttendance, props: {} },
  ],
  [ROLE_IDS.CompanyOwner]: [
    { key: "performa-owner", Component: OwnerAttendance, props: {} },
  ],
  [ROLE_IDS.CompanyHR]: [
    { key: "performa-hr", Component: HrAttendance, props: {} },
  ],
  [ROLE_IDS.CompanyEmployee]: [
    { key: "performa-employee", Component: EmployeeAttendance, props: {} },
  ],
  DEFAULT: [
    { key: "performa-employee", Component: EmployeeAttendance, props: {} },
  ],
};
