import {
  Earth,
  Globe,
  GraduationCap,
  Leaf,
  Medal,
  Sprout,
  Trophy,
  Zap,
} from "lucide-react";
import Card from "./utils/Card";
import Typography from "./utils/Typography";

export default function Awards() {
  const awards = [
    {
      icon: <Trophy size={24} />,
      title: "Duke of Edinburgh Gold Award",
      year: "Recognition",
      delay: "0s",
    },
    {
      icon: <Globe size={24} />,
      title: "UPG Sustainability Leader",
      year: "2023",
      delay: "0.1s",
    },
    {
      icon: <Earth size={24} />,
      title: "World Food Prize Mentor",
      year: "2023–2024",
      delay: "0.2s",
    },
    {
      icon: <Leaf size={24} />,
      title: "YFU Leader",
      year: "2025",
      delay: "0.3s",
    },
    {
      icon: <Zap size={24} />,
      title: "Solar-Driven Youth Leadership Festival",
      year: "Selected",
      delay: "0.4s",
    },
    {
      icon: <GraduationCap size={24} />,
      title: "SheConnects Honorable Mentor",
      year: "2025",
      delay: "0.5s",
    },
    {
      icon: <Medal size={24} />,
      title: "Biodiversity Summit Panelist",
      year: "2025",
      delay: "0.6s",
    },
    {
      icon: <Sprout size={24} />,
      title: "ICIMOD Climate Camp Mentor",
      year: "2025",
      delay: "0.7s",
    },
  ];

  return (
    <section
      className="bg-background-alt py-16 px-8 lg:py-24 lg:px-20"
      id="awards"
    >
      <div className="reveal">
        <div className="flex items-center gap-[0.9rem] font-sans text-[0.78rem] font-bold tracking-[0.18em] uppercase text-accent mb-3 after:content-[''] after:block after:h-0.5 after:w-12 after:bg-accent-pale">
          Recognition
        </div>
        <Typography variant="h2" className="mb-[1.1rem]">
          Leadership &<br />
          <em className="italic font-light text-accent">Awards</em>
        </Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.2rem] mt-1">
        {awards.map((award, i) => (
          <Card
            key={i}
            variant="award"
            className="p-[1.8rem_1.5rem] reveal"
            style={{ animationDelay: award.delay }}
          >
            <div className="text-[1.5rem] mb-3">{award.icon}</div>
            <Typography
              variant="subtitle2"
              component="div"
              className="mb-[0.3rem] font-serif leading-[1.35]"
            >
              {award.title}
            </Typography>
            <Typography
              variant="caption"
              className="font-bold tracking-[0.07em] text-accent uppercase"
            >
              {award.year}
            </Typography>
          </Card>
        ))}
      </div>
    </section>
  );
}
