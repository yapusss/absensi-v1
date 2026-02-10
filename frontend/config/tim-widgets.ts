import type { ComponentType } from "react";

import EmployeeTeam from "@/components/widgets/EmployeeTeam";
import HrTeam from "@/components/widgets/HrTeam";
import { ROLE_IDS, type RoleIdOrDefault } from "@/lib/role";

export type TimSectionDef = {
  key: string;
  Component: ComponentType<unknown>;
  props?: Record<string, unknown>;
  slot?: string;
  layout?: { className?: string };
};

export const timSectionsByRole: Record<RoleIdOrDefault, TimSectionDef[]> = {
  [ROLE_IDS.PlatformOwner]: [
    { key: "tim-hr", Component: HrTeam, props: {} },
  ],
  [ROLE_IDS.PlatformStaff]: [
    { key: "tim-hr", Component: HrTeam, props: {} },
  ],
  [ROLE_IDS.CompanyOwner]: [
    { key: "tim-hr", Component: HrTeam, props: {} },
  ],
  [ROLE_IDS.CompanyHR]: [
    { key: "tim-hr", Component: HrTeam, props: {} },
  ],
  [ROLE_IDS.CompanyEmployee]: [
    { key: "tim-employee", Component: EmployeeTeam, props: {} },
  ],
  DEFAULT: [
    { key: "tim-employee", Component: EmployeeTeam, props: {} },
  ],
};
