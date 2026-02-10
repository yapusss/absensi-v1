"use client";

import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { LineChart } from "@/components/charts/LineChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { Pagination } from "@/components/ui/Pagination";

const cardBase =
  "min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md";

const performanceTrend = {
  labels: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ],
  values: [
    8.0, 7.6, 7.9, 8.2, 7.5, 8.1, 7.8, 8.3, 7.7, 8.0,
    7.9, 8.4, 7.6, 8.1, 7.8, 8.5, 7.9, 8.2, 7.7, 8.6,
    7.8, 8.3, 7.9, 8.1, 7.6, 8.2, 7.8, 8.4, 7.9, 8.7,
  ],
};

const attendanceSummary = {
  labels: ["Hadir", "Terlambat", "Tidak hadir"],
  values: [72, 18, 10],
  colors: ["#22c55e", "#f97316", "#facc15"],
};

const monthlyLogs = [
  {
    tanggal: "01 Mar",
    bulan: "Mar",
    tahun: "2025",
    masuk: "08:01",
    pulang: "17:02",
    total: "9j 01m",
    status: "Tepat waktu",
    dinasLuar: "Tidak",
  },
  {
    tanggal: "03 Mar",
    bulan: "Mar",
    tahun: "2025",
    masuk: "08:20",
    pulang: "17:15",
    total: "8j 55m",
    status: "Terlambat",
    dinasLuar: "Tidak",
  },
  {
    tanggal: "05 Mar",
    bulan: "Mar",
    tahun: "2025",
    masuk: "08:05",
    pulang: "17:00",
    total: "8j 55m",
    status: "Tepat waktu",
    dinasLuar: "Tidak",
  },
  {
    tanggal: "07 Mar",
    bulan: "Mar",
    tahun: "2025",
    masuk: "08:10",
    pulang: "17:25",
    total: "9j 15m",
    status: "Terlambat",
    dinasLuar: "Tidak",
  },
  {
    tanggal: "10 Mar",
    bulan: "Mar",
    tahun: "2025",
    masuk: "07:58",
    pulang: "16:55",
    total: "8j 57m",
    status: "Tepat waktu",
    dinasLuar: "Tidak",
  },
  {
    tanggal: "12 Mar",
    bulan: "Mar",
    tahun: "2025",
    masuk: "08:30",
    pulang: "17:10",
    total: "8j 40m",
    status: "Terlambat",
    dinasLuar: "Ya",
  },
  {
    tanggal: "14 Mar",
    bulan: "Mar",
    tahun: "2025",
    masuk: "08:03",
    pulang: "17:05",
    total: "9j 02m",
    status: "Tepat waktu",
    dinasLuar: "Tidak",
  },
  {
    tanggal: "18 Mar",
    bulan: "Mar",
    tahun: "2025",
    masuk: "08:12",
    pulang: "17:00",
    total: "8j 48m",
    status: "Terlambat",
    dinasLuar: "Ya",
  },
  {
    tanggal: "21 Mar",
    bulan: "Mar",
    tahun: "2025",
    masuk: "08:00",
    pulang: "17:08",
    total: "9j 08m",
    status: "Tepat waktu",
    dinasLuar: "Tidak",
  },
  {
    tanggal: "25 Mar",
    bulan: "Mar",
    tahun: "2025",
    masuk: "08:07",
    pulang: "17:03",
    total: "8j 56m",
    status: "Tepat waktu",
    dinasLuar: "Tidak",
  },
  {
    tanggal: "27 Mar",
    bulan: "Mar",
    tahun: "2025",
    masuk: "08:22",
    pulang: "17:30",
    total: "9j 08m",
    status: "Terlambat",
    dinasLuar: "Tidak",
  },
  {
    tanggal: "30 Mar",
    bulan: "Mar",
    tahun: "2025",
    masuk: "08:04",
    pulang: "16:58",
    total: "8j 54m",
    status: "Tepat waktu",
    dinasLuar: "Tidak",
  },
];

