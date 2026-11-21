import { Play } from "lucide-react";
import { site } from "@/data/site";

export default function VideoSection() {
  return (
    <div className="aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg bg-brand-dark">
      {site.videoUrl ? (
        <iframe
          src={site.videoUrl}
          title="فيديو تعريفي عن المستشفى"
          className="w-full h-full"
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="w-full h-full grid place-items-center bg-gradient-to-br from-brand-dark to-brand text-white text-center p-6">
          <div>
            <span className="inline-grid place-items-center size-16 rounded-full bg-white/20 mb-3"><Play size={30} /></span>
            <p className="font-bold">مكان الفيديو التعريفي</p>
            <p className="text-sm text-white/70 mt-1">ضع رابط الفيديو في data/site.js (videoUrl)</p>
          </div>
        </div>
      )}
    </div>
  );
}
