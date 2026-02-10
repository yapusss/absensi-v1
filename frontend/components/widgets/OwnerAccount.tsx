"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Modal } from "@/components/ui/Modal";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

const cardBase =
  "min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md";

export default function OwnerAkunPage() {
  const [openPassword, setOpenPassword] = useState(false);
  const [editForm, setEditForm] = useState({
    nama: "Haaris Nur Salim",
    nomorKaryawan: "EMP-2025-0142",
    posisi: "Owner",
    alamat: "Jl. Merpati No. 12, Bandung",
    tempatLahir: "Bandung",
    tanggalLahir: "1996-03-12",
    pendidikanTerakhir: "S1 Teknik Informatika",
    fotoProfil: null as File | null,
  });
  const [passwordForm, setPasswordForm] = useState({
    passwordLama: "",
    passwordBaru: "",
    konfirmasiPassword: "",
  });

  const [openConfirmEdit, setOpenConfirmEdit] = useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = useState(false);

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setOpenConfirmEdit(true);
  };

  const handleConfirmEdit = () => {
    console.log("Edit profil owner:", editForm);
    setOpenConfirmEdit(false);
  };

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setOpenConfirmPassword(true);
  };

  const handleConfirmPassword = () => {
    console.log("Ubah password owner:", passwordForm);
    setOpenPassword(false);
    setOpenConfirmPassword(false);
    setPasswordForm({
      passwordLama: "",
      passwordBaru: "",
      konfirmasiPassword: "",
    });
  };

  return (
    <DashboardShell active="Owner" ownerSubActive="Akun">
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-semibold text-slate-900">Akun</h1>
          <p className="text-xs text-slate-400">Beranda/Akun</p>
        </header>

        <ConfirmationModal
          open={openConfirmEdit}
          onClose={() => setOpenConfirmEdit(false)}
          onConfirm={handleConfirmEdit}
          message="Apakah Anda yakin ingin menyimpan perubahan data profil ini?"
          confirmLabel="Ya, Simpan"
        />

        <ConfirmationModal
          open={openConfirmPassword}
          onClose={() => setOpenConfirmPassword(false)}
          onConfirm={handleConfirmPassword}
          message="Apakah Anda yakin ingin mengubah password akun Anda?"
          confirmLabel="Ya, Ubah"
        />

        <article className={`${cardBase} w-full md:w-1/2`}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              console.log("Edit profil owner:", editForm);
            }}
            className="grid gap-10 md:grid-cols-[200px_1fr]"
          >
            <div className="space-y-8">
              <div className="flex justify-center md:justify-start">
                <div className="relative grid h-50 w-52 place-items-center rounded-2xl bg-slate-200 text-slate-500 md:ml-4">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-14 w-14"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                  </svg>
                  <label className="absolute bottom-3 right-3 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white bg-white text-slate-600 shadow-md transition hover:bg-slate-50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setEditForm({
                          ...editForm,
                          fotoProfil: event.target.files?.[0] ?? null,
                        })
                      }
                      className="sr-only"
                    />
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
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-4 max-w-[520px]">
              <div className="grid gap-3 sm:grid-cols-1">
                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <label className="text-sm font-medium text-slate-600">
                    Nama
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.nama}
                    onChange={(event) =>
                      setEditForm({ ...editForm, nama: event.target.value })
                    }
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <label className="text-sm font-medium text-slate-600">
                    Nomor Karyawan
                  </label>
                  <input
                    type="text"
                    value={editForm.nomorKaryawan}
                    readOnly
                    className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <label className="text-sm font-medium text-slate-600">
                    Posisi
                  </label>
                  <input
                    type="text"
                    value={editForm.posisi}
                    readOnly
                    className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-[140px_1fr] items-start gap-4">
                  <label className="text-sm font-medium text-slate-600">
                    Alamat
                  </label>
                  <textarea
                    required
                    value={editForm.alamat}
                    onChange={(event) =>
                      setEditForm({ ...editForm, alamat: event.target.value })
                    }
                    rows={3}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <label className="text-sm font-medium text-slate-600">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.tempatLahir}
                    onChange={(event) =>
                      setEditForm({ ...editForm, tempatLahir: event.target.value })
                    }
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <label className="text-sm font-medium text-slate-600">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    required
                    value={editForm.tanggalLahir}
                    onChange={(event) =>
                      setEditForm({
                        ...editForm,
                        tanggalLahir: event.target.value,
                      })
                    }
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                  <label className="text-sm font-medium text-slate-600">
                    Pendidikan Terakhir
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.pendidikanTerakhir}
                    onChange={(event) =>
                      setEditForm({
                        ...editForm,
                        pendidikanTerakhir: event.target.value,
                      })
                    }
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end md:col-span-2">
              <button
                type="button"
                onClick={() => setOpenPassword(true)}
                className="mr-4 mt-4 rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600"
              >
                Ubah Password
              </button>
              <button
                type="submit"
                className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
              >
                Ubah Data
              </button>
            </div>
          </form>
        </article>
      </div>

      <Modal
        open={openPassword}
        onClose={() => setOpenPassword(false)}
        title="Ubah Password"
        size="sm"
      >
        <form
          onSubmit={handlePasswordSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Password Lama <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              required
              value={passwordForm.passwordLama}
              onChange={(event) =>
                setPasswordForm({
                  ...passwordForm,
                  passwordLama: event.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Password Baru <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              required
              value={passwordForm.passwordBaru}
              onChange={(event) =>
                setPasswordForm({
                  ...passwordForm,
                  passwordBaru: event.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Konfirmasi Password <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              required
              value={passwordForm.konfirmasiPassword}
              onChange={(event) =>
                setPasswordForm({
                  ...passwordForm,
                  konfirmasiPassword: event.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={() => setOpenPassword(false)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </Modal>
    </DashboardShell>
  );
}
 
