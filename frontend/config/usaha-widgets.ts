import type { ComponentType } from "react";

import ProviderUsahaMenu from "@/components/widgets/ProviderUsahaMenu";
import ProviderUsaha from "@/components/widgets/ProviderUsaha";
import ProviderOwnerUsaha from "@/components/widgets/ProviderOwnerUsaha";
import OwnerUsaha from "@/components/widgets/OwnerUsaha";
import { ROLE_IDS, type RoleIdOrDefault } from "@/lib/role";

export type UsahaSectionDef = {
  key: string;
  Component: ComponentType<unknown>;
  props?: Record<string, unknown>;
  slot?: string;
  layout?: { className?: string };
};

export const usahaSectionsByRole: Record<RoleIdOrDefault, UsahaSectionDef[]> = {
  [ROLE_IDS.Provider]: [
    { key: "usaha-provider-menu", Component: ProviderUsahaMenu, props: {}, slot: "default" },
    { key: "usaha-provider-list", Component: ProviderUsaha, props: {}, slot: "daftar-usaha" },
    { key: "usaha-provider-owner", Component: ProviderOwnerUsaha, props: {}, slot: "owner-usaha" },
  ],
  [ROLE_IDS.PlatformOwner]: [],
  [ROLE_IDS.PlatformStaff]: [],
  [ROLE_IDS.CompanyOwner]: [
    { key: "usaha-owner", Component: OwnerUsaha, props: {}, slot: "default" },
  ],
  [ROLE_IDS.CompanyHR]: [
    { key: "usaha-owner", Component: OwnerUsaha, props: {}, slot: "default" },
  ],
  [ROLE_IDS.CompanyManager]: [],
  [ROLE_IDS.CompanyEmployee]: [
    { key: "usaha-owner", Component: OwnerUsaha, props: {}, slot: "default" },
  ],
  DEFAULT: [
    { key: "usaha-owner", Component: OwnerUsaha, props: {}, slot: "default" },
  ],
};
