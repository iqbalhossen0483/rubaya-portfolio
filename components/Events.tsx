import Image from "next/image";
import Typography from "./utils/Typography";

export default function Events() {
  const events = [
    {
      role: "Mentor",
      title: "International Climate Camp at a Village in Nepal",
      meta: "📍 Kathmandu & Nagarkot · Jul 2025",
      img: "https://rubayanasrin.com/images/1774022186.jpg",
      span: "col-span-12 lg:col-span-7",
    },
    {
      role: "Honorable Mentor",
      title: "SheConnects Global Fellowship",
      meta: "🌏 BD, PK, NP, IN & SL · Nov 2025",
      img: "https://rubayanasrin.com/images/1774022186.jpg",
      span: "col-span-12 lg:col-span-5",
    },
    {
      role: "Facilitator",
      title: "Climate Change 101: Impacts, Adaptation & Resilience",
      meta: "🌐 Virtual · SheConnects, Nov 2025",
      img: "https://rubayanasrin.com/images/1774022186.jpg",
      span: "col-span-12 lg:col-span-4",
    },
    {
      role: "Honorable Panelist",
      title: "Bangladesh Biodiversity Summit 2025",
      meta: "📍 Bandarban · Nov 2025",
      img: "https://rubayanasrin.com/images/1774022186.jpg",
      span: "col-span-12 lg:col-span-4",
    },
    {
      role: "Session Lead",
      title: "SheConnects — Climate Resilience Workshop",
      meta: "🌐 South Asia · Nov 2025",
      img: "https://rubayanasrin.com/images/1774022186.jpg",
      span: "col-span-12 lg:col-span-4",
    },
  ];

  return (
    <section
      className="bg-background-dark py-16 px-8 lg:py-24 lg:px-20 relative overflow-hidden"
      id="events"
    >
      {/* Background circle */}
      <div className="absolute top-[-40%] right-[-5%] w-125 h-125 rounded-full bg-accent-pale opacity-[0.56] pointer-events-none"></div>

      <div className="reveal relative z-10">
        <div className="flex items-center gap-[0.9rem] font-sans text-[0.78rem] font-bold tracking-[0.18em] uppercase text-accent mb-3 after:content-[''] after:block after:h-0.5 after:w-12 after:bg-accent">
          Engagements
        </div>
        <Typography variant="h2" className="mb-[1.1rem]">
          Speaking, Mentoring
          <br />& <em className="italic font-light text-accent">Leadership</em>
        </Typography>
      </div>
      <Typography
        variant="subtitle1"
        className="text-accent-muted max-w-160 mb-12 reveal relative z-10"
      >
        From international climate camps in Nepal to regional fellowships
        connecting young women across South Asia — here is a selection of events
        where I&apos;ve contributed as mentor, panelist, and facilitator.
      </Typography>

      <div className="grid grid-cols-12 gap-4 reveal relative z-10">
        {events.map((evt, i) => (
          <div
            key={i}
            className={`relative overflow-hidden cursor-pointer rounded-sm group ${evt.span}`}
          >
            <Image
              src={evt.img}
              alt={evt.title}
              width={800}
              height={500}
              className="w-full h-67.5 object-cover object-top block transition-transform duration-500 ease-in-out group-hover:scale-105 brightness-[0.78] saturate-[0.85] group-hover:brightness-[0.88]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,40,28,0.93)_0%,transparent_55%)] flex flex-col justify-end p-[1.4rem]">
              <span className="inline-block px-[0.8rem] py-1 bg-gold-pale border border-gold font-sans text-[0.68rem] font-bold tracking-widest uppercase text-gold mb-[0.6rem] rounded-xs self-start">
                {evt.role}
              </span>
              <div className="font-serif text-[1rem] font-bold text-white leading-[1.35] mb-[0.35rem]">
                {evt.title}
              </div>
              <div className="font-sans text-[0.78rem] font-normal tracking-[0.05em] text-[#9abea8] uppercase">
                {evt.meta}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
