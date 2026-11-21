import { Stethoscope, UserRound } from "lucide-react";

// صورة حقيقية إن وُجدت، وإلا خلفية بديلة
export default function Thumb({ src, alt = "", kind = "clinic", className = "" }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading="lazy" className={`w-full h-full object-cover ${className}`} />;
  }
  const Icon = kind === "doctor" ? UserRound : Stethoscope;
  return (
    <div className={`w-full h-full grid place-items-center bg-gradient-to-br from-brand to-accent text-white/90 ${className}`} role="img" aria-label={alt}>
      <Icon size={kind === "doctor" ? 72 : 56} strokeWidth={1.4} />
    </div>
  );
}
