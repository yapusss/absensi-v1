import { DonutChart } from "@/components/charts/DonutChart";

type AbsensiSummaryCardProps = {
  title?: string;
  eyebrow?: string;
  badge?: string;
  badgeClassName?: string;
  labels: string[];
  values: number[];
  colors: string[];
  className?: string;
  headline?: string;
};

const isHexColor = (value: string) => /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value);

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace("#", "");
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;
  const red = parseInt(full.slice(0, 2), 16);
  const green = parseInt(full.slice(2, 4), 16);
  const blue = parseInt(full.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

export function AbsensiSummaryCard({
  title,
  eyebrow,
  badge,
  badgeClassName = "rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500",
  labels,
  values,
  colors,
  className,
  headline,
}: AbsensiSummaryCardProps) {
  const heading = title ?? eyebrow;
  const hasHeader = heading || badge;
  const headlineText = headline ?? `${values[0] ?? 0}% hadir`;

  return (
    <article className={className ?? ""}>
      {hasHeader ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {heading ? (
            <h2 className="text-lg font-semibold text-slate-900">{heading}</h2>
          ) : null}
          {badge ? <span className={badgeClassName}>{badge}</span> : null}
        </div>
      ) : null}
      <div
        className={`flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-6 ${
          hasHeader ? "mt-10" : ""
        }`}
      >
        <div className="flex flex-1 items-center justify-center">
          <div className="h-44 w-44 sm:h-52 sm:w-52">
            <DonutChart labels={labels} values={values} colors={colors} />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center space-y-2 text-xs text-slate-500">
          <p className="text-lg font-semibold text-slate-900">{headlineText}</p>
          {labels.map((label, index) => {
            const color = colors[index];
            const useColor = color && isHexColor(color);
            const pillStyle = useColor
              ? {
                  backgroundColor: hexToRgba(color, 0.12),
                  color,
                }
              : undefined;
            const dotStyle = useColor ? { backgroundColor: color } : undefined;
            return (
              <span
                key={label}
                className={`flex items-center gap-2 rounded-full px-3 py-1 ${
                  useColor ? "" : "bg-slate-100 text-slate-600"
                }`}
                style={pillStyle}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    useColor ? "" : "bg-slate-400"
                  }`}
                  style={dotStyle}
                />
                {label} {values[index] ?? 0}
              </span>
            );
          })}
        </div>
      </div>
    </article>
  );
}
