"use client";

import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/layout/SearchBar";

const cardBase =
  "min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md";

const teamRows = [
  {
    nama: "Haaris Nur Salim",
    fotoUrl: "/dempe.jpg",
    posisi: "HR Manager",
    telp: "0812 3456 7890",
    email: "haaris@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Drupadi Ginaris",
    fotoUrl: "/hamriz.jpg",
    posisi: "HR Generalist",
    telp: "0813 2211 7788",
    email: "drupadi@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Timotius Victory",
    fotoUrl: "/jempi.jpg",
    posisi: "Recruitment Specialist",
    telp: "0814 9988 1122",
    email: "timotius@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Haykal Ramadhan",
    posisi: "Payroll Analyst",
    telp: "0814 9988 1122",
    email: "haykal@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Nadruwandi",
    posisi: "People Ops",
    telp: "0814 9988 1122",
    email: "Nad@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Fauzan Rizky",
    posisi: "Compensation & Benefit",
    telp: "0814 9988 1122",
    email: "fauzan@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Aldi Pratama",
    posisi: "HR Analyst",
    telp: "0814 9988 1122",
    email: "aldi@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Rizky Maulana",
    posisi: "Training & Development",
    telp: "0814 9988 1122",
    email: "rizky@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Rizky Maulana",
    posisi: "Employee Relations",
    telp: "0814 9988 1122",
    email: "rizky@absensipulse.id",
    status: "Aktif",
  },

  {
    nama: "kurniawan setiawan",
    posisi: "HR Operations",
    telp: "0814 9988 1122",
    email: "kurniawan@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Agus Salim",
    posisi: "HR Administration",
    telp: "0814 9988 1122",
    email: "agus@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Budi Santoso",
    posisi: "HR Business Partner",
    telp: "0814 9988 1122",
    email: "budi@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Ayu Pratiwi",
    posisi: "HR Generalist",
    telp: "0812 8800 2200",
    email: "ayu@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Naya Kinanti",
    posisi: "Recruiter",
    telp: "0812 7711 6655",
    email: "naya@absensipulse.id",
    status: "Cuti",
  },
  {
    nama: "Bimo Setia",
    posisi: "HRIS Specialist",
    telp: "0812 8899 1010",
    email: "bimo@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Raka Putra",
    posisi: "Talent Acquisition",
    telp: "0813 4422 1199",
    email: "raka@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Sinta Wardani",
    posisi: "Employer Branding",
    telp: "0813 7766 3344",
    email: "sinta@absensipulse.id",
    status: "Cuti",
  },
  {
    nama: "Damar Wijaya",
    posisi: "Learning Specialist",
    telp: "0812 9900 3344",
    email: "damar@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Ilham Ardi",
    posisi: "HR Supervisor",
    telp: "0813 5566 7788",
    email: "ilham@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Sari Andini",
    posisi: "HR Coordinator",
    telp: "0812 6677 2233",
    email: "sari@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Rio Mahesa",
    posisi: "People Analytics",
    telp: "0813 3399 7766",
    email: "rio@absensipulse.id",
    status: "Cuti",
  },
  {
    nama: "Fina Lestari",
    posisi: "HR Admin",
    telp: "0812 9090 1212",
    email: "fina@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Nisa Lestari",
    posisi: "HR Officer",
    telp: "0813 1112 1314",
    email: "nisa@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Rendi Haris",
    posisi: "Payroll Analyst",
    telp: "0812 1415 1617",
    email: "rendi@absensipulse.id",
    status: "Cuti",
  },
  {
    nama: "Salsa Putri",
    posisi: "Talent Development",
    telp: "0813 1819 2021",
    email: "salsa@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Intan Sari",
    posisi: "Industrial Relations",
    telp: "0812 2122 2324",
    email: "intan@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Doni Pratama",
    posisi: "HR Operations",
    telp: "0813 2526 2728",
    email: "doni@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Rania Putri",
    posisi: "HR Business Partner",
    telp: "0812 2930 3132",
    email: "rania@absensipulse.id",
    status: "Cuti",
  },
  {
    nama: "Hendra Malik",
    posisi: "HR Compliance",
    telp: "0813 3334 3536",
    email: "hendra@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Nanda Putra",
    posisi: "HR Analyst",
    telp: "0812 3738 3940",
    email: "nanda@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Maya Sari",
    posisi: "Recruitment Specialist",
    telp: "0813 4142 4344",
    email: "maya@absensipulse.id",
    status: "Cuti",
  },
  {
    nama: "Rizal Fikri",
    posisi: "People Ops",
    telp: "0812 4546 4748",
    email: "rizal@absensipulse.id",
    status: "Aktif",
  },
  {
    nama: "Nadya Luthfi",
    posisi: "Employer Branding",
    telp: "0813 4950 5152",
    email: "nadya@absensipulse.id",
    status: "Aktif",
  },
];

export default function HrTeamPage() {
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const totalPages = Math.ceil(teamRows.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, teamRows.length);
  const pagedRows = useMemo(() => {
    return teamRows.slice(startIndex, endIndex);
  }, [endIndex, startIndex]);

  return (
    <DashboardShell active="HR">
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-semibold text-slate-900">Tim HR</h1>
          <p className="text-xs text-slate-400">Beranda/Tim HR</p>
        </header>
        
        <article className={cardBase}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* <span className="inline-flex items-center rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
              Sisa Cuti: 20/25
            </span> */}

          <SearchBar
            placeholder="Cari HR..."
            showButton
            className="flex-1"
          />
          <div className="flex items-center gap-2">
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
                {["Nama A-Z", "Nama Z-A", "Posisi", "Status"].map((label) => (
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
          </div>
        </div>
          <section className="grid mt-5 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pagedRows.map((row, index) => (
              <article
                key={`${row.email}-${startIndex + index}`}
                className={cardBase}
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-26 w-26 place-items-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-600">
                    {row.nama
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-slate-900">
                      {row.nama}
                    </p>
                    <p className="text-sm text-slate-500">{row.posisi}</p>
                    <p>
                      <span className="text-xs text-slate-400">No. Telp</span>
                      <span className="text-xs ml-2 font-semibold text-slate-700">
                        {row.telp}
                      </span>
                    </p>
                    <p>
                      <span className="text-xs text-slate-400">Email</span>
                      <span className="text-xs ml-2 font-semibold text-slate-700">
                        {row.email}
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </section>
          <Pagination
            className="mt-4 border-t border-slate-200 pt-3"
            page={page}
            totalPages={totalPages}
            summaryText={`Menampilkan ${startIndex + 1}-${endIndex} dari ${teamRows.length} data`}
            onPageChange={setPage}
          />
        </article>
      </div>
    </DashboardShell>
  );
}
