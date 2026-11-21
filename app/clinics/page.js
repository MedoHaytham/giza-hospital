import PageHero from "@/components/PageHero";
import ClinicsExplorer from "@/components/ClinicsExplorer";
import { clinics } from "@/data/site";

export const metadata = { title: "العيادات الخارجية" };

export default function Clinics() {
  return (
    <>
      <PageHero title="العيادات الخارجية" crumbs={[{ label: "العيادات الخارجية" }]} />
      <section className="container-x py-12">
        <ClinicsExplorer clinics={clinics} />
      </section>
    </>
  );
}
