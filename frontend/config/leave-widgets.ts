import type { ComponentType } from "react";

import EmployeeLeave from "@/components/widgets/EmployeeLeave";
import HrLeave from "@/components/widgets/HrLeave";
import HrLeaveDaftarLibur from "@/components/widgets/HrLeaveDaftarLibur";
import HrLeaveDaftarCuti from "@/components/widgets/HrLeaveDaftarCuti";
import HrLeavePengajuanCuti from "@/components/widgets/HrLeavePengajuanCuti";
import { ROLE_IDS, type RoleIdOrDefault } from "@/lib/role";

export type LeaveSectionDef = {
  key: string;
  Component: ComponentType<unknown>;
  props?: Record<string, unknown>;
  slot?: string;
  layout?: { className?: string };
};

export const leaveSectionsByRole: Record<RoleIdOrDefault, LeaveSectionDef[]> = {
  [ROLE_IDS.PlatformOwner]: [
    { key: "leave-employee", Component: EmployeeLeave, props: {}, slot: "default" },
  ],
  [ROLE_IDS.PlatformStaff]: [
    { key: "leave-employee", Component: EmployeeLeave, props: {}, slot: "default" },
  ],
  [ROLE_IDS.CompanyOwner]: [
    { key: "leave-employee", Component: EmployeeLeave, props: {}, slot: "default" },
  ],
  [ROLE_IDS.CompanyHR]: [
    { key: "leave-hr", Component: HrLeave, props: {}, slot: "default" },
    { key: "leave-hr-daftar-libur", Component: HrLeaveDaftarLibur, props: {}, slot: "daftar-libur" },
    { key: "leave-hr-daftar-cuti", Component: HrLeaveDaftarCuti, props: {}, slot: "daftar-cuti" },
    { key: "leave-hr-pengajuan-cuti", Component: HrLeavePengajuanCuti, props: {}, slot: "pengajuan-cuti" },
  ],
  [ROLE_IDS.CompanyEmployee]: [
    { key: "leave-employee", Component: EmployeeLeave, props: {}, slot: "default" },
  ],
  DEFAULT: [
    { key: "leave-employee", Component: EmployeeLeave, props: {}, slot: "default" },
  ],
};
