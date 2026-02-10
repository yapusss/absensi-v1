"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { OwnerSectionLayout } from "@/components/layout/OwnerSectionLayout";
import { TableToolbar } from "@/components/layout/TableToolbar";
import { Pagination } from "@/components/ui/Pagination";
import { Modal } from "@/components/ui/Modal";
import { ActionButton } from "@/components/ui/ActionButton";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

const leaveRows = [
  {
    no: 1,
    nama: "Cuti Tahunan",
    jumlah: "25 Hari",
    status: "Aktif",
  },
];

const cardBase =
  "min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md";

export default function HrDaftarCutiPage() {
  const [openBuatCuti, setOpenBuatCuti] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<typeof leaveRows[0] | null>(null);
  const [selectedEdit, setSelectedEdit] = useState<typeof leaveRows[0] | null>(null);
  const [formData, setFormData] = useState({
    namaJenisCuti: "",
    jumlahHariCuti: "",
    status: "Aktif",
    keterangan: "",
    berlakuUntuk: "All",
  });
  const [editFormData, setEditFormData] = useState({
    namaJenisCuti: "",
    jumlahHariCuti: "",
    status: "Aktif",
    keterangan: "",
    berlakuUntuk: "All",
  });

  const [openConfirmAdd, setOpenConfirmAdd] = useState(false);
  const [openConfirmEdit, setOpenConfirmEdit] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenConfirmAdd(true);
  };

  const handleConfirmAdd = () => {
    console.log("Form submitted:", formData);
    setOpenBuatCuti(false);
    setOpenConfirmAdd(false);
    setFormData({
      namaJenisCuti: "",
      jumlahHariCuti: "",
      status: "Aktif",
      keterangan: "",
      berlakuUntuk: "All",
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenConfirmEdit(true);
  };

  const handleConfirmEdit = () => {
    console.log("Edit cuti:", editFormData);
    setOpenEdit(false);
    setSelectedEdit(null);
    setOpenConfirmEdit(false);
  };

  return (
    <DashboardShell active="HR">
      <OwnerSectionLayout
        title="Libur & Cuti"
        breadcrumb="Beranda/Libur & Cuti"
      >
        <ConfirmationModal
          open={openConfirmAdd}
          onClose={() => setOpenConfirmAdd(false)}
          onConfirm={handleConfirmAdd}
          title="Konfirmasi Buat Cuti"
          message="Apakah Anda yakin ingin membuat jenis cuti baru ini?"
          confirmLabel="Ya, Buat"
        />

        <ConfirmationModal
          open={openConfirmEdit}
          onClose={() => setOpenConfirmEdit(false)}
          onConfirm={handleConfirmEdit}
          title="Konfirmasi Edit Cuti"
          message="Apakah Anda yakin ingin menyimpan perubahan data cuti ini?"
          confirmLabel="Ya, Simpan"
        />

        <section className={cardBase}>
          <TableToolbar
            primaryActions={
              <button
                type="button"
                onClick={() => setOpenBuatCuti(true)}
                className="h-10 rounded-lg bg-blue-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
              >
                Buat Cuti
              </button>
            }
            searchPlaceholder="Cari Cuti..."
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
                    "Jumlah terbanyak",
                    "Jumlah tersedikit",
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
                  {"No., Nama Cuti, Jumlah Cuti, Status, Aksi"
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
                {leaveRows.map((row) => (
                  <tr key={row.no} className="odd:bg-slate-50">
                    <td className="w-10 border-b border-r border-slate-200 px-3 py-3 text-center text-slate-700 last:border-r-0">
                      {row.no}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-slate-700 last:border-r-0">
                      {row.nama}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center text-slate-600 last:border-r-0">
                      {row.jumlah}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center text-slate-600 last:border-r-0">
                      {row.status}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center last:border-r-0">
                      <div className="flex items-center justify-center gap-2">
                        <ActionButton
                          onClick={() => {
                            setSelectedLeave(row);
                            setOpenDetail(true);
                          }}
                          aria-label={`Lihat ${row.nama}`}
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
                              namaJenisCuti: row.nama,
                              jumlahHariCuti: row.jumlah.replace(/\D/g, ""),
                              status: row.status,
                              keterangan: "Cuti tahunan untuk karyawan tetap",
                              berlakuUntuk: "All",
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
            summaryText={`Menampilkan ${leaveRows.length} data`}
            className="mt-4"
          />
        </section>

        <Modal
          open={openBuatCuti}
          onClose={() => setOpenBuatCuti(false)}
          title="Buat Cuti"
          size="md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Nama Jenis Cuti <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.namaJenisCuti}
                onChange={(e) =>
                  setFormData({ ...formData, namaJenisCuti: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                placeholder="Cuti Tahunan"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Jumlah Hari Cuti <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.jumlahHariCuti}
                onChange={(e) =>
                  setFormData({ ...formData, jumlahHariCuti: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                placeholder="25"
              />
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
                Keterangan
              </label>
              <textarea
                value={formData.keterangan}
                onChange={(e) =>
                  setFormData({ ...formData, keterangan: e.target.value })
                }
                rows={3}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                placeholder="Keterangan tambahan (opsional)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Berlaku Untuk <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={formData.berlakuUntuk}
                onChange={(e) =>
                  setFormData({ ...formData, berlakuUntuk: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">Semua Divisi</option>
                <option value="Developer">Developer</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() => setOpenBuatCuti(false)}
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
          title="Edit Cuti"
          size="md"
        >
          <form
            onSubmit={handleEditSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Nama Jenis Cuti <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={editFormData.namaJenisCuti}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    namaJenisCuti: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Jumlah Hari Cuti <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={editFormData.jumlahHariCuti}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    jumlahHariCuti: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
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
                Keterangan
              </label>
              <textarea
                value={editFormData.keterangan}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    keterangan: e.target.value,
                  })
                }
                rows={3}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Berlaku Untuk <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={editFormData.berlakuUntuk}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    berlakuUntuk: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">Semua Divisi</option>
                <option value="Developer">Developer</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
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

        <Modal
          open={openDetail}
          onClose={() => {
            setOpenDetail(false);
            setSelectedLeave(null);
          }}
          title="Detail Cuti"
          size="md"
        >
          {selectedLeave && (
            <div className="grid gap-2 pb-2">
              <div className="flex items-start gap-20">
                <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                  Nama Jenis Cuti
                </span>
                <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                  {selectedLeave.nama}
                </span>
              </div>

              <div className="flex items-start gap-20">
                <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                  Jumlah Hari Cuti
                </span>
                <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                  {selectedLeave.jumlah}
                </span>
              </div>

              <div className="flex items-start gap-20">
                <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                  Status
                </span>
                <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                  {selectedLeave.status}
                </span>
              </div>

              <div className="flex items-start gap-20">
                <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                  Keterangan
                </span>
                <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                  Cuti tahunan untuk karyawan tetap
                </span>
              </div>

              <div className="flex items-start gap-20">
                <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                  Berlaku Untuk
                </span>
                <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                  Semua Divisi
                </span>
              </div>
            </div>
          )}
        </Modal>
      </OwnerSectionLayout>
    </DashboardShell>
  );
}
