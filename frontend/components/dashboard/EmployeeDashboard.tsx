"use client";

import { AbsensiActionsCard } from "@/components/cards/AbsensiActionsCard";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { StatusListCard } from "@/components/cards/StatusListCard";
import { LineChart } from "@/components/charts/LineChart";
import { WelcomeBanner } from "@/components/widgets/WelcomeBanner";
import Link from "next/link";

const summaries = [
  {
    label: "Tepat waktu",
    value: "20 hari",
    meta: "Target 22 hari",
    href: "/performa",
    tone: "border-l-yellow-400",
    iconBg: "bg-yellow-50 text-yellow-600",
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
    label: "Terlambat bulan ini",
    value: "2 hari",
    meta: "Membaik 40%",
    href: "/performa",
    tone: "border-l-blue-400",
    iconBg: "bg-blue-50 text-blue-600",
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
    label: "Tidak masuk",
    value: "6j 12m",
    meta: "Sisa 1j 48m",
    href: "/performa",
    tone: "border-l-sky-400",
    iconBg: "bg-sky-50 text-sky-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <path d="M12 3v4M12 17v4" />
        <path d="M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8" />
        <circle cx="12" cy="12" r="5" />
      </svg>
    ),
  },
  {
    label: "Sisa cuti",
    value: "7 hari",
    meta: "Reset tahunan",
    href: "/leave",
    tone: "border-l-indigo-400",
    iconBg: "bg-indigo-50 text-indigo-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <path d="M7 4h10v4H7zM5 8h14v12H5z" />
        <path d="M9 14h6" />
      </svg>
    ),
  },
  {
    label: "Kehadiran bulan ini",
    value: "92",
    meta: "Stabil",
    tone: "border-l-emerald-400",
    iconBg: "bg-emerald-50 text-emerald-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <path d="M12 3l2.6 5.3 5.9.9-4.3 4.2 1 5.9L12 16.8 6.8 19.3l1-5.9-4.3-4.2 5.9-.9L12 3z" />
      </svg>
    ),
  },
  {
    label: "Jam kerja",
    value: "8 jam",
    meta: "Personal best",
    tone: "border-l-rose-400",
    iconBg: "bg-rose-50 text-rose-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <path d="M8 6v10" />
        <path d="M12 3v18" />
        <path d="M16 8v8" />
      </svg>
    ),
  }, 
];

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

const absensiActions = [
  {
    title: "Absen masuk",
    note: "Scan wajah dan lokasi",
    endpoint: "/absen/masuk",
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Absen pulang",
    note: "Catat jam pulang",
    endpoint: "/absen/pulang",
    tone: "bg-sky-50 text-sky-600",
  },
];

const teamStatus = [
  { nama: "Ayu Pratiwi", status: "Hadir" },
  { nama: "Bimo Setia", status: "Cuti" },
  { nama: "Damar Wijaya", status: "Dinas luar" },
  { nama: "Sinta Wardani", status: "Hadir" },
];

const employeeDirectory = [
  { nama: "Ayu Pratiwi", divisi: "Marketing", status: "Aktif" },
  { nama: "Bimo Setia", divisi: "Finance", status: "Cuti" },
  { nama: "Damar Wijaya", divisi: "Sales", status: "Dinas luar" },
  { nama: "Sinta Wardani", divisi: "HR", status: "Aktif" },
];

const birthdayRoster = [
  { nama: "Ayu Pratiwi", posisi: "Marketing Manager", tanggal: "15 Mar" },
  { nama: "Bimo Setia", posisi: "Finance Analyst", tanggal: "22 Mar" },
  { nama: "Damar Wijaya", posisi: "Sales Executive", tanggal: "28 Mar" },
];

