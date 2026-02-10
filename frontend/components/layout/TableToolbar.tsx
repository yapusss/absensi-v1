"use client";

import type { ReactNode } from "react";
import { SearchBar } from "@/components/layout/SearchBar";

type TableToolbarProps = {
  primaryActions?: ReactNode;
  rightActions?: ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearchButton?: boolean;
  searchButtonAriaLabel?: string;
  onSearchButtonClick?: () => void;
  className?: string;
  searchClassName?: string;
  showDivider?: boolean;
};

export function TableToolbar({
  primaryActions,
  rightActions,
  searchPlaceholder = "Cari data",
  searchValue,
  onSearchChange,
  showSearchButton = true,
  searchButtonAriaLabel = "Cari",
  onSearchButtonClick,
  className,
  searchClassName,
  showDivider = true,
}: TableToolbarProps) {
  const layoutClass = [
    "flex flex-col gap-3 sm:flex-row sm:items-center",
    showDivider ? "border-b border-slate-200 pb-3" : "",
    className ?? "",
  ]
    .join(" ")
    .trim();

  return (
    <div className={layoutClass}>
      {primaryActions ? (
        <div className="flex shrink-0 items-center gap-2">
          {primaryActions}
        </div>
      ) : null}
      <SearchBar
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={onSearchChange}
        showButton={showSearchButton}
        buttonAriaLabel={searchButtonAriaLabel}
        onButtonClick={onSearchButtonClick}
        className={`flex-1 ${searchClassName ?? ""}`.trim()}
      />
      {rightActions ? (
        <div className="flex shrink-0 items-center gap-2">{rightActions}</div>
      ) : null}
    </div>
  );
}
