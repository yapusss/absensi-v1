"use client";

import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { LineChart } from "@/components/charts/LineChart";
import { TableToolbar } from "@/components/layout/TableToolbar";
import { Pagination } from "@/components/ui/Pagination";
import { Modal } from "@/components/ui/Modal";
import { ActionButton } from "@/components/ui/ActionButton";

const totalKaryawan = 40;
const attendanceDaily = Array.from({ length: 31 }, (_, index) => {
  const day = index + 1;
  const step = (totalKaryawan - 16) / 30;
  const base = 16 + step * index;
  const wobble = Math.sin(index / 2) * 1.4 + Math.cos(index / 3) * 0.8;
  const tepatWaktu = Math.min(
    totalKaryawan,
    Math.max(0, Math.round(base + wobble)),
  );
  const terlambat = Math.max(totalKaryawan - tepatWaktu, 0);
  return { day, tepatWaktu, terlambat };
});

const attendanceLabels = attendanceDaily.map((item) => item.day.toString());
const attendanceSeries = [
  {
    label: "Tepat Waktu",
    values: attendanceDaily.map((item) => item.tepatWaktu),
    color: "#60a5fa",
  },
  {
    label: "Terlambat",
    values: attendanceDaily.map((item) => item.terlambat),
    color: "#fb7185",
  },
];

const attendanceLineSeries = attendanceSeries.map((item) => ({
  label: item.label,
  values: item.values,
  stroke: item.color,
}));

const performanceRows = [
  {
    no: 1,
    nama: "Haoris Nur",
    fotoUrl: "/dempe.jpg",
    totalJam: 68,
    totalTepatWaktu: 22,
    totalTerlambat: 7,
    totalAbsen: 7,
  },
  {
    no: 2,
    nama: "Drupadi Ginaris",
    fotoUrl: "/hamriz.jpg",
    totalJam: 63,
    totalTepatWaktu: 18,
    totalTerlambat: 13,
    totalAbsen: 2,
  },
  {
    no: 3,
    nama: "Timotius Victory",
    fotoUrl: "/jempi.jpg",
    totalJam: 70,
    totalTepatWaktu: 26,
    totalTerlambat: 5,
    totalAbsen: 5,
  },
];

type PerformanceRow = (typeof performanceRows)[number];
type HighlightMetricKey = "totalTerlambat" | "totalAbsen" | "totalTepatWaktu";

const highlightCriteria = [
  {
    id: "terlambat",
    label: "Paling sering terlambat",
    metricKey: "totalTerlambat" as HighlightMetricKey,
    unit: "kali",
  },
  {
    id: "absen",
    label: "Paling sering tidak masuk",
    metricKey: "totalAbsen" as HighlightMetricKey,
    unit: "kali",
  },
  {
    id: "tepatWaktu",
    label: "Paling sering tepat waktu",
    metricKey: "totalTepatWaktu" as HighlightMetricKey,
    unit: "hari",
  },
];

const cardBase =
  "min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md";

