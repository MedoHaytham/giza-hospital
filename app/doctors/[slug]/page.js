import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Thumb from "@/components/Thumb";
import { doctors, getDoctor, getClinic, site } from "@/data/site";

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: getDoctor(slug)?.name };
}

export default async function DoctorPage({ params }) {
  const { slug } = await params;
  const doctor = getDoctor(slug);
  if (!doctor) notFound();
  const clinic = getClinic(doctor.clinic);

  return (
    <>
      <PageHero title={doctor.name} crumbs={[{ label: "الأطباء", href: "/doctors" }, { label: doctor.name }]} />
      <section className="container-x py-12 grid gap-8 md:grid-cols-3 items-start">
        <div className="aspect-[4/5] rounded-lg overflow-hidden shadow">
          <Thumb kind="doctor" src={doctor.photo} alt={doctor.name} />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-2xl font-extrabold text-brand">{doctor.name}</h2>
          <p className="text-ink/70 mt-1">{doctor.title} — {clinic?.name}</p>
          <h3 className="font-bold mt-6 mb-2">نبذة</h3>
          <p className="leading-8 text-ink/85">{doctor.bio}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href={`tel:${site.hotline}`} className="btn">احجز موعدًا: {site.hotline}</a>
            {clinic && <Link href={`/clinics/${clinic.slug}`} className="btn btn-outline">صفحة العيادة</Link>}
          </div>
        </div>
      </section>
    </>
  );
}
