"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Slideshow({ slides }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 5000);
    return () => clearInterval(t);
  }, [paused, n]);

  const bgs = [
    "from-brand-dark via-brand to-accent",
    "from-brand to-cyan-500",
    "from-accent via-brand to-brand-dark",
  ];

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="معرض الصور"
    >
      <div className="relative h-[320px] md:h-[460px]">
        {slides.map((s, idx) => (
          <div
            key={s.title}
            aria-hidden={idx !== i}
            className={`absolute inset-0 bg-gradient-to-l ${bgs[idx % bgs.length]} flex items-center transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <div className="container-x text-white">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-3">{s.title}</h2>
              <p className="text-lg md:text-xl max-w-xl text-white/90 mb-6">{s.text}</p>
              {s.cta && <Link href={s.cta.href} className="btn !bg-white !text-brand hover:!bg-soft">{s.cta.label}</Link>}
            </div>
          </div>
        ))}
      </div>
      <button aria-label="السابق" onClick={() => setI((i - 1 + n) % n)} className="absolute top-1/2 -translate-y-1/2 end-3 hidden md:grid place-items-center size-10 rounded-full bg-white/25 hover:bg-white/40 text-white">
        <ChevronRight />
      </button>
      <button aria-label="التالي" onClick={() => setI((i + 1) % n)} className="absolute top-1/2 -translate-y-1/2 start-3 hidden md:grid place-items-center size-10 rounded-full bg-white/25 hover:bg-white/40 text-white">
        <ChevronLeft />
      </button>
      <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
        {slides.map((s, idx) => (
          <button key={s.title} aria-label={`الشريحة ${idx + 1}`} onClick={() => setI(idx)} className={`h-2.5 rounded-full transition-all ${idx === i ? "w-8 bg-white" : "w-2.5 bg-white/50"}`} />
        ))}
      </div>
    </section>
  );
}
