import { DashboardShell } from "@/components/layout/DashboardShell";
import { OwnerSectionLayout } from "@/components/layout/OwnerSectionLayout";

export default function ProviderUsahaMenuPage() {
  return (
    <DashboardShell active="Penyedia">
      <OwnerSectionLayout title="Usaha" breadcrumb="Beranda/Usaha">
        <section className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500">
          Konten Usaha akan ditambahkan di sini.
        </section>
        
      </OwnerSectionLayout>
      
    </DashboardShell>
  );
}
