"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { fetchRoleContext, normalizeRoleKey, setActiveRole, validateActiveRole } from "@/lib/role";

const ROLE_ALLOWED_PATHS: Record<string, string[]> = {
  PLATFORM_OWNER: ["/dashboard", "/usaha", "/karyawan", "/jadwal", "/leave", "/tim", "/performa", "/account", "/provider"],
  PLATFORM_STAFF: ["/dashboard", "/usaha", "/account", "/provider"],
  COMPANY_OWNER: ["/dashboard", "/karyawan", "/usaha", "/performa", "/account"],
  PROVIDER: ["/dashboard", "/usaha", "/account", "/provider"],
  OWNER: ["/dashboard", "/karyawan", "/usaha", "/performa", "/account"],
  HR_ADMIN: ["/dashboard", "/jadwal", "/karyawan", "/leave", "/tim", "/performa", "/account"],
  EMPLOYEE: ["/dashboard", "/leave", "/performa", "/tim", "/account"],
  MANAGER: ["/dashboard", "/account"],
};

const ALWAYS_ALLOWED = new Set(["/select-role"]);

const isPathAllowed = (pathname: string, allowedPrefixes: string[]) => {
  if (ALWAYS_ALLOWED.has(pathname)) {
    return true;
  }
  return allowedPrefixes.some((prefix) =>
    pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
};

const resolveFallbackPath = (roleCode: string | null) => {
  if (!roleCode) {
    return "/select-role";
  }
  const allowed = ROLE_ALLOWED_PATHS[roleCode];
  return allowed?.[0] ?? "/dashboard";
};

const isPlatformAccessRole = (roleCode: string | null) =>
  roleCode === "PLATFORM_OWNER" || roleCode === "PLATFORM_STAFF" || roleCode === "PROVIDER";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const runGuard = async () => {
      if (pathname === "/select-role") {
        const context = await fetchRoleContext();
        if (!context) {
          if (isMounted) {
            setIsAllowed(false);
            router.replace("/login");
          }
          return;
        }
        if (isMounted) {
          setIsAllowed(true);
        }
        return;
      }

      const validation = await validateActiveRole();
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.info("guard_validation:", {
          pathname,
          result: validation,
        });
      }
      if (!validation.ok) {
        if (isMounted) {
          setIsAllowed(false);
          if (validation.reason === "unauthenticated") {
            router.replace("/login");
            return;
          }
          if (validation.reason === "missing") {
            router.replace("/select-role?error=no_active_role");
            return;
          }
          if (validation.reason === "no-roles") {
            router.replace("/select-role?error=no_roles");
            return;
          }
          router.replace("/select-role?error=invalid_role");
        }
        return;
      }

      const activeKey = normalizeRoleKey(validation.role.roleCode);
      if (activeKey) {
        setActiveRole(activeKey);
      }
      const allowedPrefixes = activeKey ? ROLE_ALLOWED_PATHS[activeKey] : null;
      if (!allowedPrefixes?.length) {
        if (isMounted) {
          setIsAllowed(false);
          router.replace("/select-role");
        }
        return;
      }

      if (!isPathAllowed(pathname, allowedPrefixes)) {
        if (isMounted) {
          setIsAllowed(false);
          if (pathname.startsWith("/provider") && !isPlatformAccessRole(activeKey)) {
            window.alert("Akses ditolak. Menu platform hanya untuk PLATFORM_OWNER atau PLATFORM_STAFF.");
          }
          router.replace(resolveFallbackPath(activeKey));
        }
        return;
      }

      if (isMounted) {
        setIsAllowed(true);
      }
    };

    runGuard();

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  if (!isAllowed) {
    return null;
  }

  return <>{children}</>;
}
