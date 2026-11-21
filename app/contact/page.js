import { MapPin, Phone, Mail } from "lucide-react";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { site } from "@/data/site";

export const metadata = { title: "تواصل معنا" };

const fields = [
  { name: "name", label: "الاسم", type: "text", required: true },
  { name: "email", label: "البريد الإلكتروني", type: "email", required: true },
  { name: "phone", label: "رقم الهاتف", type: "tel", required: true },
  { name: "message", label: "الرسالة", type: "textarea", required: true },
];

export default function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
  return (
    <>
      <PageHero title="تواصل معنا" crumbs={[{ label: "تواصل معنا" }]} />
      <section className="container-x py-12 space-y-12">
        <div className="rounded-lg overflow-hidden border shadow-sm aspect-[16/7] min-h-64">
          <iframe src={mapSrc} title="موقع المستشفى على الخريطة" className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold text-brand mb-4">أرسل لنا رسالة</h2>
            <LeadForm fields={fields} endpoint={process.env.NEXT_PUBLIC_CONTACT_ENDPOINT} submitLabel="إرسال" successText="تم إرسال رسالتك، سنرد عليك قريبًا." />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-brand mb-4">بيانات التواصل</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex gap-3"><MapPin className="text-accent mt-1 shrink-0" />{site.address}</li>
              {site.phones.map((p, i) => (
                <li key={i} className="flex gap-3"><Phone className="text-accent mt-1 shrink-0" /><a href={`tel:${p.replace(/\s/g, "")}`} dir="ltr">{p}</a></li>
              ))}
              <li className="flex gap-3"><Mail className="text-accent mt-1 shrink-0" />{site.email}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
