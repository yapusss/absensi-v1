import Link from "next/link";

const roleLinks = [
  { label: "Penyedia", href: "/dashboard" },
  { label: "Owner", href: "/dashboard" },
  { label: "HR", href: "/dashboard" },
  { label: "Karyawan", href: "/dashboard" },
];

export function TopNav({ active }: { active: string }) {
  return (
    <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 pt-6">
      <Link href="/" className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-neutral-900 text-lg font-semibold lowercase tracking-wide text-white">
          ab
        </span>
        <span>
          <span className="block font-[var(--font-display)] text-lg font-semibold">
            Absensi Pulse
          </span>
          <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
            Performance hub
          </span>
        </span>
      </Link>
      <nav className="flex flex-wrap gap-2">
        {roleLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] transition ${
              active === link.label
                ? "border-transparent bg-neutral-900 text-white"
                : "border-black/10 bg-white/60 text-neutral-700 hover:border-transparent hover:bg-neutral-900 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
