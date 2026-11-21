"use client";
import { useMemo, useState, useRef } from "react";
import { Search } from "lucide-react";
import ClinicCard from "./ClinicCard";
import Pagination from "./Pagination";

const norm = (s) =>
  s.toLowerCase().replace(/[ً-ْ]/g, "").replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي");

const PAGE_SIZE = 20;

export default function ClinicsExplorer({ clinics }) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);

  const list = useMemo(() => {
    const nq = norm(q.trim());
    return nq ? clinics.filter((c) => norm(c.name + " " + c.text).includes(nq)) : clinics;
  }, [q, clinics]);

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

  const handlePageChange = (p) => {
    setPage(p);
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={containerRef} className="scroll-mt-6">
      <div className="relative max-w-md mb-8">
        <Search size={18} className="absolute top-1/2 -translate-y-1/2 start-3 text-ink/40" />
        <input
          className="field ps-10"
          placeholder="ابحث عن عيادة أو تخصص..."
          value={q}
          onChange={handleSearchChange}
          aria-label="بحث في العيادات"
        />
      </div>
      {list.length ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {paginatedList.map((c) => (
              <ClinicCard key={c.slug} clinic={c} />
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
