import Typography from "./utils/Typography";

export default function Experience() {
  const experiences = [
    {
      period: "Jan 2024 — Present",
      role: "Program Officer",
      org: "BRAC, Bangladesh",
      desc: "Leading climate resilience programming, overseeing implementation of nature-based solutions and community-centered adaptation strategies at national scale.",
    },
    {
      period: "Aug 2022 — Present",
      role: "Adjunct Faculty",
      org: "University of South Asia, Bangladesh",
      desc: "Teaching Environmental Science; guiding students through applied research in climate modeling and environmental assessment.",
    },
    {
      period: "Jan 2024 — Jul 2024",
      role: "Green Response Officer",
      org: "Bangladesh Environment Society (BMS)",
      desc: "Coordinated climate response initiatives, stakeholder outreach and climate communication campaigns.",
      reverse: true, // Only for layout alternative, but in html grid column 2 was used.
    },
    {
      period: "Nov 2021 — Dec 2023",
      role: "Assistant Manager, Project Development",
      org: "Research World | Dec 2021 — Nov 2023",
      desc: "Led research design and project management for climate change adaptation studies across South Asia.",
    },
    {
      period: "Nov 2020 — Dec 2023",
      role: "Research Officer",
      org: "Center for Natural Resource & Climate Change Research (ORCA)",
      desc: "Spearheaded climate change adaptation research; field data collection, spatial analysis, and policy-facing report writing.",
    },
    {
      period: "Jul 2019 — Jun 2021",
      role: "Program Officer",
      org: "Bangladesh Institute of ICT in Development (BIID)",
      desc: "Managed digital literacy and sustainable development programs in rural and peri-urban Bangladesh.",
    },
  ];

  return (
    <section
      className="bg-background-alt py-16 px-8 lg:py-24 lg:px-20"
      id="experience"
    >
      <div className="max-w-215 reveal">
        <div className="flex items-center gap-[0.9rem] font-sans text-[0.78rem] font-bold tracking-[0.18em] uppercase text-accent mb-3 after:content-[''] after:block after:h-0.5 after:w-12 after:bg-accent-pale">
          Career
        </div>
        <Typography variant="h2" className="mb-[1.1rem]">
          Professional{" "}
          <em className="italic font-light text-accent">Journey</em>
        </Typography>
      </div>

      <div className="relative mt-12 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-border-custom max-w-215">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="grid grid-cols-[auto_1fr] gap-x-[2.2rem] pb-[2.8rem] relative reveal group"
          >
            {exp.reverse ? (
              <>
                {/* Desktop view where dot might be after if it was styled that way, but html just put it in order-[-1] */}
                <div className="w-3 h-3 bg-white border-[3px] border-accent rounded-full mt-[0.4rem] -ml-1.25 shrink-0 relative z-10 transition-colors duration-200 group-hover:bg-accent -order-1"></div>
                <div className="col-start-2">
                  <Typography
                    variant="overline"
                    component="div"
                    className="text-accent mb-[0.3rem]"
                  >
                    {exp.period}
                  </Typography>
                  <Typography variant="h6" className="mb-[0.2rem]">
                    {exp.role}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    component="div"
                    className="mb-[0.6rem]"
                  >
                    {exp.org}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-text-light max-w-140"
                  >
                    {exp.desc}
                  </Typography>
                </div>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-white border-[3px] border-accent rounded-full mt-[0.4rem] -ml-1.25 shrink-0 relative z-10 transition-colors duration-200 group-hover:bg-accent"></div>
                <div>
                  <Typography
                    variant="overline"
                    component="div"
                    className="text-accent mb-[0.3rem]"
                  >
                    {exp.period}
                  </Typography>
                  <Typography variant="h6" className="mb-[0.2rem]">
                    {exp.role}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    component="div"
                    className="mb-[0.6rem]"
                  >
                    {exp.org}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-text-light max-w-140"
                  >
                    {exp.desc}
                  </Typography>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
