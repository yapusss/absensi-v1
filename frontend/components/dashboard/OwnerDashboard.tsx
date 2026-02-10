"use client";

import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { AbsensiSummaryCard } from "@/components/cards/AbsensiSummaryCard";
import { StatusListCard } from "@/components/cards/StatusListCard";
import { WorkPerformanceCard } from "@/components/cards/WorkPerformanceCard";
import Link from "next/link";

const totals = [
  {
    label: "Total karyawan",
    value: "86",
    meta: "+3 bulan ini",
    href: "/performa",
    tone: "border-l-indigo-400",
    iconBg: "bg-indigo-50 text-indigo-600",
    metaTone: "text-indigo-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <path d="M7 11c2 0 3.5-1.6 3.5-3.5S9 4 7 4 3.5 5.6 3.5 7.5 5 11 7 11z" />
        <path d="M17 11c2 0 3.5-1.6 3.5-3.5S19 4 17 4s-3.5 1.6-3.5 3.5S15 11 17 11z" />
        <path d="M3 20c0-3 2.5-5.5 5.5-5.5S14 17 14 20" />
        <path d="M10 20c0-2.4 1.9-4.3 4.3-4.3H18" />
      </svg>
    ),
  },
  {
    label: "Masuk hari ini",
    value: "72",
    meta: "84% hadir",
    href: "/performa",
    tone: "border-l-emerald-400",
    iconBg: "bg-emerald-50 text-emerald-600",
    metaTone: "text-emerald-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <path d="M12 8v5l3 3" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    label: "Terlambat",
    value: "9",
    meta: "Perlu perhatian",
    href: "/performa",
    tone: "border-l-blue-400",
    iconBg: "bg-blue-50 text-blue-600",
    metaTone: "text-blue-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    label: "Tidak hadir",
    value: "5",
    meta: "Follow-up HR",
    href: "/performa",
    tone: "border-l-rose-400",
    iconBg: "bg-rose-50 text-rose-600",
    metaTone: "text-rose-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <path d="M6 18L18 6M6 6l12 12" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    label: "Avg jam kerja",
    value: "7.8 jam",
    meta: "Hari ini",
    href: "/performa",
    tone: "border-l-sky-400",
    iconBg: "bg-sky-50 text-sky-600",
    metaTone: "text-sky-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <path d="M12 8v5l3 3" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    label: "Approval pending",
    value: "6",
    meta: "Butuh review",
    href: "/performa",
    tone: "border-l-blue-400",
    iconBg: "bg-blue-50 text-blue-600",
    metaTone: "text-blue-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <path d="M7 12h10" />
        <path d="M12 7v10" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
];

const attendanceBreakdown = {
  labels: ["Hadir", "Terlambat", "Tidak hadir"],
  values: [72, 18, 10],
  colors: ["#22c55e", "#f97316", "#facc15"],
};

const attendanceRange = "Harian";

const performanceByRange = {
  minggu: {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    values: [82, 76, 88, 91, 79, 72, 68],
  },
  bulan: {
    labels: [
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
    ],
    values: [78, 81, 85, 80, 84, 86, 83, 82, 79, 88, 90, 87],
  },
  tahun: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    values: [920, 980, 1040, 1100, 1175],
  },
};

const checkTimes = [
  {
    nama: "Raka Putra",
    masuk: "08:02",
    pulang: "17:06",
    status: "Tepat waktu",
  },
  {
    nama: "Sinta Wardani",
    masuk: "08:19",
    pulang: "17:05",
    status: "Terlambat",
  },
  {
    nama: "Ilham Ardi",
    masuk: "08:01",
    pulang: "--",
    status: "Sedang bekerja",
  },
  {
    nama: "Ayu Pratiwi",
    masuk: "08:03",
    pulang: "17:02",
    status: "Tepat waktu",
  },
  {
    nama: "Damar Wijaya",
    masuk: "08:12",
    pulang: "17:10",
    status: "Terlambat",
  },
  {
    nama: "Naya Kinanti",
    masuk: "07:58",
    pulang: "16:58",
    status: "Tepat waktu",
  },
  {
    nama: "Bimo Setia",
    masuk: "08:10",
    pulang: "--",
    status: "Sedang bekerja",
  },
  {
    nama: "Sari Andini",
    masuk: "08:05",
    pulang: "17:08",
    status: "Tepat waktu",
  },
  {
    nama: "Rio Mahesa",
    masuk: "08:15",
    pulang: "17:04",
    status: "Terlambat",
  },
  {
    nama: "Fina Lestari",
    masuk: "08:00",
    pulang: "17:00",
    status: "Tepat waktu",
  },
];

const holidayCalendar = { monthLabel: "Maret 2025" };
const holidayDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const holidayMap = new Map([[1, "Hari Kemerdekaan"]]);

const statusList = [
  { nama: "Ayu Pratiwi", status: "Aktif" },
  { nama: "Damar Wijaya", status: "Dinas luar" },
  { nama: "Naya Kinanti", status: "Cuti" },
  { nama: "Raka Putra", status: "Aktif" },
];

