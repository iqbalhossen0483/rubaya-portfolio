import { Link as LinkIcon, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Button from "./utils/Button";

async function getSettings() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/settings`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch settings");
  }

  return res.json();
}

async function getContactData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/contact`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch event data");
  }

  return res.json();
}

export default async function Contact() {
  let settings;
  let contactData;
  try {
    const settingDataRes = await getSettings();
    settings = settingDataRes.data;
    const eventDataRes = await getContactData();
    contactData = eventDataRes?.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <section
      className="bg-background-dark2 py-16 px-8 lg:py-24 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative overflow-hidden"
      id="contact"
    >
      <div className="absolute bottom-[-30%] left-[-8%] w-105 h-105 rounded-full border-70 border-[rgba(87,151,106,0.08)] pointer-events-none"></div>

      <div className="reveal">
        <div className="flex items-center gap-[0.9rem] font-sans text-[0.78rem] font-bold tracking-[0.18em] uppercase text-accent mb-3 after:content-[''] after:block after:h-0.5 after:w-12 after:bg-accent">
          Get in Touch
        </div>
        <h2 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] font-bold text-text-head leading-[1.2] mb-[1.1rem]">
          Let&apos;s Build
          <br />
          <em className="italic font-light text-accent">Resilience</em>
          <br />
          Together
        </h2>
        <p className="text-[1.05rem] leading-[1.85] text-accent-muted mt-4">
          {settings?.section_description?.contact_section_description}
        </p>
      </div>

      <div
        className="flex flex-col gap-4 reveal"
        style={{ animationDelay: "0.2s" }}
      >
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
              {contactData?.email}
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
              {contactData?.phone}
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
              {contactData?.location}
            </span>
          </div>
        </div>
        <div className="self-start mt-[1.2rem]">
          <Link
            href={contactData.linkedin_url}
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <Button variant="icon" icon={<LinkIcon size={18} />}>
              Connect on LinkedIn
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
