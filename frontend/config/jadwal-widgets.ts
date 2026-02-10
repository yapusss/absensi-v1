import type { ComponentType } from "react";

import HrJadwal from "@/components/widgets/HrJadwal";
import { ROLE_IDS, type RoleIdOrDefault } from "@/lib/role";

export type JadwalSectionDef = {
  key: string;
  Component: ComponentType<unknown>;
  props?: Record<string, unknown>;
  slot?: string;
  layout?: { className?: string };
};

export const jadwalSectionsByRole: Record<RoleIdOrDefault, JadwalSectionDef[]> = {
  [ROLE_IDS.PlatformOwner]: [
    { key: "jadwal-hr", Component: HrJadwal, props: {} },
  ],
  [ROLE_IDS.PlatformStaff]: [
    { key: "jadwal-hr", Component: HrJadwal, props: {} },
  ],
  [ROLE_IDS.CompanyOwner]: [
    { key: "jadwal-hr", Component: HrJadwal, props: {} },
  ],
  [ROLE_IDS.CompanyHR]: [
    { key: "jadwal-hr", Component: HrJadwal, props: {} },
  ],
  [ROLE_IDS.CompanyEmployee]: [
    { key: "jadwal-hr", Component: HrJadwal, props: {} },
  ],
  DEFAULT: [
    { key: "jadwal-hr", Component: HrJadwal, props: {} },
  ],
};
