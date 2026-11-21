import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";

export const metadata = { title: "وظائف" };

const fields = [
  { name: "name", label: "الاسم", type: "text", required: true },
  { name: "email", label: "البريد الإلكتروني", type: "email", required: true },
  { name: "phone", label: "رقم الهاتف", type: "tel", required: true },
  { name: "cv", label: "السيرة الذاتية (PDF أو Word)", type: "file", required: true },
  { name: "message", label: "رسالة", type: "textarea" },
];

export default function Jobs() {
  return (
    <>
      <PageHero title="وظائف" crumbs={[{ label: "وظائف" }]} />
      <section className="container-x py-12 max-w-2xl">
        <h2 className="text-2xl font-extrabold text-brand mb-2">قدّم الآن</h2>
        <p className="text-ink/70 mb-6">املأ النموذج وأرفق سيرتك الذاتية وسنتواصل معك عند توفر وظيفة مناسبة.</p>
        <LeadForm fields={fields} endpoint={process.env.NEXT_PUBLIC_JOBS_ENDPOINT} submitLabel="إرسال الطلب" successText="تم استلام طلبك بنجاح، شكرًا لاهتمامك." />
      </section>
    </>
  );
}
