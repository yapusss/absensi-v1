import type { ComponentType } from "react";

import EmployeeAccount from "@/components/widgets/EmployeeAccount";
import HrAccount from "@/components/widgets/HrAccount";
import OwnerAccount from "@/components/widgets/OwnerAccount";
import ProviderAccount from "@/components/widgets/ProviderAccount";
import { ROLE_IDS, type RoleIdOrDefault } from "@/lib/role";

export type AccountWidgetDef = {
  key: string;
  Component: ComponentType<unknown>;
  props?: Record<string, unknown>;
  layout?: { className?: string };
};

export const accountWidgetsByRole: Record<RoleIdOrDefault, AccountWidgetDef[]> = {
  [ROLE_IDS.Provider]: [
    {
      key: "provider-account",
      Component: ProviderAccount,
      props: {},
    },
  ],
  [ROLE_IDS.PlatformOwner]: [],
  [ROLE_IDS.PlatformStaff]: [],
  [ROLE_IDS.CompanyOwner]: [
    {
      key: "owner-account",
      Component: OwnerAccount,
      props: {},
    },
  ],
  [ROLE_IDS.CompanyHR]: [
    {
      key: "hr-account",
      Component: HrAccount,
      props: {},
    },
  ],
  [ROLE_IDS.CompanyManager]: [
    {
      key: "employee-account",
      Component: EmployeeAccount,
      props: {},
    },
  ],
  [ROLE_IDS.CompanyEmployee]: [
    {
      key: "employee-account",
      Component: EmployeeAccount,
      props: {},
    },
  ],
  DEFAULT: [
    {
      key: "employee-account",
      Component: EmployeeAccount,
      props: {},
    },
  ],
};
