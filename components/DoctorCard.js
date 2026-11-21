import Link from "next/link";
import Thumb from "./Thumb";
import { getClinic } from "@/data/site";

export default function DoctorCard({ doctor }) {
  const clinic = getClinic(doctor.clinic);
  return (
    <Link href={`/doctors/${doctor.slug}`} className="group block bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[4/5] overflow-hidden">
        <Thumb kind="doctor" src={doctor.photo} alt={doctor.name} className="group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-bold text-brand">{doctor.name}</h3>
        <p className="text-sm text-ink/60 italic mt-1">{clinic?.name}</p>
        <p className="text-sm text-ink/80 mt-2">{doctor.title}</p>
      </div>
    </Link>
  );
}
