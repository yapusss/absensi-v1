"use client";

type PaginationProps = {
  page: number;
  totalPages: number;
  summaryText?: string;
  onPageChange?: (nextPage: number) => void;
  className?: string;
};

export function Pagination({
  page,
  totalPages,
  summaryText,
  onPageChange,
  className,
}: PaginationProps) {
  const canPrev = page > 1 && Boolean(onPageChange);
  const canNext = page < totalPages && Boolean(onPageChange);
  const summary =
    summaryText ?? `Menampilkan halaman ${page} dari ${totalPages}`;
  const showPaging = totalPages > 1;

  const pageItems: Array<number | "ellipsis"> = [];
  if (showPaging) {
    const firstPage = 1;
    const lastPage = totalPages;
    pageItems.push(firstPage);
    if (page > firstPage + 1) {
      pageItems.push("ellipsis");
    }
    if (page > firstPage && page < lastPage) {
      pageItems.push(page);
    }
    if (page < lastPage - 1) {
      pageItems.push("ellipsis");
    }
    if (lastPage !== firstPage) {
      pageItems.push(lastPage);
    }
  } else {
    pageItems.push(page);
  }

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 ${
        className ?? ""
      }`}
    >
      <p className="text-xs text-slate-500">{summary}</p>
      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange?.(page - 1)}
          disabled={!canPrev}
          className="grid h-8 w-8 place-items-center rounded-full text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Sebelumnya"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        {pageItems.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-1 text-xs text-slate-400"
              >
                ...
              </span>
            );
          }

          const isActive = item === page;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange?.(item)}
              disabled={!onPageChange}
              className={
                isActive
                  ? "grid h-7 w-7 place-items-center rounded-full bg-blue-500 text-xs font-semibold text-white"
                  : "grid h-7 w-7 place-items-center rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              }
              aria-current={isActive ? "page" : undefined}
            >
              {item}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onPageChange?.(page + 1)}
          disabled={!canNext}
          className="grid h-8 w-8 place-items-center rounded-full text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Berikutnya"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
