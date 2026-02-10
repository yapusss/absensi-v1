"use client";

import { useSyncExternalStore } from "react";

import { jadwalSectionsByRole } from "@/config/jadwal-widgets";
import { getActiveRole } from "@/lib/auth";
import type { RoleIdOrDefault } from "@/lib/role";

const subscribeToRole = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

export default function JadwalPage() {
  const role = useSyncExternalStore<RoleIdOrDefault>(
    subscribeToRole,
    getActiveRole,
    () => "DEFAULT",
  );

  const sections = jadwalSectionsByRole[role] ?? jadwalSectionsByRole.DEFAULT;

  return (
    <>
      {sections.map((section) => {
        const SectionComponent = section.Component;
        return <SectionComponent key={section.key} {...section.props} />;
      })}
    </>
  );
}
