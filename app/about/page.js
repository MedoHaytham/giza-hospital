import PageHero from "@/components/PageHero";
import { site } from "@/data/site";

export const metadata = { title: "عن المستشفى" };

export default function About() {
  return (
    <>
      <PageHero title="عن المستشفى" crumbs={[{ label: "عن المستشفى" }]} />
      <section className="container-x py-12 max-w-3xl space-y-5 leading-8 text-lg">
        <p>{site.name} مستشفى متعدد التخصصات يقدّم خدمات التشخيص والعلاج والجراحة والرعاية المركزة والطوارئ.</p>
        <p>رسالتنا: تقديم رعاية طبية آمنة وإنسانية وفق أعلى معايير الجودة. (نص تجريبي — استبدله بنبذة المستشفى ورؤيتها ورسالتها الحقيقية)</p>
        <p>العنوان: {site.address}</p>
      </section>
    </>
  );
}
