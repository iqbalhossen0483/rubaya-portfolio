import {
  Earth,
  GraduationCap,
  Leaf,
  Microscope,
  Satellite,
  Zap,
} from "lucide-react";
import Transition from "./Transition";
import Typography from "./utils/Typography";

export default function About() {
  return (
    <section
      className="bg-white py-16 px-8 lg:py-24 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start"
      id="about"
    >
      <Transition>
        <div>
          <div className="flex items-center gap-[0.9rem] font-sans text-[0.78rem] font-bold tracking-[0.18em] uppercase text-accent mb-3 after:content-[''] after:block after:h-0.5 after:w-12 after:bg-accent-pale">
            About
          </div>
          <Typography variant="h2" className="mb-[1.1rem]">
            Where <em className="italic font-light text-accent">Science</em>
            <br />
            Meets Practice
          </Typography>
          <Typography variant="subtitle1" className="mb-[1.2rem]">
            I am a development professional specializing in climate change
            adaptation, sustainability, and social-ecological research. My work
            sits at the intersection of environmental science, community
            resilience, and evidence-based policy.
          </Typography>
          <Typography variant="subtitle1" className="mb-[1.2rem]">
            With experience spanning academia, international NGOs, and
            government-linked research institutions, I bring a
            cross-disciplinary lens to challenges at the frontlines of the
            climate crisis — particularly in climate-vulnerable South Asian
            contexts.
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[0.8rem] mt-8">
            {[
              {
                icon: <Earth size={18} className="text-accent" />,
                label: "Climate Change Adaptation",
              },
              {
                icon: <Microscope size={18} className="text-accent" />,
                label: "Environmental Research",
              },
              {
                icon: <Zap size={18} className="text-accent" />,
                label: "Disaster Risk Management",
              },
              {
                icon: <Satellite size={18} className="text-accent" />,
                label: "GIS & Remote Sensing",
              },
              {
                icon: <GraduationCap size={18} className="text-accent" />,
                label: "Capacity Building",
              },
              {
                icon: <Leaf size={18} className="text-accent" />,
                label: "Sustainability Policy",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-[1rem_1.1rem] bg-background-main rounded-sm border-l-[3px] border-accent-pale transition-colors duration-200 hover:border-accent"
              >
                <div className="w-8.5 h-8.5 bg-accent-pale rounded-full flex items-center justify-center text-[1rem] shrink-0">
                  {item.icon}
                </div>
                <div className="text-[0.9rem] font-bold text-text-head leading-[1.35] mt-[0.15rem]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Transition>

      <Transition>
        <div>
          <div className="bg-background-dark p-[2.5rem_2.5rem_2rem] rounded-sm mb-6 relative before:content-['\201C'] before:font-serif before:text-[7rem] before:leading-[0.6] before:text-accent-soft before:opacity-[0.35] before:absolute before:top-8 before:left-2">
            <Typography
              variant="body1"
              className="font-serif text-[1.15rem] italic font-light leading-[1.75] relative z-10 mt-[1.2rem]"
            >
              Bridging rigorous environmental science with on-the-ground
              development practice — so that climate knowledge translates into
              real resilience for real communities.
            </Typography>
            <cite className="block mt-[1.1rem] font-sans text-[0.78rem] tracking-[0.08em] font-bold text-accent-soft not-italic uppercase">
              — Professional Philosophy
            </cite>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-background-dark p-6 text-center">
              <div className="font-serif text-[2rem] font-semibold text-accent-soft">
                USA
              </div>
              <div className="font-sans text-[0.78rem] tracking-[0.08em] font-bold text-accent-soft uppercase">
                Adjunct Faculty
              </div>
            </div>
            <div className="bg-accent p-6 text-center">
              <div className="font-serif text-[2rem] font-semibold text-background-main">
                BRAC
              </div>
              <div className="text-[0.7rem] text-[rgba(255,255,255,0.7)] tracking-[0.08em] uppercase">
                Program Officer
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </section>
  );
}
