"use client";

import type { ReactNode } from "react";
import { SearchBar } from "@/components/layout/SearchBar";

type OwnerSectionLayoutProps = {
  title: string;
  breadcrumb: string;
  action?: ReactNode;
  actionClassName?: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  toolbarClassName?: string;
  searchPlaceholder?: string;
  searchClassName?: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearchButton?: boolean;
  searchButtonAriaLabel?: string;
  onSearchButtonClick?: () => void;
  children: ReactNode;
};

export function OwnerSectionLayout({
  title,
  breadcrumb,
  action,
  actionClassName,
  primaryAction,
  secondaryAction,
  toolbarClassName,
  searchPlaceholder,
  searchClassName,
  showSearch = false,
  searchValue,
  onSearchChange,
  showSearchButton = true,
  searchButtonAriaLabel = "Cari",
  onSearchButtonClick,
  children,
}: OwnerSectionLayoutProps) {
  const shouldShowSearch = showSearch || Boolean(searchPlaceholder);
  const resolvedPrimaryAction = primaryAction ?? action;
  const resolvedSecondaryAction = secondaryAction;
  const layoutClassName =
    toolbarClassName ??
    actionClassName ??
    (shouldShowSearch || resolvedPrimaryAction || resolvedSecondaryAction
      ? "flex flex-col gap-3 sm:flex-row sm:items-center"
      : "flex justify-end");
  const resolvedSearchClass =
    `flex-1 ${searchClassName ?? ""}`.trim();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="text-xs text-slate-400">{breadcrumb}</p>
      </header>
      {shouldShowSearch || resolvedPrimaryAction || resolvedSecondaryAction ? (
        <div className={layoutClassName}>
          {resolvedPrimaryAction ? (
            <div className="shrink-0">{resolvedPrimaryAction}</div>
          ) : null}
          {shouldShowSearch ? (
            <SearchBar
              placeholder={searchPlaceholder}
              className={resolvedSearchClass}
              value={searchValue}
              onChange={onSearchChange}
            />
          ) : null}
          {resolvedSecondaryAction ? (
            <div className="shrink-0 flex items-center gap-2">
              {showSearchButton ? (
                <button
                  type="button"
                  onClick={onSearchButtonClick}
                  aria-label={searchButtonAriaLabel}
                  className="grid h-10 w-10 place-items-center rounded-md bg-blue-600 text-white shadow-sm transition hover:bg-blue-700"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.5-3.5" />
                  </svg>
                </button>
              ) : null}
              {resolvedSecondaryAction}
            </div>
          ) : showSearchButton ? (
            <div className="shrink-0 flex items-center gap-2">
              <button
                type="button"
                onClick={onSearchButtonClick}
                aria-label={searchButtonAriaLabel}
                className="grid h-10 w-10 place-items-center rounded-md bg-blue-600 text-white shadow-sm transition hover:bg-blue-700"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}
