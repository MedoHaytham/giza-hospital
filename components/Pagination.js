"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 20,
}) {
  if (totalPages <= 1) return null;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems ?? startIndex + pageSize);

  const getPages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const pages = getPages();

  return (
    <nav
      aria-label="التنقل بين الصفحات"
      className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 pt-6"
    >
      {totalItems !== undefined ? (
        <p className="text-sm text-ink/70">
          عرض <span className="font-semibold text-ink">{startIndex + 1}</span> -{" "}
          <span className="font-semibold text-ink">{endIndex}</span> من أصل{" "}
          <span className="font-semibold text-ink">{totalItems}</span>
        </p>
      ) : (
        <div />
      )}

      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold border border-slate-200 bg-white hover:bg-soft text-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
          aria-label="الصفحة السابقة"
        >
          <ChevronRight size={16} />
          <span>السابق</span>
        </button>

        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (p === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-8 h-9 flex items-center justify-center text-ink/40 select-none font-bold"
                >
                  ...
                </span>
              );
            }
            const isActive = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`الصفحة ${p}`}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${
                  isActive
                    ? "bg-brand text-white border border-brand shadow-sm"
                    : "bg-white hover:bg-soft text-ink/80 border border-slate-200"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold border border-slate-200 bg-white hover:bg-soft text-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
          aria-label="الصفحة التالية"
        >
          <span>التالي</span>
          <ChevronLeft size={16} />
        </button>
      </div>
    </nav>
  );
}
