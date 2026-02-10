type AbsensiAction = {
  title: string;
  note: string;
  endpoint: string;
  tone: string;
};

type AbsensiActionsCardProps = {
  title: string;
  badge?: string;
  badgeClassName?: string;
  actions: AbsensiAction[];
  clockLabel?: string;
  clockSubLabel?: string;
  checkInTime?: string;
  checkOutTime?: string;
  totalLabel?: string;
  totalValue?: string;
  progressLabel?: string;
  progressValue?: string;
  statusText?: string;
  ctaLabel?: string;
  progress?: number;
  className?: string;
};

export function AbsensiActionsCard({
  title,
  badge,
  badgeClassName = "rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500",
  actions,
  clockLabel = "08:35 AM",
  clockSubLabel = "11 Mar 2025",
  checkInTime = "--.--",
  checkOutTime = "--.--",
  totalLabel = "Total Jam",
  totalValue = "5:45:32",
  ctaLabel,
  progress = 0.72,
  className,
}: AbsensiActionsCardProps) {
  const statusAction = actions[0];
  const ctaAction = actions[1] ?? actions[0];
  const checkInLabel = statusAction?.title ?? "Absen masuk";
  const checkOutLabel = actions[1]?.title ?? "Absen pulang";
  const resolvedCtaLabel = ctaLabel ?? ctaAction?.title ?? "Absen pulang";
  const ringValue = Math.max(0, Math.min(progress, 1)) * 360;
  const actionItems = [
    {
      key: "check-in",
      label: checkInLabel,
      time: checkInTime,
      tone: statusAction?.tone ?? "bg-blue-50 text-blue-600",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
        >
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M9 9h6" />
          <path d="M12 12v3" />
        </svg>
      ),
    },
    {
      key: "check-out",
      label: checkOutLabel,
      time: checkOutTime,
      tone: actions[1]?.tone ?? "bg-emerald-50 text-emerald-600",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
        >
          <path d="M12 8v5l3 3" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      ),
    },
  ];

  return (
    <article className={className ?? ""}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {badge ? <span className={badgeClassName}>{badge}</span> : null}
      </div>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-6 py-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-900">Absensi</p>
          <p className="mt-1 text-sm text-slate-600">
            {clockLabel}, {clockSubLabel}
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex justify-center sm:justify-start">
            <div className="relative h-32 w-32">
              <div
                className="h-full w-full rounded-full"
                style={{
                  background: `conic-gradient(#22c55e ${ringValue}deg, #e2e8f0 0deg)`,
                }}
              />
              <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-emerald-50">
                <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  {totalLabel}
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  {totalValue}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 sm:items-start">
            {actionItems.map((item) => (
              <div
                key={item.key}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full ${item.tone}`}
                >
                  {item.icon}
                </span>
                <span>
                  {item.label} {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <rect x="4" y="5" width="16" height="14" rx="2" />
            <path d="M9 9h6" />
            <path d="M12 12v3" />
          </svg>
          {resolvedCtaLabel}
        </button>
      </div>
    </article>
  );
}
