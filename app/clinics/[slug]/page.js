import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Thumb from "@/components/Thumb";
import DoctorCard from "@/components/DoctorCard";
import { clinics, doctors, getClinic, site } from "@/data/site";

export function generateStaticParams() {
  return clinics.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const clinic = getClinic(slug);
  return { title: clinic?.name };
}

export default async function ClinicPage({ params }) {
  const { slug } = await params;
  const clinic = getClinic(slug);
  if (!clinic) notFound();
  const docs = doctors.filter((d) => d.clinic === clinic.slug);

  return (
    <>
      <PageHero title={clinic.name} crumbs={[{ label: "العيادات الخارجية", href: "/clinics" }, { label: clinic.name }]} />
      <section className="container-x py-12">
        <div className="grid gap-8 md:grid-cols-5 items-start">
          <div className="md:col-span-2 aspect-[4/3] rounded-lg overflow-hidden shadow">
            <Thumb src={clinic.image} alt={clinic.name} />
          </div>
          <div className="md:col-span-3">
            <h2 className="text-2xl font-extrabold text-brand mb-3">عن العيادة</h2>
            <p className="leading-8 text-lg text-ink/85">{clinic.text}</p>
            <p className="mt-4 text-ink/70">للحجز والاستفسار: <a href={`tel:${site.hotline}`} className="font-bold text-brand">{site.hotline}</a></p>
            <Link href="/contact" className="btn mt-6">تواصل معنا</Link>
          </div>
        </div>

        {docs.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-extrabold text-brand mb-6">أطباء العيادة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {docs.map((d) => <DoctorCard key={d.slug} doctor={d} />)}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
