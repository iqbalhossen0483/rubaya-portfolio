import Image from "next/image";
import Transition from "./Transition";
import Card from "./utils/Card";
import Typography from "./utils/Typography";

type Impact = {
  id: number;
  image: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

async function getSettings() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/settings`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch settings");
  }

  return res.json();
}
async function getImpactData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/impact`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch event data");
  }

  return res.json();
}

export default async function Impact() {
  let settings;
  let impactData;
  try {
    const settingDataRes = await getSettings();
    settings = settingDataRes.data;
    const eventDataRes = await getImpactData();
    impactData = eventDataRes;
  } catch (error) {
    console.error(error);
  }

  return (
    <section
      className="bg-white py-16 px-8 lg:py-24 lg:px-20 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 items-start"
      id="impact"
    >
      <Transition>
        <div>
          <div className="flex items-center gap-[0.9rem] font-sans text-[0.78rem] font-bold tracking-[0.18em] uppercase text-accent mb-3 after:content-[''] after:block after:after:h-0.5 after:w-12 after:bg-accent-pale">
            Impact
          </div>
          <Typography variant="h2" className="mb-[1.1rem]">
            Research &<br />
            <em className="italic font-light text-accent">Projects</em>
          </Typography>
          <Typography variant="body2" className="mt-4">
            {settings?.section_description?.impact_section_description}
          </Typography>
        </div>
      </Transition>

      <Transition>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {impactData?.length > 0 &&
            impactData.map((imp: Impact) => (
              <Card key={imp.id} variant="elevated" className="p-[2rem_1.8rem]">
                <div className="text-[1.8rem] mb-4">
                  <Image src={imp.image} width={32} height={32} alt="" />
                </div>
                <Typography
                  variant="subtitle2"
                  component="div"
                  className="mb-[0.55rem] font-serif"
                >
                  {imp.title}
                </Typography>
                <Typography variant="body2">{imp.description}</Typography>
              </Card>
            ))}
        </div>
      </Transition>
    </section>
  );
}
