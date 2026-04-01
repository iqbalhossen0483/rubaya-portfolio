import { BookOpen, Map, Telescope, Wheat } from "lucide-react";
import Transition from "./Transition";
import Card from "./utils/Card";
import Typography from "./utils/Typography";

export default function Impact() {
  const impacts = [
    {
      icon: <Wheat size={32} className="text-accent" />,
      title: "Climate Access Programs",
      desc: "Designing mechanisms to expose climate-vulnerable communities to resources, policies, and adaptive strategies.",
    },
    {
      icon: <BookOpen size={32} className="text-accent" />,
      title: "Environmental Capacity Building",
      desc: "Developing and delivering training programs for students, NGO staff, and community practitioners.",
    },
    {
      icon: <Telescope size={32} className="text-accent" />,
      title: "Sustainability Research",
      desc: "Publishing peer-reviewed insights on socio-environmental sustainability and climate resilience frameworks.",
    },
    {
      icon: <Map size={32} className="text-accent" />,
      title: "Spatial & Field Analysis",
      desc: "GIS-based mapping of climate risk zones, ecosystem services, and disaster vulnerability corridors.",
    },
  ];

  return (
    <section
      className="bg-white py-16 px-8 lg:py-24 lg:px-20 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 items-start"
      id="impact"
    >
      <Transition>
        <div>
          <div className="flex items-center gap-[0.9rem] font-sans text-[0.78rem] font-bold tracking-[0.18em] uppercase text-accent mb-3 after:content-[''] after:block after:after:h-0.5 after:w-12 after:bg-accent-pale">
            Impact
          </div>
          <Typography variant="h2" className="mb-[1.1rem]">
            Research &<br />
            <em className="italic font-light text-accent">Projects</em>
          </Typography>
          <Typography variant="body2" className="mt-4">
            Translating research into programs that protect lives, ecosystems,
            and livelihoods — from climate access to sustainability capacity.
          </Typography>
        </div>
      </Transition>

      <Transition>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {impacts.map((imp, i) => (
            <Card key={i} variant="elevated" className="p-[2rem_1.8rem]">
              <div className="text-[1.8rem] mb-4">{imp.icon}</div>
              <Typography
                variant="subtitle2"
                component="div"
                className="mb-[0.55rem] font-serif"
              >
                {imp.title}
              </Typography>
              <Typography variant="body2">{imp.desc}</Typography>
            </Card>
          ))}
        </div>
      </Transition>
    </section>
  );
}
