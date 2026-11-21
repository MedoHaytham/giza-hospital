import * as Icons from "lucide-react";
import PageHero from "@/components/PageHero";
import { departments } from "@/data/site";

export const metadata = { title: "أقسام المستشفى" };

export default function Departments() {
  return (
    <>
      <PageHero title="أقسام المستشفى" crumbs={[{ label: "أقسام المستشفى" }]} />
      <section className="container-x py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {departments.map((d) => {
          const Icon = Icons[d.icon] ?? Icons.Stethoscope;
          return (
            <article key={d.slug} id={d.slug} className="bg-white border rounded-lg p-6 shadow-sm">
              <span className="inline-grid place-items-center size-14 rounded-full bg-brand/10 text-brand mb-4"><Icon size={28} /></span>
              <h2 className="font-extrabold text-xl text-brand mb-2">{d.name}</h2>
              <p className="text-ink/75 leading-7">{d.text}</p>
            </article>
          );
        })}
      </section>
    </>
  );
}
