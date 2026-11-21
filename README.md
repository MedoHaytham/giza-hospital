# موقع مستشفى الجيزة الدولي (Next.js)

Next.js 16 (App Router) + Tailwind CSS v4 — تصدير static، واجهة عربية RTL، خط Cairo مستضاف محليًا.

## التشغيل
```bash
npm install
npm run dev      # للتطوير
npm run build    # ينتج مجلد out/ (يُرفع على أي استضافة static)
```

## الصفحات
`/` الرئيسية · `/about` · `/departments` · `/clinics` + `/clinics/[slug]` · `/doctors` + `/doctors/[slug]` · `/insurance` · `/jobs` · `/contact`

## أين أعدّل المحتوى؟
كل البيانات في `data/site.js`: بيانات المستشفى (العنوان، الهواتف، رابط الفيديو)، الأقسام، العيادات، الأطباء، الجهات المتعاقدة.
- **أطباء وجهات متعاقدة حاليًا بيانات تجريبية** — استبدلها بالحقيقية.
- صور العيادات/الأطباء/الشعارات: ضعها في `public/images/...` وحط المسار في `image` / `photo` / `logo`.
- إضافة عيادة أو طبيب = سطر جديد في المصفوفة، وتتولد صفحته تلقائيًا.

## النماذج (وظائف / تواصل)
الموقع static فلا يوجد سيرفر. أنشئ `.env.local`:
```
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxx
NEXT_PUBLIC_JOBS_ENDPOINT=https://formspree.io/f/yyyy
```
بدون الروابط يعمل النموذج في وضع تجريبي ولا يرسل شيئًا. (رفع السيرة الذاتية يحتاج خدمة تدعم الملفات.)
