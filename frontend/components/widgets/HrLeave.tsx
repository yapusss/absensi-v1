import { DashboardShell } from "@/components/layout/DashboardShell";
import { OwnerSectionLayout } from "@/components/layout/OwnerSectionLayout";

export default function HrLiburCutiPage() {
  return (
    <DashboardShell active="HR">
      <OwnerSectionLayout
        title="Libur & Cuti"
        breadcrumb="Beranda/Libur & Cuti"
        searchPlaceholder="Cari libur atau cuti"
        actionClassName="flex justify-start"
      >
        <section className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500">
          Konten Libur & Cuti akan ditambahkan di sini.
        </section>
      </OwnerSectionLayout>
    </DashboardShell>
  );
}
