"use client";

import { useSyncExternalStore } from "react";

import { timSectionsByRole } from "@/config/tim-widgets";
import { getActiveRole } from "@/lib/auth";
import type { RoleIdOrDefault } from "@/lib/role";

const subscribeToRole = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

export default function TimPage() {
  const role = useSyncExternalStore<RoleIdOrDefault>(
    subscribeToRole,
    getActiveRole,
    () => "DEFAULT",
  );

  const sections = timSectionsByRole[role] ?? timSectionsByRole.DEFAULT;

  return (
    <>
      {sections.map((section) => {
        const SectionComponent = section.Component;
        return <SectionComponent key={section.key} {...section.props} />;
      })}
    </>
  );
}
