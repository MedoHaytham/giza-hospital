// الموقع static بدون سيرفر، فيُرسل النموذج إلى خدمة خارجية (Formspree / Getform / API خاص بك).
// ضع الرابط في ملف .env.local:
//   NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxx
//   NEXT_PUBLIC_JOBS_ENDPOINT=https://formspree.io/f/yyyy
// بدون الرابط يعمل النموذج في وضع تجريبي (لا يُرسل شيئًا).
export async function submitForm(endpoint, formData) {
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 600));
    return { ok: true, demo: true };
  }
  const res = await fetch(endpoint, { method: "POST", body: formData, headers: { Accept: "application/json" } });
  return { ok: res.ok };
}
