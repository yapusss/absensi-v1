"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { OwnerSectionLayout } from "@/components/layout/OwnerSectionLayout";
import { TableToolbar } from "@/components/layout/TableToolbar";
import { Pagination } from "@/components/ui/Pagination";
import { Modal } from "@/components/ui/Modal";
import { ActionButton } from "@/components/ui/ActionButton";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

const employeeRows = [
  {
    no: 1,
    nama: "Haoris Nur",
    fotoUrl: "/dempe.jpg",
    posisi: "Developer",
    email: "haoris@gmail.com",
    tanggalLahir: "12/03/1996",
    alamat: "Jl. Contoh No. 123, Bandung",
    tempatLahir: "Bandung",
    pendidikanTerakhir: "S1 Teknik Informatika",
    nomorTelepon: "081234567890",
    tanggalBergabung: "2024-01-01",
    shift: "Shift 1",
    status: "Aktif",
  },
  {
    no: 2,
    nama: "Drupadi Ginaris",
    fotoUrl: "/hamriz.jpg",
    posisi: "Developer",
    email: "dru@gmail.com",
    tanggalLahir: "21/09/1995",
    alamat: "Jl. Contoh No. 123, Bandung",
    tempatLahir: "Bandung",
    pendidikanTerakhir: "S1 Teknik Informatika",
    nomorTelepon: "081234567890",
    tanggalBergabung: "2024-01-01",
    shift: "Shift 1",
    status: "Aktif",
  },
  {
    no: 3,
    nama: "Timotius Victory",
    fotoUrl: "/jempi.jpg",
    posisi: "Developer",
    email: "timotius@gmail.com",
    tanggalLahir: "05/11/1994",
    alamat: "Jl. Contoh No. 123, Bandung",
    tempatLahir: "Bandung",
    pendidikanTerakhir: "S1 Teknik Informatika",
    nomorTelepon: "081234567890",
    tanggalBergabung: "2024-01-01",
    shift: "Shift 1",
    status: "Cuti",
  },
];

const cardBase =
  "min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md";

