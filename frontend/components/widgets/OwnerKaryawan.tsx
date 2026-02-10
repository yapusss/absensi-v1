"use client";

import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { OwnerSectionLayout } from "@/components/layout/OwnerSectionLayout";
import { TableToolbar } from "@/components/layout/TableToolbar";
import { Pagination } from "@/components/ui/Pagination";
import { Modal } from "@/components/ui/Modal";
import { ActionButton } from "@/components/ui/ActionButton";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

const hrRows = [
  {
    no: 1,
    nama: "Haoris Nur",
    fotoUrl: "/dempe.jpg",
    email: "haoris@gmail.com",
    status: "Aktif",
  },
  {
    no: 2,
    nama: "Drupadi Ginaris",
    fotoUrl: "/hamriz.jpg",
    email: "dru@gmail.com",
    status: "Aktif",
  },
  {
    no: 3,
    nama: "Timotius Victory",
    fotoUrl: "/jempi.jpg",
    email: "timotius@gmail.com",
    status: "Cuti",
  },
];

const cardBase =
  "min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md";

export default function OwnerHumanResourcePage() {
  const [query, setQuery] = useState("");
  const [openTambahHr, setOpenTambahHr] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedHr, setSelectedHr] = useState<typeof hrRows[0] | null>(null);
  const [selectedEdit, setSelectedEdit] = useState<typeof hrRows[0] | null>(null);
  const [form, setForm] = useState({
    namaLengkap: "",
    nomorKaryawan: "",
    email: "",
    password: "",
    status: "Aktif",
    alamat: "",
    tempatLahir: "",
    tanggalLahir: "",
    pendidikanTerakhir: "",
    nomorTelepon: "",
    tanggalBergabung: "",
    fotoProfil: null as File | null,
  });
  const [editForm, setEditForm] = useState({
    namaLengkap: "",
    nomorKaryawan: "",
    email: "",
    password: "",
    status: "Aktif",
    alamat: "",
    tempatLahir: "",
    tanggalLahir: "",
    pendidikanTerakhir: "",
    nomorTelepon: "",
    tanggalBergabung: "",
    fotoProfil: null as File | null,
  });

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return hrRows;
    return hrRows.filter(
      (row) =>
        row.nama.toLowerCase().includes(normalized) ||
        row.email.toLowerCase().includes(normalized) ||
        row.status.toLowerCase().includes(normalized),
    );
  }, [query]);

  const [openConfirmAdd, setOpenConfirmAdd] = useState(false);
  const [openConfirmEdit, setOpenConfirmEdit] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpenConfirmAdd(true);
  };

  const handleConfirmAdd = () => {
    // Demo only: di implementasi nyata, kirim ke API
    console.log("submit HR owner", form);
    setOpenTambahHr(false);
    setOpenConfirmAdd(false);
  };

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setOpenConfirmEdit(true);
  };

  const handleConfirmEdit = () => {
    console.log("edit HR owner", editForm);
    setOpenEdit(false);
    setSelectedEdit(null);
    setOpenConfirmEdit(false);
  };

  return (
    <DashboardShell active="Owner" ownerSubActive="Human Resource">
      <OwnerSectionLayout
        title="Human Resource"
        breadcrumb="Beranda/Human Resource"
      >

        <ConfirmationModal
          open={openConfirmAdd}
          onClose={() => setOpenConfirmAdd(false)}
          onConfirm={handleConfirmAdd}
          title="Konfirmasi Tambah HR"
          message="Apakah Anda yakin ingin menambahkan HR baru ini?"
          confirmLabel="Ya, Tambah"
        />

        <ConfirmationModal
          open={openConfirmEdit}
          onClose={() => setOpenConfirmEdit(false)}
          onConfirm={handleConfirmEdit}
          title="Konfirmasi Edit HR"
          message="Apakah Anda yakin ingin menyimpan perubahan data HR ini?"
          confirmLabel="Ya, Simpan"
        />
        <article className={cardBase}>
          <TableToolbar
            primaryActions={
              <button
                type="button"
                onClick={() => setOpenTambahHr(true)}
                className="h-10 rounded-lg bg-blue-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
              >
                Tambahkan HR
              </button>
            }
            searchPlaceholder="Cari HR..."
            searchValue={query}
            onSearchChange={setQuery}
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
                  {["Nama A-Z", "Nama Z-A", "Email", "Status"].map((label) => (
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
                  {"No., Nama HR, Email, Status, Aksi"
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
                {filteredRows.map((row) => (
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
                      {row.email}
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
                            setSelectedHr(row);
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
                            setEditForm({
                              namaLengkap: row.nama,
                              nomorKaryawan: `HR-${String(row.no).padStart(4, "0")}`,
                              email: row.email,
                              password: "",
                              status: row.status,
                              alamat: "Jl. Contoh No. 123, Bandung",
                              tempatLahir: "Bandung",
                              tanggalLahir: "1996-03-12",
                              pendidikanTerakhir: "S1 Manajemen",
                              nomorTelepon: "081234567890",
                              tanggalBergabung: "2024-01-01",
                              fotoProfil: null,
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
                {filteredRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="border-b border-slate-200 px-3 py-8 text-center text-sm text-slate-500"
                    >
                      Tidak ada data yang cocok.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
          <Pagination
            page={1}
            totalPages={1}
            summaryText={`Menampilkan ${filteredRows.length} data`}
            className="mt-4"
          />
        </article>

        <Modal
          open={openTambahHr}
          onClose={() => setOpenTambahHr(false)}
          title="Tambah Human Resource"
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nama lengkap <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.namaLengkap}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      namaLengkap: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="Masukkan nama lengkap HR"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nomor karyawan
                </label>
                <input
                  type="text"
                  value={form.nomorKaryawan}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      nomorKaryawan: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="Otomatis / isi manual jika perlu"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="nama@perusahaan.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Password <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="Minimal 8 karakter"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Status <span className="text-rose-500">*</span>
                </label>
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      status: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                  <option value="Cuti">Cuti</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nomor telepon
                </label>
                <input
                  type="tel"
                  value={form.nomorTelepon}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      nomorTelepon: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Alamat
                </label>
                <textarea
                  value={form.alamat}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      alamat: event.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="Alamat domisili HR"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tempat lahir
                </label>
                <input
                  type="text"
                  value={form.tempatLahir}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      tempatLahir: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="Kota kelahiran"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tanggal lahir
                </label>
                <input
                  type="date"
                  value={form.tanggalLahir}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      tanggalLahir: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Pendidikan terakhir
                </label>
                <input
                  type="text"
                  value={form.pendidikanTerakhir}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      pendidikanTerakhir: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="S1, D3, SMA, dll."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tanggal bergabung
                </label>
                <input
                  type="date"
                  value={form.tanggalBergabung}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      tanggalBergabung: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Foto profil
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      fotoProfil: event.target.files?.[0] ?? null,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() => setOpenTambahHr(false)}
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
          title="Edit Human Resource"
          size="lg"
        >
          <form
            onSubmit={handleEditSubmit}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nama lengkap <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editForm.namaLengkap}
                  onChange={(event) =>
                    setEditForm((prev) => ({
                      ...prev,
                      namaLengkap: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nomor karyawan
                </label>
                <input
                  type="text"
                  value={editForm.nomorKaryawan}
                  readOnly
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(event) =>
                    setEditForm((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
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
                  value={editForm.password}
                  onChange={(event) =>
                    setEditForm((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="Kosongkan jika tidak diubah"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Status <span className="text-rose-500">*</span>
                </label>
                <select
                  value={editForm.status}
                  onChange={(event) =>
                    setEditForm((prev) => ({
                      ...prev,
                      status: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                  <option value="Cuti">Cuti</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nomor telepon
                </label>
                <input
                  type="tel"
                  value={editForm.nomorTelepon}
                  onChange={(event) =>
                    setEditForm((prev) => ({
                      ...prev,
                      nomorTelepon: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Alamat
                </label>
                <textarea
                  value={editForm.alamat}
                  onChange={(event) =>
                    setEditForm((prev) => ({
                      ...prev,
                      alamat: event.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tempat lahir
                </label>
                <input
                  type="text"
                  value={editForm.tempatLahir}
                  onChange={(event) =>
                    setEditForm((prev) => ({
                      ...prev,
                      tempatLahir: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tanggal lahir
                </label>
                <input
                  type="date"
                  value={editForm.tanggalLahir}
                  onChange={(event) =>
                    setEditForm((prev) => ({
                      ...prev,
                      tanggalLahir: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Pendidikan terakhir
                </label>
                <input
                  type="text"
                  value={editForm.pendidikanTerakhir}
                  onChange={(event) =>
                    setEditForm((prev) => ({
                      ...prev,
                      pendidikanTerakhir: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tanggal bergabung
                </label>
                <input
                  type="date"
                  value={editForm.tanggalBergabung}
                  onChange={(event) =>
                    setEditForm((prev) => ({
                      ...prev,
                      tanggalBergabung: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Foto profil
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setEditForm((prev) => ({
                      ...prev,
                      fotoProfil: event.target.files?.[0] ?? null,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
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
          open={openDetail}
          onClose={() => {
            setOpenDetail(false);
            setSelectedHr(null);
          }}
          title="Detail Human Resource"
          size="lg"
        >
          {selectedHr && (
            <div className="flex flex-col gap-10 pb-6 sm:flex-row">
              <div className="flex shrink-0 justify-center sm:justify-start">
                <img
                  src={selectedHr.fotoUrl || "/icons/dot-blue.svg"}
                  alt={`Foto ${selectedHr.nama}`}
                  className="h-40 w-40 rounded-lg object-cover"
                />
              </div>

              <div className="grid flex-1 gap-2">
                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Nama Lengkap
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedHr.nama}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Nomor Karyawan
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    HR-{String(selectedHr.no).padStart(4, "0")}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Email
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedHr.email}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Posisi/Divisi
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    HR
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Status
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedHr.status}
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
                    Tanggal Lahir
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    12/03/1996
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Pendidikan Terakhir
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    S1 Manajemen
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