export default function EmployeePerformancePage() {
  const [selectedMonth, setSelectedMonth] = useState("Mar");
  const [selectedYear, setSelectedYear] = useState("2025");

  const filteredLogs = useMemo(() => {
    return monthlyLogs.filter(
      (row) => row.bulan === selectedMonth && row.tahun === selectedYear
    );
  }, [selectedMonth, selectedYear]);

  return (
    <DashboardShell active="Karyawan">
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-semibold text-slate-900">
            Performa Saya
          </h1>
          <p className="text-xs text-slate-400">Beranda/Performa</p>
        </header>
<section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <article className={cardBase}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Performa bulanan
            </h2>
            <span className="text-xs text-slate-400">30 hari</span>
          </div>
          <div className="mt-4 h-44 sm:h-52">
            <LineChart
              labels={performanceTrend.labels}
              values={performanceTrend.values}
              stroke="#0ea5e9"
              fill="rgba(14,165,233,0.18)"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-600">
              Tepat waktu 18
            </span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-600">
              Terlambat 2
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-600">
              Absen 0
            </span>
          </div>
        </article>
        <article className={cardBase}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Distribusi kehadiran
            </h2>
            <span className="text-xs text-slate-400">30 hari</span>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-3">
            <div className="h-40 w-40">
              <DonutChart
                labels={attendanceSummary.labels}
                values={attendanceSummary.values}
                colors={attendanceSummary.colors}
                centerLabel="Kehadiran"
                centerValue="72%"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {attendanceSummary.labels.map((label, index) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-slate-600"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: attendanceSummary.colors[index] }}
                  />
                  {label} {attendanceSummary.values[index]}
                </span>
              ))}
            </div>
          </div>
        </article>
        {/* <article className={cardBase}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Ringkasan</h2>
            <span className="text-xs text-slate-400">30 hari</span>
          </div>
          <div className="mt-6 flex h-[220px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-400">
            Slot ringkasan
          </div>
        </article> */}
            </section>

        <article className={cardBase}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Rekap jam kerja bulanan
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={selectedMonth}
                onChange={(event) => setSelectedMonth(event.target.value)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600"
              >
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "Mei",
                  "Jun",
                  "Jul",
                  "Agu",
                  "Sep",
                  "Okt",
                  "Nov",
                  "Des",
                ].map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(event) => setSelectedYear(event.target.value)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600"
              >
                {["2025", "2024", "2023"].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="max-h-100 mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] table-fixed border-separate border-spacing-0 text-sm">
              <thead className="sticky top-0 z-10 bg-gradient-to-r from-sky-50 to-blue-100">
                <tr>
                    {[
                      "No.",
                      "Tanggal",
                      "Masuk",
                      "Pulang",
                      "Total Jam",
                      "Status", 
                    ].map((label) => (
                      <th
                        key={label}
                        className={`border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0 ${
                          label === "No." ? "w-12" : ""
                        }`}
                      >
                        {label}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((row, index) => (
                  <tr key={`${row.tanggal}-${row.masuk}`}>
                    <td className="border-b border-r border-slate-200 px-2 py-3 text-center text-slate-700 last:border-r-0 w-12">
                      {index + 1}
                    </td>
                    <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-700 last:border-r-0">
                      {row.tanggal}
                    </td>
                    <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-500 last:border-r-0">
                      {row.masuk}
                    </td>
                    <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-500 last:border-r-0">
                      {row.pulang}
                    </td>
                    <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-500 last:border-r-0">
                      {row.total}
                    </td>
                    <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-500 last:border-r-0">
                      {row.status}
                    </td>
                     
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            className="mt-4"
            page={1}
            totalPages={1}
            summaryText={`Menampilkan ${filteredLogs.length} data`}
          />
        </article>
      </div>
    </DashboardShell>
  );
}
