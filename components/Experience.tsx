import type { Experience as ExperienceType } from "@/types";
import Transition from "./Transition";
import Typography from "./utils/Typography";

export default function Experience({
  experienceData,
}: {
  experienceData: ExperienceType[];
}) {
  return (
    <section
      className="bg-background-alt py-16 px-8 lg:py-24 lg:px-20"
      id="experience"
    >
      <Transition>
        <div className="max-w-215">
          <div className="flex items-center gap-[0.9rem] font-sans text-[0.78rem] font-bold tracking-[0.18em] uppercase text-accent mb-3 after:content-[''] after:block after:h-0.5 after:w-12 after:bg-accent-pale">
            Career
          </div>
          <Typography variant="h2" className="mb-[1.1rem]">
            Professional{" "}
            <em className="italic font-light text-accent">Journey</em>
          </Typography>
        </div>
      </Transition>

      <div className="relative mt-12 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-border-custom max-w-215">
        {experienceData?.length > 0 &&
          experienceData.map((exp, i: number) => (
            <Transition key={i}>
              <div className="grid grid-cols-[auto_1fr] gap-x-[2.2rem] pb-[2.8rem] relative group">
                <div className="w-3 h-3 bg-white border-[3px] border-accent rounded-full mt-[0.4rem] -ml-1.25 shrink-0 relative z-10 transition-colors duration-200 group-hover:bg-accent -order-1"></div>
                <Transition key={i}>
                  <div className="grid grid-cols-[auto_1fr] gap-x-[2.2rem] pb-[2.8rem] relative group">
                    <div>
                      <Typography
                        variant="overline"
                        component="div"
                        className="text-accent mb-[0.3rem]"
                      >
                        {new Date(exp.startDate).toLocaleDateString("en-BN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        —{" "}
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString("en-BN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "Present"}
                      </Typography>
                      <Typography variant="h6" className="mb-[0.2rem]">
                        {exp.role}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        component="div"
                        className="mb-[0.6rem]"
                      >
                        {exp.company}
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-text-light max-w-140"
                      >
                        {exp.description}
                      </Typography>
                    </div>
                  </div>
                </Transition>
              </div>
            </Transition>
          ))}
      </div>
    </section>
  );
}
