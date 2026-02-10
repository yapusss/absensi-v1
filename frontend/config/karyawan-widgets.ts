import type { ComponentType } from "react";

import HrKaryawan from "@/components/widgets/HrKaryawan";
import OwnerKaryawan from "@/components/widgets/OwnerKaryawan";
import { ROLE_IDS, type RoleIdOrDefault } from "@/lib/role";

export type KaryawanSectionDef = {
  key: string;
  Component: ComponentType<unknown>;
  props?: Record<string, unknown>;
  slot?: string;
  layout?: { className?: string };
};

export const karyawanSectionsByRole: Record<RoleIdOrDefault, KaryawanSectionDef[]> = {
  [ROLE_IDS.PlatformOwner]: [
    { key: "karyawan-hr", Component: HrKaryawan, props: {} },
  ],
  [ROLE_IDS.PlatformStaff]: [
    { key: "karyawan-hr", Component: HrKaryawan, props: {} },
  ],
  [ROLE_IDS.CompanyOwner]: [
    { key: "karyawan-owner", Component: OwnerKaryawan, props: {} },
  ],
  [ROLE_IDS.CompanyHR]: [
    { key: "karyawan-hr", Component: HrKaryawan, props: {} },
  ],
  [ROLE_IDS.CompanyEmployee]: [
    { key: "karyawan-hr", Component: HrKaryawan, props: {} },
  ],
  DEFAULT: [
    { key: "karyawan-hr", Component: HrKaryawan, props: {} },
  ],
};
