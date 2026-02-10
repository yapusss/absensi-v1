"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AbsensiSummaryCard } from "@/components/cards/AbsensiSummaryCard";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { WorkPerformanceCard } from "@/components/cards/WorkPerformanceCard";
import { WelcomeBanner } from "@/components/widgets/WelcomeBanner";
import { Modal } from "@/components/ui/Modal";

const totals = [
  {
    label: "Total karyawan",
    value: "132",
    meta: "+6 bulan ini",
    href: "/karyawan",
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
        <path d="M7 11c2 0 3.5-1.6 3.5-3.5S9 4 7 4 3.5 5.6 3.5 7.5 5 11 7 11z" />
        <path d="M17 11c2 0 3.5-1.6 3.5-3.5S19 4 17 4s-3.5 1.6-3.5 3.5S15 11 17 11z" />
        <path d="M3 20c0-3 2.5-5.5 5.5-5.5S14 17 14 20" />
        <path d="M10 20c0-2.4 1.9-4.3 4.3-4.3H18" />
      </svg>
    ),
  },
  {
    label: "Masuk hari ini",
    value: "110",
    meta: "83% hadir",
    href: "/performa",
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
        <path d="M12 8v5l3 3" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    label: "Terlambat",
    value: "12",
    meta: "Perlu follow-up",
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
    label: "Tidak hadir",
    value: "10",
    meta: "Cek alasan",
    href: "/performa",
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
        <path d="M6 18L18 6M6 6l12 12" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    label: "Pengajuan cuti",
    value: "6",
    meta: "Menunggu",
    href: "/leave#pengajuan-cuti",
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
        <path d="M7 4h10v4H7zM5 8h14v12H5z" />
        <path d="M9 14h6" />
      </svg>
    ),
  },
  {
    label: "Ultah karyawan",
    value: "2",
    meta: "Nisa Lestari, Rendi Haris",
    metaTone: "text-slate-500",
    href: "/karyawan",
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
        <path d="M12 8v5l3 3" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
];
const attendanceBreakdown = {
  labels: ["Hadir", "Terlambat", "Tidak hadir"],
  values: [83, 9, 8],
  colors: ["#22c55e", "#f97316", "#facc15"],
};

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
  {
    nama: "Putri Lestari",
    masuk: "08:07",
    pulang: "17:12",
    status: "Tepat waktu",
  },
  {
    nama: "Hendra Saputra",
    masuk: "08:22",
    pulang: "17:18",
    status: "Terlambat",
  },
  {
    nama: "Dika Prasetyo",
    masuk: "08:11",
    pulang: "--",
    status: "Sedang bekerja",
  },
  {
    nama: "Salsa Putri",
    masuk: "08:04",
    pulang: "17:01",
    status: "Tepat waktu",
  },
  {
    nama: "Rendi Haris",
    masuk: "08:17",
    pulang: "17:09",
    status: "Terlambat",
  },
];

const attendanceRange = "Harian";

const shiftList = [
  { nama: "Shift Pagi", jam: "08:00 - 17:00", jumlah: "64 karyawan" },
  { nama: "Shift Siang", jam: "10:00 - 19:00", jumlah: "48 karyawan" },
  { nama: "Shift Malam", jam: "21:00 - 06:00", jumlah: "20 karyawan" },
];

const outstationApprovals = [
  { nama: "Nisa Lestari", tanggal: "14 Jan", status: "Menunggu" },
  { nama: "Rendi Haris", tanggal: "15 Jan", status: "Menunggu" },
  { nama: "Salsa Putri", tanggal: "16 Jan", status: "Menunggu" },
  { nama: "Doni Pratama", tanggal: "17 Jan", status: "Menunggu" },
  { nama: "Intan Sari", tanggal: "18 Jan", status: "Menunggu" },
];

const birthdayRoster = [
  { nama: "Nisa Lestari", posisi: "HR Generalist", tanggal: "6 Jan" },
  { nama: "Rendi Haris", posisi: "Finance Manager", tanggal: "18 Jan" },
];

const leaveApprovals = [
  {
    nama: "Naya Kinanti",
    jenis: "Cuti tahunan",
    tanggal: "15-17 Jan",
    status: "Menunggu",
  },
  {
    nama: "Bimo Setia",
    jenis: "Izin keluarga",
    tanggal: "18 Jan",
    status: "Disetujui",
  },
  {
    nama: "Sinta Wardani",
    jenis: "Cuti berobat",
    tanggal: "19 Jan",
    status: "Menunggu",
  },
  {
    nama: "Raka Putra",
    jenis: "Cuti tahunan",
    tanggal: "20-22 Jan",
    status: "Ditolak",
  },
];

