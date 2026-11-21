import Link from "next/link";

export default function PageHero({ title, crumbs = [] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-l from-sky-200 via-sky-100 to-cyan-50">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_30%,#14a3a0_0,transparent_35%),radial-gradient(circle_at_80%_70%,#0b5f8f_0,transparent_30%)]" />
      <div className="container-x relative py-10 md:py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink">{title}</h1>
        {crumbs.length > 0 && (
          <p className="mt-2 text-sm text-ink/70">
            <Link href="/" className="hover:underline">الرئيسية</Link>
            {crumbs.map((c) => (
              <span key={c.label}> / {c.href ? <Link href={c.href} className="hover:underline">{c.label}</Link> : c.label}</span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}
