"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { OwnerSectionLayout } from "@/components/layout/OwnerSectionLayout";
import { TableToolbar } from "@/components/layout/TableToolbar";
import { Pagination } from "@/components/ui/Pagination";
import { Modal } from "@/components/ui/Modal";
import { ActionButton } from "@/components/ui/ActionButton";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

const holidayRows = [
  {
    no: 1,
    nama: "Anniversary",
    tanggal: "12/12/2025",
    status: "Aktif",
  },
  {
    no: 2,
    nama: "Jeda Akhir Tahun",
    tanggal: "30/12/2025 - 31/12/2025",
    status: "Berlalu",
  },
];

const cardBase =
  "min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md";

export default function HrDaftarLiburPage() {
  const [openBuatLibur, setOpenBuatLibur] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<typeof holidayRows[0] | null>(null);
  const [selectedEdit, setSelectedEdit] = useState<typeof holidayRows[0] | null>(null);
  const [showCustomJenis, setShowCustomJenis] = useState(false);
  const [formData, setFormData] = useState({
    namaLibur: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    jenisLibur: "",
    jenisLiburCustom: "",
    status: "Aktif",
  });
  const [editFormData, setEditFormData] = useState({
    namaLibur: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    jenisLibur: "",
    jenisLiburCustom: "",
    status: "Aktif",
  });

  const toInputDate = (value: string) => {
    const parts = value.split("/");
    if (parts.length !== 3) return "";
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const parseTanggal = (value: string) => {
    const parts = value.split(" - ");
    if (parts.length === 2) {
      return {
        mulai: toInputDate(parts[0]),
        selesai: toInputDate(parts[1]),
      };
    }
    return { mulai: toInputDate(value), selesai: "" };
  };

  const [openConfirmAdd, setOpenConfirmAdd] = useState(false);
  const [openConfirmEdit, setOpenConfirmEdit] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenConfirmAdd(true);
  };

  const handleConfirmAdd = () => {
    console.log("Form submitted:", formData);
    setOpenBuatLibur(false);
    setOpenConfirmAdd(false);
    setFormData({
      namaLibur: "",
      tanggalMulai: "",
      tanggalSelesai: "",
      jenisLibur: "",
      jenisLiburCustom: "",
      status: "Aktif",
    });
    setShowCustomJenis(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenConfirmEdit(true);
  };

  const handleConfirmEdit = () => {
    console.log("Edit libur:", editFormData);
    setOpenEdit(false);
    setSelectedEdit(null);
    setOpenConfirmEdit(false);
    setShowCustomJenis(false);
  };

  return (
    <DashboardShell active="HR">
      <OwnerSectionLayout
        title="Daftar Libur"
        breadcrumb="Beranda/Libur & Cuti/Daftar Libur"
      >
        <ConfirmationModal
          open={openConfirmAdd}
          onClose={() => setOpenConfirmAdd(false)}
          onConfirm={handleConfirmAdd}
          title="Konfirmasi Buat Libur"
          message="Apakah Anda yakin ingin membuat hari libur ini?"
          confirmLabel="Ya, Buat"
        />

        <ConfirmationModal
          open={openConfirmEdit}
          onClose={() => setOpenConfirmEdit(false)}
          onConfirm={handleConfirmEdit}
          title="Konfirmasi Edit Libur"
          message="Apakah Anda yakin ingin menyimpan perubahan data libur ini?"
          confirmLabel="Ya, Simpan"
        />

        <section className={cardBase}>
          <TableToolbar
            primaryActions={
              <button
                type="button"
                onClick={() => setOpenBuatLibur(true)}
                className="h-10 rounded-lg bg-blue-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
              >
                Buat Libur
              </button>
            }
            searchPlaceholder="Cari Libur..."
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
                    "Tanggal terbaru",
                    "Tanggal terlama",
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
                  {"No., Nama Libur, Tanggal, Status, Aksi"
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
                {holidayRows.map((row) => (
                  <tr key={row.no} className="odd:bg-slate-50">
                    <td className="w-10 border-b border-r border-slate-200 px-3 py-3 text-center text-slate-700 last:border-r-0">
                      {row.no}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-slate-700 last:border-r-0">
                      {row.nama}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center text-slate-600 last:border-r-0">
                      {row.tanggal}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center text-slate-600 last:border-r-0">
                      {row.status}
                    </td>
                    <td className="border-b border-r border-slate-200 px-3 py-3 text-center last:border-r-0">
                      <div className="flex items-center justify-center gap-2">
                        <ActionButton
                          onClick={() => {
                            setSelectedHoliday(row);
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
                            const tanggal = parseTanggal(row.tanggal);
                            const jenisLibur: string =
                              row.nama === "Anniversary"
                                ? "Perusahaan"
                                : "Nasional";
                            setSelectedEdit(row);
                            setEditFormData({
                              namaLibur: row.nama,
                              tanggalMulai: "",
                              tanggalSelesai: "",
                              jenisLibur,
                              jenisLiburCustom: "",
                              status: row.status === "Berlalu" ? "Nonaktif" : "Aktif",
                            });
                            setEditFormData((prev) => ({
                              ...prev,
                              tanggalMulai: tanggal.mulai,
                              tanggalSelesai: tanggal.selesai,
                            }));
                            setShowCustomJenis(jenisLibur === "custom");
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
            summaryText={`Menampilkan ${holidayRows.length} data`}
            className="mt-4"
          />
        </section>

        <Modal
          open={openBuatLibur}
          onClose={() => {
            setOpenBuatLibur(false);
            setShowCustomJenis(false);
          }}
          title="Buat Libur"
          size="md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Nama Libur <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.namaLibur}
                onChange={(e) =>
                  setFormData({ ...formData, namaLibur: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                placeholder="Tahun Baru"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tanggal Mulai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.tanggalMulai}
                  onChange={(e) =>
                    setFormData({ ...formData, tanggalMulai: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  value={formData.tanggalSelesai}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tanggalSelesai: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                <p className="text-xs text-slate-400">
                  Kosongkan jika libur hanya 1 hari
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Jenis Libur <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={formData.jenisLibur}
                onChange={(e) => {
                  setFormData({ ...formData, jenisLibur: e.target.value });
                  setShowCustomJenis(e.target.value === "custom");
                }}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Pilih Jenis Libur</option>
                <option value="Nasional">Nasional</option>
                <option value="Perusahaan">Perusahaan</option>
                <option value="Cuti Bersama">Cuti Bersama</option>
                <option value="custom">Tambah Jenis Baru (Custom)</option>
              </select>
            </div>

            {showCustomJenis && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nama Jenis Libur Baru <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required={showCustomJenis}
                  value={formData.jenisLiburCustom}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      jenisLiburCustom: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="Masukkan nama jenis libur baru"
                />
              </div>
            )}

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
                onClick={() => {
                  setOpenBuatLibur(false);
                  setShowCustomJenis(false);
                }}
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
            setShowCustomJenis(false);
          }}
          title="Edit Libur"
          size="md"
        >
          <form
            onSubmit={handleEditSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Nama Libur <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={editFormData.namaLibur}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, namaLibur: e.target.value })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tanggal Mulai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={editFormData.tanggalMulai}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      tanggalMulai: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  value={editFormData.tanggalSelesai}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      tanggalSelesai: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Jenis Libur <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={editFormData.jenisLibur}
                onChange={(e) => {
                  setEditFormData({ ...editFormData, jenisLibur: e.target.value });
                  setShowCustomJenis(e.target.value === "custom");
                }}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Pilih Jenis Libur</option>
                <option value="Nasional">Nasional</option>
                <option value="Perusahaan">Perusahaan</option>
                <option value="Cuti Bersama">Cuti Bersama</option>
                <option value="custom">Tambah Jenis Baru (Custom)</option>
              </select>
            </div>

            {showCustomJenis ? (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nama Jenis Libur Baru <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.jenisLiburCustom}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      jenisLiburCustom: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            ) : null}

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
                onClick={() => {
                  setOpenEdit(false);
                  setShowCustomJenis(false);
                }}
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
            setSelectedHoliday(null);
          }}
          title="Detail Libur"
          size="md"
        >
          {selectedHoliday && (
            <div className="grid gap-2 pb-2">
              <div className="flex items-start gap-20">
                <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                  Nama Libur
                </span>
                <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                  {selectedHoliday.nama}
                </span>
              </div>

              <div className="flex items-start gap-20">
                <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                  Tanggal
                </span>
                <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                  {selectedHoliday.tanggal}
                </span>
              </div>

              <div className="flex items-start gap-20">
                <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                  Jenis Libur
                </span>
                <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                  {selectedHoliday.nama === "Anniversary" ? "Perusahaan" : "Nasional"}
                </span>
              </div>

              <div className="flex items-start gap-20">
                <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                  Status
                </span>
                <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                  {selectedHoliday.status}
                </span>
              </div>
            </div>
          )}
        </Modal>
      </OwnerSectionLayout>
    </DashboardShell>
  );
}
