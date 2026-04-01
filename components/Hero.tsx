import Image from "next/image";
import Transition from "./Transition";
import Button from "./utils/Button";
import Typography from "./utils/Typography";

export default function Hero() {
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
            Rubaya
            <br />
            Nasrin
            <em className="italic font-light text-accent block mt-1">
              Shejuti
            </em>
          </Typography>
        </Transition>
        <Transition>
          <Typography
            variant="body2"
            className="font-normal tracking-widest uppercase mb-[1.8rem] leading-[1.9]"
          >
            Climate Change Adaptation · Environmental Research · Disaster Risk
          </Typography>
        </Transition>
        <Transition>
          <Typography
            variant="subtitle1"
            className="text-text-mid max-w-105 mb-10"
          >
            Building climate resilience and supporting sustainable development
            initiatives — combining academic rigor with field experience across
            South Asia.
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
                src="/profile.jpg"
                alt="Rubaya Nasrin"
                width={320}
                height={400}
                className="w-full h-full object-cover object-top brightness-[0.92] contrast-[1.04] rounded-sm"
              />
            </div>
            <div className="absolute -bottom-4.5 -left-7 bg-gold-pale border-2 border-gold px-[1.4rem] py-4 rounded-[3px]">
              <div className="font-serif text-[2rem] font-bold text-gold leading-none">
                8+
              </div>
              <div className="text-[0.72rem] font-bold tracking-[0.07em] uppercase text-text-mid mt-1">
                Years
                <br />
                Experience
              </div>
            </div>
          </div>
        </Transition>
        <div className="absolute right-12.5 bottom-[12%] flex flex-col gap-[0.9rem]">
          <Transition>
            <div className="bg-[rgba(246,248,246,0.97)] px-[1.2rem] py-[0.8rem] border-l-[3px] border-accent rounded-r-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              <div className="font-serif text-[1.7rem] font-bold leading-none">
                4+
              </div>
              <div className="text-[0.72rem] font-bold tracking-[0.09em] uppercase text-text-light mt-1">
                Countries
              </div>
            </div>
          </Transition>
          <Transition>
            <div className="bg-[rgba(246,248,246,0.97)] px-[1.2rem] py-[0.8rem] border-l-[3px] border-accent rounded-r-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
              <div className="font-serif text-[1.7rem] font-bold leading-none">
                5+
              </div>
              <div className="text-[0.72rem] font-bold tracking-[0.09em] uppercase text-text-light mt-1">
                Awards
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>
  );
}
