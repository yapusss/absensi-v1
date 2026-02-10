"use client";

import { useSyncExternalStore } from "react";

import { karyawanSectionsByRole } from "@/config/karyawan-widgets";
import { getActiveRole } from "@/lib/auth";
import type { RoleIdOrDefault } from "@/lib/role";

const subscribeToRole = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

export default function KaryawanPage() {
  const role = useSyncExternalStore<RoleIdOrDefault>(
    subscribeToRole,
    getActiveRole,
    () => "DEFAULT",
  );

  const sections = karyawanSectionsByRole[role] ?? karyawanSectionsByRole.DEFAULT;

  return (
    <>
      {sections.map((section) => {
        const SectionComponent = section.Component;
        return <SectionComponent key={section.key} {...section.props} />;
      })}
    </>
  );
}
