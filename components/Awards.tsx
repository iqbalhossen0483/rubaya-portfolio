import type { Award as AwardType } from "@/types";
import Image from "next/image";
import Transition from "./Transition";
import Card from "./utils/Card";
import Typography from "./utils/Typography";

export default function Awards({ awardData }: { awardData: AwardType[] }) {
  return (
    <section
      className="bg-background-alt py-16 px-8 lg:py-24 lg:px-20"
      id="awards"
    >
      <Transition>
        <div>
          <div className="flex items-center gap-[0.9rem] font-sans text-[0.78rem] font-bold tracking-[0.18em] uppercase text-accent mb-3 after:content-[''] after:block after:h-0.5 after:w-12 after:bg-accent-pale">
            Recognition
          </div>
          <Typography variant="h2" className="mb-[1.1rem]">
            Leadership &<br />
            <em className="italic font-light text-accent">Awards</em>
          </Typography>
        </div>
      </Transition>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.2rem] mt-1">
        {awardData?.length > 0 &&
          awardData.map((award) => (
            <Transition key={award.id}>
              <Card variant="award" className="p-[1.8rem_1.5rem]">
                <div className="text-[1.5rem] mb-3">
                  <Image
                    src={award.image}
                    alt={award.title}
                    width={50}
                    height={50}
                  />
                </div>
                <Typography
                  variant="subtitle2"
                  component="div"
                  className="mb-[0.3rem] font-serif leading-[1.35]"
                >
                  {award.title}
                </Typography>
                <Typography
                  variant="body2"
                  className="mb-[0.3rem] line-clamp-2"
                >
                  {award.description}
                </Typography>
                <Typography
                  variant="caption"
                  className="font-bold tracking-[0.07em] text-accent uppercase"
                >
                  {award.time_to_receipt}
                </Typography>
              </Card>
            </Transition>
          ))}
      </div>
    </section>
  );
}
