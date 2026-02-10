"use client";

import { useMemo, useSyncExternalStore } from "react";

import { usahaSectionsByRole } from "@/config/usaha-widgets";
import { getActiveRole } from "@/lib/auth";
import type { RoleIdOrDefault } from "@/lib/role";

const subscribeToRole = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const subscribeToHash = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
};

const getHashSnapshot = () =>
  typeof window === "undefined" ? "" : window.location.hash;

export default function UsahaPage() {
  const role = useSyncExternalStore<RoleIdOrDefault>(
    subscribeToRole,
    getActiveRole,
    () => "DEFAULT",
  );
  const activeHash = useSyncExternalStore(subscribeToHash, getHashSnapshot, () => "");

  const sections = usahaSectionsByRole[role] ?? usahaSectionsByRole.DEFAULT;
  const resolvedSlot = activeHash ? activeHash.replace("#", "") : "default";

  const activeSections = useMemo(() => {
    const matches = sections.filter(
      (section) => (section.slot ?? "default") === resolvedSlot,
    );
    if (matches.length > 0) {
      return matches;
    }
    return sections.filter((section) => (section.slot ?? "default") === "default");
  }, [resolvedSlot, sections]);

  return (
    <>
      {activeSections.map((section) => {
        const SectionComponent = section.Component;
        return <SectionComponent key={section.key} {...section.props} />;
      })}
    </>
  );
}