const leaveRequests = [
  { nama: "Naya Kinanti", alasan: "Cuti tahunan", tanggal: "15-17 Jan" },
  { nama: "Bimo Setia", alasan: "Izin keluarga", tanggal: "18 Jan" },
];

const birthdayRoster = [
  { nama: "Ayu Pratiwi", posisi: "Manager", tanggal: "12 Mar" },
  { nama: "Raka Putra", posisi: "Developer", tanggal: "15 Mar" },
  { nama: "Sinta Wardani", posisi: "Designer", tanggal: "20 Mar" },
];

const cardBase =
  "min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md";
const cardSoft =
  "min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:shadow-md";

export default function OwnerDashboard() {
  const rangeBadgeClass =
    "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700";
  const [sortKey, setSortKey] = useState("");
  const [performanceRange, setPerformanceRange] = useState("minggu");

  const performanceSeries = useMemo(() => {
    return performanceByRange[
      performanceRange as keyof typeof performanceByRange
    ];
  }, [performanceRange]);

  const sortedCheckTimes = useMemo(() => {
    const parseTime = (value: string) => {
      if (!value || value === "--") return Number.POSITIVE_INFINITY;
      const [hours, minutes] = value.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const withFlags = checkTimes.map((row) => ({
      ...row,
      masukValue: parseTime(row.masuk),
      pulangValue: parseTime(row.pulang),
      tepatWaktu: row.status.toLowerCase().includes("tepat"),
    }));

    const sorted = [...withFlags];
    sorted.sort((a, b) => {
      switch (sortKey) {
        case "masuk-asc":
          return a.masukValue - b.masukValue;
        case "masuk-desc":
          return b.masukValue - a.masukValue;
        case "pulang-asc":
          return a.pulangValue - b.pulangValue;
        case "pulang-desc":
          return b.pulangValue - a.pulangValue;
        case "status":
          return a.status.localeCompare(b.status);
        case "tepat-waktu":
          return Number(b.tepatWaktu) - Number(a.tepatWaktu);
        default:
          return 0;
      }
    });
    return sorted;
  }, [sortKey]);

  return (
    <DashboardShell active="Owner" ownerSubActive="Dashboard">
      <div className="space-y-8">
        <header id="beranda" className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
            Owner Usaha
          </span>
          <h1 className="text-2xl font-semibold text-slate-900">
            Pantau performa tim dan kesehatan absensi
          </h1>
          <p className="max-w-2xl text-sm text-slate-500">
            Ringkasan cepat untuk memastikan kehadiran hari ini, danjam kerja
            karyawan.
          </p>
        </header>
<section>
          <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 p-6 text-white shadow-sm">
            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-xl font-semibold">
                  Selamat datang kembali, Adrian
                </p>
                <p className="text-sm text-white/80">
                  14 usaha baru berlangganan hari ini.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900"
                >
                  Pengaturan
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/50 px-4 py-2 text-xs font-semibold text-white"
                >
                  Keluar
                </button>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/15" />
            <div className="pointer-events-none absolute -bottom-8 left-12 h-24 w-24 rounded-full bg-white/10" />
          </article>
        </section>


        <section className="grid gap-4 lg:grid-cols-[1fr_2fr]">
          
<article
            className={`${cardBase} border-orange-100 bg-orange-50/40`}
          >
            <div className="text-center">
              <p className="text-xl font-semibold text-black">Absensi</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                08:35, 11 Mar 2025
              </p>
            </div>
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
                <div
                  className="relative grid h-40 w-40 place-items-center rounded-full"
                  style={{
                    background:
                      "conic-gradient(#22c55e 0deg 260deg, #e2e8f0 260deg 360deg)",
                  }}
                >
                  <div className="absolute inset-2 rounded-full bg-orange-50/80">
                    <div className="flex h-full w-full flex-col items-center justify-center text-center">
                      <span className="text-sm text-slate-500">
                        Total jam kerja
                      </span>
                      <span className="text-lg font-semibold text-slate-900">
                        5:45:32
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 text-sm font-semibold text-slate-700">
                  <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1 text-lg text-slate-600">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-blue-50 text-blue-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-3.5 w-3.5"
                      >
                        <path d="M4 7h4l2-2h4l2 2h4v12H4z" />
                        <circle cx="12" cy="13" r="3" />
                      </svg>
                    </span>
                    Absen masuk 10.00
                  </span>
                  <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1 text-lg text-slate-600">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-3.5 w-3.5"
                      >
                        <path d="M12 7v5l4 2" />
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                    </span>
                    Absen keluar 17.15
                  </span>
                </div>
              </div>

              <div className="grid w-full gap-3 sm:grid-cols-1">
                <button
                  type="button"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                  >
                    <path d="M4 7h4l2-2h4l2 2h4v12H4z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                  Absen 
                </button>
               
              </div>
            </div>
          </article>
          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {totals.map((item) => (
              <Link key={item.label} href={item.href} className="block">
                <article className={`${cardBase} border-l-4 ${item.tone}`}>
                  <div className="flex items-center justify-between min-h-25">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        {item.label}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">
                        {item.value}
                      </p>
                    </div>
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full ${item.iconBg}`}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <p className={`mt-3 text-xs ${item.metaTone ?? "text-slate-500"}`}>
                    {item.meta}
                  </p>
                </article>
              </Link>
            ))}
          </div>
          {/* <AbsensiSummaryCard
            eyebrow="Distribusi kehadiran"
            labels={attendanceBreakdown.labels}
            values={attendanceBreakdown.values}
            colors={attendanceBreakdown.colors}
            badge={attendanceRange}
            badgeClassName={rangeBadgeClass}
            className={cardBase}
          /> */}
           <div className="grid gap-4 mt-3">
            <article className={cardBase}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Kalender libur perusahaan
                  </h2>
                </div>
                
                <span className="rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-500">
                  {holidayCalendar.monthLabel}
                </span>
                 
              </div>
              <div className="mt-4 grid grid-cols-7 gap-0 text-center text-[10px] uppercase tracking-[0.2em] text-slate-400">
                {"Min Sen Sel Rab Kam Jum Sab".split(" ").map((label) => (
                  <span key={label} className="min-w-0">
                    {label}
                  </span>
                ))}
              </div>
              <div className="mt-3 grid auto-rows-fr grid-cols-7 gap-0.5 text-xs">
                {holidayDays.map((day, index) => {
                  if (!day) {
                    return (
                      <span key={`empty-${index}`} className="min-h-[40px]" />
                    );
                  }
                  const holidayLabel = holidayMap.get(day);
                  return (
                    <div
                      key={day}
                      className={`group relative max-h-[44px] rounded-lg border px-1.5 py-1.5 text-center ${
                        holidayLabel
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                      title={holidayLabel ?? undefined}
                    >
                      <div className="text-xs font-semibold">{day}</div>
                      {holidayLabel ? (
                        <div className="pointer-events-none absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-600 shadow-sm group-hover:block">
                          {holidayLabel}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </article>

            </div>
            <div className="grid gap-4 lg:grid-cols-[1fr_2fr] mt-3">
            <article className={cardBase}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Ulang tahun
                  </h2>
                  <p className="text-xs text-slate-400">
                    Karyawan yang berulang tahun
                  </p>
                </div>
                <Link
                  href="/performa"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Selengkapnya
                </Link>
              </div>
              <div className="mt-4 space-y-3">
                {birthdayRoster.map((person) => (
                  <div
                    key={person.nama}
                    className="flex items-center gap-3 rounded-lg border border-dashed border-slate-200 bg-white px-3 py-2"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-600">
                      {person.nama
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {person.nama}
                      </p>
                      <p className="text-xs text-slate-500">{person.posisi}</p>
                    </div>
                    <span className="ml-auto text-xs text-slate-400">
                      {person.tanggal}
                    </span>
                  </div>
                ))}
              </div>
          
            </article>
          
                             <article className={cardBase}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Status absensi karyawan
              </h2>
             
              <div className="flex flex-wrap items-center gap-2">
                <span className={rangeBadgeClass}>{attendanceRange}</span>
                <select
                  value={sortKey}
                  onChange={(event) => setSortKey(event.target.value)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600"
                >
                  <option value="" disabled>
                    Urut berdasarkan
                  </option>
                  <option value="masuk-asc">Masuk tercepat</option>
                  <option value="masuk-desc">Masuk terlambat</option>
                  <option value="pulang-asc">Pulang tercepat</option>
                  <option value="pulang-desc">Pulang terlambat</option>
                  <option value="tepat-waktu">Tepat waktu dulu</option>
                  <option value="status">Status A-Z</option>
                </select>
                 <Link
                href="/performa"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Selengkapnya
              </Link>
              </div>
              
            </div>
            <div className="mt-4 max-h-44 overflow-auto pr-2">
              <table className="w-full table-fixed border-separate border-spacing-0 text-sm">
                <thead className="sticky top-0 z-10 bg-gradient-to-r from-sky-50 to-blue-100">
                  <tr>
                    {"Karyawan Masuk Pulang Status".split(" ").map((label) => (
                      <th
                        key={label}
                        className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedCheckTimes.map((row) => (
                    <tr key={row.nama}>
                      <td className="border-b border-gir border-slate-200 px-2 py-3 text-slate-700 last:border-r-0">
                        {row.nama}
                      </td>
                      <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-500 last:border-r-0">
                        {row.masuk}
                      </td>
                      <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-500 last:border-r-0">
                        {row.pulang}
                      </td>
                      <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-500 last:border-r-0">
                        {row.status}
                      </td>
                       
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
          </div>





        </section>

             </div>
    </DashboardShell>
  );
}

