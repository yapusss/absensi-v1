"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { OwnerSectionLayout } from "@/components/layout/OwnerSectionLayout";
import { TableToolbar } from "@/components/layout/TableToolbar";
import { Pagination } from "@/components/ui/Pagination";
import { Modal } from "@/components/ui/Modal";
import { ActionButton } from "@/components/ui/ActionButton";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";


const businessRows = [
  {
    no: 1,
    usaha: "Ayam Aharis",
    logoUrl: "/dempe.jpg",
    owner: "haris n",
    kontrakMulai: "01/01/2026",
    kontrakSelesai: "01/01/2027",
    nilai: 3000000,
    sisaWaktu: "11 bulan",
    jumlahPengguna: 24,
    masaAktif: "12 bulan",
    status: "Berlangsung",
  },
  {
    no: 2,
    usaha: "Laundry Dru",
    logoUrl: "/hamriz.jpg",
    owner: "drupadi g",
    kontrakMulai: "01/01/2026",
    kontrakSelesai: "01/02/2026",
    nilai: 3000000,
    sisaWaktu: "12 hari",
    jumlahPengguna: 8,
    masaAktif: "1 bulan",
    status: "Hampir selesai",
  },
  {
    no: 3,
    usaha: "Kursus Ngoding",
    logoUrl: "/jempi.jpg",
    owner: "timotius v",
    kontrakMulai: "01/01/2026",
    kontrakSelesai: "01/01/2027",
    nilai: 3000000,
    sisaWaktu: "0",
    jumlahPengguna: 15,
    masaAktif: "12 bulan",
    status: "Selesai",
  },
];

const formatRupiah = (value: number) => ({
  prefix: "Rp",
  amount: value.toLocaleString("id-ID"),
});

const cardBase =
  "min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md";

