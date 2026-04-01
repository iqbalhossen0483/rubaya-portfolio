import { Link as LinkIcon, Mail, MapPin, Phone } from "lucide-react";
import Transition from "./Transition";
import Button from "./utils/Button";

export default function Contact() {
  return (
    <section
      className="bg-background-dark2 py-16 px-8 lg:py-24 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative overflow-hidden"
      id="contact"
    >
      <div className="absolute bottom-[-30%] left-[-8%] w-105 h-105 rounded-full border-70 border-[rgba(87,151,106,0.08)] pointer-events-none"></div>

      <Transition>
        <div>
          <div className="flex items-center gap-[0.9rem] font-sans text-[0.78rem] font-bold tracking-[0.18em] uppercase text-accent mb-3 after:content-[''] after:block after:h-0.5 after:w-12 after:bg-accent">
            Get in Touch
          </div>
          <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] font-bold text-text-head leading-[1.2] mb-[1.1rem]">
            Let's Build
            <br />
            <em className="italic font-light text-accent">Resilience</em>
            <br />
            Together
          </h2>
          <p className="text-[1.05rem] leading-[1.85] text-accent-muted mt-4">
            Open to research collaborations, speaking invitations, advisory
            roles, and international development partnerships focused on
            climate, environment, and sustainability.
          </p>
        </div>
      </Transition>

      <Transition>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-[1.1rem] p-[1.1rem_1.4rem] bg-accent-pale opacity-95 border border-border-custom rounded-sm transition-all duration-250 hover:opacity-100">
            <div className="w-10.5 h-10.5 bg-[rgba(87,151,106,0.25)] rounded-full flex items-center justify-center text-accent shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <div className="font-sans text-[0.72rem] font-bold tracking-[0.09em] uppercase text-accent mb-[0.15rem]">
                Email
              </div>
              <a
                href="mailto:admin@gmail.com"
                className="text-[1rem] text-accent-muted no-underline hover:text-accent"
              >
                admin@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-[1.1rem] p-[1.1rem_1.4rem] bg-accent-pale opacity-95 border border-border-custom rounded-sm transition-all duration-250 hover:opacity-100">
            <div className="w-10.5 h-10.5 bg-[rgba(87,151,106,0.25)] rounded-full flex items-center justify-center text-accent shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <div className="font-sans text-[0.72rem] font-bold tracking-[0.09em] uppercase text-accent mb-[0.15rem]">
                Phone
              </div>
              <a
                href="tel:+18109672242"
                className="text-[1rem] text-accent-muted no-underline hover:text-accent"
              >
                +1 (810) 967-2242
              </a>
            </div>
          </div>
          <div className="flex items-center gap-[1.1rem] p-[1.1rem_1.4rem] bg-accent-pale opacity-95 border border-border-custom rounded-sm transition-all duration-250 hover:opacity-100">
            <div className="w-10.5 h-10.5 bg-[rgba(87,151,106,0.25)] rounded-full flex items-center justify-center text-accent shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <div className="font-sans text-[0.72rem] font-bold tracking-[0.09em] uppercase text-accent mb-[0.15rem]">
                Location
              </div>
              <span className="text-[1rem] text-accent-muted">
                Dhaka, Bangladesh
              </span>
            </div>
          </div>
          <div className="self-start mt-[1.2rem]">
            <Button variant="icon" href="#" icon={<LinkIcon size={18} />}>
              Connect on LinkedIn
            </Button>
          </div>
        </div>
      </Transition>
    </section>
  );
}
