import type { Event as EventType, Setting } from "@/types";
import { SectionDescription } from "./Contact";
import EventCard from "./EventCard";
import Transition from "./Transition";
import Typography from "./utils/Typography";

export default function Events({
  eventData,
  settings,
}: {
  eventData: EventType[];
  settings: Setting | null;
}) {
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
          {
            (settings?.section_description as SectionDescription)
              ?.event_section_description
          }
        </Typography>
      </Transition>

      <Transition>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] auto-rows-[250px] grid-flow-dense gap-4 relative z-10">
          {eventData?.length > 0 &&
            eventData.map((evt, i: number) => {
              const dynamicClass = layoutPattern[i % layoutPattern.length];
              return (
                <EventCard key={evt.id} evt={evt} dynamicClass={dynamicClass} />
              );
            })}
        </div>
      </Transition>
    </section>
  );
}
