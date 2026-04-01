import Image from "next/image";
import Transition from "./Transition";
import Button from "./utils/Button";
import Typography from "./utils/Typography";

async function getHeroData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/hero`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch hero data");
  }

  return res.json();
}

export default async function Hero() {
  let heroData;
  try {
    const data = await getHeroData();
    heroData = data.data;
  } catch (error) {
    console.error(error);
  }

  const heroTitle = heroData?.title?.split(" ");
  const yearsOfExperience = heroData?.yearsOfExperience?.split(" ")?.[0];
  const countries = heroData?.countries?.split(" ")?.[0];
  const award = heroData?.award?.split(" ")?.[0];

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 bg-background-main -z-10">
        <div
          className="hidden lg:block absolute top-0 right-0 w-[52vw] h-full"
          style={{
            background:
              "linear-gradient(160deg, #3a7d52 0%, #4a9060 60%, #5aa070 100%)",
            clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 22%)",
          }}
        ></div>
      </div>

      <div className="flex flex-col justify-center pt-32 pb-16 px-8 lg:pt-32 lg:pb-16 lg:px-20 relative z-10">
        <Transition>
          <div className="inline-flex items-center gap-[0.7rem] font-sans text-[0.78rem] font-bold tracking-[0.14em] uppercase text-accent mb-[1.6rem]">
            <span className="block w-7.5 h-0.5 bg-accent"></span>
            Development Professional · Climate & Sustainability
          </div>
        </Transition>
        <Transition>
          <Typography variant="h1" className="mb-2">
            {heroTitle[0]}
            <br />
            {heroTitle[1]}
            <em className="italic font-light text-accent block mt-1">
              {heroTitle[2]}
            </em>
          </Typography>
        </Transition>
        <Transition>
          <Typography
            variant="body2"
            className="font-normal tracking-widest uppercase mb-[1.8rem] leading-[1.9]"
          >
            {heroData?.subtitle}
          </Typography>
        </Transition>
        <Transition>
          <Typography
            variant="subtitle1"
            className="text-text-mid max-w-105 mb-10"
          >
            {heroData?.description}
          </Typography>
        </Transition>
        <Transition>
          <div className="flex gap-[1.2rem] items-center flex-wrap">
            <Button variant="primary" href="#contact">
              Get in Touch
            </Button>
            <Button variant="secondary" href="#experience">
              View Experience
            </Button>
          </div>
        </Transition>
      </div>

      <div className="hidden lg:flex relative z-0 items-center justify-center">
        <Transition>
          <div className="relative w-[320px] h-100">
            {/* Profile photo placeholder */}
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-4 rounded-sm"
              style={{
                background:
                  "linear-gradient(160deg, #4a9668, #3a7d52, #5aa070)",
                clipPath:
                  "polygon(15% 0%, 100% 0%, 100% 80%, 85% 100%, 0% 100%, 0% 20%)",
              }}
            >
              <Image
                src={heroData?.profile}
                alt="Rubaya Nasrin"
                width={320}
                height={400}
                className="w-full h-full object-cover object-top brightness-[0.92] contrast-[1.04] rounded-sm"
              />
            </div>
            <div className="absolute -bottom-4.5 -left-7 bg-gold-pale border-2 border-gold px-[1.4rem] py-4 rounded-[3px]">
              <div className="font-serif text-[2rem] font-bold text-gold leading-none">
                {yearsOfExperience}
              </div>
              <div className="text-[0.72rem] font-bold tracking-[0.07em] uppercase text-text-mid mt-1 max-w-20">
                {heroData?.yearsOfExperience?.replace(yearsOfExperience, "")}
              </div>
            </div>
          </div>
        </Transition>
        <div className="absolute right-12.5 bottom-[12%] flex flex-col gap-[0.9rem]">
          <Transition>
            <div className="bg-[rgba(246,248,246,0.97)] px-[1.2rem] py-[0.8rem] border-l-[3px] border-accent rounded-r-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              <div className="font-serif text-[1.7rem] font-bold leading-none">
                {countries}
              </div>
              <div className="text-[0.72rem] font-bold tracking-[0.09em] uppercase text-text-light mt-1">
                {heroData?.countries?.replace(countries, "")}
              </div>
            </div>
          </Transition>
          <Transition>
            <div className="bg-[rgba(246,248,246,0.97)] px-[1.2rem] py-[0.8rem] border-l-[3px] border-accent rounded-r-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              <div className="font-serif text-[1.7rem] font-bold leading-none">
                {award}
              </div>
              <div className="text-[0.72rem] font-bold tracking-[0.09em] uppercase text-text-light mt-1">
                {heroData?.award?.replace(award, "")}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>
  );
}
