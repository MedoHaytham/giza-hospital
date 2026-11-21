import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { nav, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white mt-16">
      <div className="container-x grid gap-8 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-extrabold mb-2">{site.name}</h3>
          <p className="text-white/80 leading-7">{site.tagline}</p>
        </div>
        <div>
          <h4 className="font-bold mb-3">روابط سريعة</h4>
          <ul className="grid grid-cols-2 gap-y-2 text-white/85">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-white hover:underline">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">تواصل معنا</h4>
          <ul className="space-y-2 text-white/85">
            <li className="flex gap-2"><MapPin size={18} className="mt-1 shrink-0" />{site.address}</li>
            {site.phones.map((p, i) => (
              <li key={i} className="flex gap-2"><Phone size={18} className="mt-1 shrink-0" /><a href={`tel:${p.replace(/\s/g, "")}`} dir="ltr">{p}</a></li>
            ))}
            <li className="flex gap-2"><Mail size={18} className="mt-1 shrink-0" />{site.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15 py-4 text-center text-sm text-white/70">
        © {new Date().getFullYear()} {site.name}. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