// const highlights = [
//   {
//     label: "Poin kehadiran",
//     value: "92",
//     note: "Stabil",
//     tone: "bg-emerald-50 text-emerald-600",
//   },
//   {
//     label: "Streak hadir",
//     value: "8 hari",
//     note: "Personal best",
//     tone: "bg-sky-50 text-sky-600",
//   },
//   {
//     label: "Sisa lembur",
//     value: "3 jam",
//     note: "Minggu ini",
//     tone: "bg-amber-50 text-amber-600",
//   },
// ];

const cardBase =
  "min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md";
const cardSoft =
  "min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:shadow-md";

const holidayCalendar = {
  monthLabel: "Januari 2024",
};

const holidayDays = [null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

const holidayMap = new Map([
  [1, "Tahun Baru"],
  [25, "Hari Raya Idul Fitri"],
  [26, "Hari Raya Idul Fitri"],
]);

export default function EmployeeDashboard() {
  return (
    <DashboardShell active="Karyawan">
      <div className="space-y-8">
        <header className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
            Karyawan
          </span>
          <h1 className="text-2xl font-semibold text-slate-900">
            Kehadiran dan performa harianmu
          </h1>
          <p className="max-w-2xl text-sm text-slate-500">
            Pantau ringkasan kehadiran, jam kerja, serta status tim.
          </p>
        </header>

        <WelcomeBanner
          title="Selamat datang kembali, Adrian"
          subtitle="14 usaha baru berlangganan hari ini."
          primaryLabel="Pengaturan"
          secondaryLabel="Keluar"
        />

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
            {summaries.map((item) => {
              const content = (
                <article className={`${cardBase} min-h-[180] border-l-4 ${item.tone}`}>
                  <div className="flex items-center justify-between">
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
                  <p
                    className={`mt-3 text-xs ${
                      item.meta ?? "text-slate-500"
                    }`}
                  >
                    {item.meta}
                  </p>
                </article>
              );

              return item.href ? (
                <Link key={item.label} href={item.href}  >
                  {content}
                </Link>
              ) : (
                <div key={item.label} >
                  {content}
                </div>
              );
            })}
          </div>
          
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
            <Link href="/tim" className="block">
            <article className={`${cardBase} relative min-h-[330px]`}>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold text-slate-900">
                  Ulang tahun
                </h2>
                <p className="text-xs text-slate-400">
                  Karyawan yang berulang tahun
                </p>
              </div>
              <span className="absolute right-5 top-5 text-xs font-semibold text-blue-600">
                Selengkapnya
              </span>
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
            </Link>
             <article className={`${cardBase} relative`}>
            <Link href="/performa" className="block">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Performa bulanan
              </h2> 
              <span className="absolute right-5 top-5 text-xs font-semibold text-blue-600">
              Selengkapnya
            </span>
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
            </Link>
          </article>
          </div> 
           
        </section>


      

   
        {/* <section id="status" className="grid gap-4 lg:grid-cols-2">
          <div>
            <StatusListCard
              title="Status tim"
              subtitle="Hari ini"
              items={teamStatus}
              className={cardBase}
              toneMap={{
                Hadir: "bg-emerald-50 text-emerald-600",
                Cuti: "bg-blue-50 text-blue-600",
              }}
            />
          </div>

          <article id="daftar-karyawan" className={cardBase}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Daftar karyawan
              </h2>
              <span className="text-xs text-slate-400">Tim hari ini</span>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full table-fixed border-separate border-spacing-0 text-sm">
                <thead className="sticky top-0 z-10 bg-gradient-to-r from-sky-50 to-blue-100">
                  <tr>
                      <th className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                        Nama
                      </th>
                      <th className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                        Divisi
                      </th>
                      <th className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                        Status
                      </th>
                  </tr>
                </thead>
                <tbody>
                  {employeeDirectory.map((row) => (
                      <tr key={row.nama}>
                        <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-700 last:border-r-0">
                          {row.nama}
                        </td>
                        <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-500 last:border-r-0">
                          {row.divisi}
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
        </section> */}
      </div>
    </DashboardShell>
  );
}