export default function HrKaryawanPage() {
  const [openTambahKaryawan, setOpenTambahKaryawan] = useState(false);
  const [openImportData, setOpenImportData] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<
    (typeof employeeRows)[0] | null
  >(null);
  const [selectedEdit, setSelectedEdit] = useState<
    (typeof employeeRows)[0] | null
  >(null);
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nomorKaryawan: "",
    email: "",
    password: "",
    posisiDivisi: "",
    shift: "",
    status: "Aktif",
    alamat: "",
    tempatLahir: "",
    tanggalLahir: "",
    pendidikanTerakhir: "",
    nomorTelepon: "",
    fotoProfil: null as File | null,
    tanggalBergabung: "",
  });
  const [editFormData, setEditFormData] = useState({
    namaLengkap: "",
    nomorKaryawan: "",
    email: "",
    password: "",
    posisiDivisi: "",
    shift: "",
    status: "Aktif",
    alamat: "",
    tempatLahir: "",
    tanggalLahir: "",
    pendidikanTerakhir: "",
    nomorTelepon: "",
    fotoProfil: null as File | null,
    tanggalBergabung: "",
  });

  const toInputDate = (value: string) => {
    const parts = value.split("/");
    if (parts.length !== 3) return "";
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const [openConfirmAdd, setOpenConfirmAdd] = useState(false);
  const [openConfirmEdit, setOpenConfirmEdit] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenConfirmAdd(true);
  };

  const handleConfirmAdd = () => {
    console.log("Form submitted:", formData);
    setOpenTambahKaryawan(false);
    setOpenConfirmAdd(false);
    setFormData({
      namaLengkap: "",
      nomorKaryawan: "",
      email: "",
      password: "",
      posisiDivisi: "",
      shift: "",
      status: "Aktif",
      alamat: "",
      tempatLahir: "",
      tanggalLahir: "",
      pendidikanTerakhir: "",
      nomorTelepon: "",
      fotoProfil: null,
      tanggalBergabung: "",
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenConfirmEdit(true);
  };

  const handleConfirmEdit = () => {
    console.log("Form edit:", editFormData);
    setOpenEdit(false);
    setSelectedEdit(null);
    setOpenConfirmEdit(false);
  };

  return (
    <DashboardShell active="HR">
      <OwnerSectionLayout title="Karyawan" breadcrumb="Beranda/Karyawan">
        <ConfirmationModal
          open={openConfirmAdd}
          onClose={() => setOpenConfirmAdd(false)}
          onConfirm={handleConfirmAdd}
          title="Konfirmasi Tambah Karyawan"
          message="Apakah Anda yakin ingin menambahkan karyawan baru ini?"
          confirmLabel="Ya, Tambah"
        />

        <ConfirmationModal
          open={openConfirmEdit}
          onClose={() => setOpenConfirmEdit(false)}
          onConfirm={handleConfirmEdit}
          title="Konfirmasi Edit Karyawan"
          message="Apakah Anda yakin ingin menyimpan perubahan data karyawan ini?"
          confirmLabel="Ya, Simpan"
        />

        <section className={cardBase}>
          <TableToolbar
            primaryActions={
              <>
                <button
                  type="button"
                  onClick={() => setOpenTambahKaryawan(true)}
                  className="h-10 rounded-lg bg-blue-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
                >
                  Tambah Karyawan
                </button>
                <button
                  type="button"
                  onClick={() => setOpenImportData(true)}
                  className="h-10 rounded-lg bg-green-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-green-600"
                >
                  Import Data
                </button>
              </>
            }
            searchPlaceholder="Cari Karyawan..."
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
                  {["Nama A-Z", "Nama Z-A", "Posisi", "Shift", "Status"].map(
                    (label) => (
                      <button
                        key={label}
                        type="button"
                        className="w-full rounded-md px-3 py-2 text-left text-slate-600 hover:bg-slate-100"
                      >
                        {label}
                      </button>
                    ),
                  )}
                </div>
              </details>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-separate border-spacing-0 text-sm">
              <thead className="sticky top-0 z-10 bg-gradient-to-r from-sky-50 to-blue-100">
                <tr>
                  {"No., Nama Karyawan, Posisi, Email, Tanggal Lahir, Shift, Status, Aksi"
                    .split(",")
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
                {employeeRows.map((row) => (
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
                      {row.posisi}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center text-slate-600 last:border-r-0">
                      {row.email}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center text-slate-600 last:border-r-0">
                      {row.tanggalLahir}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center text-slate-600 last:border-r-0">
                      {row.shift}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center text-slate-600 last:border-r-0">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          row.status === "Aktif"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center last:border-r-0">
                      <div className="flex items-center justify-center gap-2">
                        <ActionButton
                          onClick={() => {
                            setSelectedEmployee(row);
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
                        <ActionButton
                          onClick={() => {
                            setSelectedEdit(row);
                            setEditFormData({
                              namaLengkap: row.nama,
                              nomorKaryawan: `EMP-${String(row.no).padStart(4, "0")}`,
                              email: row.email,
                              password: "",
                              posisiDivisi: row.posisi,
                              shift: row.shift,
                              status: row.status,
                              alamat: row.alamat,
                              tempatLahir: row.tempatLahir,
                              tanggalLahir: toInputDate(row.tanggalLahir),
                              pendidikanTerakhir: row.pendidikanTerakhir,
                              nomorTelepon: row.nomorTelepon,
                              fotoProfil: null,
                              tanggalBergabung: row.tanggalBergabung,
                            });
                            setOpenEdit(true);
                          }}
                          aria-label={`Edit ${row.nama}`}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4"
                          >
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
                            <path d="M14.06 4.94l3.75 3.75" />
                          </svg>
                        </ActionButton>
                        <ActionButton
                          variant="rose"
                          aria-label={`Hapus ${row.nama}`}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4"
                          >
                            <path d="M3 6h18" />
                            <path d="M8 6V4h8v2" />
                            <path d="M6 6l1 14h10l1-14" />
                          </svg>
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={1}
            totalPages={1}
            summaryText={`Menampilkan ${employeeRows.length} data`}
            className="mt-4"
          />
        </section>

        <Modal
          open={openTambahKaryawan}
          onClose={() => setOpenTambahKaryawan(false)}
          title="Tambah Karyawan"
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nama Lengkap <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.namaLengkap}
                  onChange={(e) =>
                    setFormData({ ...formData, namaLengkap: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nomor Karyawan
                </label>
                <input
                  type="text"
                  value={formData.nomorKaryawan}
                  onChange={(e) =>
                    setFormData({ ...formData, nomorKaryawan: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 outline-none"
                  placeholder="Auto-generate"
                  readOnly
                />
                <p className="text-xs text-slate-400">
                  Nomor karyawan akan di-generate otomatis
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="email@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Password <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Posisi/Divisi <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={formData.posisiDivisi}
                  onChange={(e) =>
                    setFormData({ ...formData, posisiDivisi: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Pilih Posisi/Divisi</option>
                  <option value="Developer">Developer</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Shift <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={formData.shift}
                  onChange={(e) =>
                    setFormData({ ...formData, shift: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Pilih Shift</option>
                  <option value="Shift 1">Shift 1</option>
                  <option value="Shift 2">Shift 2</option>
                  <option value="Shift 3">Shift 3</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Status <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Alamat <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.alamat}
                  onChange={(e) =>
                    setFormData({ ...formData, alamat: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="Jl. Contoh No. 123"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tempat Lahir <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.tempatLahir}
                  onChange={(e) =>
                    setFormData({ ...formData, tempatLahir: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="Bandung"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tanggal Lahir <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.tanggalLahir}
                  onChange={(e) =>
                    setFormData({ ...formData, tanggalLahir: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Pendidikan Terakhir <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.pendidikanTerakhir}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pendidikanTerakhir: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="S1 Teknik Informatika"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nomor Telepon <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.nomorTelepon}
                  onChange={(e) =>
                    setFormData({ ...formData, nomorTelepon: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="081234567890"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Foto Profil
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fotoProfil: e.target.files?.[0] || null,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tanggal Bergabung <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.tanggalBergabung}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tanggalBergabung: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() => setOpenTambahKaryawan(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
              >
                Simpan
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          open={openEdit}
          onClose={() => {
            setOpenEdit(false);
            setSelectedEdit(null);
          }}
          title="Edit Karyawan"
          size="lg"
        >
          <form
            onSubmit={handleEditSubmit}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nama Lengkap <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.namaLengkap}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      namaLengkap: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nomor Karyawan
                </label>
                <input
                  type="text"
                  value={editFormData.nomorKaryawan}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 outline-none"
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={editFormData.email}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  value={editFormData.password}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      password: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="Kosongkan jika tidak diubah"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Posisi/Divisi <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={editFormData.posisiDivisi}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      posisiDivisi: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Pilih Posisi/Divisi</option>
                  <option value="Developer">Developer</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Shift <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={editFormData.shift}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, shift: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Pilih Shift</option>
                  <option value="Shift 1">Shift 1</option>
                  <option value="Shift 2">Shift 2</option>
                  <option value="Shift 3">Shift 3</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Status <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={editFormData.status}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, status: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Alamat <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  value={editFormData.alamat}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, alamat: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tempat Lahir <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.tempatLahir}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      tempatLahir: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tanggal Lahir <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={editFormData.tanggalLahir}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      tanggalLahir: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Pendidikan Terakhir <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.pendidikanTerakhir}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      pendidikanTerakhir: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nomor Telepon <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={editFormData.nomorTelepon}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      nomorTelepon: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Foto Profil
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      fotoProfil: e.target.files?.[0] || null,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tanggal Bergabung <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={editFormData.tanggalBergabung}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      tanggalBergabung: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() => setOpenEdit(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          open={openImportData}
          onClose={() => setOpenImportData(false)}
          title="Import Data Karyawan"
          size="lg"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Import data");
              setOpenImportData(false);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Upload File (Excel/CSV) <span className="text-rose-500">*</span>
              </label>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
              <p className="text-xs text-slate-400">
                Format yang didukung: Excel (.xlsx, .xls) atau CSV (.csv)
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">
                Preview data akan muncul setelah file diupload
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Opsi Import
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="importOption"
                    value="update"
                    defaultChecked
                    className="h-4 w-4 text-blue-500"
                  />
                  <span className="text-sm text-slate-700">
                    Update existing data
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="importOption"
                    value="skip"
                    className="h-4 w-4 text-blue-500"
                  />
                  <span className="text-sm text-slate-700">
                    Skip jika data sudah ada
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() => setOpenImportData(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600"
              >
                Import
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          open={openDetail}
          onClose={() => {
            setOpenDetail(false);
            setSelectedEmployee(null);
          }}
          title="Detail Karyawan"
          size="lg"
        >
          {selectedEmployee && (
            <div className="flex flex-col gap-10 pb-6 sm:flex-row">
              <div className="flex shrink-0 justify-center sm:justify-start">
                <img
                  src={selectedEmployee.fotoUrl || "/icons/dot-blue.svg"}
                  alt={`Foto ${selectedEmployee.nama}`}
                  className="h-40 w-40 rounded-lg object-cover"
                />
              </div>

              <div className="grid flex-1 gap-2">
                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Nama Lengkap
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedEmployee.nama}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Nomor Karyawan
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    EMP-{String(selectedEmployee.no).padStart(4, "0")}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Email
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedEmployee.email}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Posisi/Divisi
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedEmployee.posisi}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Shift
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedEmployee.shift}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Status
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedEmployee.status}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Tanggal Lahir
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedEmployee.tanggalLahir}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Alamat
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    Jl. Contoh No. 123, Bandung
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Tempat Lahir
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    Bandung
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Pendidikan Terakhir
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    S1 Teknik Informatika
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Nomor Telepon
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    081234567890
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Tanggal Bergabung
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    01/01/2024
                  </span>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </OwnerSectionLayout>
    </DashboardShell>
  );
}
