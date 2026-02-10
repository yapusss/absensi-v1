import Link from "next/link";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import type { ReactNode } from "react";

type WorkPerformanceCardProps = {
  label?: string;
  badge?: ReactNode;
  badgeClassName?: string;
  className?: string;
  chartClassName?: string;
  chartWrapperClassName?: string;
  chartHref?: string;
  labels: string[];
  values: number[];
  color?: string;
  lineValues?: number[];
  lineColor?: string;
  barRadius?: number;
  chartType?: "bar" | "line";
};

export function WorkPerformanceCard({
  label = "Performa kerja",
  badge,
  badgeClassName = "rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500",
  className,
  chartClassName = "h-44 sm:h-48",
  chartWrapperClassName,
  chartHref,
  labels,
  values,
  color = "#fb7185",
  lineValues,
  lineColor,
  barRadius,
  chartType = "bar",
}: WorkPerformanceCardProps) {
  const hasHeader = label || badge;

  return (
    <article className={className ?? ""}>
      {hasHeader ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {label ? (
            <h2 className="text-lg font-semibold text-slate-900">{label}</h2>
          ) : null}
          {badge
            ? typeof badge === "string"
              ? (
                  <span className={badgeClassName}>{badge}</span>
                )
              : (
                  badge
                )
            : null}
        </div>
      ) : null}
      <div className={`mt-4 ${chartWrapperClassName ?? ""}`}>
        {chartHref ? (
          <Link
            href={chartHref}
            className="block"
            aria-label={`${label ?? "Performa kinerja"} selengkapnya`}
          >
            <div className={chartClassName}>
              {chartType === "line" ? (
                <LineChart
                  labels={labels}
                  values={values}
                  tension={0}
                  stroke={lineColor ?? color}
                />
              ) : (
                <BarChart
                  labels={labels}
                  values={values}
                  color={color}
                  lineValues={lineValues}
                  lineColor={lineColor}
                  barRadius={barRadius}
                />
              )}
            </div>
          </Link>
        ) : (
          <div className={chartClassName}>
            {chartType === "line" ? (
              <LineChart
                labels={labels}
                values={values}
                tension={0}
                stroke={lineColor ?? color}
              />
            ) : (
              <BarChart
                labels={labels}
                values={values}
                color={color}
                lineValues={lineValues}
                lineColor={lineColor}
                barRadius={barRadius}
              />
            )}
          </div>
        )}
      </div>
    </article>
  );
}
