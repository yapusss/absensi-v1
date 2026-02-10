"use client";

import { usePathname } from "next/navigation";

type AppFooterProps = {
  className?: string;
  containerClassName?: string;
  hideOnDashboard?: boolean;
};

const protectedPrefixes = [
  "/dashboard",
  "/account",
  "/performa",
  "/usaha",
  "/tim",
  "/leave",
  "/karyawan",
  "/jadwal",
  "/select-role",
];

export function AppFooter({
  className,
  containerClassName,
  hideOnDashboard,
}: AppFooterProps) {
  const pathname = usePathname();

  if (hideOnDashboard && protectedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  const year = new Date().getFullYear();
  const footerClassName = [
    "border-t border-slate-200 bg-white/80 px-4 py-3 text-xs text-slate-500 sm:px-6",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const innerClassName = [
    "flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between",
    containerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <footer className={footerClassName}>
      <div className={innerClassName}>
        <span className="font-semibold text-slate-600">absensi.co.id</span>
        <span>Copyright {year} Absensi Pulse. Semua hak dilindungi.</span>
      </div>
    </footer>
  );
}
