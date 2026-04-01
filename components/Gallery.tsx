import { getGalleryData } from "@/lib/directDatabaseAccess";
import Image from "next/image";
import Transition from "./Transition";
import Card from "./utils/Card";
import Typography from "./utils/Typography";

type GalleryImage = {
  id: number;
  image: string;
  caption: string;
  createdAt: string;
  updatedAt: string;
};

export default async function Gallery() {
  let galleryData;
  try {
    const data = await getGalleryData();
    galleryData = data;
  } catch (error) {
    throw new Error("Failed to fetch gallery data");
  }

  const layoutPattern = [
    "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto", // Large Feature
    "md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto", // Tall Portrait
    "md:col-span-2 md:row-span-1 aspect-[2/1] md:aspect-auto", // Wide
    "md:col-span-1 md:row-span-1 aspect-square md:aspect-auto", // Square
  ];

  return (
    <section
      className="bg-background-alt py-16 px-8 lg:py-24 lg:px-20"
      id="gallery"
    >
      <Transition>
        <div>
          <div className="flex items-center gap-[0.9rem] font-sans text-[0.78rem] font-bold tracking-[0.18em] uppercase text-accent mb-3 after:content-[''] after:block after:h-0.5 after:w-12 after:bg-accent-pale">
            Moments
          </div>
          <Typography variant="h2" className="mb-[1.1rem]">
            Fieldwork &<br />
            <em className="italic font-light text-accent">Gallery</em>
          </Typography>
        </div>
      </Transition>
      <Transition>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] auto-rows-[250px] grid-flow-dense gap-4 md:gap-6 mt-10">
          {galleryData?.length > 0 &&
            galleryData.map((img, i: number) => {
              const dynamicClass = layoutPattern[i % layoutPattern.length];
              return (
                <Card
                  key={img.id}
                  variant="flat"
                  className={`bg-accent-pale group overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 ${dynamicClass}`}
                >
                  <div className="relative w-full h-full min-h-62.5 md:min-h-full">
                    <Image
                      src={img.image}
                      alt={img.caption}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-[linear-gradient(to_top,rgba(20,40,28,0.85),transparent)] text-white font-sans text-[0.85rem] font-bold translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                      {img.caption}
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>
      </Transition>
    </section>
  );
}