// const highlights = [
//   {
//     label: "Pengajuan cuti",
//     value: "6",
//     note: "Menunggu",
//     tone: "bg-blue-50 text-blue-600",
//   },
//   {
//     label: "Outstation",
//     value: "4",
//     note: "Butuh approval",
//     tone: "bg-emerald-50 text-emerald-600",
//   },
// ];

const cardBase =
  "min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md";
const cardSoft =
  "min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:shadow-md";

const leaveStatusTone: Record<string, string> = {
  Menunggu: "bg-amber-50 text-amber-600",
  Disetujui: "bg-emerald-50 text-emerald-600",
  Ditolak: "bg-rose-50 text-rose-600",
};

const holidayCalendar = {
  monthLabel: "Januari 2026",
  startDayIndex: 3,
  daysInMonth: 31,
  holidays: [
    { day: 1, label: "Tahun Baru" },
    { day: 6, label: "Ulang tahun Nisa Lestari" },
    { day: 12, label: "Cuti bersama" },
    { day: 18, label: "Ulang tahun Rendi Haris" },
    { day: 26, label: "Libur perusahaan" },
  ],
};

export default function HrDashboard() {
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedOutstation, setSelectedOutstation] = useState<typeof outstationApprovals[0] | null>(null);
  const rangeBadgeClass =
    "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700";
  const [sortKey, setSortKey] = useState("");
  const [absensiSortKey, setAbsensiSortKey] = useState("nama-asc");
  const [performanceRange, setPerformanceRange] = useState("minggu");
  const [leaveSortKey, setLeaveSortKey] = useState("");

  const listAbsensi = useMemo(
    () => [
      { nama: "Ayu Pratiwi", status: "Hadir", waktu: "08:02 - 17:04" },
      { nama: "Bimo Setia", status: "Terlambat", waktu: "08:28 - 17:12" },
      { nama: "Damar Wijaya", status: "Cuti", waktu: "Cuti 1 hari" },
      { nama: "Naya Kinanti", status: "Hadir", waktu: "08:05 - 17:02" },
      { nama: "Raka Putra", status: "Hadir", waktu: "08:10 - 17:10" },
      { nama: "Sinta Wardani", status: "Terlambat", waktu: "08:22 - 17:08" },
    ],
    [],
  );

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

  const performanceSeries = useMemo(() => {
    return performanceByRange[
      performanceRange as keyof typeof performanceByRange
    ];
  }, [performanceRange]);

  const sortedAbsensi = useMemo(() => {
    const sorted = [...listAbsensi];
    sorted.sort((a, b) => {
      switch (absensiSortKey) {
        case "nama-desc":
          return b.nama.localeCompare(a.nama);
        case "status":
          return a.status.localeCompare(b.status);
        case "nama-asc":
        default:
          return a.nama.localeCompare(b.nama);
      }
    });
    return sorted;
  }, [absensiSortKey, listAbsensi]);

  const sortedLeaveApprovals = useMemo(() => {
    const sorted = [...leaveApprovals];
    sorted.sort((a, b) => {
      switch (leaveSortKey) {
        case "nama-asc":
          return a.nama.localeCompare(b.nama);
        case "nama-desc":
          return b.nama.localeCompare(a.nama);
        case "status":
          return a.status.localeCompare(b.status);
        case "tanggal-asc":
          return a.tanggal.localeCompare(b.tanggal);
        case "tanggal-desc":
        default:
          return b.tanggal.localeCompare(a.tanggal);
      }
    });
    return sorted;
  }, [leaveSortKey]);

  const holidayDays = useMemo(() => {
    const blanks = Array.from(
      { length: holidayCalendar.startDayIndex },
      () => null,
    );
    const days = Array.from(
      { length: holidayCalendar.daysInMonth },
      (_, index) => index + 1,
    );
    return [...blanks, ...days];
  }, []);

  const holidayMap = useMemo(() => {
    return new Map(
      holidayCalendar.holidays.map((item) => [item.day, item.label]),
    );
  }, []);

  return (
    <DashboardShell active="HR">
      <div className="space-y-8">
        <header className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
            Human Resource
          </span>
          <h1 className="text-2xl font-semibold text-slate-900">
            Operasional Human Resource
          </h1>
          <p className="max-w-2xl text-sm text-slate-500">
            Kelola karyawan, shift, absensi, dan approval.
          </p>
        </header>
        <WelcomeBanner
          title="Selamat datang kembali, Adrian"
          subtitle="14 usaha baru berlangganan hari ini."
          primaryLabel="Pengaturan"
          secondaryLabel="Keluar"
        />

        <section id="ringkasan" className="grid gap-4 lg:grid-cols-2">
          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {totals.map((item) => (
              <Link key={item.label} href={item.href} className="block">
                <article className={`${cardBase} border-l-4 ${item.tone}`}>
                  <div className="flex items-start justify-between">
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
                      item.metaTone ?? "text-emerald-600"
                    }`}
                  >
                    {item.meta}
                  </p>
                </article>
              </Link>
            ))}
          </div>
          <section className="grid gap-4">
            <WorkPerformanceCard
              label="Performa kinerja"
              chartHref="/performa"
              badge={
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPerformanceRange("minggu")}
                    className={
                      performanceRange === "minggu"
                        ? "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                        : "rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500"
                    }
                  >
                    minggu
                  </button>
                  <button
                    type="button"
                    onClick={() => setPerformanceRange("bulan")}
                    className={
                      performanceRange === "bulan"
                        ? "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                        : "rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500"
                    }
                  >
                    bulan
                  </button>
                  <button
                    type="button"
                    onClick={() => setPerformanceRange("tahun")}
                    className={
                      performanceRange === "tahun"
                        ? "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                        : "rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500"
                    }
                  >
                    tahun
                  </button>
                </div>
              }
              chartType="line"
              lineColor="#1671f9"
              labels={performanceSeries.labels}
              values={performanceSeries.values}
              className={cardBase}
            />
          </section>
        </section>
        {/* 
        <section id="sorotan" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"> */}
        {/* {highlights.map((item) => (
            <article key={item.label} className={cardSoft}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {item.label}
                </p>
                <span className={`rounded-full px-3 py-1 text-xs ${item.tone}`}>
                  {item.note}
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold text-slate-900">
                {item.value}
              </p>
              <div className="mt-3 h-1 rounded-full bg-slate-100">
                <div className="h-1 w-[70%] rounded-full bg-sky-400" />
              </div>
            </article>
          ))} */}
        {/* </section> */}

        {/* <article className={cardSoft}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                List absensi
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400">Filter periode</span>
                <select
                  value={absensiSortKey}
                  onChange={(event) => setAbsensiSortKey(event.target.value)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600"
                >
                  <option value="nama-asc">Nama A-Z</option>
                  <option value="nama-desc">Nama Z-A</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500">
                Harian
              </button>
              <button className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-600">
                Bulanan
              </button>
              <button className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500">
                Tahunan
              </button>
              <div className="w-full sm:w-auto sm:ml-auto">
                <select className="w-full rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">
                  <option>Pilih bulan</option>
                  <option>Januari</option>
                  <option>Februari</option>
                  <option>Maret</option>
                  <option>April</option>
                  <option>Mei</option>
                  <option>Juni</option>
                  <option>Juli</option>
                  <option>Agustus</option>
                  <option>September</option>
                  <option>Oktober</option>
                  <option>November</option>
                  <option>Desember</option>
                </select>
              </div>
            </div>
            <div className="mt-4 max-h-44 space-y-3 overflow-auto pr-2">
              {sortedAbsensi.map((row) => (
                <div
                  key={row.nama}
                  className="flex flex-col gap-3 rounded-lg border border-dashed border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {row.nama}
                    </p>
                    <p className="text-xs text-slate-500">{row.waktu}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] uppercase tracking-wide text-slate-600">
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </article> */}

        <section
          id="list-absensi"
          className="grid gap-4 lg:grid-cols-[2fr_2fr]"
        >
          <article className={cardBase}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <h2 className="text-lg font-semibold text-slate-900">
                Jam masuk dan pulang
              </h2>
              <div className="ml-auto flex flex-wrap items-center gap-2">
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
                  className="ml-auto text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Selengkapnya
                </Link>
              </div>
            </div>
            <div className="mt-4 max-h-64 overflow-auto pr-2">
              <table className="w-full min-w-[520px] table-fixed border-separate border-spacing-0 text-sm">
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
                      <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-700 last:border-r-0">
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
            {/* <Pagination
              className="mt-4"
              page={1}
              totalPages={1}
              summaryText={`Menampilkan ${sortedCheckTimes.length} data`}
            /> */}
          </article>
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <article className={cardBase}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Kalender libur perusahaan
                  </h2>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  
                  <span className="rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-500">
                    {holidayCalendar.monthLabel}
                  </span>
                </div>
                <Link
                    href="/karyawan"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Selengkapnya
                  </Link>
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

            <article className={cardBase}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Ulang tahun
                  </h2>
                  <p className="text-xs text-slate-400">
                    Karyawan yang berulang tahun
                  </p>
                </div>
                <Link
                  href="/karyawan"
                  className="ml-auto text-xs font-semibold text-blue-600 hover:text-blue-700"
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
          </div>
        </section>
        <section id="cuti-persetujuan" className="grid gap-4 lg:grid-cols-2">
          <article className={cardBase}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <h2 className="text-lg font-semibold text-slate-900">
                Cuti dan persetujuan
              </h2>
              <div className="ml-auto flex flex-wrap items-center gap-2">
                
                <select
                  value={leaveSortKey}
                  onChange={(event) => setLeaveSortKey(event.target.value)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600"
                >
                  <option value="" disabled>
                    Urut berdasarkan
                  </option>
                  <option value="tanggal-desc">Tanggal terbaru</option>
                  <option value="tanggal-asc">Tanggal terlama</option>
                  <option value="nama-asc">Nama A-Z</option>
                  <option value="nama-desc">Nama Z-A</option>
                  <option value="status">Status</option>
                </select>
                <Link
                  href="/leave#pengajuan-cuti"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Selengkapnya
                </Link> 
              </div>
            </div>
            <div className="mt-4 max-h-44 overflow-auto pr-2">
              <table className="w-full min-w-[520px] table-fixed border-separate border-spacing-0 text-sm">
                <thead className="sticky top-0 z-10 bg-gradient-to-r from-sky-50 to-blue-100">
                  <tr>
                    {"Karyawan Jenis Tanggal Status".split(" ").map((label) => (
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
                  {sortedLeaveApprovals.map((row) => (
                    <tr key={`${row.nama}-${row.tanggal}`}>
                      <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-700 last:border-r-0">
                        {row.nama}
                      </td>
                      <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-500 last:border-r-0">
                        {row.jenis}
                      </td>
                      <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-500 last:border-r-0">
                        {row.tanggal}
                      </td>
                      <td className="border-b border-r border-slate-200 px-2 py-3 last:border-r-0">
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                            leaveStatusTone[row.status] ??
                            "bg-slate-100 text-slate-600"
                          }`}
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
              className="mt-4"
              page={1}
              totalPages={1}
              summaryText={`Menampilkan ${sortedLeaveApprovals.length} data`}
            /> */}
          </article>

          <article className={cardBase}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <h2 className="text-lg font-semibold text-slate-900">
                Absen luar kota
              </h2>
              <div className="ml-auto flex items-center gap-2">
                <Link
                  href="/performa"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Selengkapnya
                </Link> 
              </div>
            </div>
            <div className="mt-4 max-h-44 space-y-3 overflow-auto pr-2">
              {outstationApprovals.map((item) => (
                <div
                  key={item.nama}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-dashed border-slate-200 bg-white px-4 py-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600">
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
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.nama}
                      </p>
                      <p className="text-xs text-slate-500">{item.tanggal}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="grid h-9 w-9 place-items-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      aria-label="Setujui"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="grid h-9 w-9 place-items-center rounded-full border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
                      aria-label="Tolak"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4"
                      >
                        <path d="M6 6l12 12M18 6l-12 12" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOutstation(item);
                        setOpenDetail(true);
                      }}
                      className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                      aria-label="Lihat detail"
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
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>

      <Modal
        open={openDetail}
        onClose={() => {
          setOpenDetail(false);
          setSelectedOutstation(null);
        }}
        title="Detail Absen Luar Kota"
        size="md"
      >
        {selectedOutstation && (
          <div className="grid gap-2 pb-2">
            <div className="flex items-start gap-20">
              <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                Nama Karyawan
              </span>
              <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                {selectedOutstation.nama}
              </span>
            </div>

            <div className="flex items-start gap-20">
              <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                Tanggal
              </span>
              <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                {selectedOutstation.tanggal} 2025
              </span>
            </div>

            <div className="flex items-start gap-20">
              <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                Status
              </span>
              <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                {selectedOutstation.status}
              </span>
            </div>

            <div className="flex items-start gap-20">
              <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                Lokasi Tujuan
              </span>
              <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                Jakarta, Indonesia
              </span>
            </div>

            <div className="flex items-start gap-20">
              <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                Alasan
              </span>
              <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                Perjalanan dinas untuk meeting dengan klien
              </span>
            </div>

            <div className="flex items-start gap-20">
              <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                Waktu Mulai
              </span>
              <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                08:00 WIB
              </span>
            </div>

            <div className="flex items-start gap-20">
              <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                Waktu Selesai
              </span>
              <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                17:00 WIB
              </span>
            </div>
          </div>
        )}
      </Modal>
    </DashboardShell>
  );
}
