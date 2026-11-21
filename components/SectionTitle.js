import Link from "next/link";

export default function SectionTitle({ title, href, linkLabel = "عرض الكل" }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <h2 className="text-2xl md:text-3xl font-extrabold text-brand relative pb-3 after:absolute after:bottom-0 after:start-0 after:h-1 after:w-16 after:rounded after:bg-accent">
        {title}
      </h2>
      {href && <Link href={href} className="text-brand font-bold hover:underline">{linkLabel} ←</Link>}
    </div>
  );
}
