import { MapPin } from "lucide-react";
import Image from "next/image";
import Transition from "./Transition";
import Typography from "./utils/Typography";

type Event = {
  id: number;
  title: string;
  role: string;
  date: string;
  location: string;
  description: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
};

async function getSettings() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/settings`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch settings");
  }

  return res.json();
}

async function getEventData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/event`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch event data");
  }

  return res.json();
}

export default async function Events() {
  let settings;
  let eventData;
  try {
    const settingDataRes = await getSettings();
    settings = settingDataRes.data;
    const eventDataRes = await getEventData();
    eventData = eventDataRes;
  } catch (error) {
    console.error(error);
  }
  const layoutPattern = [
    "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto", // Large Feature
    "md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto", // Tall Portrait
    "md:col-span-2 md:row-span-1 aspect-[2/1] md:aspect-auto", // Wide
    "md:col-span-1 md:row-span-1 aspect-square md:aspect-auto", // Square
  ];

  return (
    <section
      className="bg-background-dark py-16 px-8 lg:py-24 lg:px-20 relative overflow-hidden"
      id="events"
    >
      {/* Background circle */}
      <div className="absolute top-[-40%] right-[-5%] w-125 h-125 rounded-full bg-accent-pale opacity-[0.56] pointer-events-none"></div>

      <Transition>
        <div className="relative z-10">
          <div className="flex items-center gap-[0.9rem] font-sans text-[0.78rem] font-bold tracking-[0.18em] uppercase text-accent mb-3 after:content-[''] after:block after:h-0.5 after:w-12 after:bg-accent">
            Engagements
          </div>
          <Typography variant="h2" className="mb-[1.1rem]">
            Speaking, Mentoring
            <br />&{" "}
            <em className="italic font-light text-accent">Leadership</em>
          </Typography>
        </div>
      </Transition>
      <Transition>
        <Typography
          variant="subtitle1"
          className="text-accent-muted max-w-160 mb-12 relative z-10"
        >
          {settings?.section_description?.event_section_description}
        </Typography>
      </Transition>

      <Transition>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] auto-rows-[250px] grid-flow-dense gap-4 relative z-10">
          {eventData?.length > 0 &&
            eventData.map((evt: Event, i: number) => {
              const dynamicClass = layoutPattern[i % layoutPattern.length];
              return (
                <div
                  key={evt.id}
                  className={`relative overflow-hidden cursor-pointer rounded-sm group shadow-sm hover:shadow-lg transition-all duration-500 ${dynamicClass}`}
                >
                  <div className="relative w-full h-full min-h-62.5 md:min-h-full">
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
                </div>
              );
            })}
        </div>
      </Transition>
    </section>
  );
}
