"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { DonutChart } from "@/components/charts/DonutChart"; 
import Link from "next/link";

const kpis = [
  {
    label: "Usaha aktif",
    value: "124",
    meta: "+12% bulan ini",
    href: "/usaha#daftar-usaha",
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
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    label: "Pemilik terdaftar",
    value: "180",
    meta: "+8 baru",
    href: "/usaha#owner-usaha",
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
        <path d="M12 12c2.5 0 4.5-2 4.5-4.5S14.5 3 12 3 7.5 5 7.5 7.5 9.5 12 12 12z" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    ),
  },
  {
    label: "Langganan aktif",
    value: "96",
    meta: "77% konversi",
    href: "/usaha#owner-usaha",
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
        <path d="M7 4h10l2 4H5l2-4zM5 8h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z" />
        <path d="M9 12h6" />
      </svg>
    ),
  },
  {
    label: "Total pengguna",
    value: "1.248",
    meta: "+6% vs bulan lalu",
    href: "/usaha#owner-usaha",
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
        <path d="M3 12h4l3 6 4-12 3 6h4" />
      </svg>
    ),
  },
];

const subscriptionRows = [
  {
    usaha: "Gudang Kopi",
    logoUrl: "/dempe.jpg",
    status: "Aktif",
    masa: "sisa 21 hari",
  },
  {
    usaha: "Mitra Rasa",
    logoUrl: "/hamriz.jpg",
    status: "Perlu pembaruan",
    masa: "sisa 3 hari",
  },
  {
    usaha: "Bengkel Satu",
    logoUrl: "/jempi.jpg",
    status: "Aktif",
    masa: "sisa 12 hari",
  },
];

const statusTone = (status: string) => {
  const normalized = status.toLowerCase();

  if (normalized.includes("aktif")) {
    return "bg-emerald-50 text-emerald-600";
  }

  if (normalized.includes("perlu")) {
    return "bg-amber-50 text-amber-700";
  }

  if (normalized.includes("kadaluarsa") || normalized.includes("selesai")) {
    return "bg-rose-50 text-rose-600";
  }

  return "bg-slate-100 text-slate-600";
};

const highlights = [
  {
    label: "Pengguna baru",
    value: "28",
    meta: "Minggu ini",
    metaDetail: "vs minggu lalu",
    href: "/usaha#owner-usaha",
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
        <path d="M12 12c2.5 0 4.5-2 4.5-4.5S14.5 3 12 3 7.5 5 7.5 7.5 9.5 12 12 12z" />
        <path d="M4 21c0-4.4 3.6-8 8-8" />
        <path d="M17 10h4" />
        <path d="M19 8v4" />
      </svg>
    ),
  },
  {
    label: "Layanan segera berakhir",
    value: "6",
    meta: "Perlu perpanjang",
    metaDetail: "minggu ini",
    href: "/usaha#daftar-usaha",
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
        <path d="M12 3l9 16H3l9-16z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
];

const userGrowth = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  values: [
    1200, 1280, 1350, 1420, 1500, 1600, 1580, 1650, 1730, 1810, 1900, 2050,
  ],
};

const businessGrowth = {
  labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
  values: [82, 88, 95, 103, 114, 123, 134],
};

const topRevenueBusinesses = {
  labels: [
    "Batik Reka",
    "Studio Kin",
    "Kedai Tiga",
    "Gudang Kopi",
    "Mitra Rasa",
  ],
  values: [5.4, 4.8, 3.2, 2.9, 2.4],
};

const topRevenueColors = [
  "#38bdf8",
  "#22c55e",
  "#f97316",
  "#facc15",
  "#fb7185",
];

const totalTopRevenue = topRevenueBusinesses.values.reduce(
  (total, value) => total + value,
  0,
);
const formatJuta = (value: number) => value.toFixed(1).replace(".", ",");

const cardBase =
  "min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md";
