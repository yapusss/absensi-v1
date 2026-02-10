"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { OwnerSectionLayout } from "@/components/layout/OwnerSectionLayout";
import { TableToolbar } from "@/components/layout/TableToolbar";
import { Pagination } from "@/components/ui/Pagination";
import { Modal } from "@/components/ui/Modal";
import { ActionButton } from "@/components/ui/ActionButton";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

const shiftRows = [
  {
    no: 1,
    nama: "Shift 1",
    jamKerja: "08.00-16.00",
    jamIstirahat: "12.00-13.00",
    status: "Aktif",
  },
];

const cardBase =
  "min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md";

export default function HrJadwalPage() {
  const [openBuatJadwal, setOpenBuatJadwal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedShift, setSelectedShift] = useState<typeof shiftRows[0] | null>(null);
  const [formData, setFormData] = useState({
    namaShift: "",
    jamKerjaMulai: "",
    jamKerjaSelesai: "",
    jamIstirahatMulai: "",
    jamIstirahatSelesai: "",
    status: "Aktif",
  });
  const [editFormData, setEditFormData] = useState({
    namaShift: "",
    jamKerjaMulai: "",
    jamKerjaSelesai: "",
    jamIstirahatMulai: "",
    jamIstirahatSelesai: "",
    status: "Aktif",
  });

  const toTime = (value: string) => value.replace(".", ":");

  const [openConfirmAdd, setOpenConfirmAdd] = useState(false);
  const [openConfirmEdit, setOpenConfirmEdit] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenConfirmAdd(true);
  };

  const handleConfirmAdd = () => {
    console.log("Form submitted:", formData);
    setOpenBuatJadwal(false);
    setOpenConfirmAdd(false);
    setFormData({
      namaShift: "",
      jamKerjaMulai: "",
      jamKerjaSelesai: "",
      jamIstirahatMulai: "",
      jamIstirahatSelesai: "",
      status: "Aktif",
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenConfirmEdit(true);
  };

  const handleConfirmEdit = () => {
    console.log("Edit jadwal:", editFormData);
    setOpenEdit(false);
    setSelectedShift(null);
    setOpenConfirmEdit(false);
  };

  return (
    <DashboardShell active="HR">
      <OwnerSectionLayout title="Jadwal Kerja" breadcrumb="Beranda/Jadwal">
        <ConfirmationModal
          open={openConfirmAdd}
          onClose={() => setOpenConfirmAdd(false)}
          onConfirm={handleConfirmAdd}
          message="Apakah Anda yakin ingin membuat jadwal shift baru ini?"
          confirmLabel="Ya, Buat"
        />

        <ConfirmationModal
          open={openConfirmEdit}
          onClose={() => setOpenConfirmEdit(false)}
          onConfirm={handleConfirmEdit}
          message="Apakah Anda yakin ingin menyimpan perubahan jadwal shift ini?"
          confirmLabel="Ya, Simpan"
        />

        <article className={cardBase}>
          <TableToolbar
            primaryActions={
              <button
                type="button"
                onClick={() => setOpenBuatJadwal(true)}
                className="h-10 rounded-lg bg-blue-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
              >
                Buat Jadwal Baru
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
                    "Jam kerja tercepat",
                    "Jam kerja terlama",
                    "Status",
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
                  {"No., Nama Shift, Jam Kerja, Jam Istirahat, Status, Aksi"
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
                {shiftRows.map((row) => (
                  <tr key={row.no} className="odd:bg-slate-50">
                    <td className="w-10 border-b border-r border-slate-200 px-3 py-3 text-center text-slate-700 last:border-r-0">
                      {row.no}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center text-slate-700 last:border-r-0">
                      {row.nama}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center text-slate-600 last:border-r-0">
                      {row.jamKerja}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center text-slate-600 last:border-r-0">
                      {row.jamIstirahat}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center text-slate-600 last:border-r-0">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                        {row.status}
                      </span>
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center last:border-r-0">
                      <div className="flex items-center justify-center gap-2">
                        <ActionButton
                          onClick={() => {
                            const [mulaiKerja, selesaiKerja] = row.jamKerja
                              .split("-")
                              .map((part) => toTime(part.trim()));
                            const [mulaiIstirahat, selesaiIstirahat] =
                              row.jamIstirahat
                                .split("-")
                                .map((part) => toTime(part.trim()));
                            setSelectedShift(row);
                            setEditFormData({
                              namaShift: row.nama,
                              jamKerjaMulai: mulaiKerja,
                              jamKerjaSelesai: selesaiKerja,
                              jamIstirahatMulai: mulaiIstirahat,
                              jamIstirahatSelesai: selesaiIstirahat,
                              status: row.status,
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
            summaryText={`Menampilkan ${shiftRows.length} data`}
            className="mt-4"
          />
        </article>

        <Modal
          open={openBuatJadwal}
          onClose={() => setOpenBuatJadwal(false)}
          title="Buat Jadwal Shift Baru"
          size="md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Nama Shift <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.namaShift}
                onChange={(e) =>
                  setFormData({ ...formData, namaShift: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                placeholder="Shift 1"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Jam Kerja Mulai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={formData.jamKerjaMulai}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      jamKerjaMulai: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Jam Kerja Selesai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={formData.jamKerjaSelesai}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      jamKerjaSelesai: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Jam Istirahat Mulai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={formData.jamIstirahatMulai}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      jamIstirahatMulai: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Jam Istirahat Selesai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={formData.jamIstirahatSelesai}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      jamIstirahatSelesai: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
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

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() => setOpenBuatJadwal(false)}
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
            setSelectedShift(null);
          }}
          title="Edit Jadwal Shift"
          size="md"
        >
          <form
            onSubmit={handleEditSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Nama Shift <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={editFormData.namaShift}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    namaShift: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Jam Kerja Mulai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={editFormData.jamKerjaMulai}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      jamKerjaMulai: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Jam Kerja Selesai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={editFormData.jamKerjaSelesai}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      jamKerjaSelesai: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Jam Istirahat Mulai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={editFormData.jamIstirahatMulai}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      jamIstirahatMulai: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Jam Istirahat Selesai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={editFormData.jamIstirahatSelesai}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      jamIstirahatSelesai: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
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
      </OwnerSectionLayout>
    </DashboardShell>
  );
}
