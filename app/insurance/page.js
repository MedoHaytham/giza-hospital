import { ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import { insurers } from "@/data/site";

export const metadata = { title: "التأمين الطبي والتعاقدات" };

export default function Insurance() {
  return (
    <>
      <PageHero title="التأمين الطبي والتعاقدات" crumbs={[{ label: "التأمين الطبي" }]} />
      <section className="container-x py-12">
        <p className="text-lg text-ink/80 mb-8 max-w-2xl">يتعاقد المستشفى مع عدد من شركات التأمين والجهات لتقديم الخدمة الطبية لمنتسبيها.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {insurers.map((x) => (
            <div key={x.name} className="aspect-[3/2] border rounded-lg bg-white grid place-items-center p-4 shadow-sm">
              {x.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={x.logo} alt={x.name} loading="lazy" className="max-h-full max-w-full object-contain" />
              ) : (
                <div className="text-center text-ink/50">
                  <ShieldCheck className="mx-auto mb-1" />
                  <span className="text-sm">{x.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
