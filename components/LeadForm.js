"use client";
import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { submitForm } from "@/lib/submitForm";

const MAX_MB = 5;
const ALLOWED = [".pdf", ".doc", ".docx"];

// fields: [{ name, label, type: text|email|tel|textarea|file, required }]
export default function LeadForm({ fields, endpoint, submitLabel = "إرسال", successText }) {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [demo, setDemo] = useState(false);

  function validate(fd) {
    const e = {};
    for (const f of fields) {
      const v = fd.get(f.name);
      const empty = f.type === "file" ? !v || !v.size : !String(v ?? "").trim();
      if (f.required && empty) { e[f.name] = "هذا الحقل مطلوب"; continue; }
      if (empty) continue;
      if (f.type === "email" && !/^\S+@\S+\.\S+$/.test(v)) e[f.name] = "بريد إلكتروني غير صحيح";
      if (f.type === "tel" && !/^[+\d][\d\s-]{6,}$/.test(String(v).trim())) e[f.name] = "رقم هاتف غير صحيح";
      if (f.type === "file") {
        const ext = "." + v.name.split(".").pop().toLowerCase();
        if (!ALLOWED.includes(ext)) e[f.name] = "الملفات المسموحة: PDF أو Word";
        else if (v.size > MAX_MB * 1024 * 1024) e[f.name] = `الحد الأقصى ${MAX_MB} ميجا`;
      }
    }
    return e;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");
    try {
      const r = await submitForm(endpoint, fd);
      if (!r.ok) throw new Error("failed");
      setDemo(!!r.demo);
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-center" role="status">
        <CheckCircle2 className="mx-auto text-emerald-600 mb-2" size={36} />
        <p className="font-bold text-emerald-800">{successText}</p>
        {demo && <p className="text-xs text-emerald-700/70 mt-2">(وضع تجريبي: لم يتم إرسال البيانات فعليًا — اضبط رابط النموذج في .env.local)</p>}
        <button className="mt-4 text-brand font-bold hover:underline" onClick={() => setStatus("idle")}>إرسال رسالة أخرى</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="block font-semibold mb-1.5">
            {f.label} {f.required && <span className="text-red-600">*</span>}
          </label>
          {f.type === "textarea" ? (
            <textarea id={f.name} name={f.name} rows={5} className="field" aria-invalid={!!errors[f.name]} />
          ) : f.type === "file" ? (
            <input id={f.name} name={f.name} type="file" accept={ALLOWED.join(",")} className="field file:me-3 file:rounded file:border-0 file:bg-soft file:px-3 file:py-1 file:font-semibold" aria-invalid={!!errors[f.name]} />
          ) : (
            <input id={f.name} name={f.name} type={f.type} dir={f.type === "email" || f.type === "tel" ? "ltr" : undefined} className={`field ${f.type === "email" || f.type === "tel" ? "text-end" : ""}`} aria-invalid={!!errors[f.name]} />
          )}
          {errors[f.name] && <p className="text-red-600 text-sm mt-1">{errors[f.name]}</p>}
        </div>
      ))}
      {status === "error" && <p className="text-red-600 text-sm">تعذّر الإرسال، حاول مرة أخرى.</p>}
      <button type="submit" className="btn disabled:opacity-60" disabled={status === "sending"}>
        <Send size={18} className="rotate-180" /> {status === "sending" ? "جارٍ الإرسال..." : submitLabel}
      </button>
    </form>
  );
}