export default function ProviderDashboard() {
  return (
    <DashboardShell active="Penyedia">
      <div className="space-y-8">
        <header className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
            Penyedia Platform
          </span>
          <h1 className="text-2xl font-semibold text-slate-900">
            Dashboard Penyedia Platform
          </h1>
          <p className="max-w-2xl text-sm text-slate-500">
            Kelola owner dan usaha
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

        <section id="sorotan" className="grid gap-4 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kpis.map((item) => (
              <Link key={item.label} href={item.href} className="block">
                <article
                  className={`${cardBase} flex min-h-[132px] flex-col border-l-4 ${item.tone}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="min-h-[32px] text-xs uppercase leading-4 tracking-[0.2em] text-slate-400">
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
                  <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-slate-500">
                    <span className="font-semibold text-emerald-600">
                      {item.meta}
                    </span>
                    <span>vs bulan lalu</span>
                  </div>
                </article>
              </Link>
            ))}
            {highlights.map((item) => (
              <Link key={item.label} href={item.href} className="block">
                <article
                  className={`${cardBase} flex min-h-[132px] flex-col border-l-4 ${item.tone}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="min-h-[32px] text-xs uppercase leading-4 tracking-[0.2em] text-slate-400">
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
                  <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-slate-500">
                    <span className={`font-semibold ${item.metaTone}`}>
                      {item.meta}
                    </span>
                    {item.metaDetail ? <span>{item.metaDetail}</span> : null}
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <article className={cardBase}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Pertumbuhan Jumlah Pengguna
                </h2>
                <p className="text-xs text-slate-400">
                  Kenaikan user aktif per bulan
                </p>
              </div>
            </div>
            <div className="mt-4 h-36 sm:h-44">
              <LineChart
                labels={userGrowth.labels}
                values={userGrowth.values}
                tension={0}
                showAllTicks
              />
            </div>
          </article>
        </section>

        <section id="ringkasan" className="grid gap-4 lg:grid-cols-4">
          <article id="status" className={`${cardBase} lg:col-span-2`}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Status langganan
                </h3>
                <p className="text-xs text-slate-400">
                  Pantau masa aktif dan risiko churn
                </p>
              </div>
              <Link
                href="/usaha#owner-usaha"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Selengkapnya
              </Link>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full table-fixed border-separate border-spacing-0 text-sm">
                <thead className="sticky top-0 z-10 bg-gradient-to-r from-sky-50 to-blue-100">
                  <tr>
                    <th className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                      Usaha
                    </th>

                    <th className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                      Masa aktif
                    </th>
                                        <th className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptionRows.map((row) => (
                    <tr key={row.usaha}>
                      <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-700 last:border-r-0">
                        <div className="flex items-center gap-2">
                          <img
                            src={row.logoUrl || "/icons/dot-blue.svg"}
                            alt={`Logo ${row.usaha}`}
                            className="h-6 w-6 rounded-full object-cover"
                            loading="lazy"
                          />
                          <span>{row.usaha}</span>
                        </div>
                      </td>

                      <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-500 last:border-r-0">
                        {row.masa}
                      </td>
                                            <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-500 last:border-r-0">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${statusTone(
                            row.status,
                          )}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <Pagination
              page={1}
              totalPages={1}
              summaryText={`Menampilkan ${subscriptionRows.length} data`}
              className="mt-4"
            /> */}
          </article>

          <article id="kontributor" className={`${cardBase} lg:col-span-1`}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Kontributor Revenue Terbesar
                </h3>
                <p className="text-xs text-slate-400">
                  Perbandingan pemasukan per usaha (bulan ini)
                </p>
              </div>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">
                Top 5
              </span>
            </div>
            <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="h-40 w-40 sm:h-44 sm:w-44">
                <DonutChart
                  labels={topRevenueBusinesses.labels}
                  values={topRevenueBusinesses.values}
                  colors={topRevenueColors}
                  centerValue={`Rp ${formatJuta(totalTopRevenue)} jt`}
                />
              </div>
              <div className="space-y-2 text-xs text-slate-500">
                <p className="text-lg font-semibold text-slate-900">
                  Tertinggi: {topRevenueBusinesses.labels[0]}
                </p>
                {topRevenueBusinesses.labels.map((label, index) => (
                  <span
                    key={label}
                    className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-600"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: topRevenueColors[index] }}
                    />
                    {label} {topRevenueBusinesses.values[index]} jt
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className={`${cardBase} pb-2 lg:col-span-1`}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Pertumbuhan Jumlah Usaha
                </h3>
                <p className="text-xs text-slate-400">
                  Kenaikan usaha aktif dalam beberapa bulan terakhir
                </p>
              </div>
 
            </div>
            <div className="mt-4 h-44 sm:h-54">
              <BarChart
                labels={businessGrowth.labels}
                values={businessGrowth.values}
                color="#22c55e"
                compact
              />
            </div>
          </article>
        </section>

      </div>
    </DashboardShell>
  );
}
