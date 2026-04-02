import type { Event as EventType } from "@/types";
import { MapPin } from "lucide-react";
import Image from "next/image";

interface EventCardProps {
  evt: EventType;
  dynamicClass: string;
}

export default function EventCard({ evt, dynamicClass }: EventCardProps) {
  return (
    <div
      key={evt.id}
      className={`relative overflow-hidden cursor-pointer rounded-sm group shadow-sm hover:shadow-lg transition-all duration-500 ${dynamicClass}`}
    >
      <Image
        src={evt.coverImage}
        alt={evt.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 brightness-[0.78] saturate-[0.85] group-hover:brightness-[0.88]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,40,28,0.93)_0%,transparent_55%)] flex flex-col justify-end p-[1.4rem]">
        <span className="inline-block px-[0.8rem] py-1 bg-gold-pale border border-gold font-sans text-[0.68rem] font-bold tracking-widest uppercase text-gold mb-[0.6rem] rounded-xs self-start">
          {evt.role}
        </span>
        <div className="font-serif text-[1rem] font-bold text-white leading-[1.35] mb-[0.35rem]">
          {evt.title}
        </div>
        <div className="font-sans text-[0.78rem] font-normal tracking-[0.05em] text-[#9abea8] uppercase flex items-center gap-1">
          <MapPin size={15} /> {evt.location},{" "}
          {new Date(evt.date).toLocaleDateString("en-BN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
}
