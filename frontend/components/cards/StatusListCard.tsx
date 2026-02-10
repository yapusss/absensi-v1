type StatusListItem = {
  nama: string;
  status: string;
};

type StatusListCardProps = {
  title: string;
  subtitle?: string;
  items: StatusListItem[];
  className?: string;
  toneMap?: Record<string, string>;
};

const defaultTone = "bg-slate-100 text-slate-600";

export function StatusListCard({
  title,
  subtitle,
  items,
  className,
  toneMap,
}: StatusListCardProps) {
  return (
    <article className={className ?? ""}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {subtitle ? <span className="text-xs text-slate-400">{subtitle}</span> : null}
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.nama}
            className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-dashed border-slate-200 bg-white px-4 py-3"
          >
            <div className="flex items-start gap-3">
              <span className="h-9 w-9 rounded-full bg-slate-100" />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.nama}
                </p>
                <p className="text-xs text-slate-500">{item.status}</p>
              </div>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                toneMap?.[item.status] ?? defaultTone
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
