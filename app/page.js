import Link from "next/link";
import * as Icons from "lucide-react";
import Slideshow from "@/components/Slideshow";
import VideoSection from "@/components/VideoSection";
import SectionTitle from "@/components/SectionTitle";
import ClinicCard from "@/components/ClinicCard";
import DoctorCard from "@/components/DoctorCard";
import { slides, departments, clinics, doctors, site } from "@/data/site";

export default function Home() {
  return (
    <>
      <Slideshow slides={slides} />

      <section className="container-x py-14">
        <SectionTitle title="تعرّف على المستشفى" />
        <VideoSection />
      </section>

      <section className="bg-soft py-14">
        <div className="container-x">
          <SectionTitle title="أقسام المستشفى" href="/departments" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {departments.map((d) => {
              const Icon = Icons[d.icon] ?? Icons.Stethoscope;
              return (
                <Link key={d.slug} href="/departments" className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-grid place-items-center size-14 rounded-full bg-brand/10 text-brand mb-3"><Icon size={28} /></span>
                  <h3 className="font-bold text-brand">{d.name}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-x py-14">
        <SectionTitle title="العيادات الخارجية" href="/clinics" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {clinics.slice(0, 8).map((c) => <ClinicCard key={c.slug} clinic={c} />)}
        </div>
      </section>

      <section className="bg-soft py-14">
        <div className="container-x">
          <SectionTitle title="أطباؤنا" href="/doctors" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {doctors.slice(0, 4).map((d) => <DoctorCard key={d.slug} doctor={d} />)}
          </div>
        </div>
      </section>

      <section className="container-x py-14">
        <SectionTitle title="عن المستشفى" />
        <div className="max-w-3xl">
          <p className="leading-8 text-lg text-ink/85">
            يقدّم {site.name} خدمات طبية متكاملة من خلال أقسام متخصصة وعيادات خارجية متعددة وفريق طبي وتمريضي مدرّب،
            بهدف توفير رعاية آمنة وعالية الجودة لكل مريض. (نص تجريبي — استبدله بنبذة المستشفى الحقيقية)
          </p>
          <Link href="/about" className="btn mt-6">اقرأ المزيد</Link>
        </div>
      </section>
    </>
  );
}
