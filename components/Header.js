"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone, Stethoscope } from "lucide-react";
import { nav, site } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm">
      <div className="bg-brand-dark text-white text-sm">
        <div className="container-x flex items-center justify-between py-1.5">
          <span>{site.hours}</span>
          <a href={`tel:${site.hotline}`} className="flex items-center gap-1.5 font-bold">
            <Phone size={14} /> الخط الساخن: {site.hotline}
          </a>
        </div>
      </div>
      <div className="container-x flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 text-brand font-extrabold text-xl" onClick={() => setOpen(false)}>
          <Stethoscope size={28} className="text-accent" />
          {site.name}
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`px-3 py-2 rounded-md text-[15px] font-semibold transition-colors ${
                isActive(n.href) ? "bg-brand text-white" : "hover:bg-soft text-ink"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          className="lg:hidden p-2 rounded-md hover:bg-soft"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="lg:hidden border-t bg-white">
          <div className="container-x py-2 flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-3 rounded-md font-semibold ${isActive(n.href) ? "bg-brand text-white" : "hover:bg-soft"}`}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
