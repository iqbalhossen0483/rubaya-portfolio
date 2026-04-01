import Image from "next/image";
import Transition from "./Transition";
import Typography from "./utils/Typography";

async function getAboutData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/about`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch hero data");
  }

  return res.json();
}

export default async function About() {
  let aboutData;
  try {
    const data = await getAboutData();
    aboutData = data.data;
  } catch (error) {
    console.error(error);
  }

  const aboutTitle = aboutData?.title?.split(" ");

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
            {aboutTitle[0]}{" "}
            <em className="italic font-light text-accent">{aboutTitle[1]}</em>
            <br />
            {aboutTitle.slice(2).join(" ")}
          </Typography>
          <Typography variant="subtitle1" className="mb-[1.2rem]">
            {aboutData?.description}
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[0.8rem] mt-8">
            {aboutData?.activities?.length > 0 &&
              aboutData?.activities?.map(
                (item: { id: number; icon: string; label: string }) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-[1rem_1.1rem] bg-background-main rounded-sm border-l-[3px] border-accent-pale transition-colors duration-200 hover:border-accent"
                  >
                    <div className="w-8.5 h-8.5 bg-accent-pale rounded-full flex items-center justify-center text-[1rem] shrink-0">
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="text-[0.9rem] font-bold text-text-head leading-[1.35] mt-[0.15rem]">
                      {item.label}
                    </div>
                  </div>
                ),
              )}
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
              {aboutData?.philosophy}
            </Typography>
            <cite className="block mt-[1.1rem] font-sans text-[0.78rem] tracking-[0.08em] font-bold text-accent-soft not-italic uppercase">
              — Professional Philosophy
            </cite>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {aboutData?.highlightedPositions?.length > 0 &&
              aboutData.highlightedPositions.map(
                (
                  item: { id: number; title: string; company: string },
                  i: number,
                ) => {
                  const isEven = i % 2 === 0;

                  return (
                    <div
                      key={item.id}
                      className={`p-6 text-center ${
                        isEven
                          ? "bg-background-dark text-accent-soft"
                          : "bg-accent text-white"
                      }`}
                    >
                      <div className="font-serif text-[2rem] font-semibold">
                        {item.company}
                      </div>
                      <div className="font-sans text-[0.78rem] tracking-[0.08em] font-bold uppercase">
                        {item.title}
                      </div>
                    </div>
                  );
                },
              )}
          </div>
        </div>
      </Transition>
    </section>
  );
}
