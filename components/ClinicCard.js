import Link from "next/link";
import Thumb from "./Thumb";

export default function ClinicCard({ clinic }) {
  return (
    <Link href={`/clinics/${clinic.slug}`} className="group block bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden">
        <Thumb src={clinic.image} alt={clinic.name} className="group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-3 text-center font-bold text-brand">{clinic.name}</div>
    </Link>
  );
}
