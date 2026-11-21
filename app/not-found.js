import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-24 text-center">
      <h1 className="text-5xl font-extrabold text-brand mb-3">404</h1>
      <p className="text-lg mb-6">الصفحة المطلوبة غير موجودة.</p>
      <Link href="/" className="btn">العودة للرئيسية</Link>
    </section>
  );
}