export default function OwnerPerformaPage() {
  const [sortBy, setSortBy] = useState("");
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedPerformance, setSelectedPerformance] = useState<PerformanceRow | null>(null);

  const activeCriteria =
    highlightCriteria.find((item) => item.id === sortBy) ??
    highlightCriteria[0];

  const sortedHighlights = useMemo(() => {
    const metricKey = activeCriteria.metricKey;
    return [...performanceRows].sort(
      (a: PerformanceRow, b: PerformanceRow) => b[metricKey] - a[metricKey],
    );
  }, [activeCriteria]);

  return (
    <DashboardShell active="HR" ownerSubActive="Performa">
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            Performa Karyawan
          </h1>
          <p className="text-xs text-slate-400">Beranda/Performa</p>
        </header>

 

        <div className="grid gap-4 lg:grid-cols-4">
          <article className={`${cardBase} lg:col-span-3`}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Kehadiran Karyawan
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <select className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                    <option>Desember</option>
                    <option>November</option>
                    <option>Oktober</option>
                  </select>
                  <select className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                    <option>2025</option>
                    <option>2024</option>
                    <option>2023</option>
                  </select>
                </div>
              </div>
              <div className="h-64">
                <LineChart
                  labels={attendanceLabels}
                  values={attendanceSeries[0].values}
                  series={attendanceLineSeries}
                  showAllTicks
                />
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-blue-400" />
                  Tepat Waktu
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-rose-400" />
                  Terlambat
                </span>
              </div>
            </div>
          </article>

          <article className={`${cardBase} lg:col-span-1`}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-slate-900">
                  Sorotan Kehadiran
                </h2>
              </div>
              <div>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 pr-10 text-sm font-semibold text-slate-600"
                >
                  <option value="" disabled>
                    Urut berdasarkan
                  </option>
                  {highlightCriteria.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-3">
                {sortedHighlights.map((row, index) => (
                  <div
                    key={row.no}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-sm font-semibold text-slate-500 shadow-sm">
                        {index + 1}
                      </span>
                      <img
                        src={row.fotoUrl || "/icons/dot-blue.svg"}
                        alt={`Foto ${row.nama}`}
                        className="h-10 w-10 rounded-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0 flex-1 px-3">
                      <p className="truncate text-sm font-semibold text-slate-700">
                        {row.nama}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {activeCriteria.label}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-700">
                        {row[activeCriteria.metricKey]}
                      </p>
                      <p className="text-xs text-slate-500">
                        {activeCriteria.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>

        <article className={cardBase}>
          <TableToolbar
          primaryActions={
              <button className="h-10 rounded-lg bg-green-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-green-600">
                Cetak Laporan
              </button>
            }
            searchPlaceholder="Cari Jadwal..."
            rightActions={
              <details className="relative z-20">
                <summary
                  className="grid h-10 w-10 cursor-pointer place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 [&::-webkit-details-marker]:hidden"
                  aria-label="Urutkan"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <path d="M4 7h16" />
                    <path d="M6 12h12" />
                    <path d="M10 17h8" />
                  </svg>
                </summary>
                <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-slate-200 bg-white p-2 text-xs shadow-lg">
                  <p className="px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Urut berdasarkan
                  </p>
                  {[
                    "Nama A-Z",
                    "Nama Z-A",
                    "Terlambat terbanyak",
                    "Absen terbanyak",
                    "Tepat waktu terbanyak",
                  ].map((label) => (
                    <button
                      key={label}
                      type="button"
                      className="w-full rounded-md px-3 py-2 text-left text-slate-600 hover:bg-slate-100"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </details>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-separate border-spacing-0 text-sm">
              <thead className="sticky top-0 z-10 bg-gradient-to-r from-sky-50 to-blue-100">
                <tr>
                  {"No., Nama Karyawan, Total Jam Kerja, Total Terlambat, Total Absen, Aksi"
                    .split(", ")
                    .map((label) => (
                      <th
                        key={label}
                        className={`border-b border-r border-slate-200 px-3 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 ${
                          label.trim().toLowerCase().startsWith("no")
                            ? "w-10"
                            : ""
                        } last:border-r-0`.trim()}
                      >
                        {label}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {performanceRows.map((row) => (
                  <tr key={row.no} className="odd:bg-slate-50">
                    <td className="w-10 border-b border-r border-slate-200 px-3 py-3 text-center text-slate-700 last:border-r-0">
                      {row.no}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-slate-700 last:border-r-0">
                      <div className="flex items-center gap-2">
                        <img
                          src={row.fotoUrl || "/icons/dot-blue.svg"}
                          alt={`Foto ${row.nama}`}
                          className="h-6 w-6 rounded-full object-cover"
                          loading="lazy"
                        />
                        <span>{row.nama}</span>
                      </div>
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center text-slate-600 last:border-r-0">
                      {row.totalJam}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center text-slate-600 last:border-r-0">
                      {row.totalTerlambat}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center text-slate-600 last:border-r-0">
                      {row.totalAbsen}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center last:border-r-0 flex items-center justify-center">
                      <ActionButton
                        onClick={() => {
                          setSelectedPerformance(row);
                          setOpenDetail(true);
                        }}
                        aria-label={`Detail ${row.nama}`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-4 w-4"
                        >
                          <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
                    <Pagination
                      page={1}
                      totalPages={1}
                      summaryText={`Menampilkan ${performanceRows.length} data`}
                      className="mt-4"
                    />
        </article>

        <Modal
          open={openDetail}
          onClose={() => {
            setOpenDetail(false);
            setSelectedPerformance(null);
          }}
          title="Detail Performa Karyawan"
          size="lg"
        >
          {selectedPerformance && (
            <div className="flex flex-col gap-10 pb-6 sm:flex-row">
              <div className="flex shrink-0 justify-center sm:justify-start">
                <img
                  src={selectedPerformance.fotoUrl || "/icons/dot-blue.svg"}
                  alt={`Foto ${selectedPerformance.nama}`}
                  className="h-40 w-40 rounded-lg object-cover"
                />
              </div>

              <div className="grid flex-1 gap-2">
                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Nama Karyawan
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedPerformance.nama}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Total Jam Kerja
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedPerformance.totalJam} jam
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Total Tepat Waktu
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedPerformance.totalTepatWaktu} hari
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Total Terlambat
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedPerformance.totalTerlambat} kali
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Total Absen
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedPerformance.totalAbsen} kali
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Persentase Kehadiran
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {Math.round(
                      ((selectedPerformance.totalTepatWaktu +
                        selectedPerformance.totalTerlambat) /
                        (selectedPerformance.totalTepatWaktu +
                          selectedPerformance.totalTerlambat +
                          selectedPerformance.totalAbsen)) *
                        100,
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardShell>
  );
}
