import PageHero from "@/components/PageHero";
import DoctorsExplorer from "@/components/DoctorsExplorer";
import { doctors, clinics } from "@/data/site";

export const metadata = { title: "الأطباء" };

export default function Doctors() {
  return (
    <>
      <PageHero title="الأطباء" crumbs={[{ label: "الأطباء" }]} />
      <section className="container-x py-12">
        <DoctorsExplorer doctors={doctors} clinics={clinics} />
      </section>
    </>
  );
}
