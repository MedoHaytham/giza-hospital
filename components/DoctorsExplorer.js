"use client";
import { useMemo, useState, useRef } from "react";
import { Search } from "lucide-react";
import DoctorCard from "./DoctorCard";
import Pagination from "./Pagination";

const norm = (s) =>
  s.toLowerCase().replace(/[ً-ْ]/g, "").replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي");

const PAGE_SIZE = 20;

export default function DoctorsExplorer({ doctors, clinics }) {
  const [q, setQ] = useState("");
  const [clinic, setClinic] = useState("all");
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);

  // التخصصات التي لها أطباء فقط
  const tabs = useMemo(() => {
    const used = new Set(doctors.map((d) => d.clinic));
    return clinics.filter((c) => used.has(c.slug));
  }, [doctors, clinics]);

  const list = useMemo(() => {
    const nq = norm(q.trim());
    return doctors.filter((d) => {
      if (clinic !== "all" && d.clinic !== clinic) return false;
      if (!nq) return true;
      const cn = clinics.find((c) => c.slug === d.clinic)?.name ?? "";
      return norm(d.name + " " + cn).includes(nq);
    });
  }, [q, clinic, doctors, clinics]);

  const totalPages = Math.ceil(list.length / PAGE_SIZE) || 1;
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return list.slice(start, start + PAGE_SIZE);
  }, [list, currentPage]);

  const handleSearchChange = (e) => {
    setQ(e.target.value);
    setPage(1);
  };

  const handleClinicChange = (slug) => {
    setClinic(slug);
    setPage(1);
  };

  const handlePageChange = (p) => {
    setPage(p);
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const tabCls = (on) =>
    `px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
      on ? "bg-brand text-white border-brand" : "bg-white hover:bg-soft border-slate-300"
    }`;

  return (
    <div ref={containerRef} className="scroll-mt-6">
      <div className="relative max-w-md mb-5">
        <Search size={18} className="absolute top-1/2 -translate-y-1/2 start-3 text-ink/40" />
        <input
          className="field ps-10"
          placeholder="ابحث باسم الطبيب أو التخصص..."
          value={q}
          onChange={handleSearchChange}
          aria-label="بحث في الأطباء"
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="تصفية حسب التخصص">
        <button className={tabCls(clinic === "all")} onClick={() => handleClinicChange("all")}>
          الكل
        </button>
        {tabs.map((c) => (
          <button key={c.slug} className={tabCls(clinic === c.slug)} onClick={() => handleClinicChange(c.slug)}>
            {c.name.replace(/^عيادة /, "")}
          </button>
        ))}
      </div>
      {list.length ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {paginatedList.map((d) => (
              <DoctorCard key={d.slug} doctor={d} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={list.length}
            pageSize={PAGE_SIZE}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p className="text-center text-ink/60 py-12">لا توجد نتائج مطابقة.</p>
      )}
    </div>
  );
}
