type WelcomeBannerProps = {
  title: string;
  subtitle: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  className?: string;
};

export function WelcomeBanner({
  title,
  subtitle,
  primaryLabel,
  secondaryLabel,
  className,
}: WelcomeBannerProps) {
  return (
    <section className={className}>
      <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 p-6 text-white shadow-sm">
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-xl font-semibold">{title}</p>
            <p className="text-sm text-white/80">{subtitle}</p>
          </div>
          {primaryLabel || secondaryLabel ? (
            <div className="flex flex-wrap gap-2">
              {primaryLabel ? (
                <button
                  type="button"
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900"
                >
                  {primaryLabel}
                </button>
              ) : null}
              {secondaryLabel ? (
                <button
                  type="button"
                  className="rounded-full border border-white/50 px-4 py-2 text-xs font-semibold text-white"
                >
                  {secondaryLabel}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/15" />
        <div className="pointer-events-none absolute -bottom-8 left-12 h-24 w-24 rounded-full bg-white/10" />
      </article>
    </section>
  );
}