export default function ProviderUsahaPage() {
  const [openTambahUsaha, setOpenTambahUsaha] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<typeof businessRows[0] | null>(null);
  const [formData, setFormData] = useState({
    namaUsaha: "",
    logoUsaha: null as File | null,
    pemilikUsaha: "",
    jumlahPengguna: "",
    kontrakMulai: "",
    kontrakSelesai: "",
    jenisLangganan: "",
    masaAktif: "",
    nilaiKontrak: "",
    status: "Berlangsung",
  });
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState<typeof businessRows[0] | null>(null);
  const [editFormData, setEditFormData] = useState({
    namaUsaha: "",
    logoUsaha: null as File | null,
    pemilikUsaha: "",
    jumlahPengguna: "",
    kontrakMulai: "",
    kontrakSelesai: "",
    jenisLangganan: "",
    masaAktif: "",
    nilaiKontrak: "",
    status: "Berlangsung",
  });

  const toInputDate = (value: string) => {
    const parts = value.split("/");
    if (parts.length !== 3) return "";
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const [openConfirmAdd, setOpenConfirmAdd] = useState(false);
  const [openConfirmEdit, setOpenConfirmEdit] = useState(false);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenConfirmEdit(true);
  };

  const handleConfirmEdit = () => {
    console.log("Form edit submitted:", editFormData);
    setOpenConfirmEdit(false);
    setOpenEdit(false);
    setSelectedEdit(null);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenConfirmAdd(true);
  };

  const handleConfirmAdd = () => {
    // Handle form submission here
    console.log("Form submitted:", formData);
    setOpenConfirmAdd(false);
    setOpenTambahUsaha(false);
    // Reset form
    setFormData({
      namaUsaha: "",
      logoUsaha: null,
      pemilikUsaha: "",
      jumlahPengguna: "",
      kontrakMulai: "",
      kontrakSelesai: "",
      jenisLangganan: "",
      masaAktif: "",
      nilaiKontrak: "",
      status: "Berlangsung",
    });
  };


  return (
    <DashboardShell active="Penyedia">
      <OwnerSectionLayout
        title="Daftar usaha pelanggan"
        breadcrumb="Beranda/Daftar Usaha"
      >
        <ConfirmationModal
          open={openConfirmAdd}
          onClose={() => setOpenConfirmAdd(false)}
          onConfirm={handleConfirmAdd}
          title="Konfirmasi Tambah Usaha"
          message="Apakah Anda yakin ingin menambahkan usaha baru ini?"
          confirmLabel="Ya, Tambah"
        />

        <ConfirmationModal
          open={openConfirmEdit}
          onClose={() => setOpenConfirmEdit(false)}
          onConfirm={handleConfirmEdit}
          title="Konfirmasi Edit Usaha"
          message="Apakah Anda yakin ingin menyimpan perubahan data usaha ini?"
          confirmLabel="Ya, Simpan"
        />

        
        <section className={cardBase}>
          <TableToolbar
            primaryActions={
              <button
                type="button"
                onClick={() => setOpenTambahUsaha(true)}
                className="h-10 rounded-lg bg-blue-500 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
              >
                Tambah Usaha
              </button>
            }
            searchPlaceholder="Cari Usaha..."
            showDivider={false}
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
                    "Kontrak terbaru",
                    "Kontrak terlama",
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
          <div className="mt-4 overflow-x-auto">
            <table className="w-full table-fixed border-separate border-spacing-0 text-sm">
              <thead className="sticky top-0 z-10 bg-gradient-to-r from-sky-50 to-blue-100">
                <tr>
                  <th className="w-10 border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                    No.
                  </th>
                  <th className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                    Nama Usaha
                  </th>
                  <th className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                    Pemilik Usaha
                  </th>
                  <th className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                    Jumlah Pengguna
                  </th>
                  <th className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                    Kontrak Langganan
                  </th>
                  <th className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                    Sisa Waktu Berlangganan
                  </th>
                  
                  <th className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                    Masa Aktif
                  </th>
                  <th className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                    Status
                  </th>
                  <th className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                    Nilai Kontrak
                  </th>
                  <th className="border-b border-r border-slate-200 px-2 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-slate-500 last:border-r-0">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {businessRows.map((row) => (
                  <tr key={row.no}>
                    <td className="w-10 border-b border-r border-slate-200 px-2 py-3 text-center text-slate-600 last:border-r-0">
                      {row.no}
                    </td>
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
                      {row.owner}
                    </td>
                    <td className="border-b border-r border-slate-200 px-2 py-3 text-center text-slate-500 last:border-r-0">
                      {row.jumlahPengguna}
                    </td>
                    <td className="w-min border-b border-r border-slate-200 px-2 py-3 text-center text-slate-500 last:border-r-0">
                      {row.kontrakMulai} - {row.kontrakSelesai}
                    </td>
                    <td className="border-b border-r border-slate-200 px-2 py-3 text-center text-slate-500 last:border-r-0">
                      {row.sisaWaktu}
                    </td>
                    
                    <td className="border-b border-r border-slate-200 px-2 py-3 text-center text-slate-500 last:border-r-0">
                      {row.masaAktif}
                    </td>
                    <td className="border-b border-r border-slate-200 px-2 py-3 text-center text-slate-700 last:border-r-0">
                      {row.status}
                    </td>
                    <td className="border-b border-r border-slate-200 px-2 py-3 text-slate-700 last:border-r-0">
                      <div className="flex items-center justify-between tabular-nums">
                        <span>{formatRupiah(row.nilai).prefix}</span>
                        <span>{formatRupiah(row.nilai).amount}</span>
                      </div>
                    </td>
                    <td className="border-b border-r border-slate-200 px-2 py-3 text-center last:border-r-0">
                      <div className="flex items-center justify-center gap-2">
                        <ActionButton
                          onClick={() => {
                            setSelectedBusiness(row);
                            setOpenDetail(true);
                          }}
                          aria-label={`Detail ${row.usaha}`}
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
                                namaUsaha: row.usaha,
                                logoUsaha: null,
                                pemilikUsaha: row.owner,
                                jumlahPengguna: row.jumlahPengguna.toString(),
                                kontrakMulai: toInputDate(row.kontrakMulai),
                                kontrakSelesai: toInputDate(row.kontrakSelesai),
                                jenisLangganan: row.masaAktif.includes("12") ? "Tahunan" : "Bulanan",
                                masaAktif: row.masaAktif.replace(" bulan", ""),
                                nilaiKontrak: row.nilai.toString(),
                                status: row.status,
                            });
                            setOpenEdit(true);
                          }}
                          aria-label={`Edit ${row.usaha}`}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5l4 4L7 21H3v-4z" />
                          </svg>
                        </ActionButton>
                        <ActionButton
                          variant="rose"
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
                            <path d="M7 6l1 14h8l1-14" />
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
            className="mt-4"
            page={1}
            totalPages={1}
            summaryText={`Menampilkan ${businessRows.length} data`}
          />
        </section>

        <Modal
          open={openTambahUsaha}
          onClose={() => setOpenTambahUsaha(false)}
          title="Tambah Usaha Pelanggan"
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nama Usaha <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.namaUsaha}
                  onChange={(e) =>
                    setFormData({ ...formData, namaUsaha: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="Masukkan nama usaha"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Pemilik Usaha <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={formData.pemilikUsaha}
                  onChange={(e) =>
                    setFormData({ ...formData, pemilikUsaha: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Pilih Pemilik Usaha</option>
                  <option value="haris n">haris n</option>
                  <option value="drupadi g">drupadi g</option>
                  <option value="timotius v">timotius v</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Logo Usaha
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      logoUsaha: e.target.files?.[0] || null,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Jumlah Pengguna <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.jumlahPengguna}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      jumlahPengguna: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Kontrak Mulai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.kontrakMulai}
                  onChange={(e) =>
                    setFormData({ ...formData, kontrakMulai: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Kontrak Selesai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.kontrakSelesai}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kontrakSelesai: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Jenis Langganan <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={formData.jenisLangganan}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      jenisLangganan: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Pilih Jenis Langganan</option>
                  <option value="Bulanan">Bulanan</option>
                  <option value="Tahunan">Tahunan</option>
                  <option value="Kustom">Kustom</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Masa Aktif (bulan) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.masaAktif}
                  onChange={(e) =>
                    setFormData({ ...formData, masaAktif: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="12"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nilai Kontrak <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.nilaiKontrak}
                  onChange={(e) =>
                    setFormData({ ...formData, nilaiKontrak: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="3000000"
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
                  <option value="Berlangsung">Berlangsung</option>
                  <option value="Hampir selesai">Hampir selesai</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() => setOpenTambahUsaha(false)}
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
          title="Edit Usaha Pelanggan"
          size="lg"
        >
            <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nama Usaha <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.namaUsaha}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, namaUsaha: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="Masukkan nama usaha"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Pemilik Usaha <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={editFormData.pemilikUsaha}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, pemilikUsaha: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Pilih Pemilik Usaha</option>
                  <option value="haris n">haris n</option>
                  <option value="drupadi g">drupadi g</option>
                  <option value="timotius v">timotius v</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Logo Usaha
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      logoUsaha: e.target.files?.[0] || null,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Jumlah Pengguna <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={editFormData.jumlahPengguna}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      jumlahPengguna: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Kontrak Mulai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={editFormData.kontrakMulai}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, kontrakMulai: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Kontrak Selesai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={editFormData.kontrakSelesai}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      kontrakSelesai: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Jenis Langganan <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={editFormData.jenisLangganan}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      jenisLangganan: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Pilih Jenis Langganan</option>
                  <option value="Bulanan">Bulanan</option>
                  <option value="Tahunan">Tahunan</option>
                  <option value="Kustom">Kustom</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Masa Aktif (bulan) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={editFormData.masaAktif}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, masaAktif: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="12"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nilai Kontrak <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={editFormData.nilaiKontrak}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, nilaiKontrak: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="3000000"
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
                  <option value="Berlangsung">Berlangsung</option>
                  <option value="Hampir selesai">Hampir selesai</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() => {
                    setOpenEdit(false);
                    setSelectedEdit(null);
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
          open={openDetail}
          onClose={() => {
            setOpenDetail(false);
            setSelectedBusiness(null);
          }}
          title="Detail Usaha Pelanggan"
          size="lg"
        >
          {selectedBusiness && (
            <div className="flex flex-col gap-14 pb-6 sm:flex-row">
              <div className="flex shrink-0 justify-center sm:justify-start">
                <img
                  src={selectedBusiness.logoUrl || "/icons/dot-blue.svg"}
                  alt={`Logo ${selectedBusiness.usaha}`}
                  className="h-50 w-50 rounded-lg object-cover"
                />
              </div>

              <div className="grid flex-1 gap-3 sm:grid-cols-1 sm:gap-x-4">
                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Nama Usaha
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedBusiness.usaha}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Pemilik Usaha
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedBusiness.owner}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Jumlah Pengguna
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedBusiness.jumlahPengguna} pengguna
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Kontrak Mulai
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedBusiness.kontrakMulai}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Kontrak Selesai
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedBusiness.kontrakSelesai}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Sisa Waktu Berlangganan
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedBusiness.sisaWaktu}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Masa Aktif
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedBusiness.masaAktif}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Status
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedBusiness.status}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Nilai Kontrak
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {formatRupiah(selectedBusiness.nilai).prefix}{" "}
                    {formatRupiah(selectedBusiness.nilai).amount}
                  </span>
                </div>

                <div className="flex items-start gap-20">
                  <span className="w-32 whitespace-nowrap text-sm font-semibold text-slate-600">
                    Jenis Langganan
                  </span>
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm text-slate-800">
                    {selectedBusiness.masaAktif.includes("12")
                      ? "Tahunan"
                      : "Bulanan"}
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
