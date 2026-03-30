import Image from "next/image";
import Card from "./utils/Card";
import Typography from "./utils/Typography";

export default function Gallery() {
  const images = [
    {
      src: "/gellery-1.jpeg",
      caption: "Community Engagement",
    },
    {
      src: "/gellery-3.jpeg",
      caption: "Climate Research",
    },
    {
      src: "/gellery-2.jpeg",
      caption: "Data Collection",
    },
    {
      src: "/gellery-1.jpeg",
      caption: "Community Engagement",
    },
    {
      src: "/gellery-3.jpeg",
      caption: "Climate Research",
    },
    {
      src: "/gellery-2.jpeg",
      caption: "Data Collection",
    },
    {
      src: "/gellery-1.jpeg",
      caption: "Community Engagement",
    },
    {
      src: "/gellery-3.jpeg",
      caption: "Climate Research",
    },
    {
      src: "/gellery-2.jpeg",
      caption: "Data Collection",
    },
    {
      src: "/gellery-1.jpeg",
      caption: "Community Engagement",
    },
    {
      src: "/gellery-3.jpeg",
      caption: "Climate Research",
    },
    {
      src: "/gellery-2.jpeg",
      caption: "Data Collection",
    },
  ];

  return (
    <section
      className="bg-background-alt py-16 px-8 lg:py-24 lg:px-20"
      id="gallery"
    >
      <div className="reveal">
        <div className="flex items-center gap-[0.9rem] font-sans text-[0.78rem] font-bold tracking-[0.18em] uppercase text-accent mb-3 after:content-[''] after:block after:h-0.5 after:w-12 after:bg-accent-pale">
          Moments
        </div>
        <Typography variant="h2" className="mb-[1.1rem]">
          Fieldwork &<br />
          <em className="italic font-light text-accent">Gallery</em>
        </Typography>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mt-10 reveal">
        {images.map((img, i) => (
          <Card
            key={i}
            variant="flat"
            className="aspect-4/3 bg-accent-pale group"
          >
            <Image
              src={img.src}
              alt={img.caption}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 brightness-[0.9] group-hover:brightness-100"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-[linear-gradient(to_top,rgba(20,40,28,0.8),transparent)] text-white font-sans text-[0.85rem] font-bold translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
              {img.caption}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
